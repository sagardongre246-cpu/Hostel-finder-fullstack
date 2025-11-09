/**
 * Hostel Controller
 * Handles hostel/PG operations
 */

const Hostel = require('../models/Hostel');

/**
 * @desc    Get all hostels with filtering, sorting, and pagination
 * @route   GET /api/hostels
 * @access  Public
 */
exports.getHostels = async (req, res, next) => {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      category,
      gender,
      amenities,
      rating,
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (city) query['location.city'] = new RegExp(city, 'i');
    if (category) query.category = category;
    if (gender) query.gender = gender;
    if (minPrice || maxPrice) {
      query['price.perMonth'] = {};
      if (minPrice) query['price.perMonth'].$gte = Number(minPrice);
      if (maxPrice) query['price.perMonth'].$lte = Number(maxPrice);
    }
    if (amenities) {
      const amenitiesArray = amenities.split(',');
      query.amenities = { $all: amenitiesArray };
    }
    if (rating) query['rating.average'] = { $gte: Number(rating) };

    // Execute query with pagination
    const hostels = await Hostel.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Hostel.countDocuments(query);

    res.status(200).json({
      success: true,
      count: hostels.length,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
      hostels
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single hostel
 * @route   GET /api/hostels/:id
 * @access  Public
 */
exports.getHostel = async (req, res, next) => {
  try {
    const hostel = await Hostel.findById(req.params.id)
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'name photo' }
      });

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    // Increment views
    await hostel.incrementViews();

    res.status(200).json({
      success: true,
      hostel
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new hostel
 * @route   POST /api/hostels
 * @access  Private/Admin
 */
exports.createHostel = async (req, res, next) => {
  try {
    req.body.owner = req.user.id;

    const hostel = await Hostel.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Hostel created successfully',
      hostel
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update hostel
 * @route   PUT /api/hostels/:id
 * @access  Private/Admin
 */
exports.updateHostel = async (req, res, next) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hostel updated successfully',
      hostel
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete hostel
 * @route   DELETE /api/hostels/:id
 * @access  Private/Admin
 */
exports.deleteHostel = async (req, res, next) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: 'Hostel not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hostel deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search hostels
 * @route   GET /api/hostels/search
 * @access  Public
 */
exports.searchHostels = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const hostels = await Hostel.find({
      $or: [
        { name: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { 'location.city': new RegExp(q, 'i') },
        { 'location.address': new RegExp(q, 'i') }
      ],
      isActive: true
    }).limit(20);

    res.status(200).json({
      success: true,
      count: hostels.length,
      hostels
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get nearby hostels
 * @route   GET /api/hostels/nearby
 * @access  Public
 */
exports.getNearbyHostels = async (req, res, next) => {
  try {
    const { lat, lng, distance = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude'
      });
    }

    const hostels = await Hostel.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(lng), Number(lat)]
          },
          $maxDistance: distance * 1000 // Convert km to meters
        }
      },
      isActive: true
    }).limit(20);

    res.status(200).json({
      success: true,
      count: hostels.length,
      hostels
    });
  } catch (error) {
    next(error);
  }
};
