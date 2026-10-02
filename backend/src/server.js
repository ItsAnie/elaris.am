require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const invitationRoutes = require('./routes/invitationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow connections from frontend dev and production servers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    brand: 'ELARIS Digital Invitations',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/invitations', invitationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    brand: 'ELARIS Digital Invitations API',
    endpoints: {
      health: '/api/health',
      invitations: '/api/invitations',
      orders: '/api/orders',
      contact: '/api/contact'
    }
  });
});

// Central Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` ELARIS API Server running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Invitations:  http://localhost:${PORT}/api/invitations`);
  console.log(` Orders:       http://localhost:${PORT}/api/orders`);
  console.log(`===============================================`);
});

module.exports = app;
