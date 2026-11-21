const prisma = require('../config/db');
const { getDemoStudent } = require('./studentService');
const { calculateJobScore } = require('../algorithms/scoring/recommendationScorer');
const { mergeSort } = require('../algorithms/sorting/mergeSort');
const { kmpSearch } = require('../algorithms/stringMatching/kmp');
const { binarySearchRange } = require('../algorithms/searching/binarySearch');

async function getAllJobs(filters = {}) {
  const {
    search,
    location,
    workMode,
    jobType,
    minSalary,
    maxSalary,
    minMatch,
    sortBy = 'newest' // 'newest', 'relevance', 'salary', 'match'
  } = filters;

  const student = await getDemoStudent();
  const allJobs = await prisma.job.findMany({
    include: {
      applications: student ? { where: { studentId: student.id } } : false,
      savedJobs: student ? { where: { studentId: student.id } } : false
    }
  });

  // Calculate score & eligibility for each job against student
  let scoredJobs = allJobs.map(job => {
    const scoreData = student ? calculateJobScore(student, job, student.preference) : {};
    const isSaved = job.savedJobs && job.savedJobs.length > 0;
    const application = job.applications && job.applications[0] ? job.applications[0] : null;

    return {
      ...job,
      ...scoreData,
      isSaved,
      applicationStatus: application ? application.status : null,
      applicationId: application ? application.id : null
    };
  });

  // Apply filters
  if (search && search.trim() !== '') {
    const q = search.trim();
    scoredJobs = scoredJobs.filter(job => {
      // Use KMP string matching for search accuracy across title, company, skills, description
      const titleMatch = kmpSearch(job.title, q).matchCount > 0;
      const compMatch = kmpSearch(job.companyName, q).matchCount > 0;
      const skillsMatch = kmpSearch(job.requiredSkills + ' ' + job.preferredSkills, q).matchCount > 0;
      const descMatch = kmpSearch(job.description, q).matchCount > 0;
      return titleMatch || compMatch || skillsMatch || descMatch;
    });
  }

  if (location && location !== 'All') {
    scoredJobs = scoredJobs.filter(
      job => job.location.toLowerCase() === location.toLowerCase()
    );
  }

  if (workMode && workMode !== 'All') {
    scoredJobs = scoredJobs.filter(
      job => job.workMode.toLowerCase() === workMode.toLowerCase()
    );
  }

  if (jobType && jobType !== 'All') {
    scoredJobs = scoredJobs.filter(
      job => job.jobType.toLowerCase() === jobType.toLowerCase()
    );
  }

  if (minSalary) {
    const minVal = parseInt(minSalary, 10);
    scoredJobs = scoredJobs.filter(job => job.salaryMax >= minVal);
  }

  if (maxSalary) {
    const maxVal = parseInt(maxSalary, 10);
    scoredJobs = scoredJobs.filter(job => job.salaryMin <= maxVal);
  }

  if (minMatch) {
    const matchThreshold = parseInt(minMatch, 10);
    scoredJobs = scoredJobs.filter(job => (job.matchPercentage || 0) >= matchThreshold);
  }

  // Sort using our custom Merge Sort
  if (sortBy === 'relevance') {
    const { sorted } = mergeSort(scoredJobs, { key: 'recommendationScore', order: 'desc' });
    scoredJobs = sorted;
  } else if (sortBy === 'salary') {
    const { sorted } = mergeSort(scoredJobs, { key: 'salaryMax', order: 'desc' });
    scoredJobs = sorted;
  } else if (sortBy === 'match') {
    const { sorted } = mergeSort(scoredJobs, { key: 'matchPercentage', order: 'desc' });
    scoredJobs = sorted;
  } else {
    // Default newest: sort by createdAt descending
    const { sorted } = mergeSort(scoredJobs, {
      key: item => new Date(item.createdAt).getTime(),
      order: 'desc'
    });
    scoredJobs = sorted;
  }

  return scoredJobs;
}

async function getJobById(jobId) {
  const student = await getDemoStudent();
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      applications: student ? { where: { studentId: student.id } } : false,
      savedJobs: student ? { where: { studentId: student.id } } : false
    }
  });

  if (!job) return null;

  const scoreData = student ? calculateJobScore(student, job, student.preference) : {};
  const isSaved = job.savedJobs && job.savedJobs.length > 0;
  const application = job.applications && job.applications[0] ? job.applications[0] : null;

  return {
    ...job,
    ...scoreData,
    isSaved,
    applicationStatus: application ? application.status : null,
    applicationId: application ? application.id : null
  };
}

async function getRecommendedJobs(options = {}) {
  const {
    filterEligible = true,
    sortBy = 'relevance',
    jobType,
    workMode,
    limit = 50
  } = options;

  const student = await getDemoStudent();
  const allJobs = await prisma.job.findMany({
    include: {
      applications: student ? { where: { studentId: student.id } } : false,
      savedJobs: student ? { where: { studentId: student.id } } : false
    }
  });

  let scored = allJobs.map(job => {
    const scoreData = calculateJobScore(student, job, student.preference);
    const isSaved = job.savedJobs && job.savedJobs.length > 0;
    const application = job.applications && job.applications[0] ? job.applications[0] : null;

    return {
      ...job,
      ...scoreData,
      isSaved,
      applicationStatus: application ? application.status : null
    };
  });

  // Filter eligible if requested
  if (filterEligible) {
    scored = scored.filter(j => j.isEligible === true);
  }

  if (jobType && jobType !== 'All') {
    scored = scored.filter(j => j.jobType.toLowerCase() === jobType.toLowerCase());
  }

  if (workMode && workMode !== 'All') {
    scored = scored.filter(j => j.workMode.toLowerCase() === workMode.toLowerCase());
  }

  // Sort with Merge Sort
  let sortKey = 'recommendationScore';
  if (sortBy === 'skillMatch') sortKey = 'matchPercentage';
  if (sortBy === 'salary') sortKey = 'salaryMax';

  const { sorted, comparisons, executionTimeMs } = mergeSort(scored, {
    key: sortKey,
    order: 'desc'
  });

  // Assign ranks
  const ranked = sorted.slice(0, limit).map((job, idx) => ({
    ...job,
    rank: idx + 1
  }));

  return {
    recommendations: ranked,
    totalCount: ranked.length,
    sortingAlgorithm: 'Merge Sort',
    sortComparisons: comparisons,
    executionTimeMs
  };
}

async function compareJobs(jobId1, jobId2) {
  const job1 = await getJobById(jobId1);
  const job2 = await getJobById(jobId2);

  if (!job1 || !job2) return null;

  return { job1, job2 };
}

module.exports = {
  getAllJobs,
  getJobById,
  getRecommendedJobs,
  compareJobs
};
