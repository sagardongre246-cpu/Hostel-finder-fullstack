/**
 * User Controller
 * Handles user profile and preferences operations
 */

const User = require('../models/User');
const Booking = require('../models/Booking');

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('savedHostels', 'name location.city price.perMonth images rating');

    res.status(200).json({
      success: true,
      user: user.getPublicProfile()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, photo } = req.body;

    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (phone) fieldsToUpdate.phone = phone;
    if (photo) fieldsToUpdate.photo = photo;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user account
 * @route   DELETE /api/users/account
 * @access  Private
 */
exports.deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get saved hostels
 * @route   GET /api/users/saved-hostels
 * @access  Private
 */
exports.getSavedHostels = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedHostels',
        select: 'name description location price images rating amenities category'
      });

    res.status(200).json({
      success: true,
      count: user.savedHostels.length,
      savedHostels: user.savedHostels
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Save a hostel
 * @route   POST /api/users/saved-hostels/:hostelId
 * @access  Private
 */
exports.saveHostel = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if already saved
    if (user.savedHostels.includes(req.params.hostelId)) {
      return res.status(400).json({
        success: false,
        message: 'Hostel already saved'
      });
    }

    user.savedHostels.push(req.params.hostelId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Hostel saved successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Unsave a hostel
 * @route   DELETE /api/users/saved-hostels/:hostelId
 * @access  Private
 */
exports.unsaveHostel = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    user.savedHostels = user.savedHostels.filter(
      id => id.toString() !== req.params.hostelId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Hostel removed from saved list'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user bookings
 * @route   GET /api/users/bookings
 * @access  Private
 */
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('hostel', 'name location.city location.address images price')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user preferences
 * @route   PUT /api/users/preferences
 * @access  Private
 */
exports.updatePreferences = async (req, res, next) => {
  try {
    const { currency, language, notifications } = req.body;

    const user = await User.findById(req.user.id);

    if (currency) user.preferences.currency = currency;
    if (language) user.preferences.language = language;
    if (notifications) {
      user.preferences.notifications = {
        ...user.preferences.notifications,
        ...notifications
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    next(error);
  }
};
