# 🛡️ PhishGuard

> **Advanced Phishing Detection & Interactive Cybersecurity Education Platform**  
> Built with Next.js 14/15, Glassmorphism CSS, and Chart.js.

[![Test Suite](https://img.shields.io/badge/tests-38%2F38%20passed%20(100%25)-success?style=flat-square)](scripts/test_suite.js)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev)

---

## 📖 Complete Documentation & Developer Study Guide

👉 **[Read the Full Project Study Guide & File-by-File Reference (PROJECT_STUDY_GUIDE.md)](./PROJECT_STUDY_GUIDE.md)**  
*(Contains in-depth explanation of all 18 heuristic algorithms, architecture diagrams, user manuals, and file maps for any developer to study).*

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Tests
```bash
npm test
```
Executes all 38 automated test cases covering heuristic checks, dataset validation, server routes, and API endpoints.

---

## 🚀 Key Features

- **🔍 18-Point Heuristic URL Analyzer (`/analyzer`)**: Real-time evaluation of typosquatting (Levenshtein distance), homograph Unicode attacks, Shannon entropy, raw IP usage, and brand impersonation with a 0–100 risk score gauge.
- **🔄 Side-by-Side Brand Comparison (`/comparison`)**: Real vs. fake inspection cards for PayPal, Google, Microsoft, Amazon, and Netflix with "Spot the Difference" and "Reveal All" modes.
- **🎮 Gamified Training Hub (`/training`)**: Email Triage, URL Detective, and Website Inspector simulations with XP points, streak bonuses, and achievement badges.
- **📊 Security Analytics Dashboard (`/dashboard`)**: Chart.js data visualizations for threat distribution, user improvement trends, and security score meters.
- **🚨 Live Threat Intelligence (`/threats`)**: Real-time campaigns mapped to MITRE ATT&CK tactics, techniques, and procedures (TTPs) and IOCs.
- **📚 Knowledge Base (`/knowledge`)**: Curated cybersecurity defense articles and modal reader.

---

## 📂 Project Structure At A Glance

```
phishguard/
├── src/
│   ├── app/
│   │   ├── analyzer/page.js      # URL Scanner UI
│   │   ├── comparison/page.js    # Side-by-side inspection
│   │   ├── training/page.js      # 3 Simulation learning modules
│   │   ├── dashboard/page.js     # Chart.js analytics cockpit
│   │   ├── threats/page.js       # MITRE Threat Intelligence feed
│   │   ├── knowledge/page.js     # Educational knowledge base
│   │   ├── api/analyze/route.js  # REST API (Rate limited)
│   │   ├── layout.js             # Root shell & Navbar/Footer
│   │   └── page.js               # Landing & Hero overview
│   ├── components/
│   │   ├── Navbar.jsx            # Responsive navigation
│   │   └── Footer.jsx            # Platform footer
│   └── lib/
│       ├── heuristics.js         # 18-point URL heuristic engine
│       └── challenges.js         # Scenarios, brands, articles, threats
├── scripts/
│   └── test_suite.js             # 38 Automated test assertions
├── PROJECT_STUDY_GUIDE.md        # Comprehensive study guide & documentation
└── README.md
```

---
*Developed for Cybersecurity Education & Advanced Threat Prevention.*
