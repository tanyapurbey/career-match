import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Sparkles,
  Bookmark,
  Send,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Cpu
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import JobCard from '../components/common/JobCard';
import Badge from '../components/common/Badge';

export default function DashboardPage() {
  const { student } = useApp();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [statsRes, recRes, actRes] = await Promise.all([
          api.getDashboardStats(),
          api.getDashboardRecommendations(),
          api.getDashboardActivity()
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (recRes.success) setRecommendations(recRes.data);
        if (actRes.success) setActivity(actRes.data);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const kpis = [
    {
      title: 'Total Opportunities',
      value: stats ? stats.totalJobs : '52',
      subtitle: 'Active synthetic listings',
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-100'
    },
    {
      title: 'Recommended for You',
      value: stats ? stats.recommendedCount : '18',
      subtitle: 'Algorithmic matches (DAA)',
      icon: Sparkles,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-100',
      highlight: true
    },
    {
      title: 'Saved Opportunities',
      value: stats ? stats.savedJobsCount : '4',
      subtitle: 'Bookmarked for review',
      icon: Bookmark,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100'
    },
    {
      title: 'Applications Active',
      value: stats ? stats.applicationsCount : '6',
      subtitle: 'Across application pipeline',
      icon: Send,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100'
    }
  ];

  const STATUS_COLORS = {
    Saved: '#94a3b8',
    Applied: '#3b82f6',
    OA: '#8b5cf6',
    Interview: '#f59e0b',
    Offer: '#10b981',
    Rejected: '#ef4444',
    Withdrawn: '#64748b'
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Personalized Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-900 to-indigo-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-200 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>DAA Algorithmic Engine Active</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            Good morning, {student ? student.fullName.split(' ')[0] : 'Tanya'}
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Discover opportunities that match your skills and career goals, ranked using custom
            Merge Sort, KMP matching, and Knapsack optimization.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => navigate('/algorithm-lab')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4" />
            <span>Open Algorithm Lab</span>
          </button>
          <button
            onClick={() => navigate('/recommended')}
            className="px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold shadow-lg transition-all flex items-center gap-1.5"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all ${
                kpi.highlight ? 'ring-2 ring-brand-500/20' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{kpi.title}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">{kpi.value}</p>
              <p className="text-xs text-slate-500 mt-1">{kpi.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Top 5 Recommended Opportunities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Top Recommended for You</h2>
              <Badge variant="brand" size="xs">
                Merge Sort O(n log n)
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Ranked in real-time according to your verified skills and availability
            </p>
          </div>
          <button
            onClick={() => navigate('/recommended')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.slice(0, 3).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {/* Analytics Grid: Application Activity & Market Skill Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Activity Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Application Pipeline Status</h3>
              <p className="text-xs text-slate-500">Active status distribution across companies</p>
            </div>
            <button
              onClick={() => navigate('/applications')}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              Kanban Board →
            </button>
          </div>

          <div className="h-64 w-full">
            {activity && activity.activityChart ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activity.activityChart}>
                  <XAxis dataKey="status" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                      border: 'none'
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {activity.activityChart.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[entry.status] || '#6366f1'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Loading activity data...
              </div>
            )}
          </div>
        </div>

        {/* Market Skill Demand vs Student Profile */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Skill Demand vs Your Profile</h3>
              <p className="text-xs text-slate-500">
                Skills required in recommended roles matched against your profile
              </p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              Update Skills →
            </button>
          </div>

          <div className="space-y-3">
            {activity && activity.topMarketSkills ? (
              activity.topMarketSkills.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    {item.hasSkill ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-800">{item.skill}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[11px]">{item.demand} jobs demand this</span>
                    <Badge variant={item.hasSkill ? 'success' : 'warning'} size="xs">
                      {item.hasSkill ? 'Matched' : 'Missing'}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-400 py-8 text-center">Loading skill insights...</div>
            )}
          </div>
        </div>
      </div>

      {/* Recently Added Jobs */}
      {activity && activity.recentJobs && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recently Added Postings</h2>
              <p className="text-xs text-slate-500">Fresh internship listings added to the pool</p>
            </div>
            <button
              onClick={() => navigate('/discover')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              Browse All Postings →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activity.recentJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="indigo" size="xs">
                      New
                    </Badge>
                    <span className="text-[11px] text-slate-400 font-medium">{job.location}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{job.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{job.companyName}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    ₹{((job.salaryMin || 25000) / 1000).toFixed(0)}k/mo
                  </span>
                  <span className="text-brand-600 font-semibold">{job.matchPercentage}% match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
