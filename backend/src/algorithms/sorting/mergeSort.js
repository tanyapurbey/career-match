/**
 * Merge Sort Implementation for CareerMatch
 *
 * Time Complexity:
 *   - Best Case:    O(n log n)
 *   - Average Case: O(n log n)
 *   - Worst Case:   O(n log n)
 * Space Complexity: O(n) (auxiliary arrays during merge)
 * Stability: Stable (preserves relative order of equal keys)
 */

function mergeSort(arr, options = {}) {
  const {
    key = 'score',
    order = 'desc', // 'asc' or 'desc'
    clone = true
  } = options;

  let comparisons = 0;
  let mergeOps = 0;

  const list = clone ? [...arr] : arr;

  function getValue(item) {
    if (typeof key === 'function') return key(item);
    if (item && typeof item === 'object' && key in item) return item[key];
    return item;
  }

  function compare(a, b) {
    comparisons++;
    const valA = getValue(a);
    const valB = getValue(b);

    if (order === 'desc') {
      return valA < valB ? -1 : valA > valB ? 1 : 0;
    } else {
      return valA < valB ? -1 : valA > valB ? 1 : 0;
    }
  }

  function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      mergeOps++;
      comparisons++;
      const valL = getValue(left[i]);
      const valR = getValue(right[j]);

      // Stable comparison: for descending, if left >= right, take left first
      let takeLeft = false;
      if (order === 'desc') {
        takeLeft = valL >= valR;
      } else {
        takeLeft = valL <= valR;
      }

      if (takeLeft) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    return result;
  }

  function divideAndConquer(subList) {
    if (subList.length <= 1) {
      return subList;
    }
    const mid = Math.floor(subList.length / 2);
    const left = divideAndConquer(subList.slice(0, mid));
    const right = divideAndConquer(subList.slice(mid));
    return merge(left, right);
  }

  const startTime = performance.now();
  const sorted = divideAndConquer(list);
  const endTime = performance.now();

  return {
    sorted,
    comparisons,
    mergeOperations: mergeOps,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    datasetSize: arr.length,
    algorithm: 'Merge Sort'
  };
}

module.exports = { mergeSort };
