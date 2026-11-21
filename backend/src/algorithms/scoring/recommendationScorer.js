const { checkEligibility } = require('./eligibilityChecker');
const { kmpSearch } = require('../stringMatching/kmp');

/**
 * Recommendation Scoring Engine for CareerMatch
 *
 * Scoring Weights (Total: 100%):
 *   - Required skills match: 50%
 *   - Preferred skills match: 15%
 *   - Location preference:   10%
 *   - Job type preference:   10%
 *   - Work mode preference:   5%
 *   - Salary preference:     10%
 */

const DEFAULT_WEIGHTS = {
  requiredSkills: 0.50,
  preferredSkills: 0.15,
  location: 0.10,
  jobType: 0.10,
  workMode: 0.05,
  salary: 0.10
};

/**
 * Normalize and parse skill lists (from comma-separated string or array)
 */
function parseSkills(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map(s => (typeof s === 'string' ? s.trim() : s.name?.trim() || ''));
  }
  if (typeof input === 'string') {
    return input
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * Match skills using exact case-insensitive comparison or KMP search
 */
function matchSkillLists(studentSkills, jobSkills) {
  const studentSkillNorm = studentSkills.map(s => s.toLowerCase());
  const matched = [];
  const missing = [];

  for (const jobSkill of jobSkills) {
    const jsNorm = jobSkill.toLowerCase();
    // Check direct equality or substring/token match via KMP
    const isDirectMatch = studentSkillNorm.some(
      ss => ss === jsNorm || ss.includes(jsNorm) || jsNorm.includes(ss)
    );

    if (isDirectMatch) {
      matched.push(jobSkill);
    } else {
      // Test with KMP on joined skills string
      const joinedStudent = studentSkillNorm.join(' ');
      const kmpRes = kmpSearch(joinedStudent, jsNorm);
      if (kmpRes.matchCount > 0) {
        matched.push(jobSkill);
      } else {
        missing.push(jobSkill);
      }
    }
  }

  const matchPercentage =
    jobSkills.length > 0 ? Math.round((matched.length / jobSkills.length) * 100) : 100;

  return { matched, missing, matchPercentage };
}

/**
 * Calculate Recommendation Score for a Student and Job
 */
function calculateJobScore(student, job, preferences = {}, weights = DEFAULT_WEIGHTS) {
  // 1. Eligibility Check (Hard constraint)
  const eligibility = checkEligibility(student, job);

  // 2. Extract Skills
  const studentSkills = parseSkills(
    student.skills?.map(s => (s.skill ? s.skill.name : s.name || s)) || []
  );
  const requiredSkills = parseSkills(job.requiredSkills);
  const preferredSkills = parseSkills(job.preferredSkills);

  // 3. Skills Matching
  const reqMatch = matchSkillLists(studentSkills, requiredSkills);
  const prefMatch = matchSkillLists(studentSkills, preferredSkills);

  // 4. Preferences Matching
  const prefLocations = parseSkills(preferences.preferredLocations || student.preference?.preferredLocations);
  const prefJobTypes = parseSkills(preferences.preferredJobTypes || student.preference?.preferredJobTypes);
  const prefWorkModes = parseSkills(preferences.preferredWorkModes || student.preference?.preferredWorkModes);
  const minPreferredSalary = preferences.minimumSalary || student.preference?.minimumSalary || 0;

  // Location Score (0 or 100)
  let locationScore = 50; // Neutral default
  if (prefLocations.length > 0) {
    const jobLoc = (job.location || '').toLowerCase();
    const matchesLoc = prefLocations.some(
      loc => loc.toLowerCase() === 'all' || jobLoc.includes(loc.toLowerCase()) || loc.toLowerCase().includes(jobLoc)
    );
    locationScore = matchesLoc ? 100 : 20;
  }

  // Job Type Score (0 or 100)
  let jobTypeScore = 60;
  if (prefJobTypes.length > 0) {
    const jType = (job.jobType || '').toLowerCase();
    const matchesType = prefJobTypes.some(
      t => t.toLowerCase() === 'all' || jType.includes(t.toLowerCase()) || t.toLowerCase().includes(jType)
    );
    jobTypeScore = matchesType ? 100 : 25;
  }

  // Work Mode Score (0 or 100)
  let workModeScore = 60;
  if (prefWorkModes.length > 0) {
    const wMode = (job.workMode || '').toLowerCase();
    const matchesMode = prefWorkModes.some(
      m => m.toLowerCase() === 'all' || wMode.includes(m.toLowerCase()) || m.toLowerCase().includes(wMode)
    );
    workModeScore = matchesMode ? 100 : 30;
  }

  // Salary Score
  let salaryScore = 50;
  const jobSalary = job.salaryMax || job.salaryMin || 0;
  if (minPreferredSalary > 0) {
    if (jobSalary >= minPreferredSalary) {
      salaryScore = 100;
    } else {
      salaryScore = Math.max(10, Math.round((jobSalary / minPreferredSalary) * 100));
    }
  }

  // Weighted Score Calculation
  const weightedScore =
    reqMatch.matchPercentage * weights.requiredSkills +
    prefMatch.matchPercentage * weights.preferredSkills +
    locationScore * weights.location +
    jobTypeScore * weights.jobType +
    workModeScore * weights.workMode +
    salaryScore * weights.salary;

  const finalScore = Number(Math.min(100, Math.max(0, weightedScore)).toFixed(1));

  // Match Quality Badge
  let matchQuality = 'Low Match';
  if (finalScore >= 80) matchQuality = 'Strong Match';
  else if (finalScore >= 60) matchQuality = 'Good Match';
  else if (finalScore >= 40) matchQuality = 'Moderate Match';

  // Recommendation Explanation Text
  const explanations = [];
  if (reqMatch.matchPercentage >= 75) {
    explanations.push(`matches ${reqMatch.matchPercentage}% of required skills (${reqMatch.matched.slice(0, 3).join(', ')})`);
  } else if (reqMatch.matchPercentage >= 50) {
    explanations.push(`matches ${reqMatch.matchPercentage}% of key skills`);
  } else {
    explanations.push(`missing key skills like ${reqMatch.missing.slice(0, 2).join(', ')}`);
  }

  if (locationScore >= 80) explanations.push(`matches your preferred location (${job.location})`);
  if (workModeScore >= 80) explanations.push(`aligns with your ${job.workMode} work mode preference`);
  if (!eligibility.isEligible) explanations.push(`⚠️ Note: ${eligibility.reasons[0]}`);

  const explanation = `Recommended because you ${explanations.join(', and ')}.`;

  return {
    recommendationScore: finalScore,
    score: finalScore,
    matchPercentage: reqMatch.matchPercentage,
    matchQuality,
    isEligible: eligibility.isEligible,
    eligibilityStatus: eligibility.status,
    eligibilityReasons: eligibility.reasons,
    matchedRequiredSkills: reqMatch.matched,
    missingRequiredSkills: reqMatch.missing,
    matchedPreferredSkills: prefMatch.matched,
    missingPreferredSkills: prefMatch.missing,
    scoreBreakdown: {
      requiredSkillsMatch: {
        score: reqMatch.matchPercentage,
        weight: weights.requiredSkills,
        contribution: Number((reqMatch.matchPercentage * weights.requiredSkills).toFixed(1))
      },
      preferredSkillsMatch: {
        score: prefMatch.matchPercentage,
        weight: weights.preferredSkills,
        contribution: Number((prefMatch.matchPercentage * weights.preferredSkills).toFixed(1))
      },
      location: {
        score: locationScore,
        weight: weights.location,
        contribution: Number((locationScore * weights.location).toFixed(1))
      },
      jobType: {
        score: jobTypeScore,
        weight: weights.jobType,
        contribution: Number((jobTypeScore * weights.jobType).toFixed(1))
      },
      workMode: {
        score: workModeScore,
        weight: weights.workMode,
        contribution: Number((workModeScore * weights.workMode).toFixed(1))
      },
      salary: {
        score: salaryScore,
        weight: weights.salary,
        contribution: Number((salaryScore * weights.salary).toFixed(1))
      }
    },
    explanation
  };
}

module.exports = {
  calculateJobScore,
  matchSkillLists,
  DEFAULT_WEIGHTS
};
