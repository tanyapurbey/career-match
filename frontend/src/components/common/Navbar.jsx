import React, { useState } from 'react';
import { Menu, Search, Bell, Sparkles, User, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setMobileOpen }) {
  const { student } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, skill (KMP search), company..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
          />
        </form>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* DAA Algorithm Lab Quick Pill */}
        <button
          onClick={() => navigate('/algorithm-lab')}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100/80 border border-brand-200 rounded-xl transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>DAA Benchmark Lab</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400">Notifications</h4>
                <span className="text-[11px] font-medium text-brand-600">3 new</span>
              </div>
              <div className="mt-3 space-y-3">
                <div className="text-xs p-2.5 rounded-xl bg-brand-50/50 border border-brand-100">
                  <p className="font-semibold text-slate-900">New High-Match Job Found!</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Razorpay matches 86% of your profile skills.</p>
                </div>
                <div className="text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-semibold text-slate-900">Application Status Update</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Your Swiggy application moved to Interview stage.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 p-1 pl-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
        >
          <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
            {student ? student.fullName.split(' ')[0] : 'Tanya'}
          </span>
          <div className="w-7 h-7 rounded-lg bg-brand-600 text-white font-medium text-xs flex items-center justify-center">
            {student ? student.fullName[0] : 'T'}
          </div>
        </button>
      </div>
    </header>
  );
}
