import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Kanban,
  Table as TableIcon,
  Search,
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit2,
  ArrowRight,
  MoreVertical
} from 'lucide-react';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

export default function ApplicationsPage() {
  const { addToast } = useApp();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('kanban'); // 'kanban' or 'table'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Edit / Update Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeApp, setActiveApp] = useState(null);
  const [modalStatus, setModalStatus] = useState('Applied');
  const [modalNotes, setModalNotes] = useState('');
  const [modalDate, setModalDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const COLUMNS = ['Saved', 'Applied', 'OA', 'Interview', 'Offer', 'Rejected'];

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.getApplications();
      if (res.success) {
        setApplications(res.data);
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await api.updateApplicationStatus(appId, newStatus);
      setApplications(prev =>
        prev.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
      );
      addToast(`Status updated to ${newStatus}`, 'success');
    } catch (err) {
      addToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (appId) => {
    try {
      await api.deleteApplication(appId);
      setApplications(prev => prev.filter(app => app.id !== appId));
      addToast('Application removed', 'info');
    } catch (err) {
      addToast('Failed to delete application', 'error');
    }
  };

  const openEditModal = (app) => {
    setActiveApp(app);
    setModalStatus(app.status);
    setModalNotes(app.notes || '');
    setModalDate(app.interviewDate ? app.interviewDate.substring(0, 10) : '');
    setEditModalOpen(true);
  };

  const handleSaveModal = async () => {
    if (!activeApp) return;
    try {
      setSubmitting(true);
      const res = await api.updateApplication(activeApp.id, {
        status: modalStatus,
        notes: modalNotes,
        interviewDate: modalDate || null
      });
      if (res.success) {
        setApplications(prev =>
          prev.map(a => (a.id === activeApp.id ? { ...a, ...res.data } : a))
        );
        addToast('Application details updated', 'success');
        setEditModalOpen(false);
      }
    } catch (err) {
      addToast('Failed to save update', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredApps = applications.filter(app => {
    if (statusFilter !== 'All' && app.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const titleMatch = app.job.title.toLowerCase().includes(q);
      const compMatch = app.job.companyName.toLowerCase().includes(q);
      return titleMatch || compMatch;
    }
    return true;
  });

  const getStatusBadgeVariant = (st) => {
    switch (st) {
      case 'Offer': return 'success';
      case 'Interview': return 'warning';
      case 'OA': return 'purple';
      case 'Applied': return 'brand';
      case 'Rejected': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Application Tracker</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track interview rounds, assessment deadlines, and offer letters in an interactive Kanban board.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setView('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                view === 'kanban' ? 'bg-slate-100 text-brand-600' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                view === 'table' ? 'bg-slate-100 text-brand-600' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline Summary Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {COLUMNS.map(col => {
          const count = applications.filter(a => a.status === col).length;
          return (
            <div
              key={col}
              onClick={() => setStatusFilter(statusFilter === col ? 'All' : col)}
              className={`p-3.5 rounded-2xl bg-white border cursor-pointer transition-all ${
                statusFilter === col
                  ? 'border-brand-500 ring-2 ring-brand-500/10 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {col}
              </span>
              <p className="text-xl font-black text-slate-900 mt-1">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search active applications..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Main Kanban Board View */}
      {loading ? (
        <div className="py-20 text-center space-y-2">
          <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Loading your application pipeline...</p>
        </div>
      ) : view === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {COLUMNS.map(column => {
            const columnApps = filteredApps.filter(app => app.status === column);
            return (
              <div
                key={column}
                className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200/70 space-y-3 min-h-[420px] flex flex-col justify-start"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className="text-xs font-bold text-slate-700">{column}</span>
                  <span className="w-5 h-5 rounded-full bg-white text-slate-600 text-[10px] font-bold flex items-center justify-center border border-slate-200">
                    {columnApps.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3">
                  {columnApps.map(app => (
                    <div
                      key={app.id}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:border-brand-300 transition-all space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <p className="text-[10px] font-semibold text-brand-600 uppercase tracking-wider">
                            {app.job.companyName}
                          </p>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {app.job.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => openEditModal(app)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>

                      {app.notes && (
                        <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2">
                          {app.notes}
                        </p>
                      )}

                      {app.interviewDate && (
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-700 bg-amber-50 px-2 py-1 rounded-md font-medium">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>Round on {new Date(app.interviewDate).toLocaleDateString()}</span>
                        </div>
                      )}

                      {/* Quick Move Selector */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="text-[10px] font-bold bg-slate-50 border border-slate-200 rounded-md py-0.5 px-1.5 text-slate-700 focus:outline-none"
                        >
                          {COLUMNS.map(c => (
                            <option key={c} value={c}>
                              Move: {c}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="py-8 text-center text-[11px] text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-5">Role & Company</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Interview Schedule</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-slate-900">{app.job.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{app.job.companyName}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={getStatusBadgeVariant(app.status)} size="xs">
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      {app.interviewDate ? (
                        <span className="text-amber-700 font-semibold">
                          {new Date(app.interviewDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-600">
                      {app.notes || '—'}
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(app)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Application Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={activeApp ? `Update ${activeApp.job.title}` : 'Edit Application'}
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Application Status</label>
            <select
              value={modalStatus}
              onChange={(e) => setModalStatus(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 font-medium"
            >
              {COLUMNS.map(col => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Interview Date</label>
            <input
              type="date"
              value={modalDate}
              onChange={(e) => setModalDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Round Notes / Feedback</label>
            <textarea
              value={modalNotes}
              onChange={(e) => setModalNotes(e.target.value)}
              rows={3}
              placeholder="Add your notes about this stage..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveModal}
              disabled={submitting}
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-xs"
            >
              {submitting ? 'Saving...' : 'Save Updates'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
