/**
 * Booking Model
 * Defines the schema for booking/reservation data
 */

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  checkIn: {
    type: Date,
    required: [true, 'Please provide check-in date']
  },
  checkOut: {
    type: Date,
    required: [true, 'Please provide check-out date']
  },
  guests: {
    type: Number,
    required: [true, 'Please provide number of guests'],
    min: 1
  },
  rooms: {
    type: Number,
    required: [true, 'Please provide number of rooms'],
    min: 1,
    default: 1
  },
  roomType: {
    type: String,
    enum: ['Single', 'Double', 'Triple', 'Dormitory'],
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'UPI', 'Net Banking', 'Wallet', 'Cash'],
    default: 'Card'
  },
  paymentDetails: {
    transactionId: String,
    paymentDate: Date,
    amount: Number
  },
  bookingStatus: {
    type: String,
    enum: ['Confirmed', 'Pending', 'Cancelled', 'Completed', 'No-show'],
    default: 'Pending'
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot be more than 500 characters']
  },
  guestDetails: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  cancellation: {
    isCancelled: {
      type: Boolean,
      default: false
    },
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['Pending', 'Processed', 'Rejected']
    }
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  },
  confirmationCode: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Generate confirmation code before saving
bookingSchema.pre('save', function(next) {
  if (!this.confirmationCode) {
    this.confirmationCode = 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

// Validate check-out date is after check-in date
bookingSchema.pre('save', function(next) {
  if (this.checkOut <= this.checkIn) {
    next(new Error('Check-out date must be after check-in date'));
  }
  next();
});

// Method to calculate number of nights
bookingSchema.methods.calculateNights = function() {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((this.checkOut - this.checkIn) / oneDay));
};

// Method to check if booking is active
bookingSchema.methods.isActive = function() {
  const now = new Date();
  return this.checkIn <= now && this.checkOut >= now && this.bookingStatus === 'Confirmed';
};

// Method to check if booking is upcoming
bookingSchema.methods.isUpcoming = function() {
  const now = new Date();
  return this.checkIn > now && this.bookingStatus === 'Confirmed';
};

// Method to check if booking is past
bookingSchema.methods.isPast = function() {
  const now = new Date();
  return this.checkOut < now;
};

// Index for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ hostel: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ bookingStatus: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
