/**
 * 0/1 Knapsack Dynamic Programming Implementation for CareerMatch
 *
 * Problem:
 *   Given N job opportunities, each with:
 *     - Value = Recommendation Score (V_i)
 *     - Weight = Estimated Application Time in minutes (W_i)
 *   Find a subset of jobs that maximizes total score without exceeding time budget C.
 *
 * Recurrence Relation:
 *   DP[i][w] = DP[i-1][w]                                      if W_i > w
 *   DP[i][w] = max(DP[i-1][w], DP[i-1][w - W_i] + V_i)         if W_i <= w
 *
 * Time Complexity:  O(n * W)
 * Space Complexity: O(n * W)
 */

function knapsackJobSelection(jobs, capacityMinutes, options = {}) {
  const {
    filterEligible = true,
    // Step discretization for time to optimize DP matrix size (e.g. 5 or 10 min steps)
    timeStep = 5
  } = options;

  const startTime = performance.now();

  // 1. Filter eligible candidates
  const candidates = jobs.filter(job => {
    if (filterEligible && job.isEligible === false) return false;
    const timeNeeded = Number(job.estimatedApplicationMinutes) || 60;
    return timeNeeded > 0;
  });

  const n = candidates.length;

  if (n === 0 || capacityMinutes <= 0) {
    return {
      capacityMinutes,
      timeSpentMinutes: 0,
      remainingTimeMinutes: capacityMinutes,
      totalScore: 0,
      selectedCount: 0,
      selectedJobs: [],
      tablePreview: [],
      executionTimeMs: 0,
      algorithm: '0/1 Knapsack (Dynamic Programming)'
    };
  }

  // 2. Map weights and values
  // Discretize capacity and weights by timeStep (e.g., 5 min)
  const step = Math.max(1, timeStep);
  const W = Math.floor(capacityMinutes / step);

  const weights = [];
  const values = [];

  for (let i = 0; i < n; i++) {
    const rawTime = Number(candidates[i].estimatedApplicationMinutes) || 60;
    const w = Math.max(1, Math.round(rawTime / step));
    const v = Math.round((Number(candidates[i].recommendationScore ?? candidates[i].score) || 50) * 10); // scale x10 for precision
    weights.push(w);
    values.push(v);
  }

  // 3. Build (n + 1) x (W + 1) DP table
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const itemWeight = weights[i - 1];
    const itemValue = values[i - 1];

    for (let w = 0; w <= W; w++) {
      if (itemWeight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - itemWeight] + itemValue);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // 4. Backtrack to find selected jobs
  const selectedJobs = [];
  let remainingW = W;
  let totalTimeSpent = 0;

  for (let i = n; i > 0 && remainingW > 0; i--) {
    if (dp[i][remainingW] !== dp[i - 1][remainingW]) {
      // Item (i - 1) was included
      const selectedItem = candidates[i - 1];
      selectedJobs.push(selectedItem);
      remainingW -= weights[i - 1];
      totalTimeSpent += selectedItem.estimatedApplicationMinutes;
    }
  }

  // Reverse so they appear in top-down order
  selectedJobs.reverse();

  const optimalScore = Number((dp[n][W] / 10).toFixed(2));
  const endTime = performance.now();

  // 5. Generate a lightweight visualization matrix (first 6 items, sampled weight columns)
  const previewRows = Math.min(n, 7);
  const sampleSteps = Math.min(W, 10);
  const colStep = Math.max(1, Math.floor(W / sampleSteps));
  const tablePreview = {
    headers: ['Item / Job Title', 'Weight (min)', 'Score (val)'],
    sampleCapacities: [],
    matrix: []
  };

  for (let col = 0; col <= W; col += colStep) {
    tablePreview.sampleCapacities.push(col * step);
  }

  for (let i = 0; i <= previewRows; i++) {
    const row = {
      label: i === 0 ? '0 (Base Case)' : `${i}. ${candidates[i - 1].title.substring(0, 18)}...`,
      weight: i === 0 ? 0 : candidates[i - 1].estimatedApplicationMinutes,
      value: i === 0 ? 0 : Number((values[i - 1] / 10).toFixed(1)),
      values: []
    };
    for (let col = 0; col <= W; col += colStep) {
      row.values.push(Number((dp[i][col] / 10).toFixed(1)));
    }
    tablePreview.matrix.push(row);
  }

  return {
    capacityMinutes,
    timeSpentMinutes: totalTimeSpent,
    remainingTimeMinutes: Math.max(0, capacityMinutes - totalTimeSpent),
    totalScore: optimalScore,
    averageScore:
      selectedJobs.length > 0
        ? Number((optimalScore / selectedJobs.length).toFixed(2))
        : 0,
    selectedCount: selectedJobs.length,
    selectedJobs,
    tableDimensions: { rows: n + 1, cols: W + 1 },
    tablePreview,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    algorithm: '0/1 Knapsack (Dynamic Programming)'
  };
}

module.exports = { knapsackJobSelection };
