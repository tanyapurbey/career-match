import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  Settings,
  Plus,
  X,
  Save,
  CheckCircle2,
  Clock,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';

export default function ProfilePage() {
  const { student, reloadStudent, addToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [branch, setBranch] = useState('');
  const [graduationYear, setGraduationYear] = useState(2026);
  const [cgpa, setCgpa] = useState(8.65);
  const [availableHours, setAvailableHours] = useState(15);

  // Skills
  const [skills, setSkills] = useState([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming Languages');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  // Preferences
  const [preferredLocations, setPreferredLocations] = useState('');
  const [preferredJobTypes, setPreferredJobTypes] = useState('');
  const [preferredWorkModes, setPreferredWorkModes] = useState('');
  const [minimumSalary, setMinimumSalary] = useState(30000);
  const [maxAppsPerWeek, setMaxAppsPerWeek] = useState(8);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (student) {
      setFullName(student.fullName || '');
      setEmail(student.email || '');
      setPhone(student.phone || '');
      setCollege(student.college || '');
      setDegree(student.degree || '');
      setBranch(student.branch || '');
      setGraduationYear(student.graduationYear || 2026);
      setCgpa(student.cgpa || 8.5);
      setAvailableHours(student.availableHoursPerWeek || 15);

      if (student.skills) {
        setSkills(
          student.skills.map(s => ({
            name: s.skill ? s.skill.name : s.name,
            category: s.skill ? s.skill.category : s.category || 'Other',
            proficiencyLevel: s.proficiencyLevel || 'Intermediate'
          }))
        );
      }

      if (student.preference) {
        setPreferredLocations(student.preference.preferredLocations || '');
        setPreferredJobTypes(student.preference.preferredJobTypes || '');
        setPreferredWorkModes(student.preference.preferredWorkModes || '');
        setMinimumSalary(student.preference.minimumSalary || 30000);
        setMaxAppsPerWeek(student.preference.maximumApplicationsPerWeek || 8);
      }
    }
  }, [student]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    if (skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      addToast('Skill already in your profile', 'info');
      return;
    }

    setSkills(prev => [
      ...prev,
      {
        name: newSkillName.trim(),
        category: newSkillCategory,
        proficiencyLevel: newSkillLevel
      }
    ]);
    setNewSkillName('');
    addToast(`Added "${newSkillName.trim()}" to profile`, 'success');
  };

  const handleRemoveSkill = (skillName) => {
    setSkills(prev => prev.filter(s => s.name !== skillName));
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      await Promise.all([
        api.updateProfile({
          fullName,
          phone,
          college,
          degree,
          branch,
          graduationYear: parseInt(graduationYear, 10),
          cgpa: parseFloat(cgpa),
          availableHoursPerWeek: parseFloat(availableHours)
        }),
        api.updateSkills(skills),
        api.updatePreferences({
          preferredLocations,
          preferredJobTypes,
          preferredWorkModes,
          minimumSalary: parseInt(minimumSalary, 10),
          maximumApplicationsPerWeek: parseInt(maxAppsPerWeek, 10)
        })
      ]);
      await reloadStudent();
      addToast('Profile, skills & preferences saved successfully!', 'success');
    } catch (err) {
      console.error('Save error:', err);
      addToast('Failed to save profile changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  const skillCategories = [
    'Programming Languages',
    'Frameworks',
    'Databases',
    'Tools',
    'Other'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-12">
      {/* Top Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Student Profile & DAA Parameters</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure your verified academic metrics, skills, and weekly application hours.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      {/* Personal & Academic Details */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-8 shadow-xs space-y-5">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-brand-600" />
          <span>Academic & Personal Verification</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed font-medium"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              College / University
            </label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Degree & Major
            </label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="e.g. B.Tech"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Branch / Specialization
            </label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="e.g. Computer Science"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Graduation Year (Batch)
            </label>
            <input
              type="number"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              CGPA (Used for Eligibility Algorithm)
            </label>
            <input
              type="number"
              step="0.01"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-brand-700 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Available Hours/Week (Knapsack Capacity)
            </label>
            <input
              type="number"
              step="0.5"
              value={availableHours}
              onChange={(e) => setAvailableHours(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-indigo-700 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Categorized Skills Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <span>Verified Skills (Used by KMP String Matcher)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Total {skills.length} skills active. These are matched directly against job requirements.
            </p>
          </div>
        </div>

        {/* Add Skill Form */}
        <form onSubmit={handleAddSkill} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap gap-2.5 items-end">
          <div className="flex-1 min-w-[180px]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. Redis, Docker, Go, Spring Boot..."
              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="min-w-[140px]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
            >
              {skillCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[120px]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Proficiency
            </label>
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        </form>

        {/* Categorized Display */}
        <div className="space-y-4">
          {skillCategories.map(category => {
            const catSkills = skills.filter(s => s.category === category);
            if (catSkills.length === 0) return null;

            return (
              <div key={category} className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {category} ({catSkills.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map(skill => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-brand-50 text-brand-900 border border-brand-200 group"
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] font-normal text-brand-600">
                        ({skill.proficiencyLevel})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.name)}
                        className="text-brand-400 hover:text-rose-600 transition-colors ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preferences & Knapsack Constraints */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-8 shadow-xs space-y-5">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-600" />
          <span>Application Preferences & Time Constraints</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Preferred Locations (comma-separated)
            </label>
            <input
              type="text"
              value={preferredLocations}
              onChange={(e) => setPreferredLocations(e.target.value)}
              placeholder="e.g. Bengaluru, Pune, Hyderabad, Remote"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Preferred Work Modes
            </label>
            <input
              type="text"
              value={preferredWorkModes}
              onChange={(e) => setPreferredWorkModes(e.target.value)}
              placeholder="e.g. Remote, Hybrid"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Preferred Job Types
            </label>
            <input
              type="text"
              value={preferredJobTypes}
              onChange={(e) => setPreferredJobTypes(e.target.value)}
              placeholder="e.g. Internship, Graduate Program"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Minimum Desired Stipend/Salary (₹/mo)
            </label>
            <input
              type="number"
              step="5000"
              value={minimumSalary}
              onChange={(e) => setMinimumSalary(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
