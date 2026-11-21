require('dotenv').config();
const express = require('express');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');
const jobRoutes = require('./routes/jobRoutes');
const savedJobRoutes = require('./routes/savedJobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const algorithmRoutes = require('./routes/algorithmRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

// API Routes
app.use('/api/profile', studentRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/saved-jobs', savedJobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/algorithms', algorithmRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    project: 'CareerMatch — Smart Internship & Job Recommendation System',
    timestamp: new Date().toISOString()
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Start Server if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 CareerMatch Backend Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
