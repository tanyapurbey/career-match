# CareerMatch — REST API Documentation

Base URL: `http://localhost:5000/api`

---

## 1. Student / Profile APIs

### `GET /api/profile`
Retrieve demo student profile including academic metrics, verified skills, and career preferences.
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "Tanya Sharma",
    "email": "tanya.sharma@example.edu",
    "college": "National Institute of Technology",
    "degree": "B.Tech",
    "branch": "Computer Science and Engineering",
    "graduationYear": 2026,
    "cgpa": 8.65,
    "availableHoursPerWeek": 18.0,
    "skills": [...],
    "preference": {...}
  }
}
```

### `PUT /api/profile`
Update student academic details and available weekly application hours.
- **Request Body**:
```json
{
  "fullName": "Tanya Sharma",
  "phone": "+91 98765 43210",
  "college": "NIT",
  "degree": "B.Tech",
  "branch": "CSE",
  "graduationYear": 2026,
  "cgpa": 8.75,
  "availableHoursPerWeek": 20.0
}
```

### `PUT /api/profile/skills`
Update full list of verified student skills.
- **Request Body**:
```json
{
  "skills": [
    { "name": "Java", "category": "Programming Languages", "proficiencyLevel": "Advanced" },
    { "name": "React", "category": "Frameworks", "proficiencyLevel": "Intermediate" }
  ]
}
```

---

## 2. Jobs APIs

### `GET /api/jobs`
Query all opportunities with multi-parameter filtering, KMP search, and sorting.
- **Query Parameters**:
  - `search`: String matching query (KMP-backed)
  - `location`: "Bengaluru", "Pune", "Remote", etc.
  - `workMode`: "Remote", "Hybrid", "On-site"
  - `jobType`: "Internship", "Full-time", "Graduate Program"
  - `minSalary`: Minimum stipend / salary cutoff
  - `minMatch`: Minimum skill match percentage (e.g., `50`)
  - `sortBy`: `relevance` (Merge Sort), `newest`, `salary`, `match`

### `GET /api/jobs/:id`
Retrieve detailed breakdown for a specific job posting, including comprehensive multi-factor scoring formula and eligibility audit.

### `GET /api/jobs/recommended`
Retrieve opportunities strictly ranked by the DAA Merge Sort recommendation engine.
- **Query Parameters**:
  - `filterEligible`: `true` | `false`
  - `sortBy`: `relevance` | `skillMatch` | `salary`
  - `limit`: Number of records (default: 50)

---

## 3. Application Tracking APIs

### `GET /api/applications`
Retrieve pipeline of student applications with stages: `Saved`, `Applied`, `OA`, `Interview`, `Offer`, `Rejected`, `Withdrawn`.

### `POST /api/applications`
Submit or track an application for a specific job.
- **Request Body**:
```json
{
  "jobId": "job-uuid",
  "status": "Applied",
  "notes": "Referred by senior on LinkedIn",
  "interviewDate": "2026-11-28T10:00:00Z"
}
```

### `PATCH /api/applications/:id/status`
Update status column directly (e.g. from Kanban drag/drop or selector).
- **Request Body**: `{ "status": "Interview" }`

---

## 4. DAA Algorithm APIs

### `POST /api/algorithms/sort`
Execute live Merge Sort vs Bubble Sort comparison on synthetic or custom datasets.
- **Request Body**:
```json
{
  "datasetSize": 500,
  "algorithm": "both",
  "key": "score",
  "order": "desc"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "datasetSize": 500,
    "mergeSort": {
      "comparisons": 3832,
      "executionTimeMs": 2.31,
      "algorithm": "Merge Sort"
    },
    "bubbleSort": {
      "comparisons": 124190,
      "swaps": 62410,
      "executionTimeMs": 11.85,
      "algorithm": "Bubble Sort"
    }
  }
}
```

### `POST /api/algorithms/search`
Compare Linear Search vs Binary Search.
- **Request Body**:
```json
{
  "datasetSize": 1000,
  "targetSalary": 45000,
  "mode": "exact"
}
```

### `POST /api/algorithms/string-match`
Compare Knuth-Morris-Pratt (KMP) vs Naive String Matching.
- **Request Body**:
```json
{
  "pattern": "React",
  "text": "Seeking a Full Stack Engineer with React and Node.js..."
}
```

### `POST /api/algorithms/greedy-selection`
Run Greedy application selector under a weekly time budget.
- **Request Body**:
```json
{
  "timeBudgetMinutes": 180,
  "strategy": "ratio"
}
```

### `POST /api/algorithms/knapsack`
Run 0/1 Knapsack Dynamic Programming with comparison against greedy heuristics.
- **Request Body**:
```json
{
  "capacityMinutes": 180,
  "compareWithGreedy": true
}
```

### `POST /api/algorithms/benchmark`
Run multi-size benchmark across sorting, searching, string matching, and knapsack optimization.
- **Request Body**: `{ "type": "all" }`
