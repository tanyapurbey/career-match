const prisma = require('../config/db');
const { getDemoStudent } = require('../services/studentService');
const { calculateJobScore } = require('../algorithms/scoring/recommendationScorer');

async function getApplications(req, res, next) {
  try {
    const student = await getDemoStudent();
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const { status, search } = req.query;

    const where = { studentId: student.id };
    if (status && status !== 'All') {
      where.status = status;
    }

    const apps = await prisma.jobApplication.findMany({
      where,
      include: {
        job: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    let result = apps.map(app => {
      const scoreData = calculateJobScore(student, app.job, student.preference);
      return {
        id: app.id,
        status: app.status,
        appliedAt: app.appliedAt,
        notes: app.notes,
        interviewDate: app.interviewDate,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt,
        job: {
          ...app.job,
          ...scoreData
        }
      };
    });

    if (search && search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        a =>
          a.job.title.toLowerCase().includes(q) ||
          a.job.companyName.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: result.length, data: result });
  } catch (err) {
    next(err);
  }
}

async function createApplication(req, res, next) {
  try {
    const student = await getDemoStudent();
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const { jobId, status = 'Applied', notes, interviewDate } = req.body;
    if (!jobId) return res.status(400).json({ success: false, message: 'jobId is required' });

    const application = await prisma.jobApplication.upsert({
      where: {
        studentId_jobId: {
          studentId: student.id,
          jobId
        }
      },
      update: {
        status,
        notes: notes !== undefined ? notes : undefined,
        interviewDate: interviewDate ? new Date(interviewDate) : undefined
      },
      create: {
        studentId: student.id,
        jobId,
        status,
        notes,
        interviewDate: interviewDate ? new Date(interviewDate) : null
      },
      include: { job: true }
    });

    res.json({ success: true, message: 'Application submitted', data: application });
  } catch (err) {
    next(err);
  }
}

async function updateApplication(req, res, next) {
  try {
    const { id } = req.params;
    const { status, notes, interviewDate } = req.body;

    const updated = await prisma.jobApplication.update({
      where: { id },
      data: {
        status: status !== undefined ? status : undefined,
        notes: notes !== undefined ? notes : undefined,
        interviewDate: interviewDate !== undefined ? (interviewDate ? new Date(interviewDate) : null) : undefined
      },
      include: { job: true }
    });

    res.json({ success: true, message: 'Application updated', data: updated });
  } catch (err) {
    next(err);
  }
}

async function updateApplicationStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ success: false, message: 'Status is required' });

    const updated = await prisma.jobApplication.update({
      where: { id },
      data: { status },
      include: { job: true }
    });

    res.json({ success: true, message: `Status updated to ${status}`, data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteApplication(req, res, next) {
  try {
    const { id } = req.params;
    await prisma.jobApplication.delete({ where: { id } });
    res.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication
};
