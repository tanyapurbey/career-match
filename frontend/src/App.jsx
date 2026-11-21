import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Toast from './components/common/Toast';

import DashboardPage from './pages/DashboardPage';
import DiscoverJobsPage from './pages/DiscoverJobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import RecommendedJobsPage from './pages/RecommendedJobsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import AlgorithmLabPage from './pages/AlgorithmLabPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex bg-[#f8fafc]">
          {/* Persistent Sidebar */}
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          {/* Main Content Area */}
          <div
            className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
              collapsed ? 'lg:pl-20' : 'lg:pl-64'
            }`}
          >
            <Navbar setMobileOpen={setMobileOpen} />

            <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/discover" element={<DiscoverJobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                <Route path="/recommended" element={<RecommendedJobsPage />} />
                <Route path="/saved" element={<SavedJobsPage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/algorithm-lab" element={<AlgorithmLabPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>

          <Toast />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
