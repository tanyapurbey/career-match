const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function fetchJson(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Dashboard
  getDashboardStats: () => fetchJson('/dashboard/stats'),
  getDashboardRecommendations: () => fetchJson('/dashboard/recommendations'),
  getDashboardActivity: () => fetchJson('/dashboard/activity'),

  // Jobs
  getJobs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/jobs${query ? `?${query}` : ''}`);
  },
  getJobById: (id) => fetchJson(`/jobs/${id}`),
  getRecommendedJobs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/jobs/recommended${query ? `?${query}` : ''}`);
  },
  getEligibleJobs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/jobs/eligible${query ? `?${query}` : ''}`);
  },
  compareJobs: (job1Id, job2Id) => fetchJson(`/jobs/compare?job1Id=${job1Id}&job2Id=${job2Id}`),

  // Saved Jobs
  getSavedJobs: () => fetchJson('/saved-jobs'),
  saveJob: (jobId) => fetchJson(`/saved-jobs/${jobId}`, { method: 'POST' }),
  removeSavedJob: (jobId) => fetchJson(`/saved-jobs/${jobId}`, { method: 'DELETE' }),

  // Applications
  getApplications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/applications${query ? `?${query}` : ''}`);
  },
  createApplication: (appData) =>
    fetchJson('/applications', { method: 'POST', body: JSON.stringify(appData) }),
  updateApplication: (id, appData) =>
    fetchJson(`/applications/${id}`, { method: 'PUT', body: JSON.stringify(appData) }),
  updateApplicationStatus: (id, status) =>
    fetchJson(`/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteApplication: (id) => fetchJson(`/applications/${id}`, { method: 'DELETE' }),

  // Profile
  getProfile: () => fetchJson('/profile'),
  updateProfile: (profileData) =>
    fetchJson('/profile', { method: 'PUT', body: JSON.stringify(profileData) }),
  getSkills: () => fetchJson('/profile/skills'),
  updateSkills: (skills) =>
    fetchJson('/profile/skills', { method: 'PUT', body: JSON.stringify({ skills }) }),
  getPreferences: () => fetchJson('/profile/preferences'),
  updatePreferences: (preferences) =>
    fetchJson('/profile/preferences', { method: 'PUT', body: JSON.stringify(preferences) }),

  // Algorithms
  runSort: (data) =>
    fetchJson('/algorithms/sort', { method: 'POST', body: JSON.stringify(data) }),
  runSearch: (data) =>
    fetchJson('/algorithms/search', { method: 'POST', body: JSON.stringify(data) }),
  runStringMatch: (data) =>
    fetchJson('/algorithms/string-match', { method: 'POST', body: JSON.stringify(data) }),
  runGreedy: (data) =>
    fetchJson('/algorithms/greedy-selection', { method: 'POST', body: JSON.stringify(data) }),
  runKnapsack: (data) =>
    fetchJson('/algorithms/knapsack', { method: 'POST', body: JSON.stringify(data) }),
  runBenchmark: (data) =>
    fetchJson('/algorithms/benchmark', { method: 'POST', body: JSON.stringify(data) }),
  getMetrics: () => fetchJson('/algorithms/metrics')
};
