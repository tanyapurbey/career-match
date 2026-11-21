import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Filter,
  Cpu,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { api } from '../services/api';
import JobCard from '../components/common/JobCard';
import Badge from '../components/common/Badge';

export default function RecommendedJobsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterEligible, setFilterEligible] = useState(true);
  const [jobType, setJobType] = useState('All');
  const [workMode, setWorkMode] = useState('All');
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'skillMatch', 'salary'

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const params = {
        filterEligible: filterEligible ? 'true' : 'false',
        sortBy,
        limit: 50
      };
      if (jobType !== 'All') params.jobType = jobType;
      if (workMode !== 'All') params.workMode = workMode;

      const res = await api.getRecommendedJobs(params);
      if (res.success) {
        setRecommendations(res.data);
        setMeta(res.algorithmMeta);
      }
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [filterEligible, jobType, workMode, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner with Algorithm Metadata */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Algorithmic Recommendations
            </h1>
            <Badge variant="brand" size="sm">
              DAA Merge Sort
            </Badge>
          </div>
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
            Personalized ranking computed using custom Merge Sort $O(n \log n)$ based on verified student
            skills, CGPA eligibility, and stated career preferences.
          </p>

          {/* Real Algorithm Stats Badge */}
          {meta && (
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-600 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-brand-600" />
                Algorithm: <strong className="text-slate-900">{meta.sortingAlgorithm}</strong>
              </span>
              <span>•</span>
              <span>
                Comparisons: <strong className="text-brand-600">{meta.comparisons}</strong> ops
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Execution time: <strong className="text-emerald-600">{meta.executionTimeMs} ms</strong>
              </span>
            </div>
          )}
        </div>

        {/* Quick Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap bg-slate-50 p-2 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setFilterEligible(!filterEligible)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              filterEligible
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            {filterEligible ? '✓ Eligible Only' : 'Include Ineligible'}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
          >
            <option value="relevance">Rank: Score Descending</option>
            <option value="skillMatch">Rank: Skill Match %</option>
            <option value="salary">Rank: Highest Stipend</option>
          </select>

          <select
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
          >
            <option value="All">All Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      {/* Recommendations Feed */}
      {loading ? (
        <div className="py-24 text-center space-y-2">
          <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Ranking opportunities with Merge Sort...</p>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">No matches found</h3>
          <p className="text-xs text-slate-500">
            No recommendations match your current filter settings. Try toggling "Include Ineligible" to see all roles.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 hover:border-brand-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden"
            >
              {/* Rank Banner */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm shadow-brand-500/20">
                  #{job.rank}
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base text-slate-900">{job.title}</h3>
                    <span className="text-xs font-semibold text-slate-500">• {job.companyName}</span>
                    <Badge variant={job.matchPercentage >= 75 ? 'success' : 'brand'} size="xs">
                      {job.matchPercentage}% Skill Match
                    </Badge>
                    <span className="font-black text-xs text-brand-700 bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-200">
                      Score: {job.recommendationScore}/100
                    </span>
                  </div>

                  {/* Recommendation Explanation Badge */}
                  <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-3xl">
                    <span className="text-brand-600 font-bold">Why recommended: </span>
                    {job.explanation}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.jobType} ({job.workMode})</span>
                    <span>•</span>
                    <span className="font-bold text-slate-800">
                      ₹{((job.salaryMin || 25000) / 1000).toFixed(0)}k - ₹{((job.salaryMax || 35000) / 1000).toFixed(0)}k/mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => window.location.assign(`/jobs/${job.id}`)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs"
                >
                  View Full Analysis →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
