const jobService = require('../services/jobService');

async function getJobs(req, res, next) {
  try {
    const jobs = await jobService.getAllJobs(req.query);
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (err) {
    next(err);
  }
}

async function getJobById(req, res, next) {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
}

async function getRecommendedJobs(req, res, next) {
  try {
    const results = await jobService.getRecommendedJobs(req.query);
    res.json({
      success: true,
      data: results.recommendations,
      totalCount: results.totalCount,
      algorithmMeta: {
        sortingAlgorithm: results.sortingAlgorithm,
        comparisons: results.sortComparisons,
        executionTimeMs: results.executionTimeMs
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getEligibleJobs(req, res, next) {
  try {
    const results = await jobService.getRecommendedJobs({ ...req.query, filterEligible: true });
    res.json({ success: true, count: results.totalCount, data: results.recommendations });
  } catch (err) {
    next(err);
  }
}

async function compareJobs(req, res, next) {
  try {
    const { job1Id, job2Id } = req.query;
    if (!job1Id || !job2Id) {
      return res.status(400).json({ success: false, message: 'Please provide both job1Id and job2Id' });
    }
    const comparison = await jobService.compareJobs(job1Id, job2Id);
    if (!comparison) {
      return res.status(404).json({ success: false, message: 'One or both jobs not found' });
    }
    res.json({ success: true, data: comparison });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getJobs,
  getJobById,
  getRecommendedJobs,
  getEligibleJobs,
  compareJobs
};
