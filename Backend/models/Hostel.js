/**
 * Hostel Model
 * Defines the schema for hostel/PG data
 */

const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a hostel name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide an address']
    },
    city: {
      type: String,
      required: [true, 'Please provide a city']
    },
    state: {
      type: String,
      required: [true, 'Please provide a state']
    },
    country: {
      type: String,
      default: 'India'
    },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
    },
    coordinates: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },
  price: {
    perNight: {
      type: Number,
      required: [true, 'Please provide price per night']
    },
    perMonth: {
      type: Number,
      required: [true, 'Please provide price per month']
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String
  }],
  amenities: [{
    type: String,
    enum: [
      'WiFi',
      'AC',
      'Parking',
      'Laundry',
      'Kitchen',
      'TV',
      'Gym',
      'Security',
      'Power Backup',
      'Water Supply',
      'Housekeeping',
      'Food',
      'Study Room',
      'Common Area',
      'Locker',
      'Hot Water'
    ]
  }],
  roomTypes: [{
    type: {
      type: String,
      enum: ['Single', 'Double', 'Triple', 'Dormitory'],
      required: true
    },
    available: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    count: {
      type: Number,
      default: 0
    }
  },
  category: {
    type: String,
    enum: ['Hostel', 'PG', 'Guest House', 'Dormitory'],
    default: 'Hostel'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Co-ed'],
    default: 'Co-ed'
  },
  rules: [{
    type: String
  }],
  facilities: [{
    name: String,
    description: String
  }],
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    website: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  bookings: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
hostelSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'hostel',
  justOne: false
});

// Index for location-based queries
hostelSchema.index({ 'location.coordinates': '2dsphere' });
hostelSchema.index({ 'location.city': 1 });
hostelSchema.index({ 'price.perMonth': 1 });
hostelSchema.index({ 'rating.average': -1 });

// Method to calculate average rating
hostelSchema.methods.calculateAverageRating = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    {
      $match: { hostel: this._id }
    },
    {
      $group: {
        _id: '$hostel',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.rating.average = Math.round(stats[0].averageRating * 10) / 10;
    this.rating.count = stats[0].count;
  } else {
    this.rating.average = 0;
    this.rating.count = 0;
  }

  await this.save();
};

// Method to increment views
hostelSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
};

module.exports = mongoose.model('Hostel', hostelSchema);
