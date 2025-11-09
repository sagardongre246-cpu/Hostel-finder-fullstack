/**
 * Admin Controller
 * Handles admin-specific operations
 */

const User = require('../models/User');
const Hostel = require('../models/Hostel');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHostels = await Hostel.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Review.countDocuments();

    const recentBookings = await Booking.find()
      .populate('user', 'name email')
      .populate('hostel', 'name location.city')
      .sort('-createdAt')
      .limit(10);

    const recentUsers = await User.find()
      .sort('-createdAt')
      .limit(10)
      .select('-password');

    const bookingStats = await Booking.aggregate([
      {
        $group: {
          _id: '$bookingStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const revenue = await Booking.aggregate([
      {
        $match: { paymentStatus: 'Paid' }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalHostels,
        totalBookings,
        totalReviews,
        totalRevenue: revenue[0]?.total || 0,
        bookingStats,
        recentBookings,
        recentUsers
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;

    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
      users
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single user
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('savedHostels', 'name location.city price.perMonth');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const bookings = await Booking.find({ user: user._id })
      .populate('hostel', 'name location.city')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      user,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user
 * @route   PUT /api/admin/users/:id
 * @access  Private/Admin
 */
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings
 * @route   GET /api/admin/bookings
 * @access  Private/Admin
 */
exports.getAllBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const query = {};
    if (status) query.bookingStatus = status;

    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .populate('hostel', 'name location.city')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
      bookings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update booking status
 * @route   PUT /api/admin/bookings/:id/status
 * @access  Private/Admin
 */
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: status },
      { new: true, runValidators: true }
    ).populate('user', 'name email')
     .populate('hostel', 'name location.city');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all reviews
 * @route   GET /api/admin/reviews
 * @access  Private/Admin
 */
exports.getAllReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('hostel', 'name location.city')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Review.countDocuments();

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
 * @desc    Delete review
 * @route   DELETE /api/admin/reviews/:id
 * @access  Private/Admin
 */
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
