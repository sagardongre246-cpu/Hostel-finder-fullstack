/**
 * Review Controller
 * Handles review and rating operations
 */

const Review = require('../models/Review');
const Hostel = require('../models/Hostel');
const Booking = require('../models/Booking');

/**
 * @desc    Create new review
 * @route   POST /api/reviews
 * @access  Private
 */
exports.createReview = async (req, res, next) => {
  try {
    const { hostel, rating, title, comment, ratings, booking } = req.body;

    // Check if hostel exists
    const hostelData = await Hostel.findById(hostel);
    if (!hostelData) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    // Check if user has already reviewed this hostel
    const existingReview = await Review.findOne({
      user: req.user.id,
      hostel
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this hostel'
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      hostel,
      rating,
      title,
      comment,
      ratings,
      booking
    });

    // Populate user details
    await review.populate('user', 'name photo');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all reviews
 * @route   GET /api/reviews
 * @access  Public
 */
exports.getReviews = async (req, res, next) => {
  try {
    const { hostel, user, page = 1, limit = 10 } = req.query;

    const query = {};
    if (hostel) query.hostel = hostel;
    if (user) query.user = user;

    const reviews = await Review.find(query)
      .populate('user', 'name photo')
      .populate('hostel', 'name location.city')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Review.countDocuments(query);

    res.status(200).json({
      success: true,
      count: reviews.length,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
      reviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single review
 * @route   GET /api/reviews/:id
 * @access  Public
 */
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name photo')
      .populate('hostel', 'name location.city images');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      review
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns this review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name photo');

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete review
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns this review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    await review.remove();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Like/Unlike review
 * @route   POST /api/reviews/:id/like
 * @access  Private
 */
exports.likeReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    const likesCount = await review.toggleLike(req.user.id);

    res.status(200).json({
      success: true,
      message: review.isLikedBy(req.user.id) ? 'Review liked' : 'Review unliked',
      likesCount
    });
  } catch (error) {
    next(error);
  }
};
