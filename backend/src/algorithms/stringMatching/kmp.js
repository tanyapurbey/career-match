/**
 * Knuth-Morris-Pratt (KMP) String Matching Algorithm
 *
 * Problem: Find all occurrences of pattern P in text T
 * Time Complexity:
 *   - Preprocessing (LPS construction): O(m) where m = pattern.length
 *   - Searching:                         O(n) where n = text.length
 *   - Total Time:                        O(n + m)
 * Space Complexity:                      O(m) for the LPS array
 */

/**
 * Compute the Longest Proper Prefix which is also Suffix (LPS) array
 * @param {string} pattern
 * @returns {{ lps: number[], comparisons: number }}
 */
function computeLPSArray(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let length = 0; // length of previous longest prefix suffix
  let i = 1;
  let comparisons = 0;

  while (i < m) {
    comparisons++;
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        // Do not increment i here; fallback to previous prefix
        length = lps[length - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return { lps, comparisons };
}

/**
 * Perform KMP Pattern Search
 * @param {string} text - Target text
 * @param {string} pattern - Search query
 * @param {object} options - Options (e.g. caseSensitive: false)
 */
function kmpSearch(text, pattern, options = {}) {
  const { caseSensitive = false } = options;

  if (!pattern || pattern.length === 0) {
    return {
      matches: [],
      matchCount: 0,
      comparisons: 0,
      executionTimeMs: 0,
      textLength: text ? text.length : 0,
      patternLength: 0,
      lps: [],
      algorithm: 'KMP'
    };
  }

  const rawText = text || '';
  const T = caseSensitive ? rawText : rawText.toLowerCase();
  const P = caseSensitive ? pattern : pattern.toLowerCase();

  const startTime = performance.now();

  const { lps, comparisons: lpsComparisons } = computeLPSArray(P);
  let totalComparisons = lpsComparisons;

  const n = T.length;
  const m = P.length;
  const matches = [];

  let i = 0; // index for text T
  let j = 0; // index for pattern P

  while (i < n) {
    totalComparisons++;
    if (T[i] === P[j]) {
      i++;
      j++;
    }

    if (j === m) {
      // Found pattern at index (i - j)
      matches.push({
        startIndex: i - j,
        endIndex: i - 1,
        matchedSubstring: rawText.substring(i - j, i)
      });
      j = lps[j - 1];
    } else if (i < n && T[i] !== P[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  const endTime = performance.now();

  return {
    matches,
    matchCount: matches.length,
    comparisons: totalComparisons,
    lpsComparisons,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    textLength: n,
    patternLength: m,
    lps,
    algorithm: 'KMP (Knuth-Morris-Pratt)'
  };
}

module.exports = {
  computeLPSArray,
  kmpSearch
};
