const { mergeSort } = require('./mergeSort');
const { bubbleSort } = require('./bubbleSort');

/**
 * Compare Sorting Algorithms on the same dataset
 */
function compareSorting(arr, options = {}) {
  const { key = 'score', order = 'desc' } = options;

  // Run Merge Sort
  const mergeResult = mergeSort(arr, { key, order, clone: true });

  // Run Bubble Sort (limit to max 5000 elements to prevent event loop freeze on O(n^2))
  let bubbleResult = null;
  if (arr.length <= 4000) {
    bubbleResult = bubbleSort(arr, { key, order, clone: true });
  } else {
    bubbleResult = {
      sorted: null,
      comparisons: Math.floor((arr.length * (arr.length - 1)) / 2),
      swaps: 'N/A (Skipped for safety)',
      executionTimeMs: '> 5000ms (Estimated)',
      datasetSize: arr.length,
      algorithm: 'Bubble Sort (Skipped for large n)',
      note: 'Bubble Sort O(n²) skipped for safety at large N to prevent thread blocking'
    };
  }

  // Baseline: JavaScript built-in Array.prototype.sort (Timsort in V8, O(n log n))
  const builtinList = [...arr];
  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }
  let builtinComparisons = 0;
  const startBuiltin = performance.now();
  builtinList.sort((a, b) => {
    builtinComparisons++;
    const vA = getValue(a);
    const vB = getValue(b);
    return order === 'desc' ? vB - vA : vA - vB;
  });
  const endBuiltin = performance.now();

  const builtinResult = {
    comparisons: builtinComparisons,
    executionTimeMs: Number((endBuiltin - startBuiltin).toFixed(4)),
    datasetSize: arr.length,
    algorithm: 'JavaScript Built-in Sort (V8 Timsort / Dual-Pivot QuickSort)',
    note: 'Built-in engine sort is C++ native compiled, used strictly as an environment baseline'
  };

  return {
    datasetSize: arr.length,
    mergeSort: mergeResult,
    bubbleSort: bubbleResult,
    builtinSort: builtinResult
  };
}

module.exports = {
  mergeSort,
  bubbleSort,
  compareSorting
};
