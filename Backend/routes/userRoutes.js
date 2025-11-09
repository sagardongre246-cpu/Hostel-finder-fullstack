/**
 * User Routes
 * Handles user profile and preferences
 */

const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteAccount,
  getSavedHostels,
  saveHostel,
  unsaveHostel,
  getBookings,
  updatePreferences
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/account', deleteAccount);

router.get('/saved-hostels', getSavedHostels);
router.post('/saved-hostels/:hostelId', saveHostel);
router.delete('/saved-hostels/:hostelId', unsaveHostel);

router.get('/bookings', getBookings);
router.put('/preferences', updatePreferences);

module.exports = router;
