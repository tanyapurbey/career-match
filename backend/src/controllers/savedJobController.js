const prisma = require('../config/db');
const { getDemoStudent } = require('../services/studentService');
const { calculateJobScore } = require('../algorithms/scoring/recommendationScorer');

async function getSavedJobs(req, res, next) {
  try {
    const student = await getDemoStudent();
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const saved = await prisma.savedJob.findMany({
      where: { studentId: student.id },
      include: {
        job: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const jobs = saved.map(item => {
      const scoreData = calculateJobScore(student, item.job, student.preference);
      return {
        ...item.job,
        ...scoreData,
        savedAt: item.createdAt,
        isSaved: true
      };
    });

    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    next(err);
  }
}

async function saveJob(req, res, next) {
  try {
    const { jobId } = req.params;
    const student = await getDemoStudent();
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const saved = await prisma.savedJob.upsert({
      where: {
        studentId_jobId: {
          studentId: student.id,
          jobId
        }
      },
      update: {},
      create: {
        studentId: student.id,
        jobId
      }
    });

    res.json({ success: true, message: 'Job saved successfully', data: saved });
  } catch (err) {
    next(err);
  }
}

async function removeSavedJob(req, res, next) {
  try {
    const { jobId } = req.params;
    const student = await getDemoStudent();
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    await prisma.savedJob.deleteMany({
      where: {
        studentId: student.id,
        jobId
      }
    });

    res.json({ success: true, message: 'Job removed from saved list' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSavedJobs,
  saveJob,
  removeSavedJob
};
