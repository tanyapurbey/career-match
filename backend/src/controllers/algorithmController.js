const { mergeSort } = require('../algorithms/sorting/mergeSort');
const { bubbleSort } = require('../algorithms/sorting/bubbleSort');
const { compareSorting } = require('../algorithms/sorting/index');
const { linearSearch, linearSearchRange } = require('../algorithms/searching/linearSearch');
const {
  binarySearchIterative,
  binarySearchRecursive,
  binarySearchRange,
  compareSearching
} = require('../algorithms/searching/index');
const { kmpSearch, computeLPSArray } = require('../algorithms/stringMatching/kmp');
const { naiveSearch } = require('../algorithms/stringMatching/naiveMatch');
const { compareStringMatching } = require('../algorithms/stringMatching/index');
const { greedyJobSelection } = require('../algorithms/greedy/greedyJobSelection');
const { knapsackJobSelection } = require('../algorithms/dynamicProgramming/knapsackJobSelection');
const {
  generateSyntheticDataset,
  runSortingBenchmark,
  runSearchingBenchmark,
  runStringMatchBenchmark,
  runOptimizationBenchmark
} = require('../services/benchmarkService');
const { getAllJobs } = require('../services/jobService');

async function handleSort(req, res, next) {
  try {
    const { algorithm = 'both', datasetSize = 100, key = 'score', order = 'desc' } = req.body;
    const n = Math.min(5000, Math.max(10, parseInt(datasetSize, 10)));
    const dataset = generateSyntheticDataset(n);

    if (algorithm === 'merge') {
      const result = mergeSort(dataset, { key, order });
      return res.json({ success: true, data: result });
    }
    if (algorithm === 'bubble') {
      const result = bubbleSort(dataset, { key, order });
      return res.json({ success: true, data: result });
    }

    const comparison = compareSorting(dataset, { key, order });
    res.json({ success: true, data: comparison });
  } catch (err) {
    next(err);
  }
}

async function handleSearch(req, res, next) {
  try {
    const { targetSalary = 45000, datasetSize = 500, key = 'salaryMin', mode = 'exact', minSalary, maxSalary } = req.body;
    const n = Math.min(10000, Math.max(20, parseInt(datasetSize, 10)));
    const dataset = generateSyntheticDataset(n);

    if (mode === 'range') {
      const low = parseInt(minSalary || 30000, 10);
      const high = parseInt(maxSalary || 60000, 10);
      const { sorted } = mergeSort(dataset, { key, order: 'asc' });

      const linRange = linearSearchRange(dataset, low, high, { key });
      const binRange = binarySearchRange(sorted, low, high, { key });

      return res.json({
        success: true,
        data: {
          range: [low, high],
          datasetSize: n,
          linearRangeSearch: linRange,
          binaryRangeSearch: binRange
        }
      });
    }

    const comparison = compareSearching(dataset, parseInt(targetSalary, 10), { key });
    res.json({ success: true, data: comparison });
  } catch (err) {
    next(err);
  }
}

async function handleStringMatch(req, res, next) {
  try {
    const {
      text = 'Seeking an engineer skilled in Java, Python, and React. Must understand Data Structures and Algorithms.',
      pattern = 'React',
      algorithm = 'both'
    } = req.body;

    if (algorithm === 'kmp') {
      const result = kmpSearch(text, pattern);
      return res.json({ success: true, data: result });
    }
    if (algorithm === 'naive') {
      const result = naiveSearch(text, pattern);
      return res.json({ success: true, data: result });
    }

    const comparison = compareStringMatching(text, pattern);
    res.json({ success: true, data: comparison });
  } catch (err) {
    next(err);
  }
}

async function handleGreedySelection(req, res, next) {
  try {
    const { timeBudgetMinutes = 180, strategy = 'ratio' } = req.body;
    const realJobs = await getAllJobs();

    const result = greedyJobSelection(realJobs, parseInt(timeBudgetMinutes, 10), {
      strategy,
      filterEligible: true
    });

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function handleKnapsack(req, res, next) {
  try {
    const { capacityMinutes = 180, compareWithGreedy = true } = req.body;
    const cap = parseInt(capacityMinutes, 10);
    const realJobs = await getAllJobs();

    const dpResult = knapsackJobSelection(realJobs, cap, { timeStep: 5, filterEligible: true });

    let comparison = null;
    if (compareWithGreedy) {
      const greedyScore = greedyJobSelection(realJobs, cap, { strategy: 'score', filterEligible: true });
      const greedyRatio = greedyJobSelection(realJobs, cap, { strategy: 'ratio', filterEligible: true });

      comparison = {
        dpOptimal: dpResult,
        greedyHighestScore: greedyScore,
        greedyRatio: greedyRatio,
        dpScoreGain: Number((dpResult.totalScore - greedyScore.totalScore).toFixed(2)),
        explanation:
          '0/1 Knapsack Dynamic Programming guarantees the globally optimal subset by evaluating subproblems. Greedy heuristics can make locally optimal choices that leave unusable time gaps or miss higher-value combinations.'
      };
    }

    res.json({ success: true, data: comparison || dpResult });
  } catch (err) {
    next(err);
  }
}

async function handleBenchmark(req, res, next) {
  try {
    const { type = 'all', sizes } = req.body;

    const sortingSizes = sizes || [100, 500, 1000, 2500, 5000];
    const searchingSizes = sizes || [100, 500, 1000, 5000, 10000];

    const results = {};

    if (type === 'all' || type === 'sorting') {
      results.sorting = runSortingBenchmark(sortingSizes);
    }
    if (type === 'all' || type === 'searching') {
      results.searching = runSearchingBenchmark(searchingSizes);
    }
    if (type === 'all' || type === 'stringMatch') {
      results.stringMatching = runStringMatchBenchmark();
    }
    if (type === 'all' || type === 'optimization') {
      results.optimization = runOptimizationBenchmark([120, 240, 360, 480, 600]);
    }

    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
}

function getMetrics(req, res) {
  const complexityTable = [
    {
      algorithm: 'Bubble Sort',
      category: 'Sorting',
      bestCase: 'O(n) (optimized)',
      averageCase: 'O(n²)',
      worstCase: 'O(n²)',
      spaceComplexity: 'O(1)',
      stability: 'Stable'
    },
    {
      algorithm: 'Merge Sort',
      category: 'Sorting',
      bestCase: 'O(n log n)',
      averageCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stability: 'Stable'
    },
    {
      algorithm: 'Linear Search',
      category: 'Searching',
      bestCase: 'O(1)',
      averageCase: 'O(n)',
      worstCase: 'O(n)',
      spaceComplexity: 'O(1)',
      stability: 'N/A'
    },
    {
      algorithm: 'Binary Search',
      category: 'Searching',
      bestCase: 'O(1)',
      averageCase: 'O(log n)',
      worstCase: 'O(log n)',
      spaceComplexity: 'O(1) iterative / O(log n) recursive',
      stability: 'N/A'
    },
    {
      algorithm: 'Naive String Matching',
      category: 'String Matching',
      bestCase: 'O(n)',
      averageCase: 'O(n + m)',
      worstCase: 'O(n × m)',
      spaceComplexity: 'O(1)',
      stability: 'N/A'
    },
    {
      algorithm: 'KMP (Knuth-Morris-Pratt)',
      category: 'String Matching',
      bestCase: 'O(n + m)',
      averageCase: 'O(n + m)',
      worstCase: 'O(n + m)',
      spaceComplexity: 'O(m) (LPS array)',
      stability: 'N/A'
    },
    {
      algorithm: 'Greedy Job Selection',
      category: 'Optimization',
      bestCase: 'O(n log n)',
      averageCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stability: 'Heuristic (Approximation)'
    },
    {
      algorithm: '0/1 Knapsack DP',
      category: 'Dynamic Programming',
      bestCase: 'O(n × W)',
      averageCase: 'O(n × W)',
      worstCase: 'O(n × W)',
      spaceComplexity: 'O(n × W)',
      stability: 'Globally Optimal'
    }
  ];

  res.json({ success: true, data: complexityTable });
}

module.exports = {
  handleSort,
  handleSearch,
  handleStringMatch,
  handleGreedySelection,
  handleKnapsack,
  handleBenchmark,
  getMetrics
};
