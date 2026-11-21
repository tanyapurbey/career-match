import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  MapPin,
  Briefcase
} from 'lucide-react';
import { api } from '../services/api';
import JobCard from '../components/common/JobCard';
import Badge from '../components/common/Badge';

export default function DiscoverJobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Filters State
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState('All');
  const [workMode, setWorkMode] = useState('All');
  const [jobType, setJobType] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [minMatch, setMinMatch] = useState('');
  const [minSalary, setMinSalary] = useState('');

  const locationsList = ['All', 'Bengaluru', 'Hyderabad', 'Pune', 'Gurugram', 'Delhi', 'Mumbai', 'Noida', 'Chennai', 'Remote'];
  const workModesList = ['All', 'Remote', 'Hybrid', 'On-site'];
  const jobTypesList = ['All', 'Internship', 'Full-time', 'Part-time', 'Contract', 'Graduate Program'];
  const sortOptions = [
    { label: 'Relevance (Merge Sort)', value: 'relevance' },
    { label: 'Newest Added', value: 'newest' },
    { label: 'Highest Salary', value: 'salary' },
    { label: 'Skill Match %', value: 'match' }
  ];

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (location !== 'All') params.location = location;
      if (workMode !== 'All') params.workMode = workMode;
      if (jobType !== 'All') params.jobType = jobType;
      if (sortBy) params.sortBy = sortBy;
      if (minMatch) params.minMatch = minMatch;
      if (minSalary) params.minSalary = minSalary;

      const res = await api.getJobs(params);
      if (res.success) {
        setJobs(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [location, workMode, jobType, sortBy, minMatch, minSalary]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleResetFilters = () => {
    setSearch('');
    setLocation('All');
    setWorkMode('All');
    setJobType('All');
    setSortBy('relevance');
    setMinMatch('');
    setMinSalary('');
    setSearchParams({});
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Discover Opportunities</h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse through 50+ internships & jobs filtered with KMP string matching and sorted via DAA algorithms.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-slate-100 text-brand-600' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-slate-100 text-brand-600' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3.5">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title, skill (KMP exact matching), company name, or description..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Search</span>
          </button>
        </form>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100">
          {/* Location */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-500 text-slate-700 font-medium"
            >
              {locationsList.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Work Mode
            </label>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-500 text-slate-700 font-medium"
            >
              {workModesList.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Job Type
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-500 text-slate-700 font-medium"
            >
              {jobTypesList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Match */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Min Match %
            </label>
            <select
              value={minMatch}
              onChange={(e) => setMinMatch(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-500 text-slate-700 font-medium"
            >
              <option value="">Any Match</option>
              <option value="40">≥ 40% Match</option>
              <option value="60">≥ 60% Match</option>
              <option value="75">≥ 75% Strong Match</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Sort Algorithm
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-500 text-slate-700 font-semibold"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full py-1.5 px-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Badges */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">
            Showing {jobs.length} opportunities
          </span>
          {sortBy === 'relevance' && (
            <Badge variant="indigo" size="xs">
              Ranked with Merge Sort O(n log n)
            </Badge>
          )}
        </div>
      </div>

      {/* Jobs Grid / List */}
      {loading ? (
        <div className="py-20 text-center space-y-2">
          <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Running DAA matching algorithms...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">No opportunities found</h3>
          <p className="text-xs text-slate-500">
            No jobs matched your current filter criteria. Try resetting filters or searching with different keywords.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-brand-50 text-brand-700 font-semibold text-xs rounded-xl hover:bg-brand-100 transition-colors inline-block"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-4'
          }
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}
