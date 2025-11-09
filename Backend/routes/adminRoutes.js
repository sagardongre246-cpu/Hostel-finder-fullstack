/**
 * Admin Routes
 * Handles admin-specific operations
 */

const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllBookings,
  updateBookingStatus,
  getAllReviews,
  deleteReview
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and admin-only
router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard', getDashboardStats);

// Users management
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Bookings management
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);

// Reviews management
router.get('/reviews', getAllReviews);
router.delete('/reviews/:id', deleteReview);

module.exports = router;
