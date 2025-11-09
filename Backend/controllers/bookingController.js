/**
 * Booking Controller
 * Handles booking/reservation operations
 */

const Booking = require('../models/Booking');
const Hostel = require('../models/Hostel');

/**
 * @desc    Create new booking
 * @route   POST /api/bookings
 * @access  Private
 */
exports.createBooking = async (req, res, next) => {
  try {
    const {
      hostel,
      checkIn,
      checkOut,
      guests,
      rooms,
      roomType,
      specialRequests
    } = req.body;

    // Check if hostel exists
    const hostelData = await Hostel.findById(hostel);
    if (!hostelData) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = hostelData.price.perNight * nights * rooms;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      hostel,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      rooms,
      roomType,
      totalPrice,
      specialRequests,
      guestDetails: {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
      }
    });

    // Increment hostel bookings count
    hostelData.bookings += 1;
    await hostelData.save();

    // Populate hostel details
    await booking.populate('hostel', 'name location.city location.address images price');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings (admin)
 * @route   GET /api/bookings/all/bookings
 * @access  Private/Admin
 */
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('hostel', 'name location.city')
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
 * @desc    Get user bookings
 * @route   GET /api/bookings
 * @access  Private
 */
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('hostel', 'name location.city location.address images price rating')
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
 * @desc    Get single booking
 * @route   GET /api/bookings/:id
 * @access  Private
 */
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('hostel', 'name description location images price amenities contact');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update booking
 * @route   PUT /api/bookings/:id
 * @access  Private
 */
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // Update booking
    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('hostel', 'name location.city images price');

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel booking
 * @route   PUT /api/bookings/:id/cancel
 * @access  Private
 */
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Check if booking can be cancelled
    if (booking.bookingStatus === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.bookingStatus === 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed booking'
      });
    }

    // Update booking status
    booking.bookingStatus = 'Cancelled';
    booking.cancellation = {
      isCancelled: true,
      cancelledAt: new Date(),
      cancelledBy: req.user.id,
      reason: req.body.reason || 'User cancelled',
      refundAmount: booking.totalPrice,
      refundStatus: 'Pending'
    };

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    next(error);
  }
};
