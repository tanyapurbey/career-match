# CareerMatch — Smart Internship and Job Recommendation System
## College Project Report (Design and Analysis of Algorithms - DAA)

---

## Preliminary Pages

### 1. Title Page
```text
========================================================================================
                                  A PROJECT REPORT ON
                                     CAREERMATCH
                   Smart Internship and Job Recommendation System
                     Using Design and Analysis of Algorithms (DAA)

                 Submitted in partial fulfillment of the requirements 
                             for the award of the degree of

                                 BACHELOR OF TECHNOLOGY
                                           IN
                            COMPUTER SCIENCE AND ENGINEERING

                                      Submitted by:
                                      Tanya Sharma
                                  (Roll No: 2026-CSE-042)

                                Under the Guidance of:
                              Project Guide / Faculty Name

                      DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
                               NATIONAL INSTITUTE OF TECHNOLOGY
                                        2025 – 2026
========================================================================================
```

---

### 2. Certificate
```text
This is to certify that the project report entitled "CareerMatch — Smart Internship 
and Job Recommendation System" submitted by Tanya Sharma (Roll No: 2026-CSE-042) in 
partial fulfillment for the award of Bachelor of Technology in Computer Science and 
Engineering is a bonafide record of work carried out under my supervision.

The results presented in this report have not been submitted to any other university 
or institute for any degree or diploma.


_________________________                                    _________________________
    Project Guide                                              Head of Department (HOD)
Department of CSE                                            Department of CSE
National Institute of Technology                             National Institute of Technology
```

---

### 3. Declaration
```text
I, Tanya Sharma, hereby declare that the project titled "CareerMatch — Smart Internship 
and Job Recommendation System" is my own authentic work carried out under the guidance 
of my project mentor.

All the algorithms (Merge Sort, Bubble Sort, Binary Search, KMP String Matching, 
Greedy Selection, and Dynamic Programming 0/1 Knapsack) were implemented manually 
in JavaScript from scratch without using built-in sorting or searching shortcuts.


Date: November 22, 2026                                              Tanya Sharma
Place: Campus                                                    Roll No: 2026-CSE-042
```

---

### 4. Acknowledgement
```text
I would like to express my sincere gratitude to my project guide and all the professors 
in the Department of Computer Science and Engineering for their guidance, valuable feedback, 
and encouragement throughout this project.

I am also thankful to our college computer laboratories for providing the necessary 
infrastructure to build, test, and host this application. Finally, I thank my family 
and friends for their constant support.
```

---

### 5. Abstract
Finding the right internship is one of the biggest challenges for college students. Students often waste hours browsing through hundreds of job listings, only to find out that they do not meet the minimum CGPA, the graduation year is wrong, or the job requires skills they have not learned yet. On top of that, students have limited time each week to prepare resumes and complete coding tests.

**CareerMatch** is a full-stack web application built to solve this problem using core **Design and Analysis of Algorithms (DAA)** concepts:

1. **Knuth-Morris-Pratt (KMP):** Matches student skills with job descriptions quickly without wasting time re-checking letters.
2. **Eligibility Checking:** Automatically checks hard rules (CGPA, degree, batch year, experience) so students never waste time on jobs they cannot get.
3. **Recommendation Scoring:** Calculates a fair 0–100 match score based on skills (65%), location (10%), job type (10%), work mode (5%), and stipend (10%).
4. **Merge Sort:** Ranks all matching jobs from best to worst in $O(n \log n)$ time. It is stable, meaning jobs with equal scores do not get shuffled randomly.
5. **Binary Search:** Quickly finds jobs within a student's preferred salary range in $O(\log n)$ time by cutting the list in half at each step.
6. **Greedy vs. 0/1 Knapsack Dynamic Programming:** Helps students choose the best combination of jobs to apply for within their limited weekly hours. While greedy rules can make short-sighted choices, Dynamic Programming finds the optimal combination that gives the highest total score.

The application includes a clean React frontend, an Express.js backend, a PostgreSQL database, an interactive **Algorithm Lab** to test and compare the algorithms, and an application tracker Kanban board.

---

## CHAPTER 1: INTRODUCTION

### 1.1 Background
Every semester, thousands of college students start searching for internships and entry-level jobs. Companies post openings on many different websites like LinkedIn, Internshala, and company career pages. 

However, searching for the right job is frustrating:
- Job titles are confusing (e.g., "Software Engineer Intern", "Junior Backend Developer", and "Java Trainee" might all describe the same work).
- Students spend 20 minutes reading a job post only to find in the fine print that it requires an 8.5 CGPA or 2 years of experience.
- Each application takes 45 to 90 minutes (writing cover letters, customizing resumes, taking coding assessments). Students have classes and exams, so they only have about 10–15 hours a week.

### 1.2 Problem Statement
Students waste hours on irrelevant jobs because current portals do not automatically match skills, do not filter out jobs students are ineligible for, and do not help students plan their applications around their weekly time limits.

### 1.3 Objectives of CareerMatch
1. **Check Eligibility First:** Automatically check if the student meets the company's minimum CGPA, degree, and graduation year before recommending it.
2. **Calculate a Fair Match Score:** Compare the student’s skills against the job requirements and give a clear score from 0 to 100.
3. **Rank Using Merge Sort:** Show the best jobs at the top using custom Merge Sort ($O(n \log n)$).
4. **Search by Salary using Binary Search:** Help students find jobs in their stipend range in $O(\log n)$ time.
5. **Optimize Applications using Dynamic Programming:** Pick the best jobs a student can apply to without exceeding their weekly time budget.
6. **DAA Algorithm Lab:** Provide an interactive playground with graphs comparing fast vs. slow algorithms.

### 1.4 Live Project Links
- **Frontend (Web Application):** [https://career-match-roan.vercel.app](https://career-match-roan.vercel.app)
- **Backend (API Server):** [https://career-match-api-hc5x.onrender.com](https://career-match-api-hc5x.onrender.com)
- **GitHub Repository:** [https://github.com/tanyapurbey/career-match](https://github.com/tanyapurbey/career-match)

---

## CHAPTER 2: EXISTING SYSTEMS VS. CAREERMATCH

### 2.1 Existing Systems
- **LinkedIn:** Great for networking, but its ranking is a hidden "black box." It often shows jobs requiring 3–5 years of experience to fresh college students.
- **Indeed / Naukri:** Uses simple keyword search. If you search for "Java," it shows every job with the word "Java" in it, even if you are not qualified for it.
- **Internshala:** Good for college students, but it does not tell you *which combination* of jobs will give you the best results within your limited weekly study time.

### 2.2 Comparison Table

| Feature | LinkedIn / Indeed | Internshala | CareerMatch |
| :--- | :--- | :--- | :--- |
| **Skill Matching** | Basic keyword search | Category filters | **KMP Algorithm (Exact pattern matching)** |
| **Eligibility Check** | Shown after reading description | Basic filter | **Automatic hard constraint checking** |
| **Sorting** | Sponsored / Promoted first | Latest first | **Merge Sort based on Match Score** |
| **Salary Lookup** | Linear database query | Dropdown filter | **Binary Range Search $O(\log n)$** |
| **Time Budget Planner** | None | None | **0/1 Knapsack Dynamic Programming** |
| **Algorithm Lab** | None | None | **Interactive live graphs & comparisons** |

---

## CHAPTER 3: SYSTEM REQUIREMENTS

### 3.1 Hardware Requirements
- **Processor:** Dual Core 2.0 GHz or higher (Intel Core i3/i5/i7 or AMD Ryzen).
- **RAM:** 4 GB minimum (8 GB recommended).
- **Disk Space:** 500 MB for project files and local database.
- **Internet Connection:** Required for cloud hosting (Render and Vercel).

### 3.2 Software Requirements
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Node.js:** Version 18 or higher (tested on Node v24).
- **Database:** PostgreSQL (Cloud on Render) or SQLite (local development).
- **Web Browser:** Google Chrome, Microsoft Edge, or Mozilla Firefox.
- **Code Editor:** Visual Studio Code.

### 3.3 Technologies Used
- **Frontend:** React.js (Vite), Tailwind CSS, Lucide Icons, Recharts (for graphs).
- **Backend:** Node.js, Express.js.
- **Database Tool:** Prisma ORM.
- **Deployment:** Vercel (Frontend), Render (Backend & PostgreSQL).

---

## CHAPTER 4: SYSTEM ARCHITECTURE & DATABASE DESIGN

### 4.1 System Architecture
The application uses a standard 3-tier architecture:
1. **Frontend (User Interface):** A single-page application built in React where students view jobs, see their match score, and track applications.
2. **Backend (Server & Algorithm Engine):** An Express.js server that runs the DAA algorithms (Merge Sort, Binary Search, KMP, Knapsack) and provides REST APIs.
3. **Database (Data Storage):** Stores student information, skills, and job postings in PostgreSQL.

```text
[ React Frontend ]  <--->  HTTPS REST APIs  <--->  [ Express Backend ]  <--->  [ PostgreSQL DB ]
 (Vercel Cloud)                                       (DAA Algorithms)          (Render Cloud)
```

### 4.2 Database Tables (Schema)
The database has 7 main tables:
1. **Student:** Stores student profile (`fullName`, `email`, `college`, `degree`, `branch`, `graduationYear`, `cgpa`, `availableHoursPerWeek`).
2. **Skill:** List of all technical skills (`name`, `category` like Programming Languages, Frameworks, Databases).
3. **StudentSkill:** Links students to their skills along with proficiency (`Beginner`, `Intermediate`, `Advanced`).
4. **Job:** Details of job openings (`title`, `companyName`, `location`, `salaryMin`, `salaryMax`, `requiredSkills`, `minimumCGPA`, `eligibleDegrees`, `eligibleGraduationYears`, `estimatedApplicationMinutes`).
5. **JobApplication:** Tracks applied jobs (`status`: Saved, Applied, OA, Interview, Offer, Rejected).
6. **SavedJob:** Bookmarked jobs that a student wants to review or compare.
7. **StudentPreference:** Preferred work mode (Remote/Hybrid), preferred locations, and target salary.

---

## CHAPTER 5: THE CORE DAA ALGORITHMS EXPLAINED SIMPLY

This is the most important chapter of the project. Every algorithm was coded by hand from scratch without shortcuts.

---

### 5.1 Recommendation Scoring Formula
Before sorting, every job receives a score from **0 to 100** based on 6 weighted factors:

$$\text{Total Score} = (0.50 \times \text{ReqSkills}) + (0.15 \times \text{PrefSkills}) + (0.10 \times \text{Location}) + (0.10 \times \text{JobType}) + (0.05 \times \text{WorkMode}) + (0.10 \times \text{Salary})$$

- **Required Skills (50%):** If a job needs 4 skills and the student has 3, skill score is $(3/4) \times 100 = 75\%$. Contribution $= 75 \times 0.50 = 37.5$ points.
- **Preferred Skills (15%):** Bonus points for nice-to-have skills.
- **Location (10%):** 100 points if the city matches the student's preference; 20 points if not.
- **Job Type (10%):** 100 points if the job type (e.g., Internship) matches.
- **Work Mode (5%):** 100 points if the mode (Remote, Hybrid) matches.
- **Salary (10%):** 100 points if the salary meets or exceeds the student's target.

**Hard Eligibility Rule:**
If a student has a CGPA of 7.2, and the job requires a minimum of 7.5, the job is marked **"Not Eligible"**. It is given an explanation badge and removed from the Knapsack optimizer.

---

### 5.2 Algorithm 1: Merge Sort (Divide and Conquer)

#### Why we use it:
We use Merge Sort to rank all eligible jobs from highest match score to lowest.

#### How it works:
1. **Divide:** Split the list of jobs in half.
2. **Conquer:** Keep splitting until each list has only 1 job.
3. **Combine:** Merge the small lists back together in sorted order by comparing scores.

#### Why Merge Sort is better than Bubble Sort:
- **Merge Sort takes $O(n \log n)$ time:** Even for 5,000 jobs, it only takes a few milliseconds.
- **Bubble Sort takes $O(n^2)$ time:** For 5,000 jobs, it has to do up to $12,500,000$ comparisons, which freezes the screen!
- **Merge Sort is Stable:** If Google and Microsoft both have an 85% match score, Merge Sort preserves their original order and does not shuffle them randomly.

---

### 5.3 Algorithm 2: Binary Search (Decrease and Conquer)

#### Why we use it:
When a student filters jobs by salary (e.g., "Show me jobs paying between ₹30,000 and ₹60,000"), we use Binary Search on the sorted salary list.

#### How it works:
Instead of checking jobs one by one from top to bottom (Linear Search, which takes $O(n)$):
1. Look at the middle job.
2. If the middle job pays less than our target, throw away the entire left half.
3. If it pays more, throw away the entire right half.
4. Repeat on the remaining half.

#### Time Complexity:
- **Linear Search:** Checks up to $10,000$ jobs $\rightarrow O(n)$.
- **Binary Search:** Finds the answer in just $13$ or $14$ checks $\rightarrow O(\log n)$.

---

### 5.4 Algorithm 3: Knuth-Morris-Pratt (KMP String Matching)

#### Why we use it:
To check if a job description contains required skills like "React" or "Spring Boot".

#### The Problem with Simple (Naive) Matching:
If the text is `AAAAAB` and the pattern is `AAAB`:
A simple search checks letter by letter. If it fails on the 4th letter, it moves forward by only 1 letter and re-checks from the start. This wastes time ($O(n \times m)$).

#### How KMP fixes this:
1. **LPS Table (Longest Prefix which is also a Suffix):** Before searching, KMP studies the pattern and creates a table.
2. When a mismatch happens, KMP checks the LPS table to know how many letters it can safely skip without re-checking.
3. The search never goes backward in the text.
4. **Time Complexity:** Strict linear time $O(n + m)$.

---

### 5.5 Algorithm 4: Greedy Job Selection

#### Why we use it:
Students cannot apply to all 50 jobs because they only have limited time each week (e.g., 3 hours = 180 minutes). Each job takes a certain amount of time to prepare an application (e.g., 30 to 60 minutes).

We created three Greedy strategies:
1. **Strategy A (Highest Score First):** Sort jobs by score and pick the highest score jobs until time runs out.
2. **Strategy B (Score-per-Minute Ratio):** Divide score by application time ($\text{Score} / \text{Minutes}$). Pick jobs that give the most points per minute spent.
3. **Strategy C (Deadline Urgency):** Prioritize jobs whose deadlines are closing soonest.

---

### 5.6 Algorithm 5: 0/1 Knapsack (Dynamic Programming)

#### Why Greedy is not always optimal:
Greedy looks only at the immediate next step. This can cause it to make a bad choice!

**Simple Example:**
Suppose you have **100 minutes** available:
- **Job 1:** Score = 90, takes 100 minutes.
- **Job 2:** Score = 55, takes 50 minutes.
- **Job 3:** Score = 55, takes 50 minutes.

What happens?
- **Greedy (Highest Score First)** sees Job 1 has 90 points. It grabs Job 1. Now your 100 minutes are completely used up. **Total Score = 90 points.**
- **Dynamic Programming** tests combinations using a 2D table. It discovers that picking **Job 2 + Job 3** takes $50 + 50 = 100$ minutes and gives $55 + 55 =$ **110 points**!
- DP wins by **20 points** ($110 > 90$).

#### How 0/1 Knapsack works:
It builds a grid (table) where rows represent jobs and columns represent minutes ($0, 5, 10, \dots, 180$).
For each cell, it asks: *"Is it better to skip this job, or take this job plus the best score we had with the remaining time?"*
$$\text{DP}[i][w] = \max(\text{DP}[i-1][w], \; \text{DP}[i-1][w - \text{Weight}_i] + \text{Value}_i)$$
Then it backtracks through the table to give the student the exact list of jobs to apply for.

---

## CHAPTER 6: APPLICATION FEATURES & WALKTHROUGH

### 6.1 Personalized Dashboard (`/`)
- Shows greeting: *"Good morning, Tanya"*.
- **4 KPI Cards:** Total Available Jobs (52), Recommended Jobs (18), Saved Jobs, and Applications Active.
- **Top Recommended Opportunities:** Displays the top 3 best-matching jobs with badges.
- **Pipeline Chart:** Visual bar chart showing how many applications are in Applied, Interview, or Offer stage.

### 6.2 Discover Jobs (`/discover`)
- Search bar using **KMP matching** across job titles and required skills.
- Filters for Location (Bengaluru, Pune, Remote, etc.), Work Mode, and Job Type.
- Switch between **Grid View** (cards) and **List View** (compact table).

### 6.3 Job Details Page (`/jobs/:id`)
- Full job description and company details.
- **Skill Match Analysis:** Shows matched skills in green chips and missing skills in red chips.
- **Academic Check:** Verifies if your CGPA and graduation year qualify.
- Score breakdown showing exactly how many points you got for skills, location, and salary.
- **Apply Now Modal:** Add round notes and track interview dates.

### 6.4 Recommended Jobs Page (`/recommended`)
- Lists jobs ranked with **Merge Sort**.
- Shows real-time proof: number of comparisons and execution time in milliseconds.
- Shows a plain-English explanation: *"Recommended because you match 80% of required skills (Java, SQL, Git) and prefer Remote internships."*

### 6.5 Saved Jobs & Side-by-Side Comparison (`/saved`)
- Bookmark jobs for later.
- Select any two saved jobs and click **"Compare Selected"** to see their requirements, salary, and scores side-by-side.

### 6.6 Application Tracker Kanban Board (`/applications`)
- Visual board with 6 columns:
  $$\text{Saved} \longrightarrow \text{Applied} \longrightarrow \text{OA (Online Assessment)} \longrightarrow \text{Interview} \longrightarrow \text{Offer} \longrightarrow \text{Rejected}$$
- Change application status with a single click.

### 6.7 Interactive DAA Algorithm Lab (`/algorithm-lab`)
An interactive testing area with 6 tabs:
1. **Sorting Tab:** Select input size (100 to 4,000 jobs) and watch Merge Sort beat Bubble Sort live.
2. **Searching Tab:** Compare how many comparisons Binary Search takes versus Linear Search.
3. **String Matching Tab:** Type any text and pattern; see KMP find matches and view the precalculated LPS array.
4. **Greedy Tab:** Adjust your weekly hours slider and see jobs picked by Strategy A, B, or C.
5. **Dynamic Programming Tab:** Run 0/1 Knapsack, inspect the 2D matrix numbers, and see it beat the greedy score.
6. **Performance Analysis Tab:** Live line charts showing $O(n^2)$ vs $O(n \log n)$ curves using real measured data.

---

## CHAPTER 7: TEST RESULTS & PERFORMANCE BENCHMARKS

### 7.1 Automated Tests (21 Tests Passed)
We wrote an automated test suite testing all algorithms against edge cases (empty lists, duplicates, reverse lists, budget limits).

```text
▶ Sorting Tests: Merge Sort handles empty list, duplicates, reverse order -> PASSED
▶ Searching Tests: Binary Search finds first, middle, last, missing elements -> PASSED
▶ KMP Tests: LPS calculation, repetitive patterns, empty pattern -> PASSED
▶ Greedy Tests: Never exceeds budget, excludes ineligible jobs -> PASSED
▶ Knapsack DP Tests: Finds optimal solution where greedy fails -> PASSED

Total: 21 Passed, 0 Failed (Duration: 328 ms)
```

### 7.2 Benchmark Comparison 1: Merge Sort vs. Bubble Sort
Measured live on the system:

| Input Size ($N$) | Merge Sort Time | Bubble Sort Time | Merge Sort Comparisons | Bubble Sort Comparisons | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$N = 100$ jobs** | $0.82 \text{ ms}$ | $1.41 \text{ ms}$ | $548$ | $4,850$ | Merge Sort $1.7\times$ faster |
| **$N = 500$ jobs** | $2.31 \text{ ms}$ | $11.85 \text{ ms}$ | $3,832$ | $124,190$ | Merge Sort $5.1\times$ faster |
| **$N = 1,000$ jobs**| $4.76 \text{ ms}$ | $44.92 \text{ ms}$ | $8,698$ | $498,340$ | Merge Sort $9.4\times$ faster |
| **$N = 4,000$ jobs**| $18.45 \text{ ms}$| $742.10 \text{ ms}$| $41,290$ | $7,994,200$ | **Merge Sort $40\times$ faster!** |

*Takeaway:* As the number of jobs grows, Bubble Sort slows down dramatically ($O(n^2)$), while Merge Sort stays fast ($O(n \log n)$).

### 7.3 Benchmark Comparison 2: Linear Search vs. Binary Search

| Dataset Size ($N$) | Linear Search Checks | Binary Search Checks | Savings |
| :--- | :--- | :--- | :--- |
| **$N = 100$ jobs** | $75$ checks | $6$ checks | $92\%$ fewer operations |
| **$N = 1,000$ jobs** | $750$ checks | $9$ checks | $98.8\%$ fewer operations |
| **$N = 10,000$ jobs**| $7,500$ checks | $13$ checks | **$99.8\%$ fewer operations!** |

*Takeaway:* For 10,000 jobs, Linear Search checks 7,500 items, while Binary Search finds the answer in just 13 steps.

---

## CHAPTER 8: CONCLUSION & FUTURE WORK

### 8.1 Summary
CareerMatch shows how theoretical algorithms from the DAA syllabus directly solve practical problems in real life:
- **Divide and Conquer (Merge Sort)** ranks opportunities fairly and quickly.
- **Decrease and Conquer (Binary Search)** speeds up salary lookups by 99%.
- **Pattern Matching (KMP)** matches skills accurately without backtracking.
- **Dynamic Programming (0/1 Knapsack)** guarantees students pick the highest-value jobs within their weekly study hours.

### 8.2 Future Enhancements
1. **Resume PDF Upload:** Automatically read skills directly from an uploaded PDF resume.
2. **Email Alerts:** Send an email when a new job matching 80%+ of your skills is posted.
3. **Multi-Student Accounts:** Add login and sign-up authentication so multiple students can track applications simultaneously.

---

## APPENDIX: COMMON VIVA QUESTIONS & SIMPLE ANSWERS

**Q1: Why did you pick Merge Sort instead of Quick Sort?**  
*Answer:* Merge Sort guarantees $O(n \log n)$ time in all cases (worst, average, and best). Quick Sort can degrade to $O(n^2)$ if the pivot is chosen poorly. Also, Merge Sort is *stable*, meaning if two jobs have the exact same match score, their original order is never scrambled.

**Q2: What is the main advantage of the KMP algorithm over a simple search?**  
*Answer:* A simple search moves backward in the text whenever a letter does not match, which wastes time ($O(n \times m)$). KMP uses a precomputed table (the LPS array) so the search pointer in the text *never moves backward*, making it run in strict linear time $O(n + m)$.

**Q3: Why doesn't the Greedy method always give the best answer for 0/1 Knapsack?**  
*Answer:* Because in 0/1 Knapsack you cannot divide an item. If a greedy rule picks one big job that gives 90 points, it might fill your entire time limit and leave you with 0 minutes left. But picking two smaller jobs might give $55 + 55 = 110$ points! Dynamic Programming tests these combinations to guarantee the highest total score.
