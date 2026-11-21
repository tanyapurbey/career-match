/**
 * Bubble Sort Implementation for CareerMatch (Baseline Comparison)
 *
 * Time Complexity:
 *   - Best Case:    O(n) (when already sorted, thanks to swapped flag)
 *   - Average Case: O(n²)
 *   - Worst Case:   O(n²)
 * Space Complexity: O(1) in-place auxiliary space
 */

function bubbleSort(arr, options = {}) {
  const {
    key = 'score',
    order = 'desc', // 'asc' or 'desc'
    clone = true
  } = options;

  let comparisons = 0;
  let swaps = 0;

  const list = clone ? [...arr] : arr;
  const n = list.length;

  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }

  const startTime = performance.now();

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      const valA = getValue(list[j]);
      const valB = getValue(list[j + 1]);

      let shouldSwap = false;
      if (order === 'desc') {
        shouldSwap = valA < valB;
      } else {
        shouldSwap = valA > valB;
      }

      if (shouldSwap) {
        const temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
        swaps++;
        swapped = true;
      }
    }
    // Optimization: If no elements were swapped in this pass, array is sorted
    if (!swapped) {
      break;
    }
  }

  const endTime = performance.now();

  return {
    sorted: list,
    comparisons,
    swaps,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    datasetSize: arr.length,
    algorithm: 'Bubble Sort'
  };
}

module.exports = { bubbleSort };
