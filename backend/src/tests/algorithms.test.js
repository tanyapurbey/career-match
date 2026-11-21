const { describe, it } = require('node:test');
const assert = require('node:assert');

const { mergeSort } = require('../algorithms/sorting/mergeSort');
const { bubbleSort } = require('../algorithms/sorting/bubbleSort');
const { linearSearch, linearSearchRange } = require('../algorithms/searching/linearSearch');
const {
  binarySearchIterative,
  binarySearchRecursive,
  binarySearchRange
} = require('../algorithms/searching/binarySearch');
const { kmpSearch, computeLPSArray } = require('../algorithms/stringMatching/kmp');
const { naiveSearch } = require('../algorithms/stringMatching/naiveMatch');
const { greedyJobSelection } = require('../algorithms/greedy/greedyJobSelection');
const { knapsackJobSelection } = require('../algorithms/dynamicProgramming/knapsackJobSelection');

describe('DAA Algorithm Test Suite: Sorting Algorithms', () => {
  it('Merge Sort handles empty dataset', () => {
    const res = mergeSort([]);
    assert.deepStrictEqual(res.sorted, []);
    assert.strictEqual(res.datasetSize, 0);
  });

  it('Merge Sort handles single element', () => {
    const res = mergeSort([{ score: 85 }]);
    assert.deepStrictEqual(res.sorted, [{ score: 85 }]);
  });

  it('Merge Sort sorts already sorted descending array correctly', () => {
    const input = [{ score: 90 }, { score: 80 }, { score: 70 }];
    const res = mergeSort(input, { key: 'score', order: 'desc' });
    assert.deepStrictEqual(res.sorted.map(x => x.score), [90, 80, 70]);
  });

  it('Merge Sort sorts reverse sorted array correctly', () => {
    const input = [{ score: 10 }, { score: 50 }, { score: 90 }];
    const res = mergeSort(input, { key: 'score', order: 'desc' });
    assert.deepStrictEqual(res.sorted.map(x => x.score), [90, 50, 10]);
  });

  it('Merge Sort maintains stability on duplicate scores', () => {
    const input = [
      { id: 'A', score: 80 },
      { id: 'B', score: 90 },
      { id: 'C', score: 80 },
      { id: 'D', score: 80 }
    ];
    const res = mergeSort(input, { key: 'score', order: 'desc' });
    assert.strictEqual(res.sorted[0].id, 'B');
    // Stable sort should preserve A before C before D
    assert.strictEqual(res.sorted[1].id, 'A');
    assert.strictEqual(res.sorted[2].id, 'C');
    assert.strictEqual(res.sorted[3].id, 'D');
  });

  it('Bubble Sort produces identical sorted order to Merge Sort', () => {
    const input = [{ score: 45 }, { score: 92 }, { score: 12 }, { score: 78 }, { score: 60 }];
    const mergeRes = mergeSort(input, { key: 'score', order: 'desc' });
    const bubbleRes = bubbleSort(input, { key: 'score', order: 'desc' });
    assert.deepStrictEqual(
      mergeRes.sorted.map(x => x.score),
      bubbleRes.sorted.map(x => x.score)
    );
  });
});

describe('DAA Algorithm Test Suite: Searching Algorithms', () => {
  const sortedSalaries = [
    { id: 1, salaryMin: 20000 },
    { id: 2, salaryMin: 35000 },
    { id: 3, salaryMin: 50000 },
    { id: 4, salaryMin: 65000 },
    { id: 5, salaryMin: 80000 },
    { id: 6, salaryMin: 95000 }
  ];

  it('Binary Search (Iterative & Recursive) finds existing target', () => {
    const iter = binarySearchIterative(sortedSalaries, 50000);
    const rec = binarySearchRecursive(sortedSalaries, 50000);
    assert.strictEqual(iter.found, true);
    assert.strictEqual(iter.index, 2);
    assert.strictEqual(rec.found, true);
    assert.strictEqual(rec.index, 2);
  });

  it('Binary Search reports not found when target does not exist', () => {
    const iter = binarySearchIterative(sortedSalaries, 42000);
    assert.strictEqual(iter.found, false);
    assert.strictEqual(iter.index, -1);
  });

  it('Binary Search finds first element and last element', () => {
    const first = binarySearchIterative(sortedSalaries, 20000);
    const last = binarySearchIterative(sortedSalaries, 95000);
    assert.strictEqual(first.index, 0);
    assert.strictEqual(last.index, sortedSalaries.length - 1);
  });

  it('Binary Search Range retrieves exact interval [min, max]', () => {
    const res = binarySearchRange(sortedSalaries, 35000, 80000);
    assert.strictEqual(res.count, 4);
    assert.strictEqual(res.results[0].salaryMin, 35000);
    assert.strictEqual(res.results[res.results.length - 1].salaryMin, 80000);
  });

  it('Linear Search vs Binary Search yield consistent results', () => {
    const lin = linearSearch(sortedSalaries, 65000);
    const bin = binarySearchIterative(sortedSalaries, 65000);
    assert.strictEqual(lin.found, bin.found);
    assert.strictEqual(lin.index, bin.index);
  });
});

describe('DAA Algorithm Test Suite: String Matching (KMP)', () => {
  it('KMP computes correct LPS array', () => {
    // Pattern: "ABABCABAB"
    // LPS: [0, 0, 1, 2, 0, 1, 2, 3, 4]
    const { lps } = computeLPSArray('ABABCABAB');
    assert.deepStrictEqual(lps, [0, 0, 1, 2, 0, 1, 2, 3, 4]);
  });

  it('KMP finds pattern at beginning, middle, and end', () => {
    const text = 'React developer building React applications with React';
    const res = kmpSearch(text, 'React');
    assert.strictEqual(res.matchCount, 3);
    assert.strictEqual(res.matches[0].startIndex, 0);
    assert.strictEqual(res.matches[2].startIndex, 49);
  });

  it('KMP handles pattern not found', () => {
    const res = kmpSearch('Python Django backend', 'Kubernetes');
    assert.strictEqual(res.matchCount, 0);
  });

  it('KMP handles empty pattern gracefully', () => {
    const res = kmpSearch('Some text', '');
    assert.strictEqual(res.matchCount, 0);
  });

  it('KMP and Naive Match return identical match indices on repetitive strings', () => {
    const text = 'AAAAABAAAAABAAAAAB';
    const pattern = 'AAAB';
    const kmpRes = kmpSearch(text, pattern);
    const naiveRes = naiveSearch(text, pattern);
    assert.strictEqual(kmpRes.matchCount, naiveRes.matchCount);
    assert.deepStrictEqual(
      kmpRes.matches.map(m => m.startIndex),
      naiveRes.matches.map(m => m.startIndex)
    );
  });
});

describe('DAA Algorithm Test Suite: Greedy Job Selection', () => {
  const sampleJobs = [
    { id: 1, title: 'Job A', recommendationScore: 90, estimatedApplicationMinutes: 60, isEligible: true },
    { id: 2, title: 'Job B', recommendationScore: 80, estimatedApplicationMinutes: 30, isEligible: true },
    { id: 3, title: 'Job C', recommendationScore: 70, estimatedApplicationMinutes: 60, isEligible: true },
    { id: 4, title: 'Job Ineligible', recommendationScore: 99, estimatedApplicationMinutes: 15, isEligible: false }
  ];

  it('Greedy excludes ineligible jobs', () => {
    const res = greedyJobSelection(sampleJobs, 120, { strategy: 'score' });
    const hasIneligible = res.selectedJobs.some(j => j.id === 4);
    assert.strictEqual(hasIneligible, false);
  });

  it('Greedy never exceeds time budget', () => {
    const budget = 90;
    const res = greedyJobSelection(sampleJobs, budget, { strategy: 'ratio' });
    assert.ok(res.timeSpentMinutes <= budget);
    assert.ok(res.remainingTimeMinutes >= 0);
  });

  it('Greedy ratio strategy prioritizes higher score-per-minute ratio', () => {
    // Job B has 80/30 = 2.67 score/min. Job A has 90/60 = 1.5 score/min.
    const res = greedyJobSelection(sampleJobs, 90, { strategy: 'ratio' });
    assert.strictEqual(res.selectedJobs[0].id, 2); // Job B chosen first
  });
});

describe('DAA Algorithm Test Suite: Dynamic Programming (0/1 Knapsack)', () => {
  it('DP Knapsack achieves optimal value where greedy score-first fails', () => {
    // Classic Counterexample:
    // Capacity = 100
    // Job 1: Value = 90, Weight = 100  (Greedy score first takes Job 1 -> total value 90)
    // Job 2: Value = 55, Weight = 50
    // Job 3: Value = 55, Weight = 50   (DP takes Job 2 + Job 3 -> total value 110!)
    const counterExampleJobs = [
      { id: 1, title: 'Job 1', recommendationScore: 90, estimatedApplicationMinutes: 100, isEligible: true },
      { id: 2, title: 'Job 2', recommendationScore: 55, estimatedApplicationMinutes: 50, isEligible: true },
      { id: 3, title: 'Job 3', recommendationScore: 55, estimatedApplicationMinutes: 50, isEligible: true }
    ];

    const greedyRes = greedyJobSelection(counterExampleJobs, 100, { strategy: 'score' });
    const dpRes = knapsackJobSelection(counterExampleJobs, 100, { timeStep: 5 });

    assert.strictEqual(greedyRes.totalScore, 90);
    assert.strictEqual(dpRes.totalScore, 110);
    assert.ok(dpRes.totalScore > greedyRes.totalScore);
    assert.strictEqual(dpRes.selectedJobs.length, 2);
  });

  it('DP Knapsack excludes ineligible jobs and handles zero capacity', () => {
    const jobs = [
      { id: 1, title: 'Job A', recommendationScore: 80, estimatedApplicationMinutes: 60, isEligible: false }
    ];
    const resZero = knapsackJobSelection(jobs, 0);
    assert.strictEqual(resZero.selectedCount, 0);
    assert.strictEqual(resZero.totalScore, 0);

    const resIneligible = knapsackJobSelection(jobs, 100);
    assert.strictEqual(resIneligible.selectedCount, 0);
  });
});
