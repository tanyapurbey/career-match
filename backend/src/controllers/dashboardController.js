const prisma = require('../config/db');
const { getDemoStudent } = require('../services/studentService');
const { getRecommendedJobs, getAllJobs } = require('../services/jobService');

async function getStats(req, res, next) {
  try {
    const student = await getDemoStudent();
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const totalJobs = await prisma.job.count();
    const savedJobsCount = await prisma.savedJob.count({ where: { studentId: student.id } });
    const applicationsCount = await prisma.jobApplication.count({ where: { studentId: student.id } });

    // Recommended count: jobs where student is eligible and score >= 60
    const recommendations = await getRecommendedJobs({ limit: 100 });
    const recommendedCount = recommendations.recommendations.filter(j => j.score >= 50).length;

    res.json({
      success: true,
      data: {
        totalJobs,
        recommendedCount,
        savedJobsCount,
        applicationsCount,
        studentName: student.fullName,
        studentCGPA: student.cgpa,
        availableHours: student.availableHoursPerWeek
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getDashboardRecommendations(req, res, next) {
  try {
    const results = await getRecommendedJobs({ limit: 5 });
    res.json({
      success: true,
      data: results.recommendations,
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

async function getActivity(req, res, next) {
  try {
    const student = await getDemoStudent();
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    // Applications group by status
    const apps = await prisma.jobApplication.findMany({
      where: { studentId: student.id }
    });

    const savedCount = await prisma.savedJob.count({ where: { studentId: student.id } });

    const statusCounts = {
      Saved: savedCount,
      Applied: 0,
      OA: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
      Withdrawn: 0
    };

    apps.forEach(a => {
      if (statusCounts[a.status] !== undefined) {
        statusCounts[a.status]++;
      }
    });

    const activityChart = Object.keys(statusCounts).map(status => ({
      status,
      count: statusCounts[status]
    }));

    // Recently added jobs
    const recentJobs = await getAllJobs({ sortBy: 'newest' });

    // Skill match stats: aggregated across top recommended jobs
    const studentSkills = student.skills.map(s => s.skill.name.toLowerCase());
    const topJobs = await getRecommendedJobs({ limit: 10 });

    const marketSkillsCount = {};
    topJobs.recommendations.forEach(j => {
      const allSkills = (j.requiredSkills + ', ' + j.preferredSkills).split(',').map(s => s.trim());
      allSkills.forEach(skill => {
        if (!skill) return;
        marketSkillsCount[skill] = (marketSkillsCount[skill] || 0) + 1;
      });
    });

    const topMarketSkills = Object.entries(marketSkillsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([skill, demand]) => ({
        skill,
        demand,
        hasSkill: studentSkills.includes(skill.toLowerCase())
      }));

    res.json({
      success: true,
      data: {
        activityChart,
        recentJobs: recentJobs.slice(0, 4),
        topMarketSkills
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getStats,
  getDashboardRecommendations,
  getActivity
};
