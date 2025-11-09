/**
 * Booking Routes
 * Handles booking/reservation operations
 */

const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  getUserBookings
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const { bookingValidation, idValidation, validate } = require('../middleware/validator');

// Protected routes
router.use(protect);

router.post('/', bookingValidation, validate, createBooking);
router.get('/', getUserBookings);
router.get('/:id', idValidation, validate, getBooking);
router.put('/:id', idValidation, validate, updateBooking);
router.put('/:id/cancel', idValidation, validate, cancelBooking);

// Admin routes
router.get('/all/bookings', authorize('admin'), getBookings);

module.exports = router;
