# CareerMatch — Smart Internship & Job Recommendation System

[![DAA Project](https://img.shields.io/badge/Course-Design%20and%20Analysis%20of%20Algorithms-indigo.svg)](https://github.com)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black.svg?logo=vercel)](https://career-match-roan.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-46E3B7.svg?logo=render)](https://career-match-api-hc5x.onrender.com/api/health)
[![React](https://img.shields.io/badge/Frontend-React%2018%20+%20Vite%20+%20Tailwind-61dafb.svg)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20+%20Express-339933.svg)](https://nodejs.org)
[![Prisma](https://img.shields.io/badge/ORM-Prisma%20(PostgreSQL%20/%20SQLite)-2D3748.svg)](https://www.prisma.io)
[![Tests](https://img.shields.io/badge/Tests-21%20Passed-emerald.svg)](https://nodejs.org)

---

### 🌐 Live Links

- **Live Application Demo (Frontend):** [https://career-match-roan.vercel.app](https://career-match-roan.vercel.app)
- **Live Backend API Server:** [https://career-match-api-hc5x.onrender.com](https://career-match-api-hc5x.onrender.com)
- **API Health Check Endpoint:** [https://career-match-api-hc5x.onrender.com/api/health](https://career-match-api-hc5x.onrender.com/api/health)

---

**CareerMatch** is an algorithmic decision-support full-stack web application designed as a college **Design and Analysis of Algorithms (DAA)** case study. It replaces naive search and unranked job portals with custom-implemented algorithmic techniques:

- **Divide and Conquer (Merge Sort):** Ranks opportunities by personalized relevance scores in guaranteed $O(n \log n)$ time while maintaining stability.
- **Decrease and Conquer (Binary Search):** Rapidly locates stipend thresholds and filters ranges in $O(\log n)$ operations.
- **Finite Automata (Knuth-Morris-Pratt / KMP):** Performs string matching on job descriptions and student skills in $O(n + m)$ linear time with an LPS preprocessing array.
- **Greedy Heuristics:** Prioritizes opportunities under application-time constraints using Score-First, Value/Time Ratio, and Deadline-Urgency strategies.
- **Dynamic Programming (0/1 Knapsack):** Computes the mathematically optimal portfolio of opportunities that maximizes expected match score within a weekly preparation time budget.
- **Empirical Algorithm Lab:** An interactive benchmark dashboard that plots live asymptotic complexity curves using Recharts.

---

## 🚀 Quick Start Guide (Windows)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (verified on v24.11.1)
- npm v10+

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/tanyapurbey/career-match.git
cd career-match

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

### 2. Setup Database & Seed Data
The project supports both cloud **PostgreSQL** and zero-config local **SQLite** (`backend/prisma/dev.db`).

```bash
cd backend

# Sync Prisma schema
npx prisma db push

# Populate with 35 categorized skills, demo student, and 52 realistic job listings
node prisma/seed.js
cd ..
```

### 3. Run Automated DAA Algorithm Tests
Run the 21 built-in automated test suites verifying all 5 algorithms:
```bash
cd backend
npm test
cd ..
```
*Expected Output: `21 pass, 0 fail`*

### 4. Start the Application Locally
Open two terminal windows:

**Terminal 1 — Backend API Server (Port 5000):**
```bash
cd backend
npm run dev
```
*Backend runs on `http://localhost:5000`*

**Terminal 2 — Frontend React Client (Port 5173):**
```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:5173`*

Open **`http://localhost:5173`** in your browser!

---

## 📊 Core DAA Algorithms & Asymptotic Complexity

| Algorithm | Paradigm | Best Case | Average Case | Worst Case | Space Complexity | Role in CareerMatch |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | Brute Force | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Baseline comparison in Algorithm Lab |
| **Merge Sort** | Divide & Conquer | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Ranks opportunities by relevance score stably |
| **Linear Search** | Linear Scan | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | Baseline comparison in Algorithm Lab |
| **Binary Search** | Decrease & Conquer | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ iterative | Locates stipend cutoffs & salary bounds |
| **Naive String Matching** | Brute Force | $O(n)$ | $O(n + m)$ | $O(n \cdot m)$ | $O(1)$ | Baseline comparison against KMP |
| **KMP Pattern Search** | Finite Automaton / LPS | $O(n + m)$ | $O(n + m)$ | $O(n + m)$ | $O(m)$ (LPS) | Matches student skills against job descriptions |
| **Greedy Job Selection** | Greedy Heuristic | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Packs applications within weekly time budget |
| **0/1 Knapsack DP** | Dynamic Programming | $O(n \cdot W)$ | $O(n \cdot W)$ | $O(n \cdot W)$ | $O(n \cdot W)$ | Finds globally optimal application portfolio |

---

## 🎯 Application Features & Pages

1. **Personalized Dashboard (`/`)**:
   - Dynamic greeting & greeting subtitle
   - KPI counters: Total Opportunities, Recommended for You, Saved, and Applications Active
   - Top 5 ranked jobs with instant "Why Recommended" algorithmic badge
   - Application Pipeline status chart & Market Skill Demand distribution (Recharts)
   - Recently added opportunities feed with "New" badge

2. **Discover Jobs (`/discover`)**:
   - Real-time KMP-backed search bar across titles, companies, required skills, and descriptions
   - Multi-parameter filters: Location, Work Mode, Job Type, Min Match %, and Sort by Merge Sort
   - Toggle between responsive **Grid View** and compact **List View**

3. **Job Details (`/jobs/:id`)**:
   - Complete job overview, responsibilities, and company information
   - Academic eligibility verification: CGPA threshold, eligible degree programs, graduation batches, and required experience
   - Interactive skill breakdown showing matched skills (green chips) vs missing skills (red chips)
   - Detailed formula explanation of the multi-factor score breakdown
   - Quick "Apply Now" dialog with stage tracking & notes

4. **Recommended Jobs (`/recommended`)**:
   - Real-time ranking with custom **Merge Sort**
   - Displays real-time algorithm execution metrics: comparisons count and execution time in milliseconds
   - "Why Recommended" badge explaining the exact percentage of skill match and preference alignment

5. **Saved Jobs & Side-by-Side Comparison (`/saved`)**:
   - Bookmarked opportunities list
   - Select any 2 opportunities to open a modal comparison comparing required skills, salaries, work modes, and relevance scores

6. **Application Tracker (`/applications`)**:
   - Full-featured **Kanban Board** with columns: `Saved` → `Applied` → `OA` → `Interview` → `Offer` → `Rejected`
   - Table view with interview date schedules, round notes, and stage update dropdowns

7. **Student Profile & DAA Parameters (`/profile`)**:
   - Editable academic records: CGPA, Degree, Batch Year, Available Hours per Week
   - Verified skills manager organized by category (*Programming Languages, Frameworks, Databases, Tools, Other*) with proficiency levels

8. **Interactive DAA Algorithm Lab (`/algorithm-lab`)**:
   - **Tab 1 — Sorting:** Run Bubble Sort vs Merge Sort on $N=100$ to $N=5,000$ jobs; inspect comparison counts and execution times
   - **Tab 2 — Searching:** Compare Linear Search vs Binary Search (Iterative, Recursive, and Range search)
   - **Tab 3 — String Matching:** Test KMP pattern matcher against Naive search; view the precomputed LPS array
   - **Tab 4 — Greedy Selection:** Adjust time budget slider (60m to 480m) and compare Strategy A (Highest Score), Strategy B (Score-per-Minute Ratio), and Strategy C (Deadline Urgency)
   - **Tab 5 — Dynamic Programming:** Solve 0/1 Knapsack, inspect the constructed 2D DP matrix table, and compare against Greedy counterexamples
   - **Tab 6 — Performance Analysis:** Live Recharts visualization plotting measured runtimes vs theoretical complexity curves

---

## 📁 Project Directory Structure

```text
career-match/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma            # PostgreSQL / Cloud database schema
│   │   ├── schema.sqlite.prisma     # SQLite local development schema
│   │   ├── seed.js                  # Seed 35 skills, student, 52 jobs
│   │   └── dev.db                   # Local SQLite database
│   ├── src/
│   │   ├── algorithms/
│   │   │   ├── sorting/             # Merge Sort, Bubble Sort, Comparisons
│   │   │   ├── searching/           # Binary Search, Linear Search, Range Search
│   │   │   ├── stringMatching/      # KMP (LPS array) & Naive Match
│   │   │   ├── greedy/              # Greedy Job Selection (Strategies A, B, C)
│   │   │   ├── dynamicProgramming/  # 0/1 Knapsack DP & Backtracking
│   │   │   └── scoring/             # Weighted recommendation & eligibility checker
│   │   ├── controllers/             # Express controllers for all resources
│   │   ├── routes/                  # Express REST routes
│   │   ├── services/                # Database query services & benchmark engine
│   │   ├── middleware/              # Centralized error handler & validation
│   │   ├── config/                  # Prisma client singleton
│   │   ├── tests/                   # 21 automated algorithm test cases
│   │   └── app.js                   # Main Express application entrypoint
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/common/       # Navbar, Sidebar, JobCard, Badge, Modal, Toast
│   │   ├── pages/                   # Dashboard, Discover, Details, Recommended,
│   │   │                            # Saved, Applications, AlgorithmLab, Profile
│   │   ├── services/api.js          # REST API client
│   │   ├── context/AppContext.jsx   # Global student & saved jobs state
│   │   ├── App.jsx                  # React Router setup
│   │   ├── main.jsx                 # Vite root mount
│   │   └── index.css                # Tailwind CSS styling
│   ├── vercel.json                  # SPA routing fallback configuration
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── docs/
│   ├── project-report.md            # Comprehensive academic project report
│   ├── algorithms.md                # Formal DAA algorithm specifications
│   ├── complexity-analysis.md       # Asymptotic proofs & measured benchmarks
│   └── api-documentation.md         # Complete REST API reference
├── docker-compose.yml
├── README.md
└── package.json                     # Root scripts
```

---

## 🗄️ Database: Switching to PostgreSQL

The backend supports PostgreSQL out-of-the-box:
1. Open `backend/.env` and set your connection string:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/careermatch?schema=public"
   ```
2. Run `npx prisma db push` and `node prisma/seed.js`.
*(For local SQLite development, copy `backend/prisma/schema.sqlite.prisma` over `backend/prisma/schema.prisma` and set `DATABASE_URL="file:./dev.db"`)*.

---

## 📜 Academic Attribution & License
Created as a Design and Analysis of Algorithms (DAA) academic project. Licensed under the MIT License.
