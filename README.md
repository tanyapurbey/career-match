# 🧭 CareerMatch — Smart Internship & Job Recommendation System

<div align="center">

![CareerMatch Banner](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80)

**A Full-Stack Algorithmic Decision-Support Web Application for Design and Analysis of Algorithms (DAA)**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-https%3A%2F%2Fcareer--match--roan.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://career-match-roan.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-https%3A%2F%2Fcareer--match--api--hc5x.onrender.com-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://career-match-api-hc5x.onrender.com)
[![Tests](https://img.shields.io/badge/DAA%20Tests-21%20Passed-10b981?style=for-the-badge&logo=node.js&logoColor=white)](https://github.com/tanyapurbey/career-match)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Prisma-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.prisma.io)

</div>

---

### 🚀 Live Project Links

| Resource | Live Link | Status |
| :--- | :--- | :--- |
| 🌐 **Live Web Application (Frontend)** | [**https://career-match-roan.vercel.app**](https://career-match-roan.vercel.app) | `Online (Vercel)` |
| ⚙️ **Backend REST API Server** | [**https://career-match-api-hc5x.onrender.com**](https://career-match-api-hc5x.onrender.com) | `Online (Render)` |
| 🩺 **API Health Check Endpoint** | [**https://career-match-api-hc5x.onrender.com/api/health**](https://career-match-api-hc5x.onrender.com/api/health) | `{"status":"OK"}` |

---

## 📖 Table of Contents

1. [Project Overview & Problem Statement](#-project-overview--problem-statement)
2. [Core DAA Algorithms & Complexity Analysis](#-core-daa-algorithms--complexity-analysis)
3. [Recommendation Scoring & Eligibility Engine](#-recommendation-scoring--eligibility-engine)
4. [Application Features & Walkthrough](#-application-features--walkthrough)
5. [System Architecture](#-system-architecture)
6. [Tech Stack](#-tech-stack)
7. [Automated Test Suite (21 Tests)](#-automated-test-suite-21-tests)
8. [Local Installation & Setup](#-local-installation--setup)
9. [Deployment Architecture](#-deployment-architecture)
10. [Repository Directory Structure](#-repository-directory-structure)

---

## 🎯 Project Overview & Problem Statement

### The Problem
College students waste dozens of hours every placement season manually scouring through hundreds of internship and job postings that:
- Require skills they have not acquired yet.
- Violate strict academic eligibility cutoffs (minimum CGPA, allowed graduation batches, or specific degree branches).
- Do not match their preferred work mode (Remote, Hybrid, On-site) or stipend expectations.
- Demand excessive preparation effort without considering a student's limited weekly time budget.

### The Solution: CareerMatch
**CareerMatch** is an algorithmic platform designed not simply as a CRUD job board, but as a real-world demonstration of **Design and Analysis of Algorithms (DAA)**. The system transparently computes multi-factor matching scores, evaluates academic eligibility constraints, ranks opportunities using verified algorithms, and solves constrained time-allocation problems through Dynamic Programming.

---

## 🧠 Core DAA Algorithms & Complexity Analysis

All algorithms are implemented **manually from scratch in JavaScript** without relying on built-in utilities like `Array.prototype.sort()` or `String.prototype.includes()`.

| Algorithm | Paradigm | Best Case | Average Case | Worst Case | Space Complexity | Real-World Role in CareerMatch |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Merge Sort** | Divide & Conquer | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Ranks opportunities by relevance score while strictly preserving order stability on equal scores. |
| **Bubble Sort** | Brute Force Exchange | $O(n)$ (early stop) | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Baseline comparator in the Algorithm Lab showing quadratic divergence at scale. |
| **Binary Search** | Decrease & Conquer | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ iterative | Locates stipend cutoffs and bounds salary ranges $[W_{\min}, W_{\max}]$ in $O(\log n)$ time. |
| **Linear Search** | Brute Force Scan | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | Baseline comparator demonstrating operations difference against Binary Search. |
| **Knuth-Morris-Pratt (KMP)** | Finite Automaton / LPS | $O(n + m)$ | $O(n + m)$ | $O(n + m)$ | $O(m)$ | Matches student skills against job descriptions without backtracking text pointers using the LPS array. |
| **Naive String Match** | Brute Force | $O(n)$ | $O(n + m)$ | $O(n \cdot m)$ | $O(1)$ | Baseline comparator on repetitive character sequences. |
| **Greedy Job Selection** | Greedy Heuristic | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Packs applications within weekly time budget using Score-First, Value/Time Ratio, and Urgency heuristics. |
| **0/1 Knapsack DP** | Dynamic Programming | $O(n \cdot W)$ | $O(n \cdot W)$ | $O(n \cdot W)$ | $O(n \cdot W)$ | Computes the globally optimal portfolio of job applications maximizing total score within available weekly hours. |

### Why Greedy Fails for 0/1 Knapsack (Empirical Proof Included)
Consider an applicant with an available preparation capacity of $W = 100 \text{ minutes}$:
- **Job 1:** Value = $90 \text{ pts}$, Weight = $100 \text{ min}$ (Score-First picks this $\rightarrow$ Total: **$90 \text{ pts}$**).
- **Job 2:** Value = $55 \text{ pts}$, Weight = $50 \text{ min}$.
- **Job 3:** Value = $55 \text{ pts}$, Weight = $50 \text{ min}$.

Our **Dynamic Programming (0/1 Knapsack)** solver constructs the full $DP[i][w]$ subproblem matrix, identifies the combination of Job 2 + Job 3, and achieves **$110 \text{ pts}$** ($+20 \text{ pts}$ higher than Greedy). This counterexample is demonstrated live in the **Algorithm Lab**.

---

## 📐 Recommendation Scoring & Eligibility Engine

### 1. Multi-Factor Scoring Formula ($0 - 100$)
Every opportunity is evaluated through a centralized, weighted scoring function:
$$\text{Score} = 0.50 \cdot M_{\text{req}} + 0.15 \cdot M_{\text{pref}} + 0.10 \cdot P_{\text{loc}} + 0.10 \cdot P_{\text{type}} + 0.05 \cdot P_{\text{mode}} + 0.10 \cdot P_{\text{salary}}$$

Where:
- **Required Skills Match ($50\%$):** $\frac{|\text{Student Skills} \cap \text{Job Required Skills}|}{|\text{Job Required Skills}|} \times 100$
- **Preferred Skills Match ($15\%$):** $\frac{|\text{Student Skills} \cap \text{Job Preferred Skills}|}{|\text{Job Preferred Skills}|} \times 100$
- **Location Alignment ($10\%$):** $100 \text{ pts}$ if matching student preference; $20 \text{ pts}$ otherwise.
- **Job Type Alignment ($10\%$):** $100 \text{ pts}$ if matching (Internship, Full-time, Graduate Program); $25 \text{ pts}$ otherwise.
- **Work Mode Alignment ($5\%$):** $100 \text{ pts}$ if matching (Remote, Hybrid, On-site); $30 \text{ pts}$ otherwise.
- **Salary/Stipend Alignment ($10\%$):** Scaled linearly up to $100 \text{ pts}$ against student's minimum stipend target.

### 2. Hard Eligibility Invariant Gate
Before scoring, opportunities pass through strict academic criteria:
- $\text{CGPA}_{\text{student}} \ge \text{CGPA}_{\text{minimum}}$
- $\text{Degree}_{\text{student}} \in \text{EligibleDegrees}_{\text{job}}$
- $\text{GraduationYear}_{\text{student}} \in \text{EligibleBatches}_{\text{job}}$
- $\text{Experience}_{\text{student}} \ge \text{RequiredExperience}_{\text{job}}$

If any requirement fails, the opportunity is clearly tagged as **"Not Eligible"** with the exact reason displayed (e.g. *"Requires CGPA $\ge 8.0$, Current: $7.4$*") and automatically excluded from the Knapsack and Greedy optimization solvers.

---

## 💻 Application Features & Walkthrough

### 1. Personalized Student Dashboard (`/`)
- Personalized greeting with real-time profile data.
- **4 KPI Counters:** Total Available Opportunities ($52$), Algorithmic Recommendations ($18$), Saved Jobs, and Active Applications.
- **Top 5 Recommended Opportunities** ranked with manual Merge Sort with instant "Why Recommended" badges.
- **Application Pipeline Status Chart** (Recharts) showing live distribution across recruitment stages.
- **Market Skill Gap Analysis** comparing student skills against real tech industry demand.

### 2. Discover Jobs with KMP Search (`/discover`)
- Search bar powered by **KMP pattern matching** across titles, descriptions, and tech stacks.
- Multi-parameter filters: Location, Work Mode, Job Type, Min Match Percentage ($40\%, 60\%, 75\%$), and Min Salary.
- Custom sorting: Relevance (Merge Sort), Highest Stipend, Newest Added, and Skill Match %.
- Responsive toggle between **Grid View** and compact **List View**.

### 3. Job Details & Academic Audit (`/jobs/:id`)
- Complete company overview, responsibilities, and stipends.
- Visual skill breakdown: **Matched Skills** (green badges) vs **Missing Skills** (red badges).
- Full academic eligibility report with pass/fail reasons.
- Mathematical breakdown showing point contribution for all 6 scoring factors.
- One-click application tracking dialog with round notes and interview date scheduling.

### 4. Algorithmic Recommendations (`/recommended`)
- Displays opportunities ranked exclusively by the **Merge Sort** engine.
- Shows real-time DAA execution metrics: exact comparison counts and execution time in milliseconds.
- Dynamic explanation badge for every recommendation (*e.g., "Recommended because you match 86% of required skills (Java, SQL, Docker) and prefer Remote internships"*).

### 5. Saved Jobs & Side-by-Side Comparison (`/saved`)
- Bookmarked opportunity portfolio.
- **2-Job Comparison Modal:** Select any two listings to inspect differences in requirements, eligibility, stipend, and score breakdown side-by-side.

### 6. Application Tracker Kanban Board (`/applications`)
- Full drag-and-drop / selector **Kanban Board** with 6 status columns:
  $$\text{Saved} \longrightarrow \text{Applied} \longrightarrow \text{OA} \longrightarrow \text{Interview} \longrightarrow \text{Offer} \longrightarrow \text{Rejected}$$
- Alternate **Table View** with interview schedule dates, round notes, and stage update actions.

### 7. Student Profile & DAA Knapsack Parameters (`/profile`)
- Editable academic credentials: CGPA, Branch, College, Graduation Batch.
- **Categorized Verified Skills Manager:** Add and remove skills across *Programming Languages, Frameworks, Databases, Tools, and Other* with proficiency levels.
- **Available Weekly Hours Input:** Sets the knapsack weight capacity used by the optimization algorithms.

### 8. Interactive DAA Algorithm Lab (`/algorithm-lab`)
Dedicated laboratory for computer science evaluation with 6 interactive tabs:
- **Tab 1 — Sorting:** Run Bubble Sort vs Merge Sort on $N = 100$ to $N = 4,000$ items; inspect comparison counts and execution times.
- **Tab 2 — Searching:** Compare Linear Search ($O(n)$) vs Binary Search ($O(\log n)$) across iterative, recursive, and range search modes.
- **Tab 3 — String Matching:** Live KMP vs Naive search on custom text; visualizes the precomputed **LPS (Longest Proper Prefix which is also Suffix)** array.
- **Tab 4 — Greedy Selection:** Adjust weekly time budget slider ($60 \text{ min}$ to $480 \text{ min}$) and evaluate Strategies A, B, and C.
- **Tab 5 — Dynamic Programming:** Solve 0/1 Knapsack, inspect the rendered 2D subproblem table, and view the optimal opportunity subset.
- **Tab 6 — Performance Benchmarks:** Interactive Recharts graphs plotting measured empirical runtimes against theoretical $O(n \log n)$, $O(n^2)$, and $O(\log n)$ complexity curves.

---

## 🏗️ System Architecture

```text
+-----------------------------------------------------------------------------------------+
|                               REACT (VITE) FRONTEND CLIENT                              |
|  * React 18, Vite, JavaScript, Tailwind CSS, Lucide Icons, Recharts, React Router v6    |
|  * Hosted on Vercel: https://career-match-roan.vercel.app                               |
+-----------------------------------------------------------------------------------------+
                                             | REST APIs (JSON)
                                             v
+-----------------------------------------------------------------------------------------+
|                               EXPRESS.JS BACKEND SERVER                                 |
|  * Node.js, Express Router, CORS, Centralized Error Handling                            |
|  * Hosted on Render: https://career-match-api-hc5x.onrender.com                         |
|  -------------------------------------------------------------------------------------  |
|  CORE DAA ALGORITHM ENGINE:                                                             |
|    - /algorithms/sorting/           -> Merge Sort O(n log n) vs Bubble Sort O(n^2)      |
|    - /algorithms/searching/         -> Binary Search O(log n) vs Linear Search O(n)     |
|    - /algorithms/stringMatching/    -> KMP O(n + m) with LPS vs Naive Match             |
|    - /algorithms/greedy/            -> Greedy Selection (Strategies A, B, C)            |
|    - /algorithms/dynamicProgramming/-> 0/1 Knapsack DP Table with Backtracking          |
|    - /algorithms/scoring/           -> Multi-Factor Scorer & Eligibility Checker        |
+-----------------------------------------------------------------------------------------+
                                             | Prisma ORM
                                             v
+-----------------------------------------------------------------------------------------+
|                             DATABASE LAYER (POSTGRESQL)                                 |
|  * Hosted on Render PostgreSQL Managed Cloud Instance                                   |
|  * Models: Student, Skill, StudentSkill, Job, JobApplication, SavedJob, Preference      |
|  * Seeded with 35 categorized skills, demo student, and 52 realistic job listings       |
+-----------------------------------------------------------------------------------------+
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS (Clean, warm off-white SaaS light theme)
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (Line charts, Bar charts, Area charts)
- **Routing:** React Router DOM v6
- **Hosting:** Vercel

### Backend
- **Runtime:** Node.js v24
- **Framework:** Express.js
- **Architecture:** Controller-Service-Repository Pattern
- **ORM:** Prisma ORM
- **Database:** PostgreSQL (Cloud) / SQLite (Local zero-config fallback)
- **Testing:** Node.js Native Test Runner (`node:test`, `node:assert`)
- **Hosting:** Render

---

## 🧪 Automated Test Suite (21 Tests)

CareerMatch includes a native automated test suite verifying algorithmic correctness and edge cases.

To execute tests:
```bash
cd backend
npm test
```

### Verified Test Results:
```text
▶ DAA Algorithm Test Suite: Sorting Algorithms
  ✔ Merge Sort handles empty dataset
  ✔ Merge Sort handles single element
  ✔ Merge Sort sorts already sorted descending array correctly
  ✔ Merge Sort sorts reverse sorted array correctly
  ✔ Merge Sort maintains stability on duplicate scores
  ✔ Bubble Sort produces identical sorted order to Merge Sort
✔ DAA Algorithm Test Suite: Sorting Algorithms (30.48ms)

▶ DAA Algorithm Test Suite: Searching Algorithms
  ✔ Binary Search (Iterative & Recursive) finds existing target
  ✔ Binary Search reports not found when target does not exist
  ✔ Binary Search finds first element and last element
  ✔ Binary Search Range retrieves exact interval [min, max]
  ✔ Linear Search vs Binary Search yield consistent results
✔ DAA Algorithm Test Suite: Searching Algorithms (5.44ms)

▶ DAA Algorithm Test Suite: String Matching (KMP)
  ✔ KMP computes correct LPS array
  ✔ KMP finds pattern at beginning, middle, and end
  ✔ KMP handles pattern not found
  ✔ KMP handles empty pattern gracefully
  ✔ KMP and Naive Match return identical match indices on repetitive strings
✔ DAA Algorithm Test Suite: String Matching (KMP) (4.38ms)

▶ DAA Algorithm Test Suite: Greedy Job Selection
  ✔ Greedy excludes ineligible jobs
  ✔ Greedy never exceeds time budget
  ✔ Greedy ratio strategy prioritizes higher score-per-minute ratio
✔ DAA Algorithm Test Suite: Greedy Job Selection (1.69ms)

▶ DAA Algorithm Test Suite: Dynamic Programming (0/1 Knapsack)
  ✔ DP Knapsack achieves optimal value where greedy score-first fails
  ✔ DP Knapsack excludes ineligible jobs and handles zero capacity
✔ DAA Algorithm Test Suite: Dynamic Programming (0/1 Knapsack) (1.53ms)

ℹ tests 21 | suites 5 | pass 21 | fail 0 | cancelled 0 | skipped 0 | todo 0
```

---

## 💻 Local Installation & Setup

### Prerequisites
- Node.js v18+ installed
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/tanyapurbey/career-match.git
cd career-match
```

### 2. Backend Setup
```bash
cd backend
npm install

# Setup local database (SQLite zero-config out-of-the-box)
npx prisma db push

# Seed 35 skills, student profile, and 52 synthetic opportunities
node prisma/seed.js

# Start backend server
npm run dev
```
*Backend runs on `http://localhost:5000`*

### 3. Frontend Setup
Open a second terminal window:
```bash
cd frontend
npm install

# Start Vite development server
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🚀 Deployment Architecture

| Service | Cloud Platform | URL |
| :--- | :--- | :--- |
| **Frontend Client** | Vercel | [https://career-match-roan.vercel.app](https://career-match-roan.vercel.app) |
| **Backend REST API** | Render | [https://career-match-api-hc5x.onrender.com](https://career-match-api-hc5x.onrender.com) |
| **PostgreSQL Database** | Render Managed PostgreSQL | Connected via Internal Connection Pool |

### Containerized Deployment (Docker Compose)
The repository contains a turn-key `docker-compose.yml` for self-hosted instances:
```bash
docker compose up -d --build
```

---

## 📁 Repository Directory Structure

```text
career-match/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma            # PostgreSQL Production schema
│   │   ├── schema.sqlite.prisma     # SQLite local development schema
│   │   └── seed.js                  # 35 skills, student, 52 jobs seed script
│   ├── src/
│   │   ├── algorithms/              # PURE DAA ALGORITHM IMPLEMENTATIONS
│   │   │   ├── sorting/             # Merge Sort, Bubble Sort, Comparison
│   │   │   ├── searching/           # Binary Search (Iterative/Recursive), Linear Search
│   │   │   ├── stringMatching/      # KMP (LPS array), Naive Match
│   │   │   ├── greedy/              # Greedy Job Selector (Strategies A, B, C)
│   │   │   ├── dynamicProgramming/  # 0/1 Knapsack DP Table & Backtracker
│   │   │   └── scoring/             # Multi-factor Scorer & Eligibility Engine
│   │   ├── controllers/             # Express route controllers
│   │   ├── routes/                  # REST API endpoints
│   │   ├── services/                # Database query services & benchmarks
│   │   ├── middleware/              # Error handling & CORS
│   │   ├── tests/                   # 21 automated algorithm test cases
│   │   └── app.js                   # Express application entrypoint
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/common/       # Navbar, Sidebar, JobCard, Badge, Modal, Toast
│   │   ├── pages/                   # Dashboard, Discover, Details, Recommended,
│   │   │                            # Saved, Applications (Kanban), AlgorithmLab, Profile
│   │   ├── services/api.js          # REST API Client
│   │   ├── context/AppContext.jsx   # Global student profile state
│   │   ├── App.jsx                  # Persistent layout & routing
│   │   ├── main.jsx                 # Vite root mount
│   │   └── index.css                # Tailwind CSS styling
│   ├── vercel.json                  # SPA routing fallback configuration
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── docs/
│   ├── project-report.md            # Comprehensive Academic Project Report
│   ├── algorithms.md                # Mathematical algorithm specifications
│   ├── complexity-analysis.md       # Asymptotic proofs & empirical benchmarks
│   └── api-documentation.md         # Full REST API documentation
├── docker-compose.yml
├── README.md
└── package.json
```

---

## 📜 Academic Attribution & License

This project was built for the academic course **Design and Analysis of Algorithms (DAA)**.  
Released under the [MIT License](LICENSE).
