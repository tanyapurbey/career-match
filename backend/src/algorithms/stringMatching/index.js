const { kmpSearch, computeLPSArray } = require('./kmp');
const { naiveSearch } = require('./naiveMatch');

/**
 * Compare KMP vs Naive Matching on given text and pattern
 */
function compareStringMatching(text, pattern, options = {}) {
  const kmpRes = kmpSearch(text, pattern, options);
  const naiveRes = naiveSearch(text, pattern, options);

  return {
    pattern,
    textLength: text ? text.length : 0,
    patternLength: pattern ? pattern.length : 0,
    kmp: kmpRes,
    naive: naiveRes,
    comparisonsSaved: naiveRes.comparisons - kmpRes.comparisons,
    efficiencyGainPercent:
      naiveRes.comparisons > 0
        ? Number(
            (
              ((naiveRes.comparisons - kmpRes.comparisons) /
                naiveRes.comparisons) *
              100
            ).toFixed(2)
          )
        : 0
  };
}

module.exports = {
  kmpSearch,
  computeLPSArray,
  naiveSearch,
  compareStringMatching
};
