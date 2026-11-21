const { linearSearch, linearSearchRange } = require('./linearSearch');
const {
  binarySearchIterative,
  binarySearchRecursive,
  binarySearchRange
} = require('./binarySearch');
const { mergeSort } = require('../sorting/mergeSort');

/**
 * Compare Linear vs Binary Search
 * Prerequisite: Ensures array is sorted for binary search
 */
function compareSearching(arr, targetValue, options = {}) {
  const { key = 'salaryMin' } = options;

  // Make sure we have an ascending sorted copy for Binary Search
  const { sorted: sortedList } = mergeSort(arr, { key, order: 'asc' });

  // Run Linear Search (on original array)
  const linearRes = linearSearch(arr, targetValue, { key });

  // Run Iterative Binary Search (on sorted array)
  const binIterRes = binarySearchIterative(sortedList, targetValue, { key });

  // Run Recursive Binary Search (on sorted array)
  const binRecRes = binarySearchRecursive(sortedList, targetValue, { key });

  return {
    targetValue,
    datasetSize: arr.length,
    linearSearch: linearRes,
    binarySearchIterative: binIterRes,
    binarySearchRecursive: binRecRes,
    speedupFactor:
      linearRes.comparisons > 0 && binIterRes.comparisons > 0
        ? Number((linearRes.comparisons / binIterRes.comparisons).toFixed(2))
        : 1
  };
}

module.exports = {
  linearSearch,
  linearSearchRange,
  binarySearchIterative,
  binarySearchRecursive,
  binarySearchRange,
  compareSearching
};
