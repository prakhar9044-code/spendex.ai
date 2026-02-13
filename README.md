# ⚡ Spendex AI | Intelligent Financial Management

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

**Spendex AI** is a comprehensive, frontend-heavy SaaS dashboard designed to simulate enterprise-grade financial management, payroll handling, and expense tracking. Built with a sleek **Glassmorphism** UI, it features a fully functional client-side database, Role-Based Access Control (RBAC), drag-and-drop Kanban boards, and AI-driven forecasting simulations.

Created as a showcase of advanced Vanilla JavaScript engineering and modern CSS architectures.

---

## 🚀 Key Features

* 🔐 **Role-Based Access Control (RBAC):** Distinct dashboard views and permissions for `Admin`, `HR Lead`, and `Employee`.
* 🗄️ **Multi-Tenant Client Database:** Utilizes a custom `localStorage` wrapper to simulate isolated backend databases for different registered users.
* 📊 **Interactive Analytics:** Real-time cash flow, burn rate, and financial health score tracking powered by **Chart.js**.
* 📋 **Kanban Expense Approvals:** Drag-and-drop workflow for approving or rejecting corporate expenses using **SortableJS**.
* 🤖 **AI Assistant & OCR Simulation:** Integrated chatbot for financial queries and a simulated OCR receipt scanner for smart expense entry.
* 📈 **Scenario Simulator:** Adjust hiring plans, salary increments, and marketing budgets to forecast future runway and burn rates dynamically.
* 📄 **Multi-Page PDF & CSV Export:** Generates rich, formatted corporate financial reports complete with embedded charts using **jsPDF** and **html2canvas**.
* 📧 **Real Email Alerts:** Integrated with **EmailJS** to send secure password reset links and automated budget-overrun alerts.
* 🎨 **Premium UI/UX:** Advanced CSS Glassmorphism, smooth **Anime.js** transitions, custom particle canvas background, and a fluid Dark/Light mode toggle.

---

## 🛠️ Tech Stack

**Core:** HTML5, Custom CSS3 (CSS Variables, Flexbox/Grid), Vanilla JavaScript (ES6+)  
**Framework:** Bootstrap 5.3  
**Libraries & APIs:**
* [Chart.js](https://www.chartjs.org/) - Financial data visualization
* [Anime.js](https://animejs.com/) - Complex UI animations and page transitions
* [SweetAlert2](https://sweetalert2.github.io/) - Beautiful modal popups and alerts
* [SortableJS](https://sortablejs.github.io/Sortable/) - Drag-and-drop Kanban functionality
* [jsPDF](https://parall.ax/products/jspdf) & [html2canvas](https://html2canvas.hertzen.com/) - Client-side PDF generation
* [CountUp.js](https://inorganik.github.io/countUp.js/) - Number counter animations
* [EmailJS](https://www.emailjs.com/) - Serverless email dispatch

---

## 📸 Screenshots
*(Note: Add your screenshots to an `/assets` folder and update these links)*

| Login & Authentication | Main Dashboard |
| :---: | :---: |
| ![Login Screenshot](placeholder-link-1) | ![Dashboard Screenshot](placeholder-link-2) |

| Kanban Approvals | Scenario Simulator |
| :---: | :---: |
| ![Kanban Screenshot](placeholder-link-3) | ![Simulator Screenshot](placeholder-link-4) |

---

## 💻 Getting Started

Because Spendex AI is built entirely with client-side technologies, setting it up locally is incredibly simple. No Node.js or Python backend required yet!

### Prerequisites
* A modern web browser (Chrome, Firefox, Edge, Safari)
* VS Code with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension (recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/spendex-ai.git](https://github.com/YOUR_USERNAME/spendex-ai.git)
