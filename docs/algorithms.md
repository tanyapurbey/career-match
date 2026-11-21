# CareerMatch — Core DAA Algorithms Specification & Implementation Guide

This document details the mathematical formulation, algorithmic logic, pseudocode, and implementation nuances of the 5 core Design and Analysis of Algorithms (DAA) concepts implemented in **CareerMatch — Smart Internship & Job Recommendation System**.

---

## 1. Merge Sort (Divide and Conquer)

### Problem Solved
Given an unsorted collection of $N$ job opportunities, each with a multi-factor recommendation score $S_i \in [0, 100]$, rank the opportunities in descending order such that the highest-matching opportunities appear first.

### Algorithmic Concept
Merge Sort operates on the **Divide and Conquer** paradigm:
1. **Divide**: Split the array into two halves at midpoint $m = \lfloor (l + r) / 2 \rfloor$.
2. **Conquer**: Recursively sort each subarray until the base case ($|A| \le 1$) is reached.
3. **Combine**: Merge the two sorted subarrays in linear time using a two-pointer technique.

### Stability Requirement
When two job opportunities share an identical score (e.g., $S_A = S_B = 85.0$), Merge Sort guarantees **stability** by preserving their original database insertion order ($A$ before $B$). In our implementation, we enforce stability by taking the left element when $val_L \ge val_R$ during descending merge passes:
```javascript
let takeLeft = (order === 'desc') ? (valL >= valR) : (valL <= valR);
```

### Pseudocode
```text
Algorithm MergeSort(A, order)
Input: Array A of job objects, sorting order ('asc' or 'desc')
Output: Sorted array A

function DivideAndConquer(subList)
    if length(subList) <= 1 then
        return subList
    mid = floor(length(subList) / 2)
    left = DivideAndConquer(subList[0 ... mid - 1])
    right = DivideAndConquer(subList[mid ... end])
    return Merge(left, right, order)

function Merge(left, right, order)
    result = []
    i = 0, j = 0
    while i < length(left) and j < length(right) do
        if (order == 'desc' and left[i].score >= right[j].score) or
           (order == 'asc' and left[i].score <= right[j].score) then
            result.append(left[i])
            i = i + 1
        else
            result.append(right[j])
            j = j + 1
    append remaining elements of left to result
    append remaining elements of right to result
    return result
```

### Complexity Derivation
- Recurrence relation: $T(n) = 2T(n/2) + \Theta(n)$
- By the Master Theorem ($a = 2, b = 2, f(n) = \Theta(n)$ where $\log_b a = 1$):
  - **Best Case:** $O(n \log n)$
  - **Average Case:** $O(n \log n)$
  - **Worst Case:** $O(n \log n)$
- **Space Complexity:** $O(n)$ auxiliary memory for merging.

---

## 2. Binary Search (Iterative, Recursive, and Range Search)

### Problem Solved
Given an array of job postings sorted in ascending order by minimum stipend/salary $W_i$, find matching opportunities or locate lower and upper indices bounding a salary filter $[W_{\min}, W_{\max}]$.

### Algorithmic Concept
Binary Search operates by halving the search space at each iteration:
- Compare target with the middle element $A[mid]$.
- If target matches, return $mid$.
- If target is greater, discard the left half ($low = mid + 1$).
- If target is smaller, discard the right half ($high = mid - 1$).

### Binary Search for Salary Range $[W_{\min}, W_{\max}]$
To efficiently retrieve all jobs within a salary filter in a large dataset:
1. **Lower Bound:** Find the first index $i$ such that $A[i].\text{salary} \ge W_{\min}$ in $O(\log n)$.
2. **Upper Bound:** Find the last index $j$ such that $A[j].\text{salary} \le W_{\max}$ in $O(\log n)$.
3. Return the sub-slice $A[i \dots j]$ in $O(\log n + k)$ time where $k$ is the number of results.

### Pseudocode
```text
Algorithm BinarySearchLowerBound(A, minVal)
Input: Ascending sorted array A, threshold minVal
Output: First index where A[index].salary >= minVal

low = 0, high = length(A) - 1, ans = length(A)
while low <= high do
    mid = floor((low + high) / 2)
    if A[mid].salary >= minVal then
        ans = mid
        high = mid - 1  // Look left for earlier occurrence
    else
        low = mid + 1
return ans
```

### Complexity
- **Time Complexity:**
  - Best Case: $O(1)$ (target is at midpoint on first check)
  - Average Case: $O(\log n)$
  - Worst Case: $O(\log n)$
- **Space Complexity:**
  - Iterative: $O(1)$
  - Recursive: $O(\log n)$ due to function call stack frames.

---

## 3. String Matching — Knuth-Morris-Pratt (KMP)

### Problem Solved
Match student skills (e.g., "React", "Spring Boot", "Data Structures") against unstructured job descriptions and title strings $T$ of length $n$ with pattern $P$ of length $m$.

### Algorithmic Concept
The Naive algorithm backtracks to $T[i - j + 1]$ upon a character mismatch, resulting in worst-case $O(n \times m)$ runtime on repetitive text (e.g., text `AAAAAB`, pattern `AAAB`).
KMP avoids backtracking in $T$ by preprocessing $P$ into an **LPS (Longest Proper Prefix which is also Suffix)** array:
- `LPS[i]` stores the length of the longest proper prefix of $P[0 \dots i]$ that matches a suffix of $P[0 \dots i]$.
- When a mismatch occurs after $j$ matched characters, the next character to compare in $P$ is $P[\text{LPS}[j - 1]]$, while the text pointer $i$ never retreats.

### LPS Computation Pseudocode
```text
Algorithm ComputeLPS(P)
Input: Pattern string P of length m
Output: Array LPS of size m

LPS = array of zeros of size m
len = 0
i = 1
while i < m do
    if P[i] == P[len] then
        len = len + 1
        LPS[i] = len
        i = i + 1
    else
        if len != 0 then
            len = LPS[len - 1]  // fallback to previous prefix
        else
            LPS[i] = 0
            i = i + 1
return LPS
```

### Complexity
- Preprocessing Phase: $O(m)$
- Searching Phase: $O(n)$
- **Total Time Complexity:** $\Theta(n + m)$ in all cases.
- **Space Complexity:** $O(m)$ for the LPS array.

---

## 4. Greedy Job Selection

### Problem Solved
Students have a limited weekly application time budget $B$ (e.g., 180 minutes = 3 hours). Each application requires estimated time $W_i$ (customizing cover letters, solving take-home challenges) and yields an expected recommendation score $V_i$. Select opportunities within time $B$.

### Algorithmic Strategies
1. **Strategy A (Highest Score First):** Sort opportunities strictly by $V_i$ descending. Greedy choice: take the highest score job that fits in remaining time.
2. **Strategy B (Score-per-Minute Ratio):** Sort by $\rho_i = \frac{V_i}{W_i}$ descending. Greedy choice: maximize marginal score per minute spent.
3. **Strategy C (Deadline Urgency):** Sort by urgency-weighted score $\frac{V_i}{\sqrt{\text{Hours Left}}}$.

### Implementation Nuance
- Ineligible jobs (failing CGPA, degree, or experience requirements) are filtered out prior to selection.
- All candidate rankings use our custom **Merge Sort** rather than built-in sort.

---

## 5. Dynamic Programming — 0/1 Knapsack

### Problem Solved
Find the **globally optimal** subset of job applications that maximizes total recommendation score without exceeding weekly application time budget $B$.

### Why Greedy Fails (Counterexample)
Consider Capacity $B = 100$ minutes:
- Job 1: Score = 90, Time = 100 min ($\rho = 0.90$)
- Job 2: Score = 55, Time = 50 min ($\rho = 1.10$)
- Job 3: Score = 55, Time = 50 min ($\rho = 1.10$)

1. **Greedy Highest Score First** picks Job 1 $\rightarrow$ Total Score = **90 pts** (Capacity filled).
2. **Dynamic Programming** evaluates combinations and selects Job 2 + Job 3 $\rightarrow$ Total Score = $55 + 55 =$ **110 pts** (Capacity 100 min).
Greedy leaves an unusable time gap or fails due to the discrete 0/1 (all-or-nothing) nature of applications.

### Recurrence Relation
Let $DP[i][w]$ represent the maximum score attainable considering the first $i$ jobs with capacity $w$:
$$
DP[i][w] =
\begin{cases}
DP[i-1][w] & \text{if } W_i > w \\
\max(DP[i-1][w], \; DP[i-1][w - W_i] + V_i) & \text{if } W_i \le w
\end{cases}
$$

### Backtracking Reconstruction
To extract the exact jobs chosen:
```text
remainingW = W
selected = []
for i = N down to 1 do
    if DP[i][remainingW] != DP[i-1][remainingW] then
        selected.append(Job[i-1])
        remainingW = remainingW - W[i-1]
```

### Complexity
- **Time Complexity:** $O(n \cdot W)$ where $n$ is the number of eligible opportunities and $W = \lfloor B / \text{step} \rfloor$.
- **Space Complexity:** $O(n \cdot W)$ to preserve the full matrix for backtracking and UI table visualization.
