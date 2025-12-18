/**
 * HostelFinder Backend Server
 * Main entry point for the application
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet()); // Set security headers
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://hostelfinder-frontend.onrender.com',
    'http://localhost:3001'
  ],
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', rateLimiter);

// Static files
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/hostels', require('./routes/hostelRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to HostelFinder API',
    version: '1.0.0',
    documentation: '/api/docs',
    activeStatus: true,
    error: false
  });
});
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🏨 HostelFinder Backend Server 🏨             ║
║                                                       ║
║  Status: Running                                      ║
║  Port: ${PORT}                                           ║
║  Environment: ${process.env.NODE_ENV || 'development'}                            ║
║  MongoDB: Connected                                   ║
║                                                       ║
║  API Endpoints:                                       ║
║  - Health: http://localhost:${PORT}/health              ║
║  - Auth: http://localhost:${PORT}/api/auth              ║
║  - Users: http://localhost:${PORT}/api/users            ║
║  - Hostels: http://localhost:${PORT}/api/hostels        ║
║  - Bookings: http://localhost:${PORT}/api/bookings      ║
║  - Reviews: http://localhost:${PORT}/api/reviews        ║
║  - Admin: http://localhost:${PORT}/api/admin            ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = app;
