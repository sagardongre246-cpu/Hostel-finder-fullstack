/**
 * Review Routes
 * Handles review and rating operations
 */

const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  likeReview
} = require('../controllers/reviewController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { reviewValidation, idValidation, validate } = require('../middleware/validator');

// Public routes
router.get('/', getReviews);
router.get('/:id', idValidation, validate, getReview);

// Protected routes
router.post('/', protect, reviewValidation, validate, createReview);
router.put('/:id', protect, idValidation, validate, updateReview);
router.delete('/:id', protect, idValidation, validate, deleteReview);
router.post('/:id/like', protect, idValidation, validate, likeReview);

module.exports = router;
