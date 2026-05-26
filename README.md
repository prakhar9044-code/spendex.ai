<div align="center">

# ⚡ Spendex AI 

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=563D7C&center=true&vCenter=true&width=600&lines=Intelligent+Financial+Management;Role-Based+Access+Control+(RBAC);AI-Driven+Forecasting+Simulations;Drag-and-Drop+Kanban+Approvals)](https://git.io/typing-svg)

**A comprehensive, frontend-heavy SaaS dashboard designed to simulate enterprise-grade financial management, payroll handling, and expense tracking.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

<br/>

*(✏️ Developer Note: Replace this placeholder with an animated GIF of your dashboard in action!)* ![Spendex AI Demo GIF](./assets/demo.gif)

</div>

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Usage Flow](#-usage-flow)
- [License](#-license)

---

## 🌌 About the Project

Built as a showcase of advanced Vanilla JavaScript engineering and modern CSS architectures, **Spendex AI** proves what's possible purely on the client side. 

Featuring a sleek **Glassmorphism** UI fluidly switching between Dark and Light modes, the application simulates a full-stack experience. It utilizes a custom `localStorage` wrapper to act as an isolated client-side database, allowing users to experience a complete, stateful corporate financial suite without needing a backend server.

---

## 🚀 Key Features

* 🔐 **Role-Based Access Control (RBAC):** Distinct dashboard views and data access permissions for `Admin`, `HR Lead`, and standard `Employee` accounts.
* 🗄️ **Multi-Tenant Client Database:** Complex data persistence using a custom `localStorage` wrapper to simulate isolated backend databases for different registered users.
* 📊 **Interactive Analytics:** Real-time visualization of cash flow, burn rate, and financial health scores powered by **Chart.js**.
* 📋 **Kanban Expense Approvals:** A tactile, drag-and-drop workflow for approving or rejecting corporate expenses, implemented via **SortableJS**.
* 🤖 **AI Assistant & OCR Simulation:** Features an integrated chatbot for financial queries and a simulated OCR receipt scanner for smart, automated expense entry.
* 📈 **Scenario Simulator:** A dynamic forecasting tool. Adjust hiring plans, salary increments, and marketing budgets to instantly forecast future runway and burn rates.
* 📄 **Multi-Page Report Exports:** Generate rich, professionally formatted corporate financial reports in PDF and CSV, complete with embedded charts using **jsPDF** and **html2canvas**.
* 📧 **Real Email Alerts:** Live integration with **EmailJS** to dispatch secure password reset links and automated budget-overrun notifications.
* 🎨 **Premium UI/UX:** Stunning CSS Glassmorphism, smooth page transitions powered by **Anime.js**, custom particle canvas backgrounds, and a responsive design.

---

## 🛠️ Tech Stack

<details>
<summary><b>Click to expand full technology stack details</b></summary>
<br>

**Core Languages & Frameworks**
* **HTML5** (Semantic structuring)
* **Custom CSS3** (CSS Variables, Flexbox/Grid, Glassmorphism design system)
* **Vanilla JavaScript** (ES6+, modular architecture)
* **Bootstrap 5.3** (Responsive grid and foundational UI components)

**Libraries & APIs**
* 📊 [Chart.js](https://www.chartjs.org/) - Financial data visualization
* 💫 [Anime.js](https://animejs.com/) - Complex UI animations and page transitions
* 🔔 [SweetAlert2](https://sweetalert2.github.io/) - Beautiful, accessible modal popups and alerts
* 🖱️ [SortableJS](https://sortablejs.github.io/Sortable/) - Drag-and-drop Kanban functionality
* 🖨️ [jsPDF](https://parall.ax/products/jspdf) & [html2canvas](https://html2canvas.hertzen.com/) - Client-side PDF generation
* 🔢 [CountUp.js](https://inorganik.github.io/countUp.js/) - Smooth number counter animations for financial metrics
* ✉️ [EmailJS](https://www.emailjs.com/) - Serverless email dispatch for alerts and auth flows

</details>

---

## 📸 Screenshots

> **Tip:** Hover over the images (if hosted online) or click to expand.

| 🔐 Login & Authentication | 🏠 Main Dashboard |
| :---: | :---: |
| <img src="./assets/login.png" alt="Login Screenshot" width="400"/> | <img src="./assets/dashboard.png" alt="Dashboard Screenshot" width="400"/> |

| 📋 Kanban Approvals | 📈 Scenario Simulator |
| :---: | :---: |
| <img src="./assets/kanban.png" alt="Kanban Screenshot" width="400"/> | <img src="./assets/simulator.png" alt="Simulator Screenshot" width="400"/> |

---

## 💻 Getting Started

Because Spendex AI is built entirely with client-side technologies, setting it up locally is incredibly simple. **No Node.js, Python, or database setup is required!**

### Prerequisites
* A modern web browser (Chrome, Firefox, Edge, Safari)
* A code editor like **VS Code** * The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension (highly recommended for CORS policies and asset loading)

### Installation & Execution

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/spendex-ai.git](https://github.com/YOUR_USERNAME/spendex-ai.git)
