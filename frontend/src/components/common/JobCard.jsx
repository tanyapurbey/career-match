import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Bookmark,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import Badge from './Badge';
import { useApp } from '../../context/AppContext';

export default function JobCard({ job, viewMode = 'grid', onApply, isSaved: propIsSaved }) {
  const navigate = useNavigate();
  const { savedJobIds, toggleSaveJob } = useApp();

  const isSaved = propIsSaved !== undefined ? propIsSaved : savedJobIds.has(job.id);
  const score = job.recommendationScore ?? job.score ?? 50;
  const matchPct = job.matchPercentage ?? 60;
  const isEligible = job.isEligible !== false;

  const requiredSkills = (job.requiredSkills || '').split(',').map(s => s.trim()).filter(Boolean);
  const missingSkills = job.missingRequiredSkills || [];

  const formatSalary = (min, max, currency = 'INR') => {
    const symbol = currency === 'INR' ? '₹' : '$';
    if (!min && !max) return 'Competitive';
    if (min && max) {
      return `${symbol}${(min / 1000).toFixed(0)}k - ${symbol}${(max / 1000).toFixed(0)}k/mo`;
    }
    return `${symbol}${((min || max) / 1000).toFixed(0)}k/mo`;
  };

  const getMatchBadgeColor = (val) => {
    if (val >= 80) return 'success';
    if (val >= 60) return 'brand';
    if (val >= 40) return 'warning';
    return 'danger';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-brand-300 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60';
                }}
              />
            ) : (
              <Briefcase className="w-6 h-6 text-slate-400" />
            )}
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="text-base font-semibold text-slate-900 hover:text-brand-600 transition-colors cursor-pointer truncate"
              >
                {job.title}
              </h3>
              {job.rank && (
                <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-bold text-xs">
                  #{job.rank}
                </span>
              )}
              <Badge variant={getMatchBadgeColor(matchPct)} size="xs">
                {matchPct}% Skill Match
              </Badge>
              {!isEligible && (
                <Badge variant="danger" size="xs">
                  Ineligible
                </Badge>
              )}
            </div>

            <p className="text-sm font-medium text-slate-600">{job.companyName}</p>

            <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {job.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                {job.jobType} ({job.workMode})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save job'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            Details
          </button>

          <button
            onClick={() => (onApply ? onApply(job) : navigate(`/jobs/${job.id}`))}
            className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition-colors flex items-center gap-1"
          >
            <span>{job.applicationStatus ? job.applicationStatus : 'Apply'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-brand-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group relative">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={job.companyLogo || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60'}
                alt={job.companyName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60';
                }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {job.companyName}
              </p>
              <h3
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors cursor-pointer line-clamp-1"
                title={job.title}
              >
                {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save job'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location & Details Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 mb-3.5">
          <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {job.location}
          </span>
          <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 font-medium">
            {job.jobType}
          </span>
          <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            {job.workMode}
          </span>
        </div>

        {/* Score & Skill Match Bar */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              Relevance Score: {score}/100
            </span>
            <Badge variant={getMatchBadgeColor(matchPct)} size="xs">
              {matchPct}% Match
            </Badge>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                matchPct >= 75 ? 'bg-emerald-500' : matchPct >= 50 ? 'bg-brand-500' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, matchPct))}%` }}
            />
          </div>

          {/* Missing Skills Warning */}
          {missingSkills.length > 0 && (
            <p className="text-[11px] text-slate-500 line-clamp-1">
              <span className="text-amber-600 font-semibold">Missing: </span>
              {missingSkills.slice(0, 3).join(', ')}
            </p>
          )}
        </div>

        {/* Required Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {requiredSkills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md"
            >
              {skill}
            </span>
          ))}
          {requiredSkills.length > 4 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 text-slate-400">
              +{requiredSkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer: Salary + Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Salary</p>
          <p className="text-sm font-bold text-slate-900">
            {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => (onApply ? onApply(job) : navigate(`/jobs/${job.id}`))}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors shadow-xs flex items-center gap-1"
          >
            <span>{job.applicationStatus || 'Apply'}</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
