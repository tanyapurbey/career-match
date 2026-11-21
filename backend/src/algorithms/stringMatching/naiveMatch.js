/**
 * Naive (Brute Force) String Matching Algorithm
 *
 * Time Complexity:
 *   - Best Case:    O(n) (no match or quick mismatches)
 *   - Worst Case:   O(n * m) (e.g. text "AAAAAAAAAB", pattern "AAAB")
 * Space Complexity: O(1)
 */

function naiveSearch(text, pattern, options = {}) {
  const { caseSensitive = false } = options;

  if (!pattern || pattern.length === 0) {
    return {
      matches: [],
      matchCount: 0,
      comparisons: 0,
      executionTimeMs: 0,
      textLength: text ? text.length : 0,
      patternLength: 0,
      algorithm: 'Naive String Matching'
    };
  }

  const rawText = text || '';
  const T = caseSensitive ? rawText : rawText.toLowerCase();
  const P = caseSensitive ? pattern : pattern.toLowerCase();

  const n = T.length;
  const m = P.length;
  const matches = [];
  let comparisons = 0;

  const startTime = performance.now();

  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m) {
      comparisons++;
      if (T[i + j] !== P[j]) {
        break;
      }
      j++;
    }

    if (j === m) {
      matches.push({
        startIndex: i,
        endIndex: i + m - 1,
        matchedSubstring: rawText.substring(i, i + m)
      });
    }
  }

  const endTime = performance.now();

  return {
    matches,
    matchCount: matches.length,
    comparisons,
    executionTimeMs: Number((endTime - startTime).toFixed(4)),
    textLength: n,
    patternLength: m,
    algorithm: 'Naive String Matching'
  };
}

module.exports = { naiveSearch };
