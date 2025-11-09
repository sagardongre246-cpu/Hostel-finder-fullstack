/**
 * Review Model
 * Defines the schema for hostel reviews and ratings
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 10
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  ratings: {
    cleanliness: {
      type: Number,
      min: 1,
      max: 10
    },
    location: {
      type: Number,
      min: 1,
      max: 10
    },
    facilities: {
      type: Number,
      min: 1,
      max: 10
    },
    staff: {
      type: Number,
      min: 1,
      max: 10
    },
    valueForMoney: {
      type: Number,
      min: 1,
      max: 10
    }
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  response: {
    text: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  }
}, {
  timestamps: true
});

// Ensure one review per user per hostel
reviewSchema.index({ user: 1, hostel: 1 }, { unique: true });

// Update hostel rating after review is saved
reviewSchema.post('save', async function() {
  const Hostel = mongoose.model('Hostel');
  const hostel = await Hostel.findById(this.hostel);
  if (hostel) {
    await hostel.calculateAverageRating();
  }
});

// Update hostel rating after review is deleted
reviewSchema.post('remove', async function() {
  const Hostel = mongoose.model('Hostel');
  const hostel = await Hostel.findById(this.hostel);
  if (hostel) {
    await hostel.calculateAverageRating();
  }
});

// Method to check if user has liked the review
reviewSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.toString() === userId.toString());
};

// Method to toggle like
reviewSchema.methods.toggleLike = async function(userId) {
  const index = this.likes.findIndex(like => like.toString() === userId.toString());
  
  if (index > -1) {
    this.likes.splice(index, 1);
  } else {
    this.likes.push(userId);
  }
  
  await this.save();
  return this.likes.length;
};

module.exports = mongoose.model('Review', reviewSchema);
