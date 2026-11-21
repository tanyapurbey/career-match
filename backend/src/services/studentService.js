const prisma = require('../config/db');

async function getDemoStudent() {
  let student = await prisma.student.findFirst({
    include: {
      skills: {
        include: { skill: true }
      },
      preference: true
    }
  });

  return student;
}

async function updateProfile(studentId, data) {
  const {
    fullName,
    phone,
    college,
    degree,
    branch,
    graduationYear,
    cgpa,
    availableHoursPerWeek
  } = data;

  const updated = await prisma.student.update({
    where: { id: studentId },
    data: {
      fullName: fullName !== undefined ? fullName : undefined,
      phone: phone !== undefined ? phone : undefined,
      college: college !== undefined ? college : undefined,
      degree: degree !== undefined ? degree : undefined,
      branch: branch !== undefined ? branch : undefined,
      graduationYear: graduationYear !== undefined ? parseInt(graduationYear, 10) : undefined,
      cgpa: cgpa !== undefined ? parseFloat(cgpa) : undefined,
      availableHoursPerWeek:
        availableHoursPerWeek !== undefined ? parseFloat(availableHoursPerWeek) : undefined
    },
    include: {
      skills: { include: { skill: true } },
      preference: true
    }
  });

  return updated;
}

async function updateSkills(studentId, skillList) {
  // skillList is an array of { name, category, proficiencyLevel }
  // 1. Remove existing student skills
  await prisma.studentSkill.deleteMany({
    where: { studentId }
  });

  // 2. Re-create or find skills and link to student
  for (const item of skillList) {
    if (!item.name) continue;
    const skill = await prisma.skill.upsert({
      where: { name: item.name.trim() },
      update: { category: item.category || 'Other' },
      create: { name: item.name.trim(), category: item.category || 'Other' }
    });

    await prisma.studentSkill.create({
      data: {
        studentId,
        skillId: skill.id,
        proficiencyLevel: item.proficiencyLevel || 'Intermediate'
      }
    });
  }

  return getDemoStudent();
}

async function updatePreferences(studentId, prefData) {
  const {
    preferredLocations,
    preferredJobTypes,
    preferredWorkModes,
    preferredRoles,
    minimumSalary,
    maximumApplicationsPerWeek
  } = prefData;

  const updated = await prisma.studentPreference.upsert({
    where: { studentId },
    update: {
      preferredLocations: preferredLocations || '',
      preferredJobTypes: preferredJobTypes || '',
      preferredWorkModes: preferredWorkModes || '',
      preferredRoles: preferredRoles || '',
      minimumSalary: minimumSalary !== undefined ? parseInt(minimumSalary, 10) : 25000,
      maximumApplicationsPerWeek:
        maximumApplicationsPerWeek !== undefined ? parseInt(maximumApplicationsPerWeek, 10) : 10
    },
    create: {
      studentId,
      preferredLocations: preferredLocations || '',
      preferredJobTypes: preferredJobTypes || '',
      preferredWorkModes: preferredWorkModes || '',
      preferredRoles: preferredRoles || '',
      minimumSalary: minimumSalary !== undefined ? parseInt(minimumSalary, 10) : 25000,
      maximumApplicationsPerWeek:
        maximumApplicationsPerWeek !== undefined ? parseInt(maximumApplicationsPerWeek, 10) : 10
    }
  });

  return updated;
}

module.exports = {
  getDemoStudent,
  updateProfile,
  updateSkills,
  updatePreferences
};
