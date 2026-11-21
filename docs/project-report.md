# Project Report: CareerMatch — Smart Internship & Job Recommendation System

**Course:** Design and Analysis of Algorithms (DAA)  
**Project Name:** CareerMatch (formerly SkillRoute)  
**Project Type:** Algorithmic Decision-Support Full-Stack Web Application  

---

## 1. Abstract & Executive Summary

Students seeking internships and early-career software roles face an overwhelming volume of listings across disparate job portals. Most search portals rely on basic keyword matching and boolean database filters that fail to account for fine-grained skill overlap, academic eligibility restrictions (CGPA cutoffs, degree specializations, graduation batches), or student time budgets.

**CareerMatch** is an algorithmic decision-support web application that applies foundational DAA concepts to solve this problem:
1. **Divide and Conquer (Merge Sort):** Ranks opportunities by a multi-factor relevance metric in guaranteed $O(n \log n)$ time while preserving stable order on equal scores.
2. **Decrease and Conquer (Binary Search):** Rapidly locates stipend thresholds and filters ranges in $O(\log n)$ operations.
3. **Finite Automaton / LPS (Knuth-Morris-Pratt):** Eliminates redundant text backtracking during skill matching and resume parsing in $O(n + m)$ linear time.
4. **Greedy Heuristics:** Prioritizes high-yield applications under application-time constraints.
5. **Dynamic Programming (0/1 Knapsack):** Computes the mathematically optimal portfolio of opportunities that maximizes expected score within weekly application preparation time limits.

---

## 2. System Architecture

```text
+-----------------------------------------------------------------------------------+
|                           REACT (VITE) FRONTEND CLIENT                            |
|  - Dashboard: KPIs, Top 5 Ranked Jobs, Pipeline Activity & Skill Gap Charts       |
|  - Discover Jobs: KMP Search, Location/Mode/Type Filters, Grid/List Views         |
|  - Recommended: Merge-Sorted Opportunities with Transparent "Why" Badges          |
|  - Application Kanban: Drag/Update Stages (Saved -> Applied -> OA -> Interview)   |
|  - DAA Algorithm Lab: Interactive Live Simulators & Recharts Complexity Curves    |
+-----------------------------------------------------------------------------------+
                                        |  REST APIs (JSON)
                                        v
+-----------------------------------------------------------------------------------+
|                           NODE.JS / EXPRESS.JS BACKEND                            |
|  Routes & Controllers: student, jobs, saved-jobs, applications, algorithms        |
|  -------------------------------------------------------------------------------  |
|  CORE DAA ALGORITHM ENGINE:                                                       |
|    * Sorting:         manual Merge Sort O(n log n) vs Bubble Sort O(n^2)          |
|    * Searching:       manual Binary Search O(log n) vs Linear Search O(n)         |
|    * String Matching: manual KMP O(n+m) with LPS Array vs Naive O(nm)             |
|    * Greedy:          Strategy A (Score), Strategy B (Ratio), Strategy C (Urgency)|
|    * Dynamic Prog:    0/1 Knapsack DP Table O(nW) with Backtracking               |
|    * Scoring Engine:  50% Req Skills + 15% Pref Skills + 10% Loc + 10% Type...   |
|    * Hard Constraints:CGPA >= minCGPA, Degree, Batch Year, Experience             |
+-----------------------------------------------------------------------------------+
                                        |  Prisma ORM
                                        v
+-----------------------------------------------------------------------------------+
|                        DATABASE LAYER (SQLITE / POSTGRESQL)                       |
|  Models: Student, Skill, StudentSkill, Job, JobApplication, SavedJob, Preference |
|  52 Seeded Synthetic Listings across 18 Real Tech Enterprises                    |
+-----------------------------------------------------------------------------------+
```

---

## 3. Detailed Algorithmic Breakdown

### 3.1 Multi-Factor Scoring Formula
Every opportunity is evaluated through a centralized, transparent scoring function yielding a normalized score $S \in [0, 100]$:
$$
S = 0.50 \cdot M_{\text{req}} + 0.15 \cdot M_{\text{pref}} + 0.10 \cdot P_{\text{loc}} + 0.10 \cdot P_{\text{type}} + 0.05 \cdot P_{\text{mode}} + 0.10 \cdot P_{\text{salary}}
$$
Where:
- $M_{\text{req}} = \frac{|\text{Student Skills} \cap \text{Required Skills}|}{|\text{Required Skills}|} \times 100$
- $M_{\text{pref}} = \frac{|\text{Student Skills} \cap \text{Preferred Skills}|}{|\text{Preferred Skills}|} \times 100$
- $P_{\text{loc}}, P_{\text{type}}, P_{\text{mode}} \in \{20, 100\}$ based on preference alignment
- $P_{\text{salary}} = \min\left(100, \frac{\text{Stipend Offer}}{\text{Minimum Desired Stipend}} \times 100\right)$

### 3.2 Hard Eligibility Constraint Checking
Unlike soft scoring factors, eligibility operates as an invariant gatekeeper:
- $\text{CGPA}_{\text{student}} \ge \text{CGPA}_{\text{cutoff}}$
- $\text{Degree}_{\text{student}} \in \text{EligibleDegrees}_{\text{job}}$
- $\text{Batch}_{\text{student}} \in \text{EligibleYears}_{\text{job}}$
- $\text{Experience}_{\text{student}} \ge \text{Experience}_{\text{required}}$

If any condition fails, the opportunity is flagged as **"Not Eligible"** and excluded from the Knapsack and Greedy optimization solvers.

---

## 4. Key DAA Viva Questions & Answers

**Q1: Why did you implement Merge Sort instead of Quick Sort for job ranking?**  
*Answer:* Merge Sort guarantees a worst-case time complexity of $O(n \log n)$, whereas Quick Sort degrades to $O(n^2)$ on unfavorable pivot selections (e.g. already sorted inputs). Furthermore, Merge Sort is naturally **stable**, ensuring that opportunities with equal match scores maintain their relative ordering across re-renders.

**Q2: How does KMP achieve linear string matching without backtracking in text?**  
*Answer:* KMP constructs the LPS (Longest Proper Prefix which is also Suffix) table for the search pattern in $O(m)$ time. When a mismatch occurs after $j$ characters, the LPS array tells the matcher how many characters of the pattern can be safely skipped without re-examining the text character at pointer $i$. Hence, text pointer $i$ never decrements, achieving $\Theta(n + m)$ overall time.

**Q3: Can Greedy algorithms solve the 0/1 Knapsack problem optimally?**  
*Answer:* No. The greedy choice property fails for 0/1 Knapsack because items cannot be split (unlike Fractional Knapsack). A greedy choice that picks an item with high score or high score-per-weight ratio can leave an unusable gap in remaining capacity that prevents fitting two slightly smaller items whose combined value is greater. Dynamic Programming evaluates all subproblems to guarantee global optimality.
