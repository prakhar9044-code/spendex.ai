/**
 * Spendex AI - Core Logic (Fixed for Offline/Local usage)
 * Stack: LocalStorage + Chart.js + jsPDF + HTML2Canvas + Anime.js
 */

// --- STATE MANAGEMENT ---
const AppState = {
    employees: [],
    expenses: [],
    settings: {
        name: 'Alex Founder',
        email: 'admin@spendex.ai',
        budgetLimit: 50000,
        currency: '$',
        themeMode: 'dark', // Made dark mode the default for your preference
        themeColor: 'theme-blue',
        notifications: true
    },
    
    init() {
        this.load();
        this.applySettings();
        this.notifySubscribers();
    },

    load() {
        const stored = localStorage.getItem('spendex_data_v2');
        if (stored) {
            const data = JSON.parse(stored);
            this.employees = data.employees || [];
            this.expenses = data.expenses || [];
            this.settings = { ...this.settings, ...data.settings };
        }
    },

    save() {
        localStorage.setItem('spendex_data_v2', JSON.stringify({
            employees: this.employees,
            expenses: this.expenses,
            settings: this.settings
        }));
        this.applySettings();
        this.notifySubscribers();
    },

    applySettings() {
        ThemeManager.applyMode(this.settings.themeMode);
        ThemeManager.setPrimary(this.settings.themeColor, false);
        
        document.getElementById('sidebar-user-name').innerText = this.settings.name;
        document.getElementById('profile-avatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.settings.name)}&background=random`;
        
        document.getElementById('currency-symbol').innerText = this.settings.currency;
    },

    notifySubscribers() {
        Dashboard.render();
        FinancialHealth.render();
        Payroll.renderTable();
        Expenses.renderTable();
        AI.runAnalysis();
    }
};

// --- THEME MANAGER ---
const ThemeManager = {
    toggleMode() {
        AppState.settings.themeMode = AppState.settings.themeMode === 'light' ? 'dark' : 'light';
        AppState.save(); 
    },
    applyMode(mode) {
        const isDark = (mode === 'dark');
        if (isDark) {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            document.getElementById('darkModeToggle').checked = false;
        }
        ChartManager.updateChartColors();
    },
    setPrimary(themeClass, save = true) {
        document.body.classList.remove('theme-blue', 'theme-green', 'theme-purple');
        document.body.classList.add(themeClass);
        if(save) {
            AppState.settings.themeColor = themeClass;
            AppState.save();
        }
    }
};

// --- CHART MANAGER ---
const ChartManager = {
    instances: {},
    getTextColor() {
        return document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e293b';
    },
    getGridColor() {
        return document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
    },
    updateChartColors() {
        const color = this.getTextColor();
        const grid = this.getGridColor();
        Chart.defaults.color = color;
        Chart.defaults.borderColor = grid;
        
        Object.values(this.instances).forEach(chart => {
            if(chart.options.scales && chart.options.scales.x) {
                chart.options.scales.x.grid.color = grid;
                chart.options.scales.y.grid.color = grid;
            }
            chart.update();
        });
    }
};

// --- DASHBOARD MODULE ---
const Dashboard = {
    render() {
        const totalExp = AppState.expenses.reduce((sum, e) => sum + e.amount, 0);
        const totalPayroll = Payroll.calculateTotalCost();
        const totalBurn = totalExp + totalPayroll;
        
        new countUp.CountUp('dash-total-expenses', totalExp, { prefix: AppState.settings.currency }).start();
        new countUp.CountUp('dash-payroll', totalPayroll, { prefix: AppState.settings.currency }).start();
        new countUp.CountUp('dash-emp-count', AppState.employees.length).start();

        const mockCash = 100000;
        const runway = totalBurn > 0 ? (mockCash / totalBurn).toFixed(1) : '∞';
        document.getElementById('dash-runway').innerText = `${runway} Mo`;

        let score = 100;
        if (totalBurn === 0) score = 0; 
        else {
            if (runway < 6) score -= 20;
            if (totalBurn > AppState.settings.budgetLimit) score -= 30;
        }
        new countUp.CountUp('dash-health', score).start();

        this.renderCharts();
    },

    renderCharts() {
        // 1. Health Gauge
        const ctxHealth = document.getElementById('healthGaugeChart').getContext('2d');
        if(ChartManager.instances.health) ChartManager.instances.health.destroy();
        
        let currentScore = parseInt(document.getElementById('dash-health').innerText) || 0;
        let color = currentScore > 70 ? '#10b981' : currentScore > 40 ? '#f59e0b' : '#ef4444';

        ChartManager.instances.health = new Chart(ctxHealth, {
            type: 'doughnut',
            data: {
                labels: ['Score', 'Gap'],
                datasets: [{ data: [currentScore, 100 - currentScore], backgroundColor: [color, 'rgba(150,150,150,0.2)'], borderWidth: 0, cutout: '80%' }]
            },
            options: { plugins: { legend: { display: false }, tooltip: { enabled: false } }, responsive: true, maintainAspectRatio: false }
        });

        // 2. Cash Flow Chart 
        const ctxFlow = document.getElementById('cashFlowChart').getContext('2d');
        const gradient = ctxFlow.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        if(ChartManager.instances.flow) ChartManager.instances.flow.destroy();

        let burn = Payroll.calculateTotalCost() + AppState.expenses.reduce((s,e)=>s+e.amount,0);
        let history = burn === 0 ? [0,0,0,0,0,0] : [burn*0.8, burn*0.9, burn, burn*1.1, burn*0.95, burn];

        ChartManager.instances.flow = new Chart(ctxFlow, {
            type: 'line',
            data: {
                labels: ['M-5', 'M-4', 'M-3', 'M-2', 'M-1', 'Current'],
                datasets: [{
                    label: 'Monthly Burn',
                    data: history,
                    borderColor: '#3b82f6',
                    backgroundColor: gradient,
                    fill: true, tension: 0.4, pointRadius: 4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        // 3. Expense Pie Chart
        const categories = {};
        AppState.expenses.forEach(e => { categories[e.category] = (categories[e.category] || 0) + e.amount; });

        const ctxPie = document.getElementById('expensePieChart').getContext('2d');
        if(ChartManager.instances.pie) ChartManager.instances.pie.destroy();

        ChartManager.instances.pie = new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories).length ? Object.keys(categories) : ['No Data'],
                datasets: [{
                    data: Object.values(categories).length ? Object.values(categories) : [1],
                    backgroundColor: Object.keys(categories).length ? ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#64748b'] : ['#e2e8f0']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
        });
    }
};

// --- FINANCIAL HEALTH MODULE ---
const FinancialHealth = {
    render() {
        const totalBurn = Payroll.calculateTotalCost() + AppState.expenses.reduce((s,e)=>s+e.amount,0);
        const cashReserves = 100000; 
        const debt = 15000; 
        const equity = cashReserves - debt;
        
        const debtRatio = equity > 0 ? (debt / equity).toFixed(2) : 0;
        const profitMargin = totalBurn > 0 ? 15 : 0; 
        
        document.getElementById('metric-debt-ratio').innerText = debtRatio;
        document.getElementById('bar-debt-ratio').style.width = Math.min((debtRatio / 2) * 100, 100) + '%';
        
        document.getElementById('metric-profit-margin').innerText = profitMargin + '%';
        document.getElementById('bar-profit-margin').style.width = profitMargin + '%';
        
        new countUp.CountUp('metric-cash-reserves', cashReserves, { prefix: AppState.settings.currency }).start();

        const ctxLiq = document.getElementById('liquidityChart').getContext('2d');
        if(ChartManager.instances.liquidity) ChartManager.instances.liquidity.destroy();
        
        ChartManager.instances.liquidity = new Chart(ctxLiq, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    { label: 'Inflow', data: totalBurn === 0 ? [0,0,0,0] : [25000, 22000, 30000, 28000], backgroundColor: '#10b981' },
                    { label: 'Outflow', data: totalBurn === 0 ? [0,0,0,0] : [totalBurn/4, totalBurn/4, totalBurn/4, totalBurn/4], backgroundColor: '#ef4444' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, borderRadius: 4 }
        });
    }
};

// --- PAYROLL MODULE ---
const Payroll = {
    renderTable() {
        const tbody = document.getElementById('emp-table-body');
        tbody.innerHTML = '';
        const curr = AppState.settings.currency;

        if (AppState.employees.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No employees registered.</td></tr>`;
            return;
        }

        AppState.employees.forEach(emp => {
            const net = this.calcNetPay(emp);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="ps-4">
                    <div class="d-flex align-items-center gap-2">
                        <div class="bg-soft-blue text-primary rounded-circle d-flex justify-content-center align-items-center" style="width:32px; height:32px; font-size:12px;">
                            ${emp.name.charAt(0)}
                        </div>
                        <div>
                            <div class="fw-bold">${emp.name}</div>
                            <small class="text-muted" style="font-size:11px;">${emp.email}</small>
                        </div>
                    </div>
                </td>
                <td><span class="badge bg-soft-blue text-primary border-0">${emp.role}</span></td>
                <td>${curr}${emp.baseSalary.toLocaleString()}</td>
                <td class="text-success small">+${emp.bonus}% / -${emp.tax}% Tax</td>
                <td class="fw-bold text-primary">${curr}${Math.round(net/12).toLocaleString()}/mo</td>
                <td class="text-end pe-4">
                    <button class="btn btn-sm btn-light border me-1" onclick="Payroll.generatePDF(${emp.id})" title="Download Payslip"><i class="fa-solid fa-file-pdf text-danger"></i></button>
                    <button class="btn btn-sm btn-light border text-danger" onclick="Payroll.delete(${emp.id})"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    },

    calcNetPay(emp) {
        const bonusAmt = emp.baseSalary * (emp.bonus / 100);
        const taxAmt = emp.baseSalary * (emp.tax / 100);
        return emp.baseSalary + bonusAmt - taxAmt;
    },

    calculateTotalCost() {
        return AppState.employees.reduce((sum, emp) => sum + (this.calcNetPay(emp) / 12), 0);
    },

    add(data) {
        AppState.employees.push({ id: Date.now(), ...data });
        AppState.save(); // Saves immediately to LocalStorage
        Swal.fire('Added', `${data.name} added to payroll.`, 'success');
    },

    delete(id) {
        AppState.employees = AppState.employees.filter(e => e.id !== id);
        AppState.save();
    },

    generatePDF(id) {
        const emp = AppState.employees.find(e => e.id === id);
        if(!emp) return;
        const doc = new window.jspdf.jsPDF();
        
        doc.setFillColor(59, 130, 246);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("SPENDEX AI", 15, 25);
        doc.setFontSize(10);
        doc.text("OFFICIAL PAYSLIP", 180, 25, { align: 'right' });

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Employee: ${emp.name}`, 15, 60);
        doc.text(`Role: ${emp.role}`, 15, 68);
        doc.text(`Period: ${dayjs().format('MMMM YYYY')}`, 15, 76);

        const curr = AppState.settings.currency;
        const monthlyBase = emp.baseSalary / 12;
        const net = this.calcNetPay(emp) / 12;

        doc.autoTable({
            startY: 90,
            head: [['Earnings', 'Amount', 'Deductions', 'Amount']],
            body: [
                ['Basic Pay', `${curr}${monthlyBase.toFixed(2)}`, 'Income Tax', `${curr}${(monthlyBase * (emp.tax/100)).toFixed(2)}`],
                ['Bonus', `${curr}${(monthlyBase * (emp.bonus/100)).toFixed(2)}`, 'Other Deductions', `${curr}0.00`],
            ],
            theme: 'grid',
            headStyles: { fillColor: [59, 130, 246] }
        });

        doc.setFontSize(14);
        doc.text(`NET PAYABLE: ${curr}${net.toFixed(2)}`, 15, doc.lastAutoTable.finalY + 20);
        doc.save(`Payslip_${emp.name.replace(/\s+/g, '_')}.pdf`);
    }
};

// --- EXPENSES MODULE ---
const Expenses = {
    initSortable() {
        const el = document.getElementById('expense-list-body');
        Sortable.create(el, { animation: 150, handle: '.drag-handle' });
    },

    renderTable() {
        const tbody = document.getElementById('expense-list-body');
        tbody.innerHTML = '';
        const curr = AppState.settings.currency;

        if (AppState.expenses.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No expenses recorded yet.</td></tr>`;
        } else {
            AppState.expenses.sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(exp => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="text-center text-muted drag-handle" style="cursor:grab"><i class="fa-solid fa-grip-vertical"></i></td>
                    <td>${dayjs(exp.date).format('MMM D, YYYY')}</td>
                    <td class="fw-medium">${exp.desc}</td>
                    <td><span class="badge bg-soft-blue text-primary">${exp.category}</span></td>
                    <td class="text-end fw-bold">${curr}${exp.amount.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                    <td class="text-end"><i class="fa-solid fa-trash text-danger cursor-pointer hover-scale" onclick="Expenses.delete(${exp.id})"></i></td>
                `;
                tbody.appendChild(row);
            });
        }
        this.updateBudgetUI();
    },

    add(data) {
        AppState.expenses.push({ id: Date.now(), ...data });
        AppState.save();
    },

    delete(id) {
        AppState.expenses = AppState.expenses.filter(e => e.id !== id);
        AppState.save();
    },

    updateBudgetUI() {
        const total = AppState.expenses.reduce((sum, e) => sum + e.amount, 0);
        const limit = AppState.settings.budgetLimit;
        const percent = limit > 0 ? Math.min((total / limit) * 100, 100) : 0;
        const curr = AppState.settings.currency;

        document.getElementById('budget-display').innerText = `${curr}${total.toLocaleString()} / ${curr}${limit.toLocaleString()}`;
        const bar = document.getElementById('budget-bar');
        bar.style.width = `${percent}%`;

        const warnEl = document.getElementById('budget-warning');
        
        if(total > limit) {
            bar.className = 'progress-bar bg-danger';
            warnEl.classList.remove('d-none');
            warnEl.innerText = 'Over Budget Limit!';
            UI.showToast('Budget Exceeded', `You have surpassed your monthly budget of ${curr}${limit}.`, 'danger');
        } else if (percent > 85) {
            bar.className = 'progress-bar bg-warning';
            warnEl.classList.remove('d-none');
            warnEl.innerText = 'Approaching Budget Limit!';
            UI.showToast('Budget Warning', `You have consumed ${percent.toFixed(0)}% of your budget.`, 'warning');
        } else {
            bar.className = 'progress-bar bg-success';
            warnEl.classList.add('d-none');
        }
    },

    suggestCategory(desc) {
        const keywords = {
            'Software': ['aws', 'jira', 'slack', 'adobe', 'github', 'subscription', 'license'],
            'Meals': ['lunch', 'dinner', 'coffee', 'starbucks', 'pizza', 'restaurant'],
            'Travel': ['uber', 'lyft', 'hotel', 'flight', 'airbnb', 'taxi'],
            'Marketing': ['ads', 'google', 'facebook', 'promo', 'campaign']
        };
        const lowerDesc = desc.toLowerCase();
        for (const [cat, words] of Object.entries(keywords)) {
            if (words.some(w => lowerDesc.includes(w))) return cat;
        }
        return null;
    }
};

// --- AI MODULE ---
const AI = {
    runAnalysis() {
        const amounts = AppState.expenses.map(e => e.amount).sort((a,b)=>a-b);
        const median = amounts[Math.floor(amounts.length/2)] || 0;
        const threshold = median === 0 ? 1000 : median * 3;

        const anomalies = AppState.expenses.filter(e => e.amount > threshold);
        const list = document.getElementById('anomaly-list');
        list.innerHTML = '';
        const curr = AppState.settings.currency;
        
        if (anomalies.length > 0) {
            anomalies.forEach(a => {
                list.innerHTML += `
                    <div class="alert bg-soft-blue border-0 d-flex justify-content-between align-items-center mb-2">
                        <div><i class="fa-solid fa-bolt text-warning me-2"></i><span class="fw-bold text-dark">${a.desc}</span></div>
                        <span class="text-danger fw-bold">${curr}${a.amount.toLocaleString()}</span>
                    </div>`;
            });
        } else {
            list.innerHTML = `<div class="text-center text-muted p-4"><i class="fa-solid fa-shield-halved text-success mb-2 fs-3"></i><br>No unusual spending detected.</div>`;
        }

        const totalBurn = Payroll.calculateTotalCost() + AppState.expenses.reduce((s,e)=>s+e.amount,0);
        let insight = totalBurn === 0 ? "Add employees or expenses to get AI insights." : 
                      totalBurn > AppState.settings.budgetLimit ? "Warning: Burn rate exceeds budget limits." : 
                      "Spending is healthy and within operational bounds.";
        
        document.getElementById('ai-insight-text').innerText = insight;
    }
};

// --- GLOBAL UI HELPERS ---
const UI = {
    showToast(title, message, type='primary') {
        if(!AppState.settings.notifications) return;
        const container = document.getElementById('toast-container');
        const id = 'toast-' + Date.now();
        container.innerHTML += `
            <div id="${id}" class="toast align-items-center text-bg-${type} border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body"><strong>${title}:</strong> ${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>`;
        setTimeout(() => {
            const el = document.getElementById(id);
            if(el) el.remove();
        }, 4000);
    }
};

window.exportReport = async () => {
    const doc = new window.jspdf.jsPDF('p', 'mm', 'a4');
    const curr = AppState.settings.currency;
    
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("SPENDEX AI - FINANCIAL REPORT", 15, 20);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Generated: ${dayjs().format('MMMM D, YYYY')}`, 15, 40);
    doc.text(`Total Burn: ${curr}${(Payroll.calculateTotalCost() + AppState.expenses.reduce((s,e)=>s+e.amount,0)).toLocaleString()}`, 15, 48);

    const chartNode = document.getElementById('cashFlowChart');
    if (chartNode) {
        try {
            const canvas = await html2canvas(chartNode.parentNode);
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 15, 60, 180, 80);
        } catch(e) { console.error("Could not capture chart", e); }
    }
    doc.save('Spendex_Financial_Report.pdf');
};

// --- DOM EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. LOGIN LOGIC
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Hide Login, Show Main App
        document.getElementById('login-screen').classList.add('d-none');
        document.getElementById('main-app').classList.remove('d-none');
        
        // Boot up the App!
        AppState.init();
        Expenses.initSortable();
    });

    // Logout Helper
    window.logout = () => {
        document.getElementById('main-app').classList.add('d-none');
        document.getElementById('login-screen').classList.remove('d-none');
    };

    // 2. TOGGLES & VIEWS
    document.getElementById('darkModeToggle').addEventListener('change', () => ThemeManager.toggleMode());

    window.switchView = (viewId) => {
        document.querySelectorAll('.view-section').forEach(el => el.classList.add('d-none'));
        document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active-nav'));
        
        const target = document.getElementById(viewId);
        target.classList.remove('d-none');
        
        const links = document.querySelectorAll(`.sidebar a[onclick="switchView('${viewId}')"]`);
        if(links.length) links[0].parentElement.classList.add('active-nav');
        
        anime({ targets: target, opacity: [0, 1], translateY: [15, 0], duration: 400, easing: 'easeOutSine' });
        
        if(viewId === 'dashboard') Dashboard.render();
        if(viewId === 'financial-health') FinancialHealth.render();
        if(viewId === 'settings') {
            document.getElementById('set-name').value = AppState.settings.name;
            document.getElementById('set-email').value = AppState.settings.email;
            document.getElementById('set-budget').value = AppState.settings.budgetLimit;
            document.getElementById('set-currency').value = AppState.settings.currency;
            document.getElementById('set-notifications').checked = AppState.settings.notifications;
        }
    };

    // 3. EXPENSE FORM
    document.getElementById('expense-form').addEventListener('submit', (e) => {
        e.preventDefault();
        Expenses.add({
            amount: parseFloat(document.getElementById('exp-amount').value),
            desc: document.getElementById('exp-desc').value,
            category: document.getElementById('exp-category').value,
            date: document.getElementById('exp-date').value
        });
        e.target.reset();
        document.getElementById('ai-suggestion').classList.add('d-none');
        UI.showToast('Success', 'Expense logged successfully', 'success');
    });

    document.getElementById('exp-desc').addEventListener('input', (e) => {
        const suggestion = Expenses.suggestCategory(e.target.value);
        const badge = document.getElementById('ai-suggestion');
        if(suggestion) {
            badge.classList.remove('d-none');
            document.getElementById('ai-cat-text').innerText = suggestion;
            document.getElementById('exp-category').value = suggestion; 
        } else {
            badge.classList.add('d-none');
        }
    });

    // 4. EMPLOYEE MODAL (Fixed!)
    window.openEmpModal = () => new bootstrap.Modal(document.getElementById('empModal')).show();

    document.getElementById('emp-form').addEventListener('submit', (e) => {
        e.preventDefault();
        Payroll.add({
            name: document.getElementById('emp-name').value,
            role: document.getElementById('emp-role').value,
            email: document.getElementById('emp-email').value,
            joinDate: document.getElementById('emp-join').value,
            baseSalary: parseFloat(document.getElementById('emp-base').value),
            bonus: parseFloat(document.getElementById('emp-bonus').value),
            tax: parseFloat(document.getElementById('emp-tax').value)
        });
        bootstrap.Modal.getInstance(document.getElementById('empModal')).hide();
        e.target.reset();
    });

    // 5. SETTINGS FORMS
    document.getElementById('profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        AppState.settings.name = document.getElementById('set-name').value;
        AppState.settings.email = document.getElementById('set-email').value;
        AppState.save();
        UI.showToast('Updated', 'Profile saved successfully.', 'success');
    });

    document.getElementById('preferences-form').addEventListener('submit', (e) => {
        e.preventDefault();
        AppState.settings.budgetLimit = parseFloat(document.getElementById('set-budget').value);
        AppState.settings.currency = document.getElementById('set-currency').value;
        AppState.settings.notifications = document.getElementById('set-notifications').checked;
        AppState.save();
        UI.showToast('Updated', 'Preferences saved successfully.', 'success');
    });

    // 6. SIMULATOR
    const updateSim = () => {
        const hires = parseInt(document.getElementById('sim-hires').value);
        const salaryInc = parseInt(document.getElementById('sim-salary').value);
        const marketing = parseInt(document.getElementById('sim-marketing').value);

        document.getElementById('sim-hires-val').innerText = hires;
        document.getElementById('sim-salary-val').innerText = salaryInc + '%';
        document.getElementById('sim-marketing-val').innerText = '+$' + marketing;

        let currentBurn = Payroll.calculateTotalCost() + AppState.expenses.reduce((a,b)=>a+b.amount,0);
        currentBurn += (hires * 8000); // 8k avg new hire
        currentBurn *= (1 + salaryInc/100);
        currentBurn += marketing;

        const curr = AppState.settings.currency;
        document.getElementById('sim-result-burn').innerText = `${curr}${Math.round(currentBurn).toLocaleString()}`;
        
        const newRunway = currentBurn > 0 ? (100000 / currentBurn).toFixed(1) : '∞';
        document.getElementById('sim-result-runway').innerText = newRunway + " Mo";
    };
    ['sim-hires', 'sim-salary', 'sim-marketing'].forEach(id => document.getElementById(id).addEventListener('input', updateSim));
});