/**
 * Binary Search Implementation for CareerMatch
 *
 * Prerequisite: Array MUST be pre-sorted in ascending order by the search key.
 *
 * Time Complexity:
 *   - Best Case:    O(1) (target is at midpoint)
 *   - Average Case: O(log n)
 *   - Worst Case:   O(log n)
 * Space Complexity:
 *   - Iterative: O(1)
 *   - Recursive: O(log n) stack space
 */

function binarySearchIterative(sortedArr, targetValue, options = {}) {
  const { key = 'salaryMin' } = options;
  let comparisons = 0;

  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }

  const startTime = performance.now();
  let left = 0;
  let right = sortedArr.length - 1;
  let foundIndex = -1;

  while (left <= right) {
    comparisons++;
    const mid = Math.floor((left + right) / 2);
    const midVal = getValue(sortedArr[mid]);

    if (midVal === targetValue) {
      foundIndex = mid;
      break;
    } else if (midVal < targetValue) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  const endTime = performance.now();

  return {
    found: foundIndex !== -1,
    index: foundIndex,
    item: foundIndex !== -1 ? sortedArr[foundIndex] : null,
    comparisons,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    datasetSize: sortedArr.length,
    algorithm: 'Binary Search (Iterative)'
  };
}

function binarySearchRecursive(sortedArr, targetValue, options = {}) {
  const { key = 'salaryMin' } = options;
  let comparisons = 0;

  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }

  function search(left, right) {
    if (left > right) return -1;
    comparisons++;
    const mid = Math.floor((left + right) / 2);
    const midVal = getValue(sortedArr[mid]);

    if (midVal === targetValue) {
      return mid;
    } else if (midVal < targetValue) {
      return search(mid + 1, right);
    } else {
      return search(left, mid - 1);
    }
  }

  const startTime = performance.now();
  const foundIndex = search(0, sortedArr.length - 1);
  const endTime = performance.now();

  return {
    found: foundIndex !== -1,
    index: foundIndex,
    item: foundIndex !== -1 ? sortedArr[foundIndex] : null,
    comparisons,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    datasetSize: sortedArr.length,
    algorithm: 'Binary Search (Recursive)'
  };
}

/**
 * Binary Search to find Range [minVal, maxVal] on Sorted Array
 * Uses Lower Bound binary search and Upper Bound binary search in O(log n)
 */
function binarySearchRange(sortedArr, minVal, maxVal, options = {}) {
  const { key = 'salaryMin' } = options;
  let comparisons = 0;

  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }

  const startTime = performance.now();
  const n = sortedArr.length;

  // Find first index where value >= minVal (Lower Bound)
  let low = 0;
  let high = n - 1;
  let lowerBound = n;

  while (low <= high) {
    comparisons++;
    const mid = Math.floor((low + high) / 2);
    if (getValue(sortedArr[mid]) >= minVal) {
      lowerBound = mid;
      high = mid - 1; // Look left for first occurrence
    } else {
      low = mid + 1;
    }
  }

  // Find last index where value <= maxVal (Upper Bound)
  low = 0;
  high = n - 1;
  let upperBound = -1;

  while (low <= high) {
    comparisons++;
    const mid = Math.floor((low + high) / 2);
    if (getValue(sortedArr[mid]) <= maxVal) {
      upperBound = mid;
      low = mid + 1; // Look right for last occurrence
    } else {
      high = mid - 1;
    }
  }

  const results = [];
  if (lowerBound <= upperBound && lowerBound < n && upperBound >= 0) {
    for (let i = lowerBound; i <= upperBound; i++) {
      results.push(sortedArr[i]);
    }
  }

  const endTime = performance.now();

  return {
    results,
    count: results.length,
    lowerBoundIndex: lowerBound < n ? lowerBound : -1,
    upperBoundIndex: upperBound >= 0 ? upperBound : -1,
    comparisons,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    datasetSize: sortedArr.length,
    algorithm: 'Binary Range Search (Lower/Upper Bound O(log n))'
  };
}

module.exports = {
  binarySearchIterative,
  binarySearchRecursive,
  binarySearchRange
};
