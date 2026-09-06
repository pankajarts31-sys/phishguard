# 🛡️ PhishGuard — Comprehensive Project Documentation & Developer Study Guide

> **Interactive Phishing Simulation & Real-Time Heuristic Detection Platform**  
> Built with **Next.js (App Router)**, **Vanilla CSS / Glassmorphism**, and **Chart.js**.

---

## 📑 Table of Contents
1. [Executive Summary & Problem Statement](#1-executive-summary--problem-statement)
2. [High-Level Architecture & Tech Stack](#2-high-level-architecture--tech-stack)
3. [End-User Guide (Feature-by-Feature)](#3-end-user-guide-feature-by-feature)
4. [Under the Hood: The 18-Point Heuristic Engine](#4-under-the-hood-the-18-point-heuristic-engine)
5. [Complete File-by-File Developer Reference](#5-complete-file-by-file-developer-reference)
6. [Data Structures & State Management](#6-data-structures--state-management)
7. [Automated Testing & Quality Assurance](#7-automated-testing--quality-assurance)
8. [Setup, Run & Deployment Instructions](#8-setup-run--deployment-instructions)

---

## 1. Executive Summary & Problem Statement

### 1.1 The Cybersecurity Problem
Phishing is responsible for over **80% of reported security incidents** worldwide. Traditional defenses rely primarily on **reactive domain blocklists** (such as Google Safe Browsing or browser feeds). However, modern phishing kits use zero-day infrastructure, automated domain generation algorithms (DGAs), Unicode homoglyphs, and brand typosquatting to bypass blocklists during the critical first 4–8 hours of an attack.

Furthermore, traditional employee awareness training consists of boring multiple-choice quizzes that fail to develop practical muscle memory for spotting deception.

### 1.2 The PhishGuard Solution
**PhishGuard** bridges the gap between **active detection** and **practical user education**:
1. **Proactive Heuristic Scanning**: Analyzes raw URLs mathematically across 18 distinct security vectors without relying solely on static blocklists.
2. **Side-by-Side Visual Comparison**: Teaches users how legitimate web pages differ from sophisticated replicas.
3. **Gamified Hands-On Training**: Realistic simulated email inbox triage, URL detective puzzles, and website inspector challenges with streak bonuses and XP tracking.
4. **Live Threat Intelligence Feed**: Real-world threat actors, MITRE ATT&CK tactics, techniques, and procedures (TTPs), and Indicators of Compromise (IOCs).
5. **Interactive Dashboard**: Visualizes training progress and threat distributions using interactive Chart.js charts.

---

## 2. High-Level Architecture & Tech Stack

```
                               ┌───────────────────────────────────────────────┐
                               │                 Client Browser                │
                               │  (Next.js 14/15 React 19 Client Components)   │
                               └───────┬───────────────────────────────┬───────┘
                                       │                               │
                      HTTP / Next.js Routing                   REST API (Fetch)
                                       │                               │
                                       ▼                               ▼
       ┌───────────────────────────────────────────────┐  ┌─────────────────────────┐
       │                 Frontend Pages                │  │    Next.js API Route    │
       │  • /          Landing & Feature Overview      │  │   /api/analyze (POST)   │
       │  • /analyzer  Real-Time URL Scanner           │  │   • In-memory Rate Limit│
       │  • /comparison Side-by-Side Brand Inspector   │  │   • Input Sanitization  │
       │  • /training  3 Gamified Training Modules     │  │   • 18 Heuristic Checks │
       │  • /dashboard Progress & Security Metrics     │  └────────────┬────────────┘
       │  • /threats   Threat Intel & MITRE Mappings   │               │
       │  • /knowledge Articles & Educational Reader   │               │
       └───────────────────────┬───────────────────────┘               │
                               │ Local Storage (Progress & Scans)      │
                               ▼                                       ▼
                       ┌───────────────┐                     ┌───────────────────┐
                       │ Browser Cache │                     │ Heuristics Engine │
                       │ localStorage  │                     │ (heuristics.js)   │
                       └───────────────┘                     └───────────────────┘
```

### 2.1 Core Technologies
| Layer | Technology | Purpose & Rationale |
|---|---|---|
| **Framework** | **Next.js (App Router)** | Full-stack React framework providing hybrid server/client rendering and integrated API endpoints. |
| **Styling** | **Vanilla CSS + Glassmorphism Tokens** | High-performance custom cyber-defense theme (`globals.css`) with glowing cyan/emerald/crimson accents. |
| **Visualizations** | **Chart.js + react-chartjs-2** | Responsive HTML5 canvas charts for vulnerability distribution, user training history, and threat severity. |
| **State & Storage** | **React Hooks + localStorage** | Client-side reactive state with zero-database setup for user scores, badges, and scan histories. |
| **Testing** | **Node.js Automated Test Suite** | 38 automated test cases covering heuristic logic, dataset schemas, and HTTP endpoints. |

---

## 3. End-User Guide (Feature-by-Feature)

### 3.1 🔍 URL & Content Analyzer (`/analyzer`)
- **How to use**:
  1. Navigate to `/analyzer`.
  2. Enter any URL into the search bar (e.g., `http://paypa1-secure.com/signin` or `https://google.com`), or click one of the quick preloaded sample buttons.
  3. Click **"Analyze URL"**.
  4. Review the **0–100 Risk Gauge**:
     - `0–20`: **Safe** (Emerald Green)
     - `21–40`: **Low Risk** (Amber Yellow)
     - `41–60`: **Medium Risk** (Orange)
     - `61–80`: **High Risk** (Crimson Red)
     - `81–100`: **Critical Threat** (Pulsing Dark Red)
  5. Expand the **Failed Checks Breakdown** to see why the URL was flagged (e.g., typosquatting against PayPal, absence of HTTPS, or non-standard port).
  6. Read actionable security recommendations for next steps.

### 3.2 🔄 Side-by-Side Comparison Engine (`/comparison`)
- **How to use**:
  1. Select a brand tab (PayPal, Google, Microsoft, Amazon, Netflix).
  2. Toggle between **"Spot the Difference Mode"** (differences blurred until clicked) and **"Reveal All Mode"**.
  3. Compare the simulated browser address bars, SSL certificate indicators, login form designs, and footer links.
  4. Track your discovery progress as you click each hidden difference.

### 3.3 🎮 Gamified Training Hub (`/training`)
- **Module 1: Email Triage**
  - Read incoming email headers, sender address, urgent call-to-action language, and links.
  - Click **"Mark Safe"** or **"Report Phishing"**.
  - Receive instant feedback explaining the red flags present in the email.
- **Module 2: URL Detective**
  - Inspect 4 similar URLs (e.g., homoglyphs, typosquats, subdomain traps).
  - Select the one legitimate URL.
- **Module 3: Website Inspector**
  - Review an interactive simulated webpage and find all hidden phishing red flags.
- **Gamification Mechanics**:
  - Earn XP points per correct answer.
  - Build answer streaks for bonus multipliers.
  - Unlock 10 unique achievement badges stored in your profile.

### 3.4 📊 Security Analytics Dashboard (`/dashboard`)
- View your **Overall Security Awareness Score (0–100)**.
- Analyze three interactive Chart.js visualizations:
  - **Risk Distribution** (Doughnut chart of Safe vs. Phishing scans).
  - **Skill Improvement Over Time** (Line chart tracking weekly score trends).
  - **Threat Breakdown by Attack Vector** (Bar chart detailing Typosquatting, Credential Harvesting, and Malicious Attachments).
- Review skill proficiency progress bars and recent scan logs.

### 3.5 🚨 Real-Time Threat Intelligence Feed (`/threats`)
- View active global phishing campaigns and IOCs.
- Filter by severity: **Critical**, **High**, **Medium**, or **All**.
- Examine **MITRE ATT&CK TTPs** (e.g., T1566 Phishing, T1598 Spearphishing).
- Expand cards to view affected domains, target industries, and mitigation steps.

### 3.6 📚 Security Knowledge Base (`/knowledge`)
- Read expert cybersecurity articles across categories: Basics, Advanced Attacks, Social Engineering, and Defense Strategies.
- Search articles with the live filter bar.
- Click any article card to open the distraction-free reader view with bulleted takeaways and defensive checklists.

---

## 4. Under the Hood: The 18-Point Heuristic Engine

All heuristics are defined in `src/lib/heuristics.js`. Each check evaluates a specific indicator and returns a score and detailed rationale.

```
Total Risk Score Calculation:
1. Base Percentage = (Σ Check Scores / Σ Possible Weights) × 100
2. Critical Checks Multiplier: If Typosquatting, Homograph, Brand Impersonation, 
   Data URI, or @ Symbol fail, add +25 points per failure (capped at 100).
3. Critical Floor: Any critical check failure guarantees a minimum risk score of 50.
```

### Complete Summary of 18 Heuristic Checks

| # | Check Name | Identifier | Weight | Core Detection Mechanism |
|---|---|---|:---:|---|
| 1 | **Domain Age Simulation** | `domain_age` | 8 | Analyzes pattern regularity; detects excessive numeric strings and randomness typical of newly registered throwaway domains. |
| 2 | **Typosquatting Detection** | `typosquatting` | 10 | Calculates **Levenshtein Distance** against 500+ top brands, normalizes character substitutions (`1→l`, `0→o`, `5→s`, `3→e`), and whitelists legitimate verified brand names. |
| 3 | **Homograph Unicode Attack** | `homograph` | 10 | Detects non-ASCII Cyrillic/Greek homoglyphs (e.g., Cyrillic 'а' `U+0430` instead of Latin 'a') and Punycode (`xn--`) domain prefixes. |
| 4 | **Subdomain Depth** | `subdomains` | 5 | Flags URLs with more than 3 subdomain levels (e.g., `login.verify.security.paypal.com.evil.com`). |
| 5 | **IP Address in URL** | `ip_address` | 8 | Flags raw IPv4 addresses used directly in the hostname instead of a registered domain. |
| 6 | **URL Length Analysis** | `url_length` | 6 | Evaluates character length; URLs exceeding 75 characters receive graded suspicion points. |
| 7 | **HTTPS / SSL Validation** | `https` | 5 | Checks if the scheme is `https://`. Plaintext `http://` transmission is flagged. |
| 8 | **Suspicious TLD Check** | `suspicious_tld` | 5 | Matches domain against high-abuse top-level domains (`.tk`, `.ml`, `.ga`, `.cf`, `.xyz`, `.top`, `.click`, `.buzz`, etc.). |
| 9 | **URL Shortener Detection** | `url_shortener` | 5 | Detects redirection services (`bit.ly`, `tinyurl.com`, `t.co`, `ow.ly`, `is.gd`) that conceal target destinations. |
| 10 | **"@" Symbol Obfuscation** | `at_symbol` | 8 | Identifies `@` in the URL, which causes browsers to ignore all preceding credentials and route to the host following `@`. |
| 11 | **Double Slash Redirect** | `double_slash` | 7 | Detects `//` inside URL path segments, which can cause open-redirect behavior to third-party domains. |
| 12 | **Hex / Percent-Encoding** | `hex_encoding` | 7 | Flags URLs with excessive `%20`, `%3D`, or `%2F` sequences used to obfuscate payload content. |
| 13 | **Non-Standard Port** | `port` | 5 | Flags ports other than standard Web ports 80 and 443 (e.g., `:8080`, `:8888`, `:1337`). |
| 14 | **Dash Count in Domain** | `dashes` | 3 | Flags domains with 3 or more hyphens, a common pattern in phishing domains attempting to mimic real services. |
| 15 | **Suspicious Keywords** | `keywords` | 7 | Scans for urgency/banking keywords (`login`, `signin`, `verify`, `account`, `banking`, `password`, `suspend`, `update`). |
| 16 | **Brand Impersonation** | `brand_impersonation` | 9 | Checks whether well-known brand names are embedded inside subdomains or path segments rather than the root domain. |
| 17 | **Shannon Domain Entropy** | `entropy` | 5 | Calculates the Shannon entropy $H(X) = -\sum P(x_i) \log_2 P(x_i)$ of the domain string. Entropy $> 3.8$ bits indicates an automated DGA domain. |
| 18 | **Data / JavaScript URI** | `data_uri` | 9 | Detects `data:text/html` or `javascript:` URI schemes that execute code directly in the browser context. |

---

## 5. Complete File-by-File Developer Reference

Any developer onboarding onto this codebase can trace every function and layout using this reference map:

### 5.1 Root Configuration
- **[`package.json`](file:///d:/ai%20office/phishguard/package.json)**: Declares project dependencies (`next@16.3.4`, `react@19.2.8`, `chart.js@4.5.1`, `react-chartjs-2@5.3.1`) and npm scripts (`dev`, `build`, `test`, `lint`).
- **[`next.config.mjs`](file:///d:/ai%20office/phishguard/next.config.mjs)**: Next.js build and runtime options.
- **[`eslint.config.mjs`](file:///d:/ai%20office/phishguard/eslint.config.mjs)**: Linting rules and configuration.

### 5.2 Core Libraries (`src/lib/`)
- **[`src/lib/heuristics.js`](file:///d:/ai%20office/phishguard/src/lib/heuristics.js)**:
  - Contains `analyzeURL(urlString)`: Main exported function.
  - Contains `parseURL(urlString)`: Safe URL parsing handling HTTP, HTTPS, and data schemes.
  - Contains `calculateEntropy(str)`: Shannon entropy algorithm.
  - Contains `levenshteinDistance(a, b)`: Dynamic programming edit-distance matrix algorithm.
  - Contains the 18 individual `check*()` heuristic evaluator functions.
- **[`src/lib/challenges.js`](file:///d:/ai%20office/phishguard/src/lib/challenges.js)**:
  - `emailChallenges`: 12 realistic email scenarios with sender headers, urgency indicators, and phishing flags.
  - `urlChallenges`: 8 multiple-choice URL identification puzzles.
  - `inspectorChallenges`: 3 full interactive website inspection scenarios.
  - `comparisonPairs`: 5 brand comparison profiles (PayPal, Google, Microsoft, Amazon, Netflix).
  - `knowledgeArticles`: 6 comprehensive cybersecurity education guides.
  - `threatFeed`: 8 simulated real-time threat intelligence campaigns mapped to MITRE ATT&CK.
  - `achievements`: 10 unlockable achievement badges.

### 5.3 UI Components (`src/components/`)
- **[`src/components/Navbar.jsx`](file:///d:/ai%20office/phishguard/src/components/Navbar.jsx)**:
  - Client component providing top navigation across all 6 modules.
  - Includes active path highlighting, sticky glassmorphic backdrop, brand logo with shield icon, and responsive mobile drawer.
- **[`src/components/Footer.jsx`](file:///d:/ai%20office/phishguard/src/components/Footer.jsx)**:
  - Client component with quick links, cybersecurity disclaimer, and platform status indicators.

### 5.4 Application Routes (`src/app/`)
- **[`src/app/layout.js`](file:///d:/ai%20office/phishguard/src/app/layout.js)**: Root shell layout injecting fonts, metadata, Navbar, and Footer.
- **[`src/app/globals.css`](file:///d:/ai%20office/phishguard/src/app/globals.css)**: Global CSS custom properties, glassmorphism card utilities, glowing borders, custom scrollbar, and keyframe animations.
- **[`src/app/page.js`](file:///d:/ai%20office/phishguard/src/app/page.js)**: Landing page featuring an interactive hero section, live heuristic scan teaser, 6 feature cards, threat statistics, and architecture overview.
- **[`src/app/analyzer/page.js`](file:///d:/ai%20office/phishguard/src/app/analyzer/page.js)**: Full URL scanner interface with real-time heuristic scanning, visual risk gauge meter, collapsible check accordion, and sample test buttons.
- **[`src/app/comparison/page.js`](file:///d:/ai%20office/phishguard/src/app/comparison/page.js)**: Side-by-side website comparison tool supporting "Spot the Difference" and "Reveal All" modes with interactive diff pins.
- **[`src/app/training/page.js`](file:///d:/ai%20office/phishguard/src/app/training/page.js)**: Gamified interactive academy with tabs for Email Triage, URL Detective, and Website Inspector, streak counter, XP bar, and badge achievements.
- **[`src/app/dashboard/page.js`](file:///d:/ai%20office/phishguard/src/app/dashboard/page.js)**: Analytics cockpit integrating Chart.js Doughnut, Line, and Bar charts alongside security score gauges and historical activity feeds.
- **[`src/app/threats/page.js`](file:///d:/ai%20office/phishguard/src/app/threats/page.js)**: Threat Intelligence center with live severity filtering, IOC copy features, search bar, and MITRE ATT&CK tags.
- **[`src/app/knowledge/page.js`](file:///d:/ai%20office/phishguard/src/app/knowledge/page.js)**: Knowledge repository with category filtering, reading time estimates, and modal reader view.
- **[`src/app/api/analyze/route.js`](file:///d:/ai%20office/phishguard/src/app/api/analyze/route.js)**: Next.js Route Handler exposing `POST /api/analyze` with client IP rate-limiting (10 req/min), character limits, and XSS sanitization.

### 5.5 Automated Test Suite (`scripts/`)
- **[`scripts/test_suite.js`](file:///d:/ai%20office/phishguard/scripts/test_suite.js)**: Automated verification script with 38 test assertions covering heuristic checks, dataset validation, and live HTTP endpoint responses.

---

## 6. Data Structures & State Management

### 6.1 Heuristic Result Schema (`analyzeURL`)
```typescript
interface AnalysisResult {
  url: string;
  valid: boolean;
  timestamp: string;
  parsed: {
    protocol: string;
    hostname: string;
    domain: string;
    subdomains: string[];
    path: string;
    tld: string;
    isIP: boolean;
  };
  risk: {
    score: number;      // 0 to 100
    level: 'safe' | 'low' | 'medium' | 'high' | 'critical';
    label: string;
    color: string;
    totalPoints: number;
    maxPoints: number;
  };
  summary: {
    totalChecks: number;
    passed: number;
    failed: number;
    warnings: number;
  };
  checks: Array<{
    id: string;
    name: string;
    description: string;
    weight: number;
    passed: boolean;
    score: number;
    detail: string;
  }>;
  recommendations: Array<{
    type: 'danger' | 'warning' | 'info';
    text: string;
  }>;
}
```

### 6.2 Browser Persistence (`localStorage`)
The application stores user state locally without requiring external database configuration:
- `phishguard_training_stats`: Stores total XP, current streak, highest streak, and completed challenge IDs.
- `phishguard_unlocked_badges`: Array of unlocked achievement IDs.
- `phishguard_scan_history`: List of the last 20 analyzed URLs with timestamps, scores, and classifications.

---

## 7. Automated Testing & Quality Assurance

PhishGuard includes an automated test suite located at `scripts/test_suite.js`.

### How to Run Tests:
```bash
npm test
# OR
node scripts/test_suite.js
```

### Test Coverage (38 Tests Total):
- **Group 1: Benign URL Baseline (12 tests)**
  - Confirms legitimate domains (`google.com`, `paypal.com`, `github.com`, `microsoft.com`) receive safe scores ($\le 25$) and do not trigger false-positive critical alarms.
  - Validates brand whitelist resolution for legitimate services.
- **Group 2: Attack Pattern Heuristics (8 tests)**
  - Validates Typosquatting detection on `paypa1-secure.com` ($\ge 50$ score).
  - Validates Cyrillic Homoglyph detection on `pаypal.com` ($\ge 50$ score).
  - Validates direct IP address detection on `http://192.168.1.100/...`.
  - Validates Subdomain abuse on deeply nested hosts.
  - Validates `data:` scheme detection.
  - Validates Suspicious TLD check on `.tk`.
- **Group 3: Challenge Data & Content Schemas (8 tests)**
  - Confirms data integrity and schema validity for Email challenges, URL challenges, Inspector challenges, Comparison pairs, Knowledge articles, and Threat feeds.
- **Group 4: Server Routes & Live API Endpoints (10 tests)**
  - Verifies HTTP 200 OK responses across all pages (`/`, `/analyzer`, `/comparison`, `/training`, `/dashboard`, `/knowledge`, `/threats`).
  - Verifies `POST /api/analyze` JSON contract, rate limiting, and 18-check response payload.

**Current Test Status**: ✅ **38/38 Tests Passed (100% Success Rate)**.

---

## 8. Setup, Run & Deployment Instructions

### Prerequisites
- Node.js (v18.17.0 or higher recommended)
- npm (v9.0.0 or higher)

### Local Development Setup
1. Open the project folder:
   ```bash
   cd "d:\ai office\phishguard"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the web application:
   - Web App: [http://localhost:3000](http://localhost:3000)
   - Analyzer: [http://localhost:3000/analyzer](http://localhost:3000/analyzer)
   - Training: [http://localhost:3000/training](http://localhost:3000/training)
   - Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Production Build
To create an optimized production build:
```bash
npm run build
npm run start
```

---
*Documentation generated for PhishGuard — Advanced Phishing Detection & Interactive Cybersecurity Education Platform.*
