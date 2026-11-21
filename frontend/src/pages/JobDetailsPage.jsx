import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Bookmark,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  GraduationCap,
  Award,
  Send,
  Building,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, savedJobIds, toggleSaveJob, addToast } = useApp();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('Applied');
  const [applicationNotes, setApplicationNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadJob() {
      try {
        setLoading(true);
        const res = await api.getJobById(id);
        if (res.success && res.data) {
          setJob(res.data);
          if (res.data.applicationStatus) {
            setApplicationStatus(res.data.applicationStatus);
          }
        }
      } catch (err) {
        console.error('Failed to load job details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [id]);

  const handleApply = async () => {
    try {
      setSubmitting(true);
      await api.createApplication({
        jobId: job.id,
        status: applicationStatus,
        notes: applicationNotes
      });
      setJob(prev => ({ ...prev, applicationStatus }));
      addToast(`Application marked as "${applicationStatus}"!`, 'success');
      setApplyModalOpen(false);
    } catch (err) {
      addToast('Failed to submit application', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Loading opportunity details & computing DAA score breakdown...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-base font-bold text-slate-800">Job opportunity not found</p>
        <button
          onClick={() => navigate('/discover')}
          className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold"
        >
          Return to Discover
        </button>
      </div>
    );
  }

  const isSaved = savedJobIds.has(job.id);
  const isEligible = job.isEligible !== false;
  const matchPct = job.matchPercentage ?? 60;
  const score = job.recommendationScore ?? job.score ?? 50;

  const requiredSkills = (job.requiredSkills || '').split(',').map(s => s.trim()).filter(Boolean);
  const preferredSkills = (job.preferredSkills || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in pb-12">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to listings</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={job.companyLogo || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60'}
                alt={job.companyName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                  {job.title}
                </h1>
                <Badge variant={isEligible ? 'success' : 'danger'} size="sm">
                  {isEligible ? 'Eligible' : 'Not Eligible'}
                </Badge>
              </div>
              <p className="text-sm font-semibold text-brand-600">{job.companyName}</p>

              <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {job.jobType} • {job.workMode}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-900">
                  ₹{((job.salaryMin || 25000) / 1000).toFixed(0)}k - ₹{((job.salaryMax || 35000) / 1000).toFixed(0)}k/mo
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-4 h-4" />
                  Apply by: {new Date(job.applicationDeadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-3 rounded-2xl border transition-all ${
                isSaved
                  ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
              title={isSaved ? 'Saved' : 'Save job'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setApplyModalOpen(true)}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{job.applicationStatus ? `Status: ${job.applicationStatus}` : 'Apply Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Details & Right Algorithmic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 2 Columns Description & Eligibility */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Job Description</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>

            <h3 className="text-sm font-bold text-slate-900 pt-3 border-t border-slate-100">
              Key Responsibilities
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{job.responsibilities}</p>
          </div>

          {/* Required & Preferred Skills */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-7 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900">Skill Requirements</h2>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                Mandatory Required Skills (50% Weight)
              </p>
              <div className="flex flex-wrap gap-2">
                {requiredSkills.map((skill, idx) => {
                  const isMatched = (job.matchedRequiredSkills || []).some(
                    s => s.toLowerCase() === skill.toLowerCase()
                  );
                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
                        isMatched
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {isMatched ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      <span>{skill}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {preferredSkills.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                  Preferred / Nice-to-Have Skills (15% Weight)
                </p>
                <div className="flex flex-wrap gap-2">
                  {preferredSkills.map((skill, idx) => {
                    const isMatched = (job.matchedPreferredSkills || []).some(
                      s => s.toLowerCase() === skill.toLowerCase()
                    );
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border ${
                          isMatched
                            ? 'bg-brand-50 text-brand-800 border-brand-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {isMatched ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span>{skill}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Academic & Eligibility Criteria */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Academic & Eligibility Criteria</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Minimum CGPA
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {job.minimumCGPA ? `≥ ${job.minimumCGPA}` : 'No cutoff'}
                </p>
                <p className="text-[11px] text-slate-500">
                  Your current CGPA: <span className="font-semibold text-slate-700">{student?.cgpa || 8.65}</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Eligible Degrees
                </span>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {job.eligibleDegrees || 'All degrees'}
                </p>
                <p className="text-[11px] text-slate-500">
                  Your degree: <span className="font-semibold text-slate-700">{student?.degree || 'B.Tech'}</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Graduation Batches
                </span>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {job.eligibleGraduationYears || 'All batches'}
                </p>
                <p className="text-[11px] text-slate-500">
                  Your batch: <span className="font-semibold text-slate-700">{student?.graduationYear || 2026}</span>
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Required Experience
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {job.requiredExperience === 0 ? 'Fresher (0 Years)' : `${job.requiredExperience}+ Years`}
                </p>
                <p className="text-[11px] text-slate-500">College Intern Eligibility</p>
              </div>
            </div>

            {/* Ineligible Explanation */}
            {!isEligible && job.eligibilityReasons && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Not Eligible for This Role</p>
                  <p className="mt-0.5">{job.eligibilityReasons.join('; ')}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: DAA Score Breakdown & Knapsack Specs */}
        <div className="space-y-6">
          {/* Recommendation Score Engine Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>DAA Score Breakdown</span>
              </h3>
              <span className="text-xl font-black text-brand-700">{score}/100</span>
            </div>

            {/* Explanation Quote */}
            <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-100 text-xs text-brand-900 leading-relaxed font-medium">
              "{job.explanation}"
            </div>

            {/* Formula Breakdown */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Multi-Factor Weighted Formula
              </p>

              {job.scoreBreakdown &&
                Object.entries(job.scoreBreakdown).map(([factor, item]) => {
                  const titles = {
                    requiredSkillsMatch: 'Required Skills (50%)',
                    preferredSkillsMatch: 'Preferred Skills (15%)',
                    location: 'Location Match (10%)',
                    jobType: 'Job Type Match (10%)',
                    workMode: 'Work Mode (5%)',
                    salary: 'Salary Alignment (10%)'
                  };
                  return (
                    <div key={factor} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">{titles[factor] || factor}</span>
                        <span className="font-semibold text-slate-900">
                          +{item.contribution} pts
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-brand-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, item.score)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Knapsack Specifications Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Optimization Profile (DP/Greedy)</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Weight (Time to apply):</span>
                <span className="font-bold text-slate-800">
                  {job.estimatedApplicationMinutes || 60} mins
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Value (Match Score):</span>
                <span className="font-bold text-slate-800">{score} pts</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Efficiency Ratio (V/W):</span>
                <span className="font-bold text-brand-600">
                  {(score / (job.estimatedApplicationMinutes || 60)).toFixed(2)} pts/min
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/algorithm-lab')}
              className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl transition-colors text-center block"
            >
              Test in Knapsack Simulator →
            </button>
          </div>
        </div>
      </div>

      {/* Application Status Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply to ${job.companyName}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            Track this opportunity in your personalized application tracker. You can update its stage
            on your Kanban board as you progress.
          </p>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Pipeline Stage
            </label>
            <select
              value={applicationStatus}
              onChange={(e) => setApplicationStatus(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 font-medium"
            >
              <option value="Applied">Applied</option>
              <option value="OA">Online Assessment (OA)</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer Received</option>
              <option value="Saved">Saved for Later</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Round Notes / Referral details
            </label>
            <textarea
              value={applicationNotes}
              onChange={(e) => setApplicationNotes(e.target.value)}
              placeholder="e.g. Applied through referral from alumni on LinkedIn; OA scheduled for Friday."
              rows={3}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setApplyModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={submitting}
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              {submitting ? 'Saving...' : 'Confirm Status'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
