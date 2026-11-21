import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Search,
  SlidersHorizontal,
  Trash2,
  ArrowRight,
  Scale,
  Briefcase,
  MapPin,
  Sparkles,
  X
} from 'lucide-react';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import JobCard from '../components/common/JobCard';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

export default function SavedJobsPage() {
  const navigate = useNavigate();
  const { toggleSaveJob, addToast } = useApp();

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const res = await api.getSavedJobs();
      if (res.success) {
        setSavedJobs(res.data);
      }
    } catch (err) {
      console.error('Failed to load saved jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleRemove = async (jobId) => {
    await toggleSaveJob(jobId);
    setSavedJobs(prev => prev.filter(j => j.id !== jobId));
    setSelectedForCompare(prev => prev.filter(id => id !== jobId));
  };

  const toggleSelectForCompare = (jobId) => {
    if (selectedForCompare.includes(jobId)) {
      setSelectedForCompare(prev => prev.filter(id => id !== jobId));
    } else {
      if (selectedForCompare.length >= 2) {
        addToast('You can compare at most 2 opportunities at a time', 'info');
        return;
      }
      setSelectedForCompare(prev => [...prev, jobId]);
    }
  };

  const handleOpenCompare = async () => {
    if (selectedForCompare.length !== 2) {
      addToast('Select exactly 2 jobs to compare', 'info');
      return;
    }
    try {
      const res = await api.compareJobs(selectedForCompare[0], selectedForCompare[1]);
      if (res.success) {
        setComparisonData(res.data);
        setCompareModalOpen(true);
      }
    } catch (err) {
      addToast('Failed to compare jobs', 'error');
    }
  };

  const filteredJobs = savedJobs.filter(job => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.companyName.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Saved Opportunities</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review bookmarked internships, analyze tradeoffs, and compare requirements side-by-side.
          </p>
        </div>

        {/* Compare Action Bar */}
        <div className="flex items-center gap-3">
          {selectedForCompare.length > 0 && (
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700">
              <Scale className="w-3.5 h-3.5" />
              <span>{selectedForCompare.length}/2 selected</span>
              <button
                onClick={() => setSelectedForCompare([])}
                className="hover:text-indigo-900 ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={handleOpenCompare}
            disabled={selectedForCompare.length !== 2}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              selectedForCompare.length === 2
                ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Compare Selected (2)</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search within saved opportunities..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Saved Jobs List */}
      {loading ? (
        <div className="py-20 text-center space-y-2">
          <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Loading your saved list...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">No saved opportunities</h3>
          <p className="text-xs text-slate-500">
            You haven't bookmarked any jobs yet. Browse recommended opportunities and click the bookmark icon to save them.
          </p>
          <button
            onClick={() => navigate('/discover')}
            className="px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 transition-colors inline-block"
          >
            Discover Opportunities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => {
            const isSelected = selectedForCompare.includes(job.id);
            return (
              <div key={job.id} className="relative flex flex-col justify-between">
                {/* Compare Checkbox Pill */}
                <div className="absolute top-2 left-2 z-10">
                  <button
                    onClick={() => toggleSelectForCompare(job.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white border-brand-700 shadow-sm'
                        : 'bg-white/90 backdrop-blur-md text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? '✓ In Compare' : '+ Compare'}
                  </button>
                </div>

                <JobCard job={job} isSaved={true} />
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Modal */}
      <Modal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        title="Side-by-Side Opportunity Comparison"
        maxWidth="max-w-4xl"
      >
        {comparisonData && (
          <div className="grid grid-cols-2 gap-6 divide-x divide-slate-100">
            {/* Job 1 */}
            <div className="space-y-4 pr-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                  Opportunity 1
                </span>
                <h4 className="font-bold text-slate-900 text-base">{comparisonData.job1.title}</h4>
                <p className="text-xs text-slate-500 font-semibold">{comparisonData.job1.companyName}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Relevance Score:</span>
                  <span className="font-bold text-brand-600">{comparisonData.job1.score}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Skill Match:</span>
                  <span className="font-bold text-slate-800">{comparisonData.job1.matchPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-medium text-slate-700">{comparisonData.job1.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Work Mode:</span>
                  <span className="font-medium text-slate-700">{comparisonData.job1.workMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Salary:</span>
                  <span className="font-bold text-slate-900">
                    ₹{((comparisonData.job1.salaryMin || 25000) / 1000).toFixed(0)}k/mo
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Required Skills
                </p>
                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {comparisonData.job1.requiredSkills}
                </p>
              </div>
            </div>

            {/* Job 2 */}
            <div className="space-y-4 pl-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                  Opportunity 2
                </span>
                <h4 className="font-bold text-slate-900 text-base">{comparisonData.job2.title}</h4>
                <p className="text-xs text-slate-500 font-semibold">{comparisonData.job2.companyName}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Relevance Score:</span>
                  <span className="font-bold text-brand-600">{comparisonData.job2.score}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Skill Match:</span>
                  <span className="font-bold text-slate-800">{comparisonData.job2.matchPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-medium text-slate-700">{comparisonData.job2.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Work Mode:</span>
                  <span className="font-medium text-slate-700">{comparisonData.job2.workMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Salary:</span>
                  <span className="font-bold text-slate-900">
                    ₹{((comparisonData.job2.salaryMin || 25000) / 1000).toFixed(0)}k/mo
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Required Skills
                </p>
                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {comparisonData.job2.requiredSkills}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
