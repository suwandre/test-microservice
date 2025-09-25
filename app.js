const express = require('express');
const bodyParser = require('express').json;
const router = require('./app/router'); // Adjust path to your router.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));

// CORS for Swagger UI (allows requests from localhost:3001)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API Routes - This connects your router.js
app.use('/api', router);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), port: PORT });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running at http://localhost:${PORT}`);
  console.log(`📋 API Endpoints available at http://localhost:${PORT}/api/*`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
