<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Spendex AI — Intelligent Financial Management</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #050810;
    --bg2: #0a0f1e;
    --bg3: #0f1629;
    --surface: rgba(255,255,255,0.04);
    --surface2: rgba(255,255,255,0.07);
    --border: rgba(255,255,255,0.08);
    --border2: rgba(255,255,255,0.15);
    --accent: #00d4aa;
    --accent2: #0099ff;
    --accent3: #7c3aed;
    --gold: #f59e0b;
    --text: #e8edf5;
    --muted: #7a8899;
    --danger: #ff4d6a;
    --success: #00d4aa;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1.7;
    overflow-x: hidden;
  }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* CANVAS BG */
  #particle-canvas {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0; opacity: 0.35;
  }

  /* LAYOUT */
  .container { max-width: 960px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 2; }
  section { padding: 5rem 0; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    text-align: center; position: relative; padding: 6rem 2rem 4rem;
  }
  .hero-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem; letter-spacing: 0.2em;
    color: var(--accent); text-transform: uppercase;
    opacity: 0; animation: fadeUp 0.8s 0.2s forwards;
    display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem;
  }
  .hero-eyebrow::before, .hero-eyebrow::after {
    content: ''; flex: 1; max-width: 60px;
    height: 1px; background: var(--accent); opacity: 0.4;
  }
  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 800; line-height: 1.05;
    letter-spacing: -0.03em;
    opacity: 0; animation: fadeUp 0.9s 0.4s forwards;
    margin-bottom: 0.5rem;
  }
  .hero-title .word-ai {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-tagline {
    font-size: 1.1rem; color: var(--muted); max-width: 600px;
    opacity: 0; animation: fadeUp 0.9s 0.6s forwards;
    margin-bottom: 2.5rem;
  }
  .hero-badges {
    display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center;
    opacity: 0; animation: fadeUp 0.9s 0.8s forwards;
    margin-bottom: 3rem;
  }
  .badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--surface2); border: 1px solid var(--border2);
    border-radius: 6px; padding: 0.35rem 0.75rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
    color: var(--text); transition: all 0.25s;
  }
  .badge:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .badge .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dot-html { background: #e34f26; }
  .dot-css { background: #1572b6; }
  .dot-js { background: #f7df1e; }
  .dot-bs { background: #7952b3; }
  .dot-mit { background: var(--accent); }

  .hero-cta {
    display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
    opacity: 0; animation: fadeUp 0.9s 1s forwards;
  }
  .btn {
    padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem;
    cursor: pointer; transition: all 0.25s; border: none; display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    color: #000;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,212,170,0.35); }
  .btn-ghost {
    background: var(--surface); border: 1px solid var(--border2); color: var(--text);
  }
  .btn-ghost:hover { background: var(--surface2); border-color: var(--accent); transform: translateY(-2px); }

  .scroll-hint {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: var(--muted); font-size: 0.75rem;
    animation: bounce 2s infinite;
  }
  .scroll-hint svg { opacity: 0.5; }

  /* STATS BAR */
  .stats-bar {
    background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 2.5rem 0;
  }
  .stats-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2rem; text-align: center;
  }
  .stat-item { position: relative; }
  .stat-item:not(:last-child)::after {
    content: ''; position: absolute; right: 0; top: 10%; height: 80%;
    width: 1px; background: var(--border);
  }
  .stat-number {
    font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .stat-label { font-size: 0.8rem; color: var(--muted); margin-top: 0.25rem; }

  /* SECTION HEADERS */
  .section-label {
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent);
    margin-bottom: 0.75rem;
  }
  .section-title {
    font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800; line-height: 1.15; margin-bottom: 1rem;
  }
  .section-desc { color: var(--muted); max-width: 560px; font-size: 0.95rem; }

  /* FEATURES */
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem; margin-top: 3rem;
  }
  .feature-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 1.75rem;
    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative; overflow: hidden;
    opacity: 0; transform: translateY(30px);
  }
  .feature-card.visible { opacity: 1; transform: translateY(0); }
  .feature-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,212,170,0.05) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.35s;
  }
  .feature-card:hover { border-color: rgba(0,212,170,0.3); transform: translateY(-4px); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon {
    width: 44px; height: 44px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; margin-bottom: 1rem;
    background: var(--surface2); border: 1px solid var(--border);
  }
  .feature-title { font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; }
  .feature-desc { color: var(--muted); font-size: 0.875rem; line-height: 1.6; }
  .feature-tag {
    display: inline-block; margin-top: 1rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.68rem;
    color: var(--accent); background: rgba(0,212,170,0.1);
    padding: 0.2rem 0.6rem; border-radius: 4px;
  }

  /* ARCHITECTURE */
  .arch-section { background: var(--bg2); }
  .arch-diagram {
    margin-top: 3rem; background: var(--bg3); border: 1px solid var(--border);
    border-radius: 16px; padding: 2rem; overflow-x: auto;
  }
  .arch-diagram svg { width: 100%; max-width: 820px; display: block; margin: 0 auto; }

  /* TECH STACK */
  .tech-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem; margin-top: 3rem;
  }
  .tech-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.25rem 1.5rem;
    display: flex; align-items: center; gap: 1rem;
    transition: all 0.25s; cursor: default;
    opacity: 0; transform: translateY(20px);
  }
  .tech-card.visible { opacity: 1; transform: translateY(0); }
  .tech-card:hover { border-color: var(--border2); background: var(--surface2); }
  .tech-logo {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0;
    background: var(--surface2); border: 1px solid var(--border);
  }
  .tech-info { min-width: 0; }
  .tech-name { font-weight: 600; font-size: 0.9rem; }
  .tech-role { font-size: 0.75rem; color: var(--muted); }

  /* SETUP */
  .setup-steps { margin-top: 3rem; display: flex; flex-direction: column; gap: 0; }
  .step {
    display: flex; gap: 1.5rem; padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
    opacity: 0; transform: translateX(-20px);
    transition: all 0.5s;
  }
  .step.visible { opacity: 1; transform: translateX(0); }
  .step-num {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    border: 1px solid var(--border2);
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
    color: var(--accent); background: rgba(0,212,170,0.07);
  }
  .step-content { flex: 1; }
  .step-title { font-weight: 600; margin-bottom: 0.4rem; }
  .step-desc { color: var(--muted); font-size: 0.875rem; margin-bottom: 0.75rem; }
  pre {
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: 10px; padding: 1rem 1.25rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem; line-height: 1.7; overflow-x: auto;
    color: var(--text);
  }
  .code-comment { color: var(--muted); }
  .code-string { color: #a3e635; }
  .code-key { color: var(--accent2); }
  .code-cmd { color: var(--accent); }

  /* RBAC TABLE */
  .rbac-table {
    width: 100%; border-collapse: collapse; margin-top: 3rem;
    font-size: 0.875rem;
  }
  .rbac-table th {
    background: var(--bg3); padding: 0.75rem 1rem;
    text-align: left; font-weight: 600; color: var(--muted);
    font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em;
    border-bottom: 1px solid var(--border);
  }
  .rbac-table td {
    padding: 0.85rem 1rem; border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  .rbac-table tr:hover td { background: var(--surface); }
  .pill {
    display: inline-block; padding: 0.2rem 0.65rem; border-radius: 20px;
    font-size: 0.72rem; font-weight: 600;
  }
  .pill-admin { background: rgba(124,58,237,0.15); color: #a78bfa; }
  .pill-hr { background: rgba(0,153,255,0.15); color: #60a5fa; }
  .pill-emp { background: rgba(0,212,170,0.12); color: var(--accent); }
  .check { color: var(--success); }
  .cross { color: var(--danger); }

  /* FOOTER */
  footer {
    background: var(--bg2); border-top: 1px solid var(--border);
    padding: 3rem 0; text-align: center;
  }
  .footer-logo {
    font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 0.75rem;
  }
  .footer-links { display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin: 1.5rem 0; }
  .footer-links a { color: var(--muted); font-size: 0.875rem; transition: color 0.2s; }
  .footer-links a:hover { color: var(--text); text-decoration: none; }
  .footer-copy { color: var(--muted); font-size: 0.8rem; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(5,8,16,0.85); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0.85rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-brand {
    font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .nav-links { display: flex; gap: 2rem; }
  .nav-links a { color: var(--muted); font-size: 0.875rem; transition: color 0.2s; }
  .nav-links a:hover { color: var(--text); text-decoration: none; }

  /* GLOW DIVIDER */
  .glow-line {
    height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0.3; margin: 0;
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .live-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: rgba(0,212,170,0.1); border: 1px solid rgba(0,212,170,0.2);
    border-radius: 20px; padding: 0.3rem 0.75rem;
    font-size: 0.75rem; color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
  }
  .live-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
    animation: pulse-dot 1.5s infinite;
  }
  @media (max-width: 680px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .nav-links { display: none; }
  }

  /* TYPING CURSOR */
  .cursor { display: inline-block; width: 3px; height: 1em; background: var(--accent); margin-left: 3px; vertical-align: middle; animation: blink 1s infinite; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  /* FILE TREE */
  .filetree {
    background: var(--bg3); border: 1px solid var(--border); border-radius: 12px;
    padding: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
    line-height: 2; margin-top: 1.5rem;
  }
  .filetree .dir { color: var(--accent2); }
  .filetree .file { color: var(--muted); }
  .filetree .root { color: var(--text); font-weight: 600; }
  .filetree .comment-ft { color: rgba(122,136,153,0.6); }

  /* ENV TABLE */
  .env-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
  .env-card {
    background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 1rem 1.25rem;
  }
  .env-key { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--accent); margin-bottom: 0.25rem; }
  .env-val { font-size: 0.8rem; color: var(--muted); }

  @media (max-width: 560px) { .env-grid { grid-template-columns: 1fr; } }
</style>
</head>
<body>

<canvas id="particle-canvas"></canvas>

<!-- NAV -->
<nav>
  <span class="nav-brand">⚡ Spendex AI</span>
  <div class="nav-links">
    <a href="#features">Features</a>
    <a href="#stack">Stack</a>
    <a href="#rbac">RBAC</a>
    <a href="#setup">Setup</a>
  </div>
  <a href="https://github.com/YOUR_USERNAME/spendex-ai" class="btn btn-ghost" style="padding:0.45rem 1.2rem;font-size:0.8rem;">GitHub ↗</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-eyebrow">⚡ Intelligent Financial Management Platform</div>
  <h1 class="hero-title">
    Spendex <span class="word-ai">AI</span>
  </h1>
  <p class="hero-tagline">
    Enterprise-grade financial management, payroll handling, and expense tracking in a pure client-side stack — no backend required.
  </p>
  <div class="hero-badges">
    <span class="badge"><span class="dot dot-html"></span>HTML5</span>
    <span class="badge"><span class="dot dot-css"></span>CSS3</span>
    <span class="badge"><span class="dot dot-js"></span>Vanilla JS ES6+</span>
    <span class="badge"><span class="dot dot-bs"></span>Bootstrap 5.3</span>
    <span class="badge"><span class="dot dot-mit"></span>MIT License</span>
    <span class="live-badge"><span class="live-dot"></span>Client-Side Only</span>
  </div>
  <div class="hero-cta">
    <a href="https://github.com/YOUR_USERNAME/spendex-ai" class="btn btn-primary">⬇ Clone Repository</a>
    <a href="#features" class="btn btn-ghost">Explore Features</a>
  </div>

  <div class="scroll-hint">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    scroll
  </div>
</section>

<!-- STATS -->
<div class="stats-bar">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number" data-count="8">0</div>
        <div class="stat-label">Major Feature Modules</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-count="3">0</div>
        <div class="stat-label">RBAC Role Tiers</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-count="0">0</div>
        <div class="stat-label">Backend Dependencies</div>
      </div>
      <div class="stat-item">
        <div class="stat-number" data-count="7">0</div>
        <div class="stat-label">Integrated Libraries</div>
      </div>
    </div>
  </div>
</div>

<div class="glow-line"></div>

<!-- FEATURES -->
<section id="features">
  <div class="container">
    <p class="section-label">// core modules</p>
    <h2 class="section-title">Everything built<br>into the frontend</h2>
    <p class="section-desc">A showcase of advanced Vanilla JavaScript engineering — no backend, no build tools, just the browser.</p>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🔐</div>
        <div class="feature-title">Role-Based Access Control</div>
        <div class="feature-desc">Distinct dashboard views and permissions for Admin, HR Lead, and Employee roles. Each session is isolated, scoped, and enforced client-side.</div>
        <span class="feature-tag">RBAC</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🗄️</div>
        <div class="feature-title">Multi-Tenant Client Database</div>
        <div class="feature-desc">Custom localStorage wrapper simulates isolated backend databases per registered user — full tenant isolation in the browser.</div>
        <span class="feature-tag">localStorage API</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <div class="feature-title">Interactive Analytics</div>
        <div class="feature-desc">Real-time cash flow, burn rate, and financial health score tracking powered by Chart.js with live-updating visualizations.</div>
        <span class="feature-tag">Chart.js</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📋</div>
        <div class="feature-title">Kanban Expense Approvals</div>
        <div class="feature-desc">Drag-and-drop workflow for approving or rejecting corporate expenses. SortableJS-powered columns with state persistence.</div>
        <span class="feature-tag">SortableJS</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🤖</div>
        <div class="feature-title">AI Assistant & OCR Simulation</div>
        <div class="feature-desc">Integrated chatbot for financial queries and a simulated OCR receipt scanner for smart expense entry with auto-field population.</div>
        <span class="feature-tag">AI Simulation</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📈</div>
        <div class="feature-title">Scenario Simulator</div>
        <div class="feature-desc">Adjust hiring plans, salary increments, and marketing budgets to forecast future runway and burn rates dynamically in real-time.</div>
        <span class="feature-tag">Financial Modeling</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📄</div>
        <div class="feature-title">Multi-Page PDF & CSV Export</div>
        <div class="feature-desc">Generates rich formatted corporate financial reports with embedded charts using jsPDF and html2canvas — entirely in-browser.</div>
        <span class="feature-tag">jsPDF + html2canvas</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📧</div>
        <div class="feature-title">Real Email Alerts</div>
        <div class="feature-desc">Integrated with EmailJS for secure password reset links and automated budget-overrun alerts — serverless email delivery.</div>
        <span class="feature-tag">EmailJS</span>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <div class="feature-title">Premium Glassmorphism UI</div>
        <div class="feature-desc">Advanced CSS Glassmorphism, Anime.js page transitions, custom particle canvas background, and a fluid Dark/Light mode toggle.</div>
        <span class="feature-tag">Anime.js</span>
      </div>
    </div>
  </div>
</section>

<div class="glow-line"></div>

<!-- ARCHITECTURE -->
<section id="architecture" class="arch-section">
  <div class="container">
    <p class="section-label">// system design</p>
    <h2 class="section-title">Architecture Overview</h2>
    <p class="section-desc">A layered client-side architecture that mimics enterprise backend patterns entirely in the browser.</p>

    <div class="arch-diagram">
      <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" font-family="'JetBrains Mono', monospace">
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#00d4aa" opacity="0.6"/>
          </marker>
          <marker id="arr2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#0099ff" opacity="0.6"/>
          </marker>
        </defs>

        <!-- Layer Labels -->
        <text x="14" y="68" font-size="9" fill="#7a8899" letter-spacing="2" text-anchor="start">PRESENTATION</text>
        <text x="14" y="195" font-size="9" fill="#7a8899" letter-spacing="2" text-anchor="start">LOGIC</text>
        <text x="14" y="315" font-size="9" fill="#7a8899" letter-spacing="2" text-anchor="start">DATA</text>
        <text x="14" y="395" font-size="9" fill="#7a8899" letter-spacing="2" text-anchor="start">EXTERNAL</text>

        <!-- Presentation Layer -->
        <rect x="120" y="20" width="580" height="85" rx="10" fill="rgba(0,153,255,0.07)" stroke="rgba(0,153,255,0.2)" stroke-width="1"/>
        <!-- UI Boxes -->
        <rect x="138" y="34" width="100" height="58" rx="6" fill="rgba(0,153,255,0.12)" stroke="rgba(0,153,255,0.3)" stroke-width="1"/>
        <text x="188" y="59" font-size="9.5" fill="#60b0ff" text-anchor="middle" font-weight="500">Login</text>
        <text x="188" y="73" font-size="8" fill="#5a8aa0" text-anchor="middle">Auth + RBAC</text>

        <rect x="252" y="34" width="100" height="58" rx="6" fill="rgba(0,153,255,0.12)" stroke="rgba(0,153,255,0.3)" stroke-width="1"/>
        <text x="302" y="59" font-size="9.5" fill="#60b0ff" text-anchor="middle" font-weight="500">Dashboard</text>
        <text x="302" y="73" font-size="8" fill="#5a8aa0" text-anchor="middle">Analytics + KPIs</text>

        <rect x="366" y="34" width="100" height="58" rx="6" fill="rgba(0,153,255,0.12)" stroke="rgba(0,153,255,0.3)" stroke-width="1"/>
        <text x="416" y="59" font-size="9.5" fill="#60b0ff" text-anchor="middle" font-weight="500">Kanban</text>
        <text x="416" y="73" font-size="8" fill="#5a8aa0" text-anchor="middle">Drag-and-Drop</text>

        <rect x="480" y="34" width="100" height="58" rx="6" fill="rgba(0,153,255,0.12)" stroke="rgba(0,153,255,0.3)" stroke-width="1"/>
        <text x="530" y="59" font-size="9.5" fill="#60b0ff" text-anchor="middle" font-weight="500">Simulator</text>
        <text x="530" y="73" font-size="8" fill="#5a8aa0" text-anchor="middle">Scenario Forecast</text>

        <rect x="594" y="34" width="90" height="58" rx="6" fill="rgba(0,153,255,0.12)" stroke="rgba(0,153,255,0.3)" stroke-width="1"/>
        <text x="639" y="59" font-size="9.5" fill="#60b0ff" text-anchor="middle" font-weight="500">Reports</text>
        <text x="639" y="73" font-size="8" fill="#5a8aa0" text-anchor="middle">PDF / CSV</text>

        <!-- Arrows down to Logic Layer -->
        <line x1="410" y1="105" x2="410" y2="140" stroke="#00d4aa" stroke-width="1" stroke-opacity="0.4" marker-end="url(#arr)"/>

        <!-- Logic Layer -->
        <rect x="120" y="140" width="580" height="90" rx="10" fill="rgba(0,212,170,0.05)" stroke="rgba(0,212,170,0.2)" stroke-width="1"/>
        <rect x="138" y="155" width="120" height="60" rx="6" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.25)" stroke-width="1"/>
        <text x="198" y="182" font-size="9.5" fill="#00d4aa" text-anchor="middle" font-weight="500">RBAC Engine</text>
        <text x="198" y="196" font-size="8" fill="#4a9a80" text-anchor="middle">Role / Permission</text>

        <rect x="275" y="155" width="120" height="60" rx="6" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.25)" stroke-width="1"/>
        <text x="335" y="182" font-size="9.5" fill="#00d4aa" text-anchor="middle" font-weight="500">AI Assistant</text>
        <text x="335" y="196" font-size="8" fill="#4a9a80" text-anchor="middle">Query + OCR Sim</text>

        <rect x="412" y="155" width="120" height="60" rx="6" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.25)" stroke-width="1"/>
        <text x="472" y="182" font-size="9.5" fill="#00d4aa" text-anchor="middle" font-weight="500">Export Engine</text>
        <text x="472" y="196" font-size="8" fill="#4a9a80" text-anchor="middle">jsPDF + html2canvas</text>

        <rect x="549" y="155" width="136" height="60" rx="6" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.25)" stroke-width="1"/>
        <text x="617" y="182" font-size="9.5" fill="#00d4aa" text-anchor="middle" font-weight="500">Animation Layer</text>
        <text x="617" y="196" font-size="8" fill="#4a9a80" text-anchor="middle">Anime.js + CountUp</text>

        <!-- Arrows down to Data Layer -->
        <line x1="410" y1="230" x2="410" y2="260" stroke="#00d4aa" stroke-width="1" stroke-opacity="0.4" marker-end="url(#arr)"/>

        <!-- Data Layer -->
        <rect x="120" y="260" width="580" height="75" rx="10" fill="rgba(124,58,237,0.06)" stroke="rgba(124,58,237,0.2)" stroke-width="1"/>
        <rect x="180" y="275" width="150" height="45" rx="6" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.3)" stroke-width="1"/>
        <text x="255" y="298" font-size="9.5" fill="#a78bfa" text-anchor="middle" font-weight="500">localStorage Wrapper</text>
        <text x="255" y="312" font-size="8" fill="#7060a0" text-anchor="middle">Multi-tenant isolation</text>

        <rect x="350" y="275" width="130" height="45" rx="6" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.3)" stroke-width="1"/>
        <text x="415" y="298" font-size="9.5" fill="#a78bfa" text-anchor="middle" font-weight="500">Session Manager</text>
        <text x="415" y="312" font-size="8" fill="#7060a0" text-anchor="middle">JWT-like client tokens</text>

        <rect x="495" y="275" width="145" height="45" rx="6" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.3)" stroke-width="1"/>
        <text x="567" y="298" font-size="9.5" fill="#a78bfa" text-anchor="middle" font-weight="500">Financial State Store</text>
        <text x="567" y="312" font-size="8" fill="#7060a0" text-anchor="middle">Budget / Payroll / Expenses</text>

        <!-- Arrows down to External -->
        <line x1="300" y1="335" x2="300" y2="358" stroke="#0099ff" stroke-width="1" stroke-opacity="0.4" marker-end="url(#arr2)"/>
        <line x1="550" y1="335" x2="550" y2="358" stroke="#0099ff" stroke-width="1" stroke-opacity="0.4" marker-end="url(#arr2)"/>

        <!-- External -->
        <rect x="150" y="358" width="130" height="38" rx="6" fill="rgba(0,153,255,0.08)" stroke="rgba(0,153,255,0.2)" stroke-width="1"/>
        <text x="215" y="374" font-size="9.5" fill="#60b0ff" text-anchor="middle">Chart.js</text>
        <text x="215" y="388" font-size="8" fill="#4a7a90" text-anchor="middle">Data Visualization</text>

        <rect x="300" y="358" width="130" height="38" rx="6" fill="rgba(0,153,255,0.08)" stroke="rgba(0,153,255,0.2)" stroke-width="1"/>
        <text x="365" y="374" font-size="9.5" fill="#60b0ff" text-anchor="middle">SortableJS</text>
        <text x="365" y="388" font-size="8" fill="#4a7a90" text-anchor="middle">Drag-and-Drop</text>

        <rect x="448" y="358" width="130" height="38" rx="6" fill="rgba(0,153,255,0.08)" stroke="rgba(0,153,255,0.2)" stroke-width="1"/>
        <text x="513" y="374" font-size="9.5" fill="#60b0ff" text-anchor="middle">EmailJS</text>
        <text x="513" y="388" font-size="8" fill="#4a7a90" text-anchor="middle">Serverless Alerts</text>

        <rect x="596" y="358" width="88" height="38" rx="6" fill="rgba(0,153,255,0.08)" stroke="rgba(0,153,255,0.2)" stroke-width="1"/>
        <text x="640" y="374" font-size="9.5" fill="#60b0ff" text-anchor="middle">SweetAlert2</text>
        <text x="640" y="388" font-size="8" fill="#4a7a90" text-anchor="middle">Modals</text>
      </svg>
    </div>
  </div>
</section>

<div class="glow-line"></div>

<!-- TECH STACK -->
<section id="stack">
  <div class="container">
    <p class="section-label">// dependencies</p>
    <h2 class="section-title">Full Tech Stack</h2>
    <p class="section-desc">Zero build tools, zero backend. All libraries loaded via CDN. Pure browser engineering.</p>

    <div class="tech-grid">
      <div class="tech-card">
        <div class="tech-logo">📊</div>
        <div class="tech-info">
          <div class="tech-name">Chart.js</div>
          <div class="tech-role">Financial data visualization</div>
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-logo">✨</div>
        <div class="tech-info">
          <div class="tech-name">Anime.js</div>
          <div class="tech-role">UI animations & transitions</div>
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-logo">🔔</div>
        <div class="tech-info">
          <div class="tech-name">SweetAlert2</div>
          <div class="tech-role">Modal popups & alerts</div>
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-logo">🃏</div>
        <div class="tech-info">
          <div class="tech-name">SortableJS</div>
          <div class="tech-role">Drag-and-drop Kanban</div>
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-logo">📄</div>
        <div class="tech-info">
          <div class="tech-name">jsPDF</div>
          <div class="tech-role">Client-side PDF generation</div>
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-logo">🖼️</div>
        <div class="tech-info">
          <div class="tech-name">html2canvas</div>
          <div class="tech-role">Chart embedding in PDF</div>
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-logo">🔢</div>
        <div class="tech-info">
          <div class="tech-name">CountUp.js</div>
          <div class="tech-role">Number counter animations</div>
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-logo">📧</div>
        <div class="tech-info">
          <div class="tech-name">EmailJS</div>
          <div class="tech-role">Serverless email dispatch</div>
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-logo">🅱️</div>
        <div class="tech-info">
          <div class="tech-name">Bootstrap 5.3</div>
          <div class="tech-role">Responsive grid & components</div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="glow-line"></div>

<!-- RBAC -->
<section id="rbac">
  <div class="container">
    <p class="section-label">// access control</p>
    <h2 class="section-title">Role-Based Access Matrix</h2>
    <p class="section-desc">Three distinct role tiers with isolated dashboards, scoped permissions, and enforced view boundaries.</p>

    <table class="rbac-table">
      <thead>
        <tr>
          <th>Module / Feature</th>
          <th><span class="pill pill-admin">Admin</span></th>
          <th><span class="pill pill-hr">HR Lead</span></th>
          <th><span class="pill pill-emp">Employee</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Full Analytics Dashboard</td>
          <td class="check">✔</td>
          <td class="check">✔</td>
          <td>View Only</td>
        </tr>
        <tr>
          <td>Payroll Management</td>
          <td class="check">✔</td>
          <td class="check">✔</td>
          <td class="cross">✘</td>
        </tr>
        <tr>
          <td>Expense Approval (Kanban)</td>
          <td class="check">✔</td>
          <td class="check">✔</td>
          <td>Submit Only</td>
        </tr>
        <tr>
          <td>Scenario Simulator</td>
          <td class="check">✔</td>
          <td class="cross">✘</td>
          <td class="cross">✘</td>
        </tr>
        <tr>
          <td>PDF / CSV Export</td>
          <td class="check">✔</td>
          <td class="check">✔</td>
          <td class="cross">✘</td>
        </tr>
        <tr>
          <td>User Management</td>
          <td class="check">✔</td>
          <td class="cross">✘</td>
          <td class="cross">✘</td>
        </tr>
        <tr>
          <td>Budget Overrun Alerts</td>
          <td class="check">✔</td>
          <td class="check">✔</td>
          <td class="cross">✘</td>
        </tr>
        <tr>
          <td>AI Financial Assistant</td>
          <td class="check">✔</td>
          <td class="check">✔</td>
          <td class="check">✔</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<div class="glow-line"></div>

<!-- SETUP -->
<section id="setup">
  <div class="container">
    <p class="section-label">// getting started</p>
    <h2 class="section-title">Up in 60 seconds</h2>
    <p class="section-desc">No Node.js, no Python, no Docker. Just clone and open — it's pure client-side.</p>

    <div class="setup-steps">
      <div class="step">
        <div class="step-num">01</div>
        <div class="step-content">
          <div class="step-title">Clone the repository</div>
          <div class="step-desc">Grab the source from GitHub using Git or download the ZIP directly.</div>
          <pre><span class="code-cmd">git</span> clone https://github.com/YOUR_USERNAME/spendex-ai.git
<span class="code-cmd">cd</span> spendex-ai</pre>
        </div>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <div class="step-content">
          <div class="step-title">Open with Live Server (recommended)</div>
          <div class="step-desc">Install the Live Server extension in VS Code, then right-click <code style="background:rgba(255,255,255,0.07);padding:0.1rem 0.4rem;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:0.8rem;">index.html</code> → Open with Live Server.</div>
          <pre><span class="code-comment"># Or simply open the file directly</span>
<span class="code-key">open</span> index.html    <span class="code-comment"># macOS</span>
<span class="code-key">start</span> index.html   <span class="code-comment"># Windows</span></pre>
        </div>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <div class="step-content">
          <div class="step-title">Configure EmailJS (optional)</div>
          <div class="step-desc">For real email alerts and password reset functionality, update your EmailJS keys in the config section.</div>
          <pre><span class="code-comment">// js/config.js</span>
<span class="code-key">const</span> EMAILJS_CONFIG = {
  serviceId:  <span class="code-string">"your_service_id"</span>,
  templateId: <span class="code-string">"your_template_id"</span>,
  publicKey:  <span class="code-string">"your_public_key"</span>
};</pre>
        </div>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <div class="step-content">
          <div class="step-title">Register & explore all three roles</div>
          <div class="step-desc">Create accounts with different role assignments on the registration screen to experience the full RBAC system.</div>
          <pre><span class="code-comment"># Default demo credentials (seeded on first load)</span>
Admin   → admin@spendex.ai  /  <span class="code-string">Admin@123</span>
HR Lead → hr@spendex.ai     /  <span class="code-string">Hr@123456</span>
Employee → emp@spendex.ai   /  <span class="code-string">Emp@12345</span></pre>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="glow-line"></div>

<!-- FILE TREE -->
<section>
  <div class="container">
    <p class="section-label">// project structure</p>
    <h2 class="section-title">Directory Layout</h2>
    <div class="filetree">
<span class="root">spendex-ai/</span>
├── <span class="dir">assets/</span>
│   ├── <span class="dir">css/</span>
│   │   ├── <span class="file">main.css</span>             <span class="comment-ft">← glassmorphism + variables</span>
│   │   ├── <span class="file">dashboard.css</span>
│   │   └── <span class="file">animations.css</span>       <span class="comment-ft">← anime.js keyframes</span>
│   ├── <span class="dir">js/</span>
│   │   ├── <span class="file">auth.js</span>              <span class="comment-ft">← RBAC + session management</span>
│   │   ├── <span class="file">db.js</span>               <span class="comment-ft">← localStorage wrapper</span>
│   │   ├── <span class="file">dashboard.js</span>         <span class="comment-ft">← Chart.js + KPI logic</span>
│   │   ├── <span class="file">kanban.js</span>            <span class="comment-ft">← SortableJS drag-drop</span>
│   │   ├── <span class="file">simulator.js</span>         <span class="comment-ft">← scenario forecasting</span>
│   │   ├── <span class="file">ai-assistant.js</span>      <span class="comment-ft">← chatbot + OCR simulation</span>
│   │   ├── <span class="file">export.js</span>            <span class="comment-ft">← jsPDF + html2canvas</span>
│   │   └── <span class="file">config.js</span>            <span class="comment-ft">← EmailJS keys + constants</span>
│   └── <span class="dir">img/</span>
├── <span class="dir">pages/</span>
│   ├── <span class="file">dashboard.html</span>
│   ├── <span class="file">kanban.html</span>
│   ├── <span class="file">payroll.html</span>
│   ├── <span class="file">simulator.html</span>
│   └── <span class="file">reports.html</span>
├── <span class="file">index.html</span>               <span class="comment-ft">← entry point / login</span>
└── <span class="file">README.md</span>
    </div>
  </div>
</section>

<div class="glow-line"></div>

<!-- CONTRIBUTING -->
<section>
  <div class="container">
    <p class="section-label">// contribute</p>
    <h2 class="section-title">Contributing</h2>
    <p class="section-desc" style="margin-bottom:2rem;">Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.</p>
    <div class="setup-steps">
      <div class="step" style="opacity:1;transform:none;">
        <div class="step-num">1</div>
        <div class="step-content">
          <div class="step-title">Fork & branch</div>
          <pre><span class="code-cmd">git</span> checkout -b feature/your-feature-name</pre>
        </div>
      </div>
      <div class="step" style="opacity:1;transform:none;">
        <div class="step-num">2</div>
        <div class="step-content">
          <div class="step-title">Commit with conventional messages</div>
          <pre><span class="code-cmd">git</span> commit -m <span class="code-string">"feat: add dark mode toggle persistence"</span></pre>
        </div>
      </div>
      <div class="step" style="opacity:1;transform:none;">
        <div class="step-num">3</div>
        <div class="step-content">
          <div class="step-title">Push & open a Pull Request</div>
          <pre><span class="code-cmd">git</span> push origin feature/your-feature-name</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">⚡ Spendex AI</div>
  <p style="color:var(--muted);font-size:0.875rem;max-width:500px;margin:0 auto;">
    Built as a showcase of advanced Vanilla JavaScript engineering and modern CSS architectures. No backend required.
  </p>
  <div class="footer-links">
    <a href="https://github.com/YOUR_USERNAME/spendex-ai">GitHub</a>
    <a href="https://github.com/YOUR_USERNAME/spendex-ai/issues">Issues</a>
    <a href="https://github.com/YOUR_USERNAME/spendex-ai/blob/main/LICENSE">MIT License</a>
    <a href="https://github.com/YOUR_USERNAME/spendex-ai/blob/main/CONTRIBUTING.md">Contributing</a>
  </div>
  <p class="footer-copy">Released under the MIT License · Made with ⚡ by YOUR_USERNAME</p>
</footer>

<script>
/* PARTICLE CANVAS */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * 2000, y: Math.random() * 1200,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 0.3 - 0.1,
    alpha: Math.random() * 0.4 + 0.1
  });
}
function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,170,${p.alpha})`;
    ctx.fill();
    p.x += p.vx; p.y += p.vy;
    if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
    if (p.x < 0 || p.x > W) p.vx *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* COUNTER ANIMATION */
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (target === 0) { el.textContent = '0' + suffix; return; }
  let current = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 30);
}
const counters = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: 0.5 });
counters.forEach(c => counterObs.observe(c));

/* SCROLL REVEAL */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), e.target.dataset.delay || 0);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.feature-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
  revealObs.observe(el);
});
document.querySelectorAll('.tech-card').forEach((el, i) => {
  el.dataset.delay = i * 60;
  revealObs.observe(el);
});
document.querySelectorAll('.step').forEach((el, i) => {
  el.dataset.delay = i * 100;
  revealObs.observe(el);
});
</script>
</body>
</html>
