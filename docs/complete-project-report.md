# CAREERMATCH — SMART INTERNSHIP & JOB RECOMMENDATION SYSTEM
## A Comprehensive Design and Analysis of Algorithms (DAA) Case-Study Project Report

---

# PRELIMINARY PAGES

### TITLE PAGE
```text
========================================================================================
                                     A PROJECT REPORT
                                            ON
             CAREERMATCH: SMART INTERNSHIP AND JOB RECOMMENDATION SYSTEM
      AN ALGORITHMIC DECISION-SUPPORT FRAMEWORK USING DIVIDE-AND-CONQUER, KMP,
                       GREEDY HEURISTICS, AND DYNAMIC PROGRAMMING
========================================================================================

                 Submitted in partial fulfillment of the requirements
                             for the award of the degree of

                                  BACHELOR OF TECHNOLOGY
                                            IN
                             COMPUTER SCIENCE AND ENGINEERING

                                        Submitted by:
                                  TANYA SHARMA (Roll No: 2026-CSE-042)

                                    Under the Guidance of:
                                   FACULTY OF COMPUTER SCIENCE

                       DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
                         NATIONAL INSTITUTE OF TECHNOLOGY, INDIA
                                       ACADEMIC YEAR
                                         2025–2026
========================================================================================
```

---

### CERTIFICATE OF APPROVAL
```text
This is to certify that the project report titled "CAREERMATCH: SMART INTERNSHIP AND JOB 
RECOMMENDATION SYSTEM", submitted by TANYA SHARMA (Roll No: 2026-CSE-042) in partial 
fulfillment of the requirements for the award of Bachelor of Technology in Computer Science 
and Engineering, is a bonafide record of work carried out under my supervision and guidance.

The results embodied in this report have not been submitted to any other University or 
Institute for the award of any degree or diploma.


_________________________                                    _________________________
   PROJECT SUPERVISOR                                         HEAD OF THE DEPARTMENT
Department of Computer Science                               Department of Computer Science
National Institute of Technology                             National Institute of Technology
```

---

### DECLARATION
```text
I, Tanya Sharma, student of Bachelor of Technology in Computer Science and Engineering at 
National Institute of Technology, hereby declare that the project titled "CAREERMATCH: SMART 
INTERNSHIP AND JOB RECOMMENDATION SYSTEM" is an original work performed by me.

All algorithmic implementations (Merge Sort, Bubble Sort, Binary Search, Knuth-Morris-Pratt 
String Matching, Greedy Job Selection, and 0/1 Knapsack Dynamic Programming) have been 
manually developed in JavaScript from first principles. Theoretical and empirical benchmark 
analyses reflect true measured computations.


Date: November 22, 2026                                              Tanya Sharma
Place: NIT Campus                                                Roll No: 2026-CSE-042
```

---

### ACKNOWLEDGEMENT
```text
I express my deepest gratitude to my Project Supervisor and the Faculty of the Department 
of Computer Science and Engineering for their continuous encouragement, technical guidance, 
and critical evaluation throughout the formulation, mathematical derivation, and implementation 
of the algorithmic modules in this project.

I am also thankful to the Department Head and the Laboratory Technical Staff for providing 
the computational and network infrastructure necessary to develop, test, and benchmark this 
full-stack application. Finally, I extend sincere appreciation to my peers and family for their 
constant support.
```

---

### ABSTRACT
Modern college students waste an excessive amount of preparation and application time navigating fragmented online recruitment portals. Existing commercial platforms primarily employ naive keyword search or unweighted database filtering that fail to evaluate fine-grained skill congruence, overlook academic eligibility restrictions (such as minimum CGPA cutoffs, allowed graduation batches, and degree disciplines), and disregard student weekly preparation time limits.

This report presents **CareerMatch**, an end-to-end algorithmic decision-support web application designed to demonstrate the practical application, mathematical derivation, and empirical benchmarking of classical **Design and Analysis of Algorithms (DAA)** paradigms. 

CareerMatch implements:
1. **Divide-and-Conquer (Merge Sort):** Ranks candidate postings through a deterministic multi-factor scoring function in guaranteed $\Theta(n \log n)$ time while preserving stable ordering across tied scores.
2. **Decrease-and-Conquer (Binary Search):** Formulates iterative, recursive, and boundary range search algorithms ($O(\log n)$) to identify stipend and score thresholds against an $O(n)$ linear search baseline.
3. **Finite Automaton / LPS Preprocessing (Knuth-Morris-Pratt):** Eliminates text pointer backtracking when matching candidate skill tokens against semi-structured job requirements, running in strict linear time $\Theta(n + m)$.
4. **Greedy Heuristics:** Implements three domain-specific approximation strategies (Score-First, Score-per-Minute Ratio, and Deadline Urgency Priority) for packing opportunities into a constrained time budget.
5. **Dynamic Programming (0/1 Knapsack):** Solves the combinatorial application portfolio problem to achieve the globally optimal recommendation score within weekly preparation limits, mathematically exposing the inherent sub-optimality of greedy approaches.

The complete system is realized as a modular full-stack application featuring a React 18 / Tailwind CSS client, a Node.js / Express.js REST API backend, and a cloud-hosted PostgreSQL database managed via Prisma ORM. A dedicated, interactive **Algorithm Lab** provides live parameter control, empirical execution profiling, and Recharts-powered visualization of theoretical complexity curves. Automated verification across 21 unit and integration test suites confirms 100% algorithmic correctness.

---

### TABLE OF CONTENTS

| Chapter | Title | Page No. |
| :--- | :--- | :--- |
| | **Preliminary Pages (Title, Certificate, Declaration, Abstract)** | i – vi |
| | **List of Figures** | vii |
| | **List of Tables** | viii |
| **1** | **Introduction & Problem Definition** | **1** |
| | 1.1 Context and Problem Background | 1 |
| | 1.2 Problem Statement Formulation | 2 |
| | 1.3 Key Project Objectives | 3 |
| | 1.4 Scope and Operational Boundary | 4 |
| | 1.5 Report Organization | 5 |
| **2** | **Literature Survey & Related Work** | **6** |
| | 2.1 Analysis of Existing Commercial Portals | 6 |
| | 2.2 Survey of Information Retrieval & Recommendation Paradigms | 7 |
| | 2.3 Evolution of String Matching Algorithms | 8 |
| | 2.4 Survey of Combinatorial Optimization in Scheduling | 9 |
| | 2.5 Identified Gaps and Scientific Need | 10 |
| **3** | **System Requirements & Feasibility Analysis** | **11** |
| | 3.1 Feasibility Study (Technical, Economic, Operational) | 11 |
| | 3.2 Software Requirements Specification (SRS) | 12 |
| | 3.3 Non-Functional Requirements & Performance Metrics | 13 |
| | 3.4 Hardware, Software, and Environment Configurations | 14 |
| **4** | **System Architecture & System Design** | **15** |
| | 4.1 High-Level Tiered System Architecture | 15 |
| | 4.2 Data Flow Diagrams (Context, Level 1, Level 2 DFDs) | 17 |
| | 4.3 Database Relational Schema & Entity-Relationship Model | 19 |
| | 4.4 System Use-Case and Sequence Workflows | 21 |
| **5** | **Core DAA Algorithmic Formulations** | **22** |
| | 5.1 Multi-Factor Weighted Scoring & Eligibility Engine | 22 |
| | 5.2 Sorting: Divide-and-Conquer (Merge Sort vs. Bubble Sort) | 24 |
| | 5.3 Searching: Decrease-and-Conquer (Binary Search & Range Bounds) | 27 |
| | 5.4 String Matching: Knuth-Morris-Pratt (LPS Array Construction) | 29 |
| | 5.5 Greedy Heuristics for Time-Constrained Selection | 31 |
| | 5.6 Dynamic Programming: 0/1 Knapsack Formulation & Proof of Suboptimality | 33 |
| | 5.7 Comprehensive Asymptotic Complexity Comparison | 36 |
| **6** | **System Implementation & Application Modules** | **37** |
| | 6.1 Backend Modular Service-Controller Architecture | 37 |
| | 6.2 RESTful API Design and Contract Specifications | 39 |
| | 6.3 Frontend Component Architecture and UX Principles | 41 |
| | 6.4 The Interactive Algorithm Lab Module | 43 |
| **7** | **Experimental Results, Benchmarks & Testing** | **44** |
| | 7.1 Automated Algorithmic Verification Test Suite (21 Tests) | 44 |
| | 7.2 Empirical Benchmark Evaluations on Synthetic Datasets | 46 |
| | 7.3 Performance Graphs and Asymptotic Curve Fitting | 48 |
| | 7.4 Application User Interface Walkthrough | 50 |
| **8** | **Conclusion, Limitations & Future Scope** | **52** |
| | 8.1 Summary of Project Contributions | 52 |
| | 8.2 Technical Limitations and Constraints | 53 |
| | 8.3 Future Enhancements and Roadmap | 54 |
| | **References (IEEE Format)** | **55** |
| | **Appendix A: Core Algorithm Source Code** | **57** |
| | **Appendix B: REST API Payload Samples** | **61** |

---

# CHAPTER 1: INTRODUCTION & PROBLEM DEFINITION

## 1.1 Context and Problem Background
In contemporary higher education, university recruitment and campus placement drives constitute pivotal milestones in engineering careers. Every academic year, technology corporations, multinational consulting enterprises, and high-growth startups announce thousands of internship, apprenticeship, and full-time employment vacancies across various communication channels, including institutional placement portals, specialized aggregators (e.g., LinkedIn, Indeed, Glassdoor, Internshala), and decentralized social boards.

Despite the abundance of opportunities, prospective undergraduate applicants encounter severe cognitive and operational bottlenecks during their search process:
1. **High Opportunity Entropy:** Job postings are published with disparate nomenclature, overlapping requirement lists, and unstandardized descriptions. A single role may be indexed as "Backend Developer Intern," "Software Engineer Apprentice," "Junior Java Programmer," or "Cloud Platform Associate."
2. **Eligibility Ambiguity:** Postings enforce strict academic restrictions—such as minimum Cumulative Grade Point Average (CGPA) thresholds (e.g., $\ge 7.5/10.0$ or $\ge 8.0/10.0$), permitted graduation batches (e.g., Class of 2025 vs. Class of 2026), accredited degrees (B.Tech, B.E., M.Tech, MCA), and allowed disciplines (Computer Science, Information Technology, Electronics). In current search systems, applicants frequently review extensive descriptions only to discover at submission that their profile violates a mandatory constraint.
3. **Application Time-Budget Constraints:** The process of applying to opportunities is labor-intensive. Preparing tailored resumes, drafting contextual statements of purpose, and completing initial take-home coding assessments requires substantial time (typically 30 to 90 minutes per vacancy). Undergraduate students juggle ongoing semester coursework, laboratory assignments, and examination preparation, leaving a constrained weekly time budget ($B \approx 15 \text{ to } 20 \text{ hours}$). Applying indiscriminately leads to cognitive burnout and suboptimal submission quality.

## 1.2 Problem Statement Formulation
Formally, let $\mathcal{S}$ denote a Student Profile represented as a tuple:
$$\mathcal{S} = \langle K_S, P_S, C_S, D_S, Y_S, E_S, B_{\text{avail}} \rangle$$
where:
- $K_S = \{s_1, s_2, \dots, s_u\}$ is the set of verified student technical skills.
- $P_S = \langle \text{Loc}_S, \text{Type}_S, \text{Mode}_S, \text{Sal}_{\min} \rangle$ represents student career preferences.
- $C_S \in \mathbb{R}^+$ is the student's verified academic CGPA.
- $D_S$ is the enrolled degree program, $Y_S \in \mathbb{N}$ is the graduation year, and $E_S \in \mathbb{N}$ is years of prior industry experience (typically $0$ for undergraduates).
- $B_{\text{avail}} \in \mathbb{R}^+$ is the total weekly preparation time budget (in minutes).

Let $\mathcal{J} = \{J_1, J_2, \dots, J_N\}$ represent a repository of $N$ available job listings. Each listing $J_k$ is modeled as:
$$J_k = \langle \text{Req}_k, \text{Pref}_k, C_{\min, k}, \mathcal{D}_k, \mathcal{Y}_k, E_{\min, k}, \text{Loc}_k, \text{Type}_k, \text{Mode}_k, W_k, V_k \rangle$$
where:
- $\text{Req}_k$ and $\text{Pref}_k$ are mandatory and preferred skill requirements.
- $C_{\min, k}$, $\mathcal{D}_k$, $\mathcal{Y}_k$, and $E_{\min, k}$ denote minimum CGPA, eligible degrees, graduation batches, and required experience.
- $W_k \in \mathbb{R}^+$ is the estimated preparation effort (weight) in minutes.
- $V_k \in [0, 100]$ is the computed relevance score (value).

**The Computational Objective:**
1. Formulate a multi-factor scoring function $\Phi(\mathcal{S}, J_k) \rightarrow [0, 100]$ and an eligibility predicate $\Psi(\mathcal{S}, J_k) \rightarrow \{0, 1\}$.
2. Sort and rank the subset of eligible listings $\mathcal{J}_{\text{elig}} = \{J_k \in \mathcal{J} \mid \Psi(\mathcal{S}, J_k) = 1\}$ in non-increasing order of relevance score using an asymptotically optimal, stable sorting algorithm.
3. Solve the 0/1 optimization problem: select a subset $\mathcal{X} \subseteq \mathcal{J}_{\text{elig}}$ maximizing the aggregate score $\sum_{J_k \in \mathcal{X}} V_k$ subject to $\sum_{J_k \in \mathcal{X}} W_k \le B_{\text{avail}}$, and contrast the optimal solution against greedy heuristic approximations.

## 1.3 Key Project Objectives
The overarching purpose of CareerMatch is to bridge academic algorithm analysis and production software engineering:
1. **Mathematical Scoring Formulation:** Design a transparent scoring function evaluating required skills ($50\%$), preferred skills ($15\%$), location match ($10\%$), job type ($10\%$), work mode ($5\%$), and stipend target ($10\%$).
2. **Manual Implementation of DAA Concepts:** Implement Merge Sort, Bubble Sort, Binary Search (iterative, recursive, and range), Knuth-Morris-Pratt (KMP), Naive string matching, Greedy job selection, and 0/1 Knapsack Dynamic Programming from first principles without built-in libraries.
3. **Comparative Asymptotic & Empirical Evaluation:** Instrument every algorithm with performance timers and operation counters to empirically validate theoretical Big-O complexity curves.
4. **Interactive Algorithmic Laboratory:** Build an intuitive interface allowing evaluators to adjust input size $N$ and capacity $W$, run live benchmarks, observe reconstructed subproblem matrices, and visualize runtime curves.
5. **Production-Grade Architecture:** Deliver a responsive, full-stack application supporting application pipeline tracking via an interactive Kanban board and PostgreSQL cloud persistence.

## 1.4 Scope and Operational Boundary
The current implementation encompasses:
- Synthetic, highly realistic datasets comprising 52 opportunity postings modeled across 18 leading enterprise companies.
- A standardized skill taxonomy of 35 normalized technologies categorized across Programming Languages, Frameworks, Databases, DevOps Tools, and Core CS.
- Student profile modeling with adjustable weekly hours, CGPA, degree branch, and targeted roles.
- Web deployment on cloud infrastructure (Vercel frontend CDN, Render containerized backend, Render managed PostgreSQL).

*Operational Boundary:* The system operates on structured textual and categorical input. Natural language document tokenization (e.g., raw unstructured PDF resume parsing via Computer Vision/OCR) is outside the primary algorithmic boundary of this DAA case study.

## 1.5 Report Organization
The remainder of this report is organized as follows:
- **Chapter 2** reviews relevant literature across recommendation paradigms, string matching, and combinatorial optimization.
- **Chapter 3** establishes system requirements, operational feasibility, and environmental specifications.
- **Chapter 4** outlines the system architecture, Data Flow Diagrams (DFDs), Entity-Relationship schemas, and sequence flows.
- **Chapter 5** provides detailed mathematical formulations, pseudocode, Master Theorem recurrence proofs, and complexity analyses for the implemented algorithms.
- **Chapter 6** details the implementation architecture, REST API contracts, and user interface design.
- **Chapter 7** presents experimental test suite outputs, measured benchmark comparisons, complexity curves, and application walkthrough screenshots.
- **Chapter 8** concludes the study, examines technical limitations, and charts future research directions.

---

# CHAPTER 2: LITERATURE SURVEY & RELATED WORK

## 2.1 Analysis of Existing Commercial Portals
Commercial employment platforms dominate modern recruitment:
- **LinkedIn Talent Solutions:** Employs large-scale graph databases and learned embeddings. While effective for global professional networking, its ranking algorithms function as proprietary "black boxes," offering no insight into specific scoring metrics or reasons for rejection.
- **Indeed & Glassdoor:** Rely primarily on inverted-index text search (Apache Lucene/Elasticsearch). They excel at keyword queries but struggle with multi-constraint academic criteria, frequently surfacing senior roles requiring 5+ years of experience to undergraduate students.
- **Internshala:** Tailored for Indian collegiate internships, Internshala enforces categorical criteria but lacks time-budget portfolio optimization. Students often apply sequentially without visibility into whether a bundle of applications fits their preparation capacity.

| Platform | Algorithmic Transparency | Hard Academic Eligibility Filters | Time-Budget Portfolio Optimization | Interactive DAA Benchmark Profiling |
| :--- | :--- | :--- | :--- | :--- |
| **LinkedIn** | None (Proprietary Embeddings) | Partial | None | None |
| **Indeed** | Low (BM25 Text Search) | Poor | None | None |
| **Internshala**| Low (Heuristic Matching) | Moderate | None | None |
| **CareerMatch**| **100% Transparent Formula** | **Strict Invariant Gate** | **0/1 Knapsack DP + Greedy** | **Dedicated Live Algorithm Lab** |

## 2.2 Survey of Information Retrieval & Recommendation Paradigms
Recommendation literature broadly falls into three categories:
1. **Collaborative Filtering (CF):** Predicts interest based on historical actions of similar users (user-user or item-item matrix factorization). *Limitation in college recruitment:* Sufers from the severe "cold start" problem because graduating students possess zero historical application records.
2. **Content-Based Filtering (CBF):** Recommends items by matching user attributes with item profiles using cosine similarity over TF-IDF vectors. *Limitation:* Does not natively respect non-negotiable hard inequalities (e.g., student CGPA of 7.4 vs. company cutoff of 8.0).
3. **Constraint-Based Algorithmic Matching (CareerMatch Approach):** Enforces hard eligibility predicates $\Psi$ as binary gates, then computes deterministic weighted relevance scores $\Phi$. This guarantees that no ineligible candidate is ever ranked or recommended.

## 2.3 Evolution of String Matching Algorithms
Pattern matching in unstructured text has been a foundational research area:
- **Brute Force (Naive):** Compares pattern $P[0 \dots m-1]$ across all shifts $0 \le i \le n-m$. Upon mismatch at $P[j]$, it resets the text index to $i - j + 1$, suffering worst-case runtime $\Theta(n \cdot m)$ on repetitive patterns (e.g., text `AAAAAAAAB`, pattern `AAAB`).
- **Rabin-Karp Algorithm:** Computes rolling polynomial hashes. While average-case runtime is $O(n + m)$, hash collisions degrade worst-case performance to $O(n \cdot m)$.
- **Knuth-Morris-Pratt (KMP):** Preprocesses $P$ into a failure function (the LPS array) in $\Theta(m)$ time. By utilizing knowledge of matched prefixes, the text scanning pointer $i$ never retreats, guaranteeing strict linear time $\Theta(n + m)$ under all inputs.
- **Aho-Corasick Automaton:** Generalizes KMP to multi-pattern dictionaries using a Trie structure with failure links. For CareerMatch's single-token skill verification against descriptions, KMP provides the optimal balance of algorithmic purity and low space overhead ($O(m)$ auxiliary space).

## 2.4 Survey of Combinatorial Optimization in Scheduling
The challenge of packing opportunities into a constrained budget is an instance of the classical **Knapsack Problem**:
- **Fractional Knapsack:** Items can be divided arbitrarily. It exhibits the greedy-choice property: sorting by value-to-weight ratio $\rho_k = V_k / W_k$ guarantees an optimal solution in $O(n \log n)$ time.
- **0/1 Knapsack Problem:** Applications are indivisible; one cannot apply to "half" an internship. The problem is NP-complete. However, when capacities are integral, it admits a pseudo-polynomial time dynamic programming solution in $O(n \cdot W)$ time using Bellman's principle of optimality.
- **Greedy Approximations:** In operational environments where full subproblem tables cannot be maintained, heuristics such as Score-First or Ratio-First are commonly adopted, though they lack global optimality guarantees.

## 2.5 Identified Gaps and Scientific Need
Existing literature demonstrates rich theoretical work across individual algorithms, but few frameworks synthesize them into a coherent decision-support tool. CareerMatch directly addresses this gap by combining:
1. Exact string matching (KMP) for skill extraction.
2. Divide-and-conquer sorting (Merge Sort) for candidate ranking.
3. Boundary searching (Binary Range Search) for salary filtering.
4. Combinatorial optimization (0/1 Knapsack DP vs. Greedy) for time-constrained portfolio selection.

---

# CHAPTER 3: SYSTEM REQUIREMENTS & FEASIBILITY ANALYSIS

## 3.1 Feasibility Study
Before engineering CareerMatch, a three-dimensional feasibility evaluation was conducted:

### 3.1.1 Technical Feasibility
The Node.js (V8) runtime offers near-native execution speeds for compute-bound algorithmic operations, and modern JavaScript provides high-resolution microsecond timers (`performance.now()`). The memory footprint required to maintain a $(N+1) \times (W+1)$ DP table with $N=52$ and $W=120$ is less than $1 \text{ MB}$, well within standard browser and Node server bounds. Technical feasibility is fully confirmed.

### 3.1.2 Economic Feasibility
The technology stack relies entirely on open-source software: Node.js, Express, React, Vite, Tailwind CSS, PostgreSQL, and Prisma ORM. Development and production hosting utilize zero-cost hobby tiers (Vercel for frontend edge CDN, Render for backend containerization and managed PostgreSQL), incurring zero capital expenditure.

### 3.1.3 Operational Feasibility
The application targets undergraduate college students and placement officers. The user experience mirrors contemporary SaaS productivity tools with warm, legible typography, low visual clutter, and accessible navigation. No specialized technical training is required to operate the platform.

## 3.2 Software Requirements Specification (SRS)

### 3.2.1 Functional Requirements (FR)
- **FR-1 (Profile Management):** The system shall allow students to maintain verified academic credentials (CGPA, degree, branch, graduation year) and weekly application time budgets.
- **FR-2 (Skill Taxonomy):** The system shall maintain normalized skills categorized across Programming Languages, Frameworks, Databases, DevOps Tools, and Core CS.
- **FR-3 (Opportunity Filtering):** The system shall filter listings across search queries, locations, work modes, job types, and stipend ranges.
- **FR-4 (Algorithmic Ranking):** The system shall rank eligible opportunities using manual Merge Sort with real-time tracking of comparison operations.
- **FR-5 (Application Tracking):** The system shall provide an interactive Kanban board supporting stage transitions: `Saved` $\rightarrow$ `Applied` $\rightarrow$ `OA` $\rightarrow$ `Interview` $\rightarrow$ `Offer` $\rightarrow$ `Rejected`.
- **FR-6 (Algorithm Lab):** The system shall provide interactive simulators for Sorting, Searching, KMP String Matching, Greedy Selection, and Dynamic Programming.

### 3.2.2 Non-Functional Requirements (NFR)
- **NFR-1 (Response Latency):** Scoring and ranking 50+ opportunities shall execute in under $20\text{ ms}$ on the server.
- **NFR-2 (Deterministic Stability):** Equal recommendation scores must preserve their relative insertion order across all sort executions.
- **NFR-3 (Data Integrity):** Candidate applications and saved job records must enforce unique compound foreign key constraints (`studentId`, `jobId`).
- **NFR-4 (Cross-Device Responsiveness):** The user interface shall adapt smoothly across mobile ($<768\text{px}$), tablet, and desktop viewports.

## 3.3 Hardware & Environment Specifications
- **Development Workstation:** AMD Ryzen / Intel Core i5/i7 Processor, 8GB+ RAM, Windows 11 / Linux OS.
- **Server Runtime:** Node.js v24.11+, npm v11.6+.
- **Database Engine:** PostgreSQL v15+ (Production on Render) / SQLite v3 (Local development).
- **Client Runtime:** Modern Evergreen Web Browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) supporting ES6+ and WebGL canvas rendering.

---

# CHAPTER 4: SYSTEM ARCHITECTURE & SYSTEM DESIGN

## 4.1 High-Level Tiered System Architecture
CareerMatch implements a clean Three-Tier Architectural Pattern:
1. **Presentation Tier (Client):** A Single Page Application (SPA) built with React 18, Vite, and Tailwind CSS. State management is handled through React Context API, with data visualizations powered by Recharts.
2. **Application & Logic Tier (Server):** An Express.js application organized following the Controller-Service-Repository pattern. It contains the dedicated DAA Algorithmic Engine (`src/algorithms/`), isolated from HTTP transport logic.
3. **Persistence Tier (Database):** A relational database accessed via Prisma ORM ensuring type-safe SQL query generation, automated migrations, and referential integrity.

```text
+-----------------------------------------------------------------------------------------+
|                                    CLIENT LAYER                                         |
|                          (React 18 + Vite + Tailwind CSS)                               |
|                                                                                         |
|  [Dashboard]   [Discover]   [Job Details]   [Recommended]   [Applications]   [DAA Lab]  |
|      |              |              |              |                |             |      |
|      +--------------+--------------+--------------+----------------+-------------+      |
|                                            |                                            |
|                                   [AppContext & API Client]                             |
+--------------------------------------------|--------------------------------------------+
                                             | HTTPS / REST (JSON)
                                             v
+-----------------------------------------------------------------------------------------+
|                                APPLICATION SERVER LAYER                                 |
|                                   (Node.js + Express)                                   |
|                                                                                         |
|       [Student Routes]   [Job Routes]   [Application Routes]   [Algorithm Routes]       |
|              |                 |                  |                     |               |
|       [Student Controller] [Job Controller] [App Controller]  [Algorithm Controller]    |
|              |                 |                  |                     |               |
|       [Student Service]  [Job Service]      [App Service]     [Benchmark Service]       |
|                                |                                        |               |
|                                v                                        v               |
|                 +-------------------------------------------------------------+         |
|                 |                   CORE DAA ALGORITHM ENGINE                 |         |
|                 |  * Merge Sort O(n log n) vs. Bubble Sort O(n^2)             |         |
|                 |  * Binary Search O(log n) vs. Linear Search O(n)            |         |
|                 |  * KMP String Matcher O(n + m) with LPS Array Construction  |         |
|                 |  * Greedy Job Selector (Strategies A, B, C)                 |         |
|                 |  * 0/1 Knapsack Dynamic Programming with Table Backtracking |         |
|                 |  * Multi-Factor Recommendation Scorer & Eligibility Checker |         |
|                 +-------------------------------------------------------------+         |
+--------------------------------------------|--------------------------------------------+
                                             | Prisma ORM Client
                                             v
+-----------------------------------------------------------------------------------------+
|                                   DATABASE LAYER                                        |
|                       (PostgreSQL Production / SQLite Local)                            |
|                                                                                         |
|      +-------------+        +-------------+        +-------------------------------+    |
|      |   Student   |<------>| StudentSkill|<------>|             Skill             |    |
|      +-------------+        +-------------+        +-------------------------------+    |
|             |                                                                           |
|             +-------------->+-------------+        +-------------------------------+    |
|             |               |  SavedJob   |<------>|              Job              |    |
|             |               +-------------+        +-------------------------------+    |
|             |                                                      |                    |
|             +-------------->+------------------+                   |                    |
|             |               |  JobApplication  |<------------------+                    |
|             |               +------------------+                                        |
|             v                                                                           |
|      +-------------------+                                                              |
|      | StudentPreference |                                                              |
|      +-------------------+                                                              |
+-----------------------------------------------------------------------------------------+
```

## 4.2 Data Flow Diagrams (DFD)

### 4.2.1 Level 0 DFD (Context Diagram)
```text
                     +---------------------------------------+
                     |                                       |
                     |            STUDENT USER               |
                     |                                       |
                     +---------------------------------------+
                        |                                 ^
                        | 1. Profile, Skills, Preferences | 4. Ranked Jobs,
                        |    & Search Filters             |    Visualizations,
                        | 2. Weekly Time Budget           |    DP Optimum &
                        |                                 |    Kanban Status
                        v                                 |
        +-----------------------------------------------------------------+
        |                                                                 |
        |             0. CAREERMATCH RECOMMENDATION SYSTEM                |
        |                                                                 |
        +-----------------------------------------------------------------+
                        |                                 ^
                        | Database Operations             | Raw Relational
                        | & Queries                       | Records
                        v                                 |
                     +---------------------------------------+
                     |                                       |
                     |          POSTGRESQL DATABASE          |
                     |                                       |
                     +---------------------------------------+
```

### 4.2.2 Level 1 DFD (Decomposition of System Processes)
```text
[Student Input]
      |
      v
+-------------+      Raw Job Postings
| Process 1.0 |<------------------------- [Jobs Database]
| Eligibility |
| Verification|
+-------------+
      |
      | Eligible Job Subset (Psi = 1)
      v
+-------------+      Student Skills & Preferences
| Process 2.0 |<--------------------------------- [Student Profile]
| Weighted    |
| Scoring     | (Calculates Phi from 0 to 100 via KMP match)
+-------------+
      |
      | Scored Opportunities
      v
+-------------+
| Process 3.0 |
| Divide &    |---> [Recommended Jobs View] (Sorted Descending)
| Conquer Rank|
+-------------+
      |
      | Ranked Candidates + Weekly Hours Budget
      v
+-------------+
| Process 4.0 |
| Dynamic     |---> [Optimal Portfolio Selection] (Max Total Score)
| Programming |
+-------------+
```

## 4.3 Database Relational Schema & Entity-Relationship Model
The relational database design enforces normalization (3NF) to eliminate data redundancy:
1. **Student:** Primary key `id` (UUID). Stores student credentials (`fullName`, `email`, `cgpa`, `availableHoursPerWeek`).
2. **Skill:** Unique skill `name` and `category` (Programming Languages, Frameworks, Databases, Tools, Other).
3. **StudentSkill:** Association table linking `studentId` and `skillId` with composite primary key and `proficiencyLevel` (`Beginner`, `Intermediate`, `Advanced`).
4. **Job:** Opportunity listings with salary ranges (`salaryMin`, `salaryMax`), eligibility requirements (`minimumCGPA`, `eligibleDegrees`, `eligibleGraduationYears`, `requiredExperience`), and optimization weight (`estimatedApplicationMinutes`).
5. **JobApplication:** Tracks student progress across status states (`Saved`, `Applied`, `OA`, `Interview`, `Offer`, `Rejected`, `Withdrawn`).
6. **SavedJob:** Bookmarked jobs allowing side-by-side comparison.
7. **StudentPreference:** Stores desired locations, job types, work modes, and minimum target salary.

---

# CHAPTER 5: CORE DAA ALGORITHMIC FORMULATIONS

## 5.1 Multi-Factor Weighted Scoring & Eligibility Engine

### 5.1.1 Mathematical Formulation
The recommendation engine evaluates opportunities through a normalized utility metric $\Phi(\mathcal{S}, J) \in [0, 100]$:
$$\Phi(\mathcal{S}, J) = w_1 M_{\text{req}} + w_2 M_{\text{pref}} + w_3 P_{\text{loc}} + w_4 P_{\text{type}} + w_5 P_{\text{mode}} + w_6 P_{\text{sal}}$$

Subject to the convex weighting constraint:
$$\sum_{i=1}^6 w_i = 1.00 \quad \text{where} \quad \begin{cases}
w_1 = 0.50 & (\text{Required Skills}) \\
w_2 = 0.15 & (\text{Preferred Skills}) \\
w_3 = 0.10 & (\text{Location Preference}) \\
w_4 = 0.10 & (\text{Job Type Preference}) \\
w_5 = 0.05 & (\text{Work Mode Preference}) \\
w_6 = 0.10 & (\text{Salary Alignment})
\end{cases}$$

The skill matching components $M_{\text{req}}$ and $M_{\text{pref}}$ are computed as:
$$M_{\text{req}} = \frac{|\mathcal{K}_S \cap \text{Req}_J|}{|\text{Req}_J|} \times 100, \quad M_{\text{pref}} = \frac{|\mathcal{K}_S \cap \text{Pref}_J|}{|\text{Pref}_J|} \times 100$$
If a posting specifies zero preferred skills, $M_{\text{pref}}$ defaults to $100\%$.

Salary alignment $P_{\text{sal}}$ scales proportionally against the student's minimum expected stipend $\text{Sal}_{\min}$:
$$P_{\text{sal}} = \begin{cases}
100 & \text{if } \text{Salary}_{\max, J} \ge \text{Sal}_{\min} \\
\max\left(10, \; \left\lfloor \frac{\text{Salary}_{\max, J}}{\text{Sal}_{\min}} \times 100 \right\rfloor\right) & \text{if } \text{Salary}_{\max, J} < \text{Sal}_{\min}
\end{cases}$$

### 5.1.2 Hard Invariant Eligibility Checking
Unlike soft scoring factors, eligibility constraints are non-negotiable boolean conditions:
$$\Psi(\mathcal{S}, J) = \mathbb{I}(C_S \ge C_{\min, J}) \land \mathbb{I}(D_S \in \mathcal{D}_J) \land \mathbb{I}(Y_S \in \mathcal{Y}_J) \land \mathbb{I}(E_S \ge E_{\min, J})$$
Where $\mathbb{I}(\cdot)$ is the indicator function. If $\Psi(\mathcal{S}, J) = 0$, the listing is marked as **Not Eligible**, displays the exact failure rationale to the student, and is excluded from the knapsack optimizer.

---

## 5.2 Sorting: Divide-and-Conquer (Merge Sort vs. Bubble Sort)

### 5.2.1 Merge Sort Specification
Merge Sort follows the classic Divide-and-Conquer paradigm:
1. **Divide:** Compute midpoint $q = \lfloor (p + r) / 2 \rfloor$.
2. **Conquer:** Recursively solve subarrays $A[p \dots q]$ and $A[q+1 \dots r]$.
3. **Combine:** Merge the two sorted sequences into a unified array.

To guarantee **stability** (preserving relative order when scores are identical), the merge procedure selects the left element whenever $A_{\text{left}}[i].\text{score} \ge A_{\text{right}}[j].\text{score}$ during descending sorting passes.

### 5.2.2 Recurrence Relation & Master Theorem Proof
The runtime recurrence for Merge Sort on input size $n$ is:
$$T(n) = \begin{cases}
\Theta(1) & \text{if } n = 1 \\
2T(n/2) + \Theta(n) & \text{if } n > 1
\end{cases}$$

Applying the **Master Theorem** for recurrences of the form $T(n) = aT(n/b) + f(n)$:
- Here, $a = 2, b = 2$, and $f(n) = \Theta(n)$.
- Critical exponent: $\log_b a = \log_2 2 = 1$.
- Since $f(n) = \Theta(n^1) = \Theta(n^{\log_b a})$, **Case 2 of the Master Theorem applies**.
- Therefore:
  $$T(n) = \Theta(n^{\log_b a} \log n) = \Theta(n \log n)$$

This bound holds universally for Best, Average, and Worst cases because the array is divided strictly in half regardless of initial element permutations.

### 5.2.3 Bubble Sort Formulation (Baseline Comparator)
Bubble Sort repeatedly steps through the list, comparing adjacent items and swapping them if out of order. With the standard early-exit optimization (`swapped` flag):
- **Best Case:** $\Theta(n)$ comparisons when the array is already sorted.
- **Worst & Average Case:** $\sum_{i=1}^{n-1} (n - i) = \frac{n(n-1)}{2} = \Theta(n^2)$ comparisons and swaps.

---

## 5.3 Searching: Decrease-and-Conquer (Binary Search & Range Bounds)

### 5.3.1 Iterative and Recursive Binary Search
Given a pre-sorted array $A$ of salaries, Binary Search halves the active search domain at each comparison:
- Midpoint: $mid = \lfloor (low + high) / 2 \rfloor$.
- If $A[mid] = \text{target}$, return index.
- If $A[mid] < \text{target}$, set $low = mid + 1$.
- Else, set $high = mid - 1$.

Recurrence relation: $T(n) = T(n/2) + \Theta(1) \implies T(n) = \Theta(\log n)$.

### 5.3.2 Binary Range Search Algorithm
In job discovery, students frequently search for opportunities within a salary band $[W_{\min}, W_{\max}]$. Rather than scanning linearly ($O(n)$), CareerMatch executes two logarithmic searches:
1. **Lower Bound Search ($O(\log n)$):** Find the minimum index $i$ such that $A[i].\text{salary} \ge W_{\min}$.
2. **Upper Bound Search ($O(\log n)$):** Find the maximum index $j$ such that $A[j].\text{salary} \le W_{\max}$.
3. Slice $A[i \dots j]$ in $O(\log n + k)$ time where $k$ is the number of matched results.

---

## 5.4 String Matching: Knuth-Morris-Pratt (LPS Array Construction)

### 5.4.1 The Longest Proper Prefix which is also Suffix (LPS) Array
Let pattern $P$ have length $m$. The array $\pi[0 \dots m-1]$ (or $LPS$) is defined such that $\pi[q]$ is the length of the longest proper prefix of $P[0 \dots q]$ that is also a suffix of $P[0 \dots q]$.

**Formal Definition:**
$$\pi[q] = \max \{ k \mid k < q+1 \text{ and } P[0 \dots k-1] \sqsupset P[0 \dots q] \}$$
Where $\sqsupset$ denotes the suffix relation.

### 5.4.2 LPS Construction Algorithm
```text
Algorithm ComputeLPS(P, m)
Input: Pattern string P of length m
Output: LPS table pi of length m

pi[0] = 0
k = 0
for q = 1 to m - 1 do
    while k > 0 and P[k] != P[q] do
        k = pi[k - 1]
    if P[k] == P[q] then
        k = k + 1
    pi[q] = k
return pi
```
*Time Complexity of LPS Construction:* Amortized $\Theta(m)$ because variable $k$ is incremented at most $m-1$ times and decreases by at least 1 in each while-loop iteration.

### 5.4.3 KMP Search Routine
During pattern matching over text $T[0 \dots n-1]$:
- When a mismatch occurs between $T[i]$ and $P[q]$, the pattern pointer shifts to $\pi[q-1]$.
- The text pointer $i$ is never decremented.
- **Total Runtime:** $\Theta(n + m)$.
- **Space Overhead:** $\Theta(m)$ auxiliary memory for the $\pi$ table.

---

## 5.5 Greedy Heuristics for Time-Constrained Selection

In operational scenarios, students require instant application recommendations based on differing priorities. CareerMatch implements three greedy strategies:

1. **Strategy A (Highest Score First):**
   - Sort eligible listings by relevance score $V_k$ descending.
   - Greedily append jobs if cumulative time $\le B_{\text{avail}}$.
2. **Strategy B (Score-per-Minute Ratio / Density First):**
   - Compute efficiency ratio $\rho_k = V_k / W_k$.
   - Sort by $\rho_k$ descending; greedily select jobs.
3. **Strategy C (Deadline Urgency Priority):**
   - Let $H_k$ be hours remaining until deadline.
   - Compute composite score $U_k = \frac{V_k \times 100}{\sqrt{H_k}}$.
   - Sort by $U_k$ descending; greedily select jobs.

*Sorting Sub-routine:* All greedy strategies sort candidates using our manual **Merge Sort** ($O(n \log n)$) rather than engine built-ins.

---

## 5.6 Dynamic Programming: 0/1 Knapsack Formulation & Proof of Suboptimality

### 5.6.1 Knapsack Problem Formulation
Let there be $n$ eligible opportunities. Each opportunity $k$ has weight $W_k$ (application minutes) and value $V_k$ (relevance score). Available budget is $W$ minutes.

Define $DP[i][w]$ as the maximum recommendation score attainable using a subset of the first $i$ opportunities with time capacity $w$:
$$DP[i][w] = \begin{cases}
0 & \text{if } i = 0 \text{ or } w = 0 \\
DP[i-1][w] & \text{if } W_{i} > w \\
\max\left(DP[i-1][w], \; DP[i-1][w - W_{i}] + V_{i}\right) & \text{if } W_{i} \le w
\end{cases}$$

### 5.6.2 Backtracking Reconstruction Algorithm
To extract the exact subset of selected jobs from table $DP[0 \dots n][0 \dots W]$:
```text
Algorithm ReconstructKnapsack(DP, W_arr, jobs, n, W)
currW = W
selectedJobs = []
for i = n down to 1 do
    if DP[i][currW] != DP[i-1][currW] then
        selectedJobs.append(jobs[i-1])
        currW = currW - W_arr[i-1]
return Reverse(selectedJobs)
```

### 5.6.3 Mathematical Proof: Suboptimality of Greedy in 0/1 Knapsack
**Theorem:** *Greedy heuristics do not guarantee an optimal solution for the 0/1 Knapsack problem.*

**Proof by Counterexample:**
Let total budget $B = 100 \text{ minutes}$. Consider three candidate jobs:
- Job 1: $V_1 = 90$, $W_1 = 100 \implies \rho_1 = 0.90$
- Job 2: $V_2 = 55$, $W_2 = 50 \implies \rho_2 = 1.10$
- Job 3: $V_3 = 55$, $W_3 = 50 \implies \rho_3 = 1.10$

1. **Greedy Highest Score First (Strategy A):**
   - Examines Job 1 ($V_1 = 90, W_1 = 100$). It fits completely.
   - Remaining budget: $100 - 100 = 0$.
   - Total Score = **$90 \text{ points}$**.
2. **Dynamic Programming (Global Optimum):**
   - Evaluates subproblems: selecting Job 2 and Job 3 requires total weight $W_2 + W_3 = 50 + 50 = 100 \le 100$.
   - Combined Score = $V_2 + V_3 = 55 + 55 =$ **$110 \text{ points}$**.
   - Result: $110 > 90$.

Greedy Score-First leaves zero remaining capacity for complementary combinations, illustrating why Dynamic Programming is required for optimal discrete resource allocation. $\blacksquare$

---

## 5.7 Comprehensive Asymptotic Complexity Comparison

| Algorithm | Design Technique | Best-Case Time | Average-Case Time | Worst-Case Time | Auxiliary Space | Optimality Guarantee |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | Brute Force Exchange | $\Theta(n)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | Stable |
| **Merge Sort** | Divide and Conquer | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n)$ | Stable |
| **Linear Search** | Linear Scan | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | Unordered Lookup |
| **Binary Search (Iterative)** | Decrease and Conquer | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | Exact & Range Bounds |
| **Binary Search (Recursive)** | Decrease and Conquer | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ (stack) | Exact Lookup |
| **Naive String Matching** | Brute Force Search | $\Theta(n)$ | $O(n + m)$ | $\Theta(n \cdot m)$ | $O(1)$ | No Preprocessing |
| **KMP Pattern Search** | Finite Automaton / LPS | $\Theta(n + m)$ | $\Theta(n + m)$ | $\Theta(n + m)$ | $\Theta(m)$ | Linear (No Backtracking)|
| **Greedy Job Selection** | Greedy Heuristic | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Heuristic Approximation|
| **0/1 Knapsack DP** | Dynamic Programming | $\Theta(n \cdot W)$ | $\Theta(n \cdot W)$ | $\Theta(n \cdot W)$ | $\Theta(n \cdot W)$ | Globally Optimal |

---

# CHAPTER 6: SYSTEM IMPLEMENTATION & APPLICATION MODULES

## 6.1 Backend Modular Service-Controller Architecture
The backend application (`backend/src/`) adheres strictly to separation of concerns:
```text
backend/
├── src/
│   ├── algorithms/          # Isolated, framework-independent algorithm modules
│   │   ├── sorting/         # mergeSort.js, bubbleSort.js, index.js
│   │   ├── searching/       # binarySearch.js, linearSearch.js, index.js
│   │   ├── stringMatching/  # kmp.js, naiveMatch.js, index.js
│   │   ├── greedy/          # greedyJobSelection.js
│   │   ├── dynamicProgramming/ # knapsackJobSelection.js
│   │   └── scoring/         # recommendationScorer.js, eligibilityChecker.js
│   ├── controllers/         # HTTP request/response validation & mapping
│   ├── routes/              # Express endpoint definitions
│   ├── services/            # Business logic, database interactions, benchmark engines
│   ├── middleware/          # Centralized error handler, CORS middleware
│   ├── config/              # Prisma client singleton
│   ├── tests/               # 21 automated algorithm test suites
│   └── app.js               # Server initialization and middleware pipeline
```

## 6.2 RESTful API Design and Contract Specifications
The server exposes RESTful JSON interfaces:
- `GET /api/health`: Health status confirmation.
- `GET /api/profile`: Retrieves student profile, academic CGPA, and verified skills.
- `PUT /api/profile`: Updates student credentials and available weekly application hours.
- `GET /api/jobs`: Multi-faceted job discovery with KMP search query, filters, and sort options.
- `GET /api/jobs/recommended`: Returns listings ranked by manual Merge Sort with comparisons count and execution time.
- `GET /api/jobs/:id`: Detailed opportunity audit with skill match chips and mathematical point contributions.
- `GET /api/applications`: Full pipeline retrieval for Kanban board rendering.
- `POST /api/algorithms/sort`: Executes Bubble Sort vs. Merge Sort comparison on size $N$.
- `POST /api/algorithms/search`: Executes Linear vs. Binary search comparison.
- `POST /api/algorithms/string-match`: Runs KMP vs. Naive comparison and outputs the LPS table.
- `POST /api/algorithms/knapsack`: Computes 0/1 Knapsack subproblem matrix and compares against greedy strategies.
- `POST /api/algorithms/benchmark`: Executes multi-size empirical benchmark suites.

## 6.3 Frontend Component Architecture and UX Principles
The frontend (`frontend/src/`) is designed as a responsive, warm SaaS dashboard:
- **Design Tokens:** Warm off-white canvas (`#f8fafc`), clean card surfaces (`#ffffff`), dark navy headings (`#0f172a`), and soft indigo accent colors (`#4f46e5`).
- **Sidebar Component:** Collapsible desktop sidebar transforming into a backdrop drawer on mobile devices.
- **JobCard Component:** Reusable responsive card featuring company logos, eligibility tags, skill match progress bars, and missing skill badges.
- **Kanban Pipeline Board:** Interactive recruitment tracker across columns (`Saved`, `Applied`, `OA`, `Interview`, `Offer`, `Rejected`).

## 6.4 The Interactive Algorithm Lab Module
Located at `/algorithm-lab`, this dedicated laboratory provides evaluators with direct empirical controls:
- **Sorting Tab:** Dataset size selector ($N = 100 \dots 4,000$), live comparison count display, execution time in ms, and top-5 sorted sample output.
- **Searching Tab:** Exact target and range sliders ($[W_{\min}, W_{\max}]$), comparing comparisons between $O(n)$ Linear Search and $O(\log n)$ Binary Search.
- **String Matching Tab:** Real-time editable text and pattern inputs; visualizes the computed LPS failure array and pattern match indices.
- **Greedy Selection Tab:** Interactive slider for weekly hours budget; compares Strategy A, B, and C outputs.
- **Dynamic Programming Tab:** Renders the computed 2D subproblem table matrix with live backtracking.
- **Performance Analysis Tab:** Live Recharts visualization plotting measured empirical runtimes against theoretical $O(n \log n)$, $O(n^2)$, and $O(\log n)$ curves.

---

# CHAPTER 7: EXPERIMENTAL RESULTS, BENCHMARKS & TESTING

## 7.1 Automated Algorithmic Verification Test Suite (21 Tests)
The backend test suite (`backend/src/tests/algorithms.test.js`) executes natively via Node.js:
```text
> careermatch-backend@1.0.0 test
> node --test src/tests/*.test.js

▶ DAA Algorithm Test Suite: Sorting Algorithms
  ✔ Merge Sort handles empty dataset (24.36ms)
  ✔ Merge Sort handles single element (0.51ms)
  ✔ Merge Sort sorts already sorted descending array correctly (0.57ms)
  ✔ Merge Sort sorts reverse sorted array correctly (0.43ms)
  ✔ Merge Sort maintains stability on duplicate scores (0.53ms)
  ✔ Bubble Sort produces identical sorted order to Merge Sort (0.71ms)
✔ DAA Algorithm Test Suite: Sorting Algorithms (30.48ms)

▶ DAA Algorithm Test Suite: Searching Algorithms
  ✔ Binary Search (Iterative & Recursive) finds existing target (0.85ms)
  ✔ Binary Search reports not found when target does not exist (0.46ms)
  ✔ Binary Search finds first element and last element (1.48ms)
  ✔ Binary Search Range retrieves exact interval [min, max] (1.02ms)
  ✔ Linear Search vs Binary Search yield consistent results (0.69ms)
✔ DAA Algorithm Test Suite: Searching Algorithms (5.44ms)

▶ DAA Algorithm Test Suite: String Matching (KMP)
  ✔ KMP computes correct LPS array (2.15ms)
  ✔ KMP finds pattern at beginning, middle, and end (0.71ms)
  ✔ KMP handles pattern not found (0.31ms)
  ✔ KMP handles empty pattern gracefully (0.21ms)
  ✔ KMP and Naive Match return identical match indices on repetitive strings (0.57ms)
✔ DAA Algorithm Test Suite: String Matching (KMP) (4.38ms)

▶ DAA Algorithm Test Suite: Greedy Job Selection
  ✔ Greedy excludes ineligible jobs (0.84ms)
  ✔ Greedy never exceeds time budget (0.39ms)
  ✔ Greedy ratio strategy prioritizes higher score-per-minute ratio (0.23ms)
✔ DAA Algorithm Test Suite: Greedy Job Selection (1.69ms)

▶ DAA Algorithm Test Suite: Dynamic Programming (0/1 Knapsack)
  ✔ DP Knapsack achieves optimal value where greedy score-first fails (1.11ms)
  ✔ DP Knapsack excludes ineligible jobs and handles zero capacity (0.25ms)
✔ DAA Algorithm Test Suite: Dynamic Programming (0/1 Knapsack) (1.53ms)

ℹ tests 21 | suites 5 | pass 21 | fail 0 | cancelled 0 | skipped 0 | todo 0
ℹ duration_ms: 328.95ms
```

## 7.2 Empirical Benchmark Evaluations on Synthetic Datasets

### 7.2.1 Benchmark Experiment 1: Sorting Runtime & Operation Divergence
Measured on an AMD Ryzen / Node.js V8 execution thread:

| Dataset Size ($N$) | Merge Sort Time ($\text{ms}$) | Bubble Sort Time ($\text{ms}$) | Merge Sort Comparisons | Bubble Sort Comparisons | Speedup Factor |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$N = 100$** | $0.82$ | $1.41$ | $548$ | $4,850$ | $1.7 \times$ |
| **$N = 500$** | $2.31$ | $11.85$ | $3,832$ | $124,190$ | $5.1 \times$ |
| **$N = 1,000$** | $4.76$ | $44.92$ | $8,698$ | $498,340$ | $9.4 \times$ |
| **$N = 2,500$** | $11.89$ | $281.40$ | $24,110$ | $3,118,520$ | $23.6 \times$ |
| **$N = 4,000$** | $18.45$ | $742.10$ | $41,290$ | $7,994,200$ | $40.2 \times$ |

*Observation:* As $N$ scales by $40\times$ (from 100 to 4,000), Bubble Sort comparison counts explode by $1,648\times$ adhering to $\Theta(N^2)$, while Merge Sort comparisons increase by only $75\times$, confirming the $\Theta(N \log N)$ theoretical bound.

### 7.2.2 Benchmark Experiment 2: Searching Lookup Operations
Measured searching across sorted salary listings:

| Dataset Size ($N$) | Linear Search Comparisons | Binary Search Comparisons | Reduction in Operations |
| :--- | :--- | :--- | :--- |
| **$N = 100$** | $75$ | $6$ | $92.0\%$ |
| **$N = 500$** | $375$ | $8$ | $97.8\%$ |
| **$N = 1,000$** | $750$ | $9$ | $98.8\%$ |
| **$N = 5,000$** | $3,750$ | $12$ | $99.6\%$ |
| **$N = 10,000$** | $7,500$ | $13$ | $99.8\%$ |

*Observation:* Binary Search exhibits logarithmic scaling ($O(\log N)$). Even at $10,000$ elements, lookup requires at most $14$ comparison checks.

### 7.2.3 Benchmark Experiment 3: KMP vs. Naive String Matching
Tested on repetitive textual patterns (e.g., text `(AAAAAB)^20`, pattern `AAAAB`):

| Test Scenario | Text Length ($N$) | Pattern Length ($M$) | Naive Comparisons | KMP Comparisons | Comparisons Saved |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Skill Token Query** | $85$ | $5$ | $89$ | $87$ | $2.2\%$ |
| **Repetitive String Benchmark** | $120$ | $6$ | $684$ | $126$ | **$81.5\%$** |
| **Long Job Description** | $1,250$ | $24$ | $1,340$ | $1,274$ | $4.9\%$ |

## 7.3 Performance Graphs and Asymptotic Curve Fitting
The live Recharts charting engine plots empirical points against theoretical reference curves:
- **Sorting Curve:** Merge Sort runtime aligns with $c_1 \cdot N \log_2 N$, while Bubble Sort aligns with $c_2 \cdot N^2$.
- **Searching Curve:** Binary search operations remain bounded beneath $\lceil \log_2 N \rceil + 1$, contrasted with the linear diagonal $y = N$ of Linear Search.

---

# CHAPTER 8: CONCLUSION, LIMITATIONS & FUTURE SCOPE

## 8.1 Summary of Project Contributions
The CareerMatch project successfully models, implements, and benchmarks a full-stack algorithmic decision-support framework for student internship discovery:
1. **Algorithmic Integrity:** Replaced black-box APIs with manual, first-principles implementations of Merge Sort, Bubble Sort, Binary Search, KMP, Greedy Selection, and 0/1 Knapsack DP.
2. **Transparent Multi-Factor Scoring:** Formulated an academic scoring metric reflecting required skills ($50\%$), preferred skills ($15\%$), and preferences ($35\%$).
3. **Constraint-Based Gatekeeping:** Enforced hard academic eligibility checks preventing student application to unqualified vacancies.
4. **Interactive Algorithmic Lab:** Delivered an empirical laboratory featuring live parameter manipulation, DP table inspection, and Recharts performance curves.
5. **Full Cloud Deployment:** Successfully deployed and verified with a live React frontend on Vercel ([https://career-match-roan.vercel.app](https://career-match-roan.vercel.app)) and an Express backend on Render ([https://career-match-api-hc5x.onrender.com](https://career-match-api-hc5x.onrender.com)).

## 8.2 Technical Limitations and Constraints
- **Pseudo-Polynomial Space in Knapsack DP:** The 2D DP matrix requires $O(n \cdot W)$ memory. For very fine-grained time discretizations (e.g., 1-second steps over 40 hours), memory requirements grow substantially, necessitating interval discretization (e.g., 5-minute time steps).
- **Single-Token Pattern Matching:** KMP operates on individual patterns. Matching 10 skills requires 10 distinct KMP iterations rather than a single multi-pattern automaton pass.
- **Relational Data Scale:** The current demonstration dataset includes 52 realistic opportunities. Scaling to $1,000,000+$ postings would necessitate distributed indexing architectures.

## 8.3 Future Enhancements and Roadmap
1. **Aho-Corasick Multi-Pattern Automaton:** Implement an Aho-Corasick trie automaton to match all student skills simultaneously in a single linear pass over the job description text.
2. **Machine-Learned Adaptive Weights:** Utilize placement outcome feedback to dynamically adjust scoring weights ($w_1 \dots w_6$) using linear regression or gradient boosting.
3. **Automated Document Parsing:** Integrate WebAssembly-based PDF text extractors to parse student resumes directly into the normalized skill taxonomy.

---

# REFERENCES

1. **Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C.** (2022). *Introduction to Algorithms* (4th ed.). MIT Press. [Chapters on Divide-and-Conquer, Dynamic Programming, Greedy Algorithms, and String Matching].
2. **Knuth, D. E., Morris, J. H., & Pratt, V. R.** (1977). Fast pattern matching in strings. *SIAM Journal on Computing*, 6(2), 323–350.
3. **Bellman, R.** (1957). *Dynamic Programming*. Princeton University Press.
4. **Aho, A. V., & Corasick, M. J.** (1975). Efficient string matching: an aid to bibliographic search. *Communications of the ACM*, 18(6), 333–340.
5. **Sedgewick, R., & Wayne, K.** (2011). *Algorithms* (4th ed.). Addison-Wesley Professional.
6. **Mozilla Developer Network (MDN).** (2025). High Resolution Time API: `Performance.now()`. World Wide Web Consortium (W3C).

---

# APPENDIX A: CORE ALGORITHM SOURCE CODE

### A.1 Manual Merge Sort Implementation (`backend/src/algorithms/sorting/mergeSort.js`)
```javascript
function mergeSort(arr, options = {}) {
  const { key = 'score', order = 'desc', clone = true } = options;
  let comparisons = 0, mergeOps = 0;
  const list = clone ? [...arr] : arr;

  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }

  function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      mergeOps++;
      comparisons++;
      const valL = getValue(left[i]);
      const valR = getValue(right[j]);
      let takeLeft = (order === 'desc') ? (valL >= valR) : (valL <= valR);
      if (takeLeft) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);
    return result;
  }

  function divideAndConquer(subList) {
    if (subList.length <= 1) return subList;
    const mid = Math.floor(subList.length / 2);
    return merge(divideAndConquer(subList.slice(0, mid)), divideAndConquer(subList.slice(mid)));
  }

  const startTime = performance.now();
  const sorted = divideAndConquer(list);
  const endTime = performance.now();

  return {
    sorted,
    comparisons,
    mergeOperations: mergeOps,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    datasetSize: arr.length
  };
}
```

### A.2 Knuth-Morris-Pratt (KMP) Pattern Matcher (`backend/src/algorithms/stringMatching/kmp.js`)
```javascript
function computeLPSArray(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let length = 0, i = 1, comparisons = 0;

  while (i < m) {
    comparisons++;
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i++] = length;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
      } else {
        lps[i++] = 0;
      }
    }
  }
  return { lps, comparisons };
}

function kmpSearch(text, pattern, options = {}) {
  const rawText = text || '';
  const T = rawText.toLowerCase();
  const P = pattern.toLowerCase();
  const n = T.length, m = P.length;
  const { lps, comparisons: lpsComparisons } = computeLPSArray(P);
  let totalComparisons = lpsComparisons;
  const matches = [];
  let i = 0, j = 0;

  while (i < n) {
    totalComparisons++;
    if (T[i] === P[j]) {
      i++; j++;
    }
    if (j === m) {
      matches.push({ startIndex: i - j, endIndex: i - 1 });
      j = lps[j - 1];
    } else if (i < n && T[i] !== P[j]) {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }
  return { matches, matchCount: matches.length, comparisons: totalComparisons, lps };
}
```

### A.3 0/1 Knapsack Dynamic Programming (`backend/src/algorithms/dynamicProgramming/knapsackJobSelection.js`)
```javascript
function knapsackJobSelection(jobs, capacityMinutes, options = {}) {
  const { filterEligible = true, timeStep = 5 } = options;
  const candidates = jobs.filter(j => !filterEligible || j.isEligible !== false);
  const n = candidates.length;
  const step = Math.max(1, timeStep);
  const W = Math.floor(capacityMinutes / step);

  const weights = candidates.map(j => Math.max(1, Math.round((j.estimatedApplicationMinutes || 60) / step)));
  const values = candidates.map(j => Math.round((j.recommendationScore || 50) * 10));

  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  const selectedJobs = [];
  let remainingW = W;
  for (let i = n; i > 0 && remainingW > 0; i--) {
    if (dp[i][remainingW] !== dp[i - 1][remainingW]) {
      selectedJobs.push(candidates[i - 1]);
      remainingW -= weights[i - 1];
    }
  }

  return {
    capacityMinutes,
    totalScore: Number((dp[n][W] / 10).toFixed(2)),
    selectedJobs: selectedJobs.reverse()
  };
}
```

---

# APPENDIX B: REST API PAYLOAD SAMPLES

### B.1 Sample Job Recommendation Object
```json
{
  "id": "c7a8b41e-913b-417c-a49e-b9b5f4886612",
  "rank": 1,
  "title": "Backend Developer Intern",
  "companyName": "Razorpay",
  "location": "Bengaluru",
  "workMode": "Hybrid",
  "jobType": "Internship",
  "salaryMin": 45000,
  "salaryMax": 60000,
  "recommendationScore": 86.5,
  "matchPercentage": 80,
  "isEligible": true,
  "eligibilityStatus": "Eligible",
  "matchedRequiredSkills": ["Java", "SQL", "REST APIs", "Git"],
  "missingRequiredSkills": ["Spring Boot"],
  "scoreBreakdown": {
    "requiredSkillsMatch": { "score": 80.0, "weight": 0.50, "contribution": 40.0 },
    "preferredSkillsMatch": { "score": 50.0, "weight": 0.15, "contribution": 7.5 },
    "location": { "score": 100.0, "weight": 0.10, "contribution": 10.0 },
    "jobType": { "score": 100.0, "weight": 0.10, "contribution": 10.0 },
    "workMode": { "score": 100.0, "weight": 0.05, "contribution": 5.0 },
    "salary": { "score": 100.0, "weight": 0.10, "contribution": 10.0 }
  },
  "explanation": "Recommended because you matches 80% of required skills (Java, SQL, REST APIs), and matches your preferred location (Bengaluru)."
}
```
