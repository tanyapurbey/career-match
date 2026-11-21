import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState(new Set());

  // Show Toast
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadStudentProfile = async () => {
    try {
      setLoading(true);
      const res = await api.getProfile();
      if (res.success && res.data) {
        setStudent(res.data);
      }
      const savedRes = await api.getSavedJobs();
      if (savedRes.success && savedRes.data) {
        setSavedJobIds(new Set(savedRes.data.map(j => j.id)));
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentProfile();
  }, []);

  const toggleSaveJob = async (jobId) => {
    const isCurrentlySaved = savedJobIds.has(jobId);
    try {
      if (isCurrentlySaved) {
        await api.removeSavedJob(jobId);
        setSavedJobIds(prev => {
          const next = new Set(prev);
          next.delete(jobId);
          return next;
        });
        addToast('Job removed from saved list', 'info');
      } else {
        await api.saveJob(jobId);
        setSavedJobIds(prev => new Set(prev).add(jobId));
        addToast('Job saved to your list', 'success');
      }
      return !isCurrentlySaved;
    } catch (err) {
      addToast('Failed to update saved job', 'error');
      return isCurrentlySaved;
    }
  };

  return (
    <AppContext.Provider
      value={{
        student,
        loading,
        toasts,
        addToast,
        removeToast,
        savedJobIds,
        toggleSaveJob,
        reloadStudent: loadStudentProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
