/**
 * Eligibility Checking Engine for CareerMatch
 *
 * Validates hard constraints:
 *   1. CGPA >= Minimum CGPA
 *   2. Student degree in Eligible Degrees
 *   3. Student graduation year in Eligible Graduation Years
 *   4. Student experience >= Required Experience (0 for interns)
 */

function checkEligibility(student, job) {
  const reasons = [];
  let isEligible = true;

  // 1. CGPA Check
  const minCGPA = Number(job.minimumCGPA) || 0;
  const studentCGPA = Number(student.cgpa) || 0;
  if (minCGPA > 0 && studentCGPA < minCGPA) {
    isEligible = false;
    reasons.push(`CGPA requirement not met (Required: ≥ ${minCGPA}, Current: ${studentCGPA})`);
  }

  // 2. Degree Check
  if (job.eligibleDegrees && student.degree) {
    const allowedDegrees = job.eligibleDegrees
      .split(',')
      .map(d => d.trim().toLowerCase());
    const studentDeg = student.degree.trim().toLowerCase();
    const matchDegree = allowedDegrees.some(deg =>
      deg === 'all' || studentDeg.includes(deg) || deg.includes(studentDeg)
    );
    if (!matchDegree && allowedDegrees.length > 0) {
      isEligible = false;
      reasons.push(`Degree "${student.degree}" not in eligible degrees list (${job.eligibleDegrees})`);
    }
  }

  // 3. Graduation Year Check
  if (job.eligibleGraduationYears && student.graduationYear) {
    const allowedYears = job.eligibleGraduationYears
      .split(',')
      .map(y => parseInt(y.trim(), 10))
      .filter(y => !isNaN(y));
    const studentYear = parseInt(student.graduationYear, 10);
    if (allowedYears.length > 0 && !allowedYears.includes(studentYear)) {
      isEligible = false;
      reasons.push(
        `Graduation year ${studentYear} not in eligible batches (${job.eligibleGraduationYears})`
      );
    }
  }

  // 4. Experience Check
  const reqExp = Number(job.requiredExperience) || 0;
  const studentExp = 0; // Default for college student
  if (reqExp > 0 && studentExp < reqExp) {
    isEligible = false;
    reasons.push(`Requires at least ${reqExp} year(s) experience`);
  }

  return {
    isEligible,
    status: isEligible ? 'Eligible' : 'Not Eligible',
    reasons,
    summary: isEligible
      ? 'Meets all mandatory eligibility criteria'
      : reasons.join('; ')
  };
}

module.exports = { checkEligibility };
