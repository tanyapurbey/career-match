const studentService = require('../services/studentService');

async function getProfile(req, res, next) {
  try {
    const student = await studentService.getDemoStudent();
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const student = await studentService.getDemoStudent();
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }
    const updated = await studentService.updateProfile(student.id, req.body);
    res.json({ success: true, data: updated, message: 'Profile updated successfully' });
  } catch (err) {
    next(err);
  }
}

async function getSkills(req, res, next) {
  try {
    const student = await studentService.getDemoStudent();
    res.json({ success: true, data: student ? student.skills : [] });
  } catch (err) {
    next(err);
  }
}

async function updateSkills(req, res, next) {
  try {
    const student = await studentService.getDemoStudent();
    const skillsList = req.body.skills || [];
    const updated = await studentService.updateSkills(student.id, skillsList);
    res.json({ success: true, data: updated.skills, message: 'Skills updated successfully' });
  } catch (err) {
    next(err);
  }
}

async function getPreferences(req, res, next) {
  try {
    const student = await studentService.getDemoStudent();
    res.json({ success: true, data: student ? student.preference : null });
  } catch (err) {
    next(err);
  }
}

async function updatePreferences(req, res, next) {
  try {
    const student = await studentService.getDemoStudent();
    const updated = await studentService.updatePreferences(student.id, req.body);
    res.json({ success: true, data: updated, message: 'Preferences updated successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getProfile,
  updateProfile,
  getSkills,
  updateSkills,
  getPreferences,
  updatePreferences
};
