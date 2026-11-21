import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  Bookmark,
  Briefcase,
  FlaskConical,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { student } = useApp();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Discover Jobs', path: '/discover', icon: Compass },
    { name: 'Recommended', path: '/recommended', icon: Sparkles, badge: 'DAA' },
    { name: 'Saved Jobs', path: '/saved', icon: Bookmark },
    { name: 'My Applications', path: '/applications', icon: Briefcase },
    { name: 'Algorithm Lab', path: '/algorithm-lab', icon: FlaskConical, highlight: true },
    { name: 'My Profile', path: '/profile', icon: User }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200/90 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 tracking-tight text-lg leading-tight">
                  CareerMatch
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-600">
                  DAA Intelligence
                </span>
              </div>
            )}
          </div>

          {/* Collapse Button (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                      : item.highlight
                      ? 'text-indigo-600 hover:bg-indigo-50/70'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" />
                {!collapsed && (
                  <span className="truncate flex-1">{item.name}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-100 text-brand-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Profile Section */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <NavLink
            to="/profile"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-xs transition-all border border-transparent hover:border-slate-200/80"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center shrink-0 border border-indigo-200 text-sm">
              {student ? student.fullName.split(' ').map(n => n[0]).join('') : 'TS'}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {student ? student.fullName : 'Tanya Sharma'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {student ? `${student.degree} • CGPA ${student.cgpa}` : 'B.Tech • 8.65'}
                </p>
              </div>
            )}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
