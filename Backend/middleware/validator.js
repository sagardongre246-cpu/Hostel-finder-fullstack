/**
 * Validation Middleware
 * Input validation using express-validator
 */

const { body, param, query, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * User registration validation
 */
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/).withMessage('Please provide a valid 10-digit phone number')
];

/**
 * User login validation
 */
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

/**
 * Booking validation
 */
exports.bookingValidation = [
  body('hostel')
    .notEmpty().withMessage('Hostel ID is required')
    .isMongoId().withMessage('Invalid hostel ID'),
  body('checkIn')
    .notEmpty().withMessage('Check-in date is required')
    .isISO8601().withMessage('Invalid check-in date')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Check-in date cannot be in the past');
      }
      return true;
    }),
  body('checkOut')
    .notEmpty().withMessage('Check-out date is required')
    .isISO8601().withMessage('Invalid check-out date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.checkIn)) {
        throw new Error('Check-out date must be after check-in date');
      }
      return true;
    }),
  body('guests')
    .notEmpty().withMessage('Number of guests is required')
    .isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  body('rooms')
    .notEmpty().withMessage('Number of rooms is required')
    .isInt({ min: 1 }).withMessage('Number of rooms must be at least 1'),
  body('roomType')
    .notEmpty().withMessage('Room type is required')
    .isIn(['Single', 'Double', 'Triple', 'Dormitory']).withMessage('Invalid room type')
];

/**
 * Review validation
 */
exports.reviewValidation = [
  body('hostel')
    .notEmpty().withMessage('Hostel ID is required')
    .isMongoId().withMessage('Invalid hostel ID'),
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 10 }).withMessage('Rating must be between 1 and 10'),
  body('comment')
    .notEmpty().withMessage('Comment is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Comment must be between 10 and 1000 characters')
];

/**
 * ID parameter validation
 */
exports.idValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format')
];

module.exports = exports;
