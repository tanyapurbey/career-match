/**
 * Linear Search Implementation for CareerMatch
 *
 * Time Complexity:
 *   - Best Case:    O(1) (found at index 0)
 *   - Average Case: O(n)
 *   - Worst Case:   O(n)
 * Space Complexity: O(1)
 */

function linearSearch(arr, targetValue, options = {}) {
  const { key = 'salaryMin' } = options;
  let comparisons = 0;

  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }

  const startTime = performance.now();
  let foundIndex = -1;
  let foundItem = null;

  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    if (getValue(arr[i]) === targetValue) {
      foundIndex = i;
      foundItem = arr[i];
      break;
    }
  }

  const endTime = performance.now();

  return {
    found: foundIndex !== -1,
    index: foundIndex,
    item: foundItem,
    comparisons,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    datasetSize: arr.length,
    algorithm: 'Linear Search'
  };
}

/**
 * Linear Search for Salary Range [minSalary, maxSalary]
 */
function linearSearchRange(arr, minVal, maxVal, options = {}) {
  const { key = 'salaryMin' } = options;
  let comparisons = 0;

  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }

  const startTime = performance.now();
  const matched = [];

  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    const v = getValue(arr[i]);
    if (v >= minVal && v <= maxVal) {
      matched.push(arr[i]);
    }
  }

  const endTime = performance.now();

  return {
    results: matched,
    count: matched.length,
    comparisons,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    datasetSize: arr.length,
    algorithm: 'Linear Range Search'
  };
}

module.exports = { linearSearch, linearSearchRange };
