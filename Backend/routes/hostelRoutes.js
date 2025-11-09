/**
 * Hostel Routes
 * Handles hostel/PG listing and management
 */

const express = require('express');
const router = express.Router();
const {
  getHostels,
  getHostel,
  createHostel,
  updateHostel,
  deleteHostel,
  searchHostels,
  getNearbyHostels
} = require('../controllers/hostelController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { idValidation, validate } = require('../middleware/validator');

// Public routes
router.get('/', optionalAuth, getHostels);
router.get('/search', searchHostels);
router.get('/nearby', getNearbyHostels);
router.get('/:id', idValidation, validate, optionalAuth, getHostel);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), createHostel);
router.put('/:id', protect, authorize('admin'), idValidation, validate, updateHostel);
router.delete('/:id', protect, authorize('admin'), idValidation, validate, deleteHostel);

module.exports = router;
