const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Load your generated swagger documentation
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'docs', 'swagger.json'), 'utf8')
);

// Serve swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Test Microservice API Documentation"
}));

// Serve raw JSON at /swagger.json (useful for integration)
app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocument);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Redirect root to documentation
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.listen(PORT, () => {
  console.log(`🚀 Swagger documentation server running at:`);
  console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`📄 Raw JSON: http://localhost:${PORT}/swagger.json`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
