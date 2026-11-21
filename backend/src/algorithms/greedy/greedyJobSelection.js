const { mergeSort } = require('../sorting/mergeSort');

/**
 * Greedy Job Selection Algorithm
 *
 * Strategies:
 *   1. 'score' (Strategy A): Highest Recommendation Score first
 *   2. 'ratio' (Strategy B): Highest Score-per-Minute ratio first (Value / Weight)
 *   3. 'deadline' (Strategy C): Earliest Deadline first (with score tie-breaker)
 *
 * Time Complexity:
 *   - Sorting: O(n log n) using custom Merge Sort
 *   - Selection: O(n) single pass
 *   - Overall: O(n log n)
 * Space Complexity: O(n) auxiliary list
 */

function greedyJobSelection(jobs, timeBudgetMinutes, options = {}) {
  const {
    strategy = 'ratio', // 'score', 'ratio', or 'deadline'
    filterEligible = true
  } = options;

  const startTime = performance.now();

  // 1. Filter out ineligible jobs and jobs with missing or invalid metrics
  let candidates = jobs.filter(job => {
    if (filterEligible && job.isEligible === false) return false;
    const timeNeeded = Number(job.estimatedApplicationMinutes) || 60;
    return timeNeeded > 0;
  });

  // 2. Prepare items with computed metric for the chosen strategy
  const now = new Date().getTime();
  const prepared = candidates.map(job => {
    const score = Number(job.recommendationScore ?? job.score ?? 50);
    const timeNeeded = Number(job.estimatedApplicationMinutes) || 60;
    const ratio = Number((score / timeNeeded).toFixed(4));

    // Deadline urgency in hours from now
    const deadlineTime = job.applicationDeadline
      ? new Date(job.applicationDeadline).getTime()
      : now + 30 * 86400000;
    const hoursLeft = Math.max(1, Math.round((deadlineTime - now) / 3600000));

    // Composite urgency metric: higher score and sooner deadline
    const deadlineScore = Number(((score * 100) / Math.sqrt(hoursLeft)).toFixed(2));

    return {
      ...job,
      recommendationScore: score,
      estimatedApplicationMinutes: timeNeeded,
      scorePerMinuteRatio: ratio,
      hoursLeft,
      deadlineScore
    };
  });

  // 3. Determine sorting key and order based on Strategy
  let sortKey = 'scorePerMinuteRatio';
  if (strategy === 'score') {
    sortKey = 'recommendationScore';
  } else if (strategy === 'deadline') {
    sortKey = 'deadlineScore';
  } else {
    sortKey = 'scorePerMinuteRatio';
  }

  // 4. Sort candidates using our custom Merge Sort O(n log n)
  const { sorted: rankedCandidates, comparisons: sortComparisons } = mergeSort(
    prepared,
    { key: sortKey, order: 'desc' }
  );

  // 5. Greedy Selection: pick as many as can fit within time budget
  const selectedJobs = [];
  let totalTimeSpent = 0;
  let totalScore = 0;
  let skippedDueToTime = 0;

  for (let i = 0; i < rankedCandidates.length; i++) {
    const item = rankedCandidates[i];
    const duration = item.estimatedApplicationMinutes;

    if (totalTimeSpent + duration <= timeBudgetMinutes) {
      selectedJobs.push(item);
      totalTimeSpent += duration;
      totalScore += item.recommendationScore;
    } else {
      skippedDueToTime++;
    }
  }

  const endTime = performance.now();
  const remainingTimeMinutes = timeBudgetMinutes - totalTimeSpent;

  return {
    strategy,
    timeBudgetMinutes,
    timeSpentMinutes: totalTimeSpent,
    remainingTimeMinutes,
    totalScore: Number(totalScore.toFixed(2)),
    averageScore:
      selectedJobs.length > 0
        ? Number((totalScore / selectedJobs.length).toFixed(2))
        : 0,
    selectedCount: selectedJobs.length,
    totalCandidates: candidates.length,
    skippedDueToTime,
    selectedJobs,
    sortComparisons,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    algorithm: `Greedy Job Selection (${strategy.toUpperCase()})`
  };
}

module.exports = { greedyJobSelection };
