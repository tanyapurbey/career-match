const { mergeSort } = require('../algorithms/sorting/mergeSort');
const { bubbleSort } = require('../algorithms/sorting/bubbleSort');
const { compareSorting } = require('../algorithms/sorting/index');
const { linearSearch } = require('../algorithms/searching/linearSearch');
const { binarySearchIterative } = require('../algorithms/searching/binarySearch');
const { compareStringMatching } = require('../algorithms/stringMatching/index');
const { greedyJobSelection } = require('../algorithms/greedy/greedyJobSelection');
const { knapsackJobSelection } = require('../algorithms/dynamicProgramming/knapsackJobSelection');

/**
 * Generate synthetic job benchmark records of size N
 */
function generateSyntheticDataset(size) {
  const titles = [
    'Backend Intern', 'Frontend Intern', 'Full Stack Intern', 'Data Analyst Intern',
    'AI Engineer Intern', 'DevOps Intern', 'Cloud Architect Intern', 'QA Automation Intern'
  ];
  const companies = ['TechCorp', 'InnoSoft', 'AlphaData', 'CloudFlow', 'NextGen', 'OmniSys', 'QuantumCode'];

  const dataset = [];
  for (let i = 0; i < size; i++) {
    const score = Number((Math.random() * 60 + 40).toFixed(1)); // 40.0 - 100.0
    const salary = Math.floor(Math.random() * 80000 + 20000); // 20k - 100k
    const timeNeeded = Math.floor(Math.random() * 5 + 2) * 15; // 30, 45, 60, 75, 90 min

    dataset.push({
      id: `synth-${i + 1}`,
      title: `${titles[i % titles.length]} #${i + 1}`,
      companyName: companies[i % companies.length],
      score,
      recommendationScore: score,
      salaryMin: salary,
      salaryMax: salary + 15000,
      estimatedApplicationMinutes: timeNeeded,
      isEligible: true,
      applicationDeadline: new Date(Date.now() + (i % 30 + 1) * 86400000)
    });
  }
  return dataset;
}

/**
 * Benchmark Sorting Algorithms across multiple input sizes
 */
function runSortingBenchmark(sizes = [100, 500, 1000, 2500, 5000]) {
  const results = [];

  for (const n of sizes) {
    const data = generateSyntheticDataset(n);
    const comparison = compareSorting(data, { key: 'score', order: 'desc' });

    results.push({
      inputSize: n,
      mergeSort: {
        timeMs: comparison.mergeSort.executionTimeMs,
        comparisons: comparison.mergeSort.comparisons,
        mergeOperations: comparison.mergeSort.mergeOperations
      },
      bubbleSort: {
        timeMs: comparison.bubbleSort.executionTimeMs,
        comparisons: comparison.bubbleSort.comparisons,
        swaps: comparison.bubbleSort.swaps,
        skipped: comparison.bubbleSort.algorithm.includes('Skipped')
      },
      builtinSort: {
        timeMs: comparison.builtinSort.executionTimeMs,
        comparisons: comparison.builtinSort.comparisons
      }
    });
  }

  return results;
}

/**
 * Benchmark Searching Algorithms across multiple input sizes
 */
function runSearchingBenchmark(sizes = [100, 500, 1000, 5000, 10000]) {
  const results = [];

  for (const n of sizes) {
    const data = generateSyntheticDataset(n);
    // Sort for binary search
    const { sorted } = mergeSort(data, { key: 'salaryMin', order: 'asc' });

    // Target: picking salary at the 75th percentile to test realistic searches
    const target = sorted[Math.floor(n * 0.75)].salaryMin;

    const linRes = linearSearch(sorted, target, { key: 'salaryMin' });
    const binRes = binarySearchIterative(sorted, target, { key: 'salaryMin' });

    results.push({
      inputSize: n,
      targetValue: target,
      linearSearch: {
        timeMs: linRes.executionTimeMs,
        comparisons: linRes.comparisons,
        foundIndex: linRes.index
      },
      binarySearch: {
        timeMs: binRes.executionTimeMs,
        comparisons: binRes.comparisons,
        foundIndex: binRes.index
      },
      comparisonsRatio: Number((linRes.comparisons / Math.max(1, binRes.comparisons)).toFixed(1))
    });
  }

  return results;
}

/**
 * Benchmark String Matching Algorithms (Naive vs KMP)
 */
function runStringMatchBenchmark() {
  const testCases = [
    {
      label: 'Short Keyword Search',
      pattern: 'React',
      text: 'Seeking a Full Stack Developer skilled in React, Node.js, and modern React frameworks.'
    },
    {
      label: 'Long Repetitive String (Worst-case for Naive)',
      pattern: 'AAAAAB',
      text: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB and repeated AAAAAAAAAAAAAAAAAAAAAAAAAB patterns.'
    },
    {
      label: 'Standard Job Description Search',
      pattern: 'Data Structures and Algorithms',
      text: 'The candidate must demonstrate solid fundamentals in Data Structures and Algorithms, Object-Oriented Programming, and Database Management.'
    },
    {
      label: 'Multi-paragraph Corpus',
      pattern: 'microservices architecture',
      text: ('We build resilient scalable enterprise cloud systems using microservices architecture. '.repeat(40)) + ' Final requirement: microservices architecture proficiency.'
    }
  ];

  return testCases.map(tc => {
    const comparison = compareStringMatching(tc.text, tc.pattern);
    return {
      label: tc.label,
      pattern: tc.pattern,
      textLength: tc.text.length,
      patternLength: tc.pattern.length,
      kmp: {
        timeMs: comparison.kmp.executionTimeMs,
        comparisons: comparison.kmp.comparisons,
        matchCount: comparison.kmp.matchCount
      },
      naive: {
        timeMs: comparison.naive.executionTimeMs,
        comparisons: comparison.naive.comparisons,
        matchCount: comparison.naive.matchCount
      },
      comparisonsSaved: comparison.comparisonsSaved
    };
  });
}

/**
 * Benchmark Greedy vs Dynamic Programming across varying application capacities
 */
function runOptimizationBenchmark(capacities = [120, 240, 360, 480, 600]) {
  const data = generateSyntheticDataset(50);

  return capacities.map(capacity => {
    const greedyScore = greedyJobSelection(data, capacity, { strategy: 'score' });
    const greedyRatio = greedyJobSelection(data, capacity, { strategy: 'ratio' });
    const dpResult = knapsackJobSelection(data, capacity, { timeStep: 5 });

    return {
      capacityMinutes: capacity,
      capacityHours: Number((capacity / 60).toFixed(1)),
      greedyScoreFirst: {
        totalScore: greedyScore.totalScore,
        jobsSelected: greedyScore.selectedCount,
        timeSpent: greedyScore.timeSpentMinutes,
        timeMs: greedyScore.executionTimeMs
      },
      greedyRatioFirst: {
        totalScore: greedyRatio.totalScore,
        jobsSelected: greedyRatio.selectedCount,
        timeSpent: greedyRatio.timeSpentMinutes,
        timeMs: greedyRatio.executionTimeMs
      },
      dynamicProgramming: {
        totalScore: dpResult.totalScore,
        jobsSelected: dpResult.selectedCount,
        timeSpent: dpResult.timeSpentMinutes,
        timeMs: dpResult.executionTimeMs,
        isOptimal: true
      },
      dpGainOverGreedy: Number((dpResult.totalScore - greedyScore.totalScore).toFixed(1))
    };
  });
}

module.exports = {
  generateSyntheticDataset,
  runSortingBenchmark,
  runSearchingBenchmark,
  runStringMatchBenchmark,
  runOptimizationBenchmark
};
