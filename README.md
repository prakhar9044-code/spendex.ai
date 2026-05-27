<div align="center">

# ⚡ Spendex AI 

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=26&pause=1000&color=00FFFF&center=true&vCenter=true&width=800&lines=Intelligent+Financial+Management;Role-Based+Access+Control+(RBAC);AI-Driven+Forecasting+Simulations;Drag-and-Drop+Kanban+Approvals;AMOLED-Optimized+Dark+Luxury+UI)](https://git.io/typing-svg)

**A comprehensive, frontend-heavy SaaS dashboard designed to simulate enterprise-grade financial management, payroll handling, and expense tracking without a traditional backend.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-00FFFF.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)

<br/>

<!-- ✏️ Developer Note: Replace the src link below with the actual URL of your animated GIF once uploaded to GitHub or an image host! -->
<img src="https://via.placeholder.com/800x450/0a0a0a/00FFFF?text=Spendex+AI+Animated+Demo.gif" alt="Spendex AI Demo GIF" width="800" style="border-radius: 10px; box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);"/>

</div>

---

## 📖 Table of Contents
- [🌌 About the Project](#-about-the-project)
- [🚀 Key Features](#-key-features)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [📂 Project Structure](#-project-structure)
- [📸 Visual Showcase](#-visual-showcase)
- [💻 Getting Started](#-getting-started)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌌 About the Project

Built as a masterclass in advanced Vanilla JavaScript engineering and modern CSS architectures, **Spendex AI** pushes the boundaries of what is possible entirely on the client side. 

The UI features a stunning, state-of-the-art **Glassmorphism** design system wrapped in a dark luxury, AMOLED-optimized aesthetic with electric blue and neon cyan accents. By utilizing a custom-engineered `localStorage` wrapper, the application acts as an isolated client-side database. This allows users to experience a complete, stateful corporate financial suite—complete with real-time data persistence and state management—eliminating the need for a backend server.

---

## 🚀 Key Features

### 🔐 Security & Architecture
* **Role-Based Access Control (RBAC):** Distinct dashboard views, logic pathways, and data access permissions tailored strictly for `Admin`, `HR Lead`, and standard `Employee` accounts.
* **Multi-Tenant Client Database:** Complex data persistence using a custom wrapper to simulate isolated backend databases for different registered users and organizational tenants.

### 📊 Financial Intelligence
* **Interactive Analytics:** Real-time visualization of cash flow, burn rate, and financial health scores powered by **Chart.js** with animated data rendering.
* **Scenario Simulator:** A dynamic, slider-driven forecasting tool. Adjust hiring plans, salary increments, and marketing budgets to instantly calculate and visualize future runway and burn rates.

### 📋 Operations & Workflow
* **Kanban Expense Approvals:** A tactile, drag-and-drop workflow for approving or rejecting corporate expenses. Built with **SortableJS** for zero-latency DOM manipulation.
* **AI Assistant & OCR Simulation:** Features an integrated chatbot for handling complex financial queries and a simulated OCR receipt scanner for smart, automated expense entry.

### 📑 Reporting & Notifications
* **Multi-Page Report Exports:** Generate rich, professionally formatted corporate financial reports in PDF and CSV. Features embedded canvas charts utilizing **jsPDF** and **html2canvas**.
* **Real Email Alerts:** Live integration with **EmailJS** to dispatch secure password reset links and automated budget-overrun notifications directly to user inboxes.

---

## 🛠️ Tech Stack & Architecture

<details>
<summary><b>Click to expand full technology stack details</b></summary>
<br>

**Core Languages & Frameworks**
* **HTML5:** Semantic structuring and accessible DOM elements.
* **Custom CSS3:** CSS Variables, Flexbox/Grid layouts, and a custom Glassmorphism design system optimized for AMOLED displays.
* **Vanilla JavaScript (ES6+):** Modular architecture, class-based state management, and modern asynchronous operations.
* **Bootstrap 5.3:** Responsive grid scaling and foundational UI skeleton.

**Libraries & APIs**
* 📊 **[Chart.js](https://www.chartjs.org/):** Financial data visualization and canvas rendering.
* 💫 **[Anime.js](https://animejs.com/):** Orchestrating complex UI animations, micro-interactions, and smooth page transitions.
* 🔔 **[SweetAlert2](https://sweetalert2.github.io/):** Beautiful, accessible, and theme-matched modal popups.
* 🖱️ **[SortableJS](https://sortablejs.github.io/Sortable/):** Physics-based drag-and-drop Kanban functionality.
* 🖨️ **[jsPDF](https://parall.ax/products/jspdf) & [html2canvas](https://html2canvas.hertzen.com/):** Client-side DOM-to-PDF generation.
* 🔢 **[CountUp.js](https://inorganik.github.io/countUp.js/):** Smooth number counter animations for live financial metrics.
* ✉️ **[EmailJS](https://www.emailjs.com/):** Serverless email dispatch for system alerts and auth flows.

</details>

---

## 📂 Project Structure

```text
📦 spendex-ai
 ┣ 📂 assets
 ┃ ┣ 📂 css
 ┃ ┃ ┣ 📜 main.css         # Global variables & AMOLED themes
 ┃ ┃ ┣ 📜 glass.css        # Glassmorphism utilities
 ┃ ┃ ┗ 📜 animations.css   # Keyframes & Anime.js hooks
 ┃ ┣ 📂 js
 ┃ ┃ ┣ 📜 auth.js          # RBAC & Authentication logic
 ┃ ┃ ┣ 📜 db.js            # Custom localStorage wrapper
 ┃ ┃ ┣ 📜 charts.js        # Chart.js initialization & updates
 ┃ ┃ ┗ 📜 kanban.js        # SortableJS implementation
 ┃ ┣ 📂 img                # Icons and static assets
 ┣ 📜 index.html           # Login & Auth gateway
 ┣ 📜 dashboard.html       # Main application view
 ┗ 📜 README.md
