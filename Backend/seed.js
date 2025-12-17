/**
 * Database Seeder
 * Populates database with sample data for testing
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const User = require('./models/User');
const Hostel = require('./models/Hostel');
const Booking = require('./models/Booking');
const Review = require('./models/Review');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@hostelfinder.com',
    password: 'Admin@123456',
    role: 'admin',
    phone: '9876543210',
    isVerified: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123',
    phone: '9876543211',
    isVerified: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Password123',
    phone: '9876543212',
    isVerified: true
  }
];

const hostels = [
  {
    name: 'Mumbai Central PG',
    description: 'Modern PG in the heart of Mumbai with free WiFi, shared kitchen, AC rooms, and 24/7 security.',
    location: {
      address: '456 SV Road, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400058',
      coordinates: { lat: 19.1136, lng: 72.8697 }
    },
    price: { perNight: 600, perMonth: 1800, currency: 'INR' },
    images: [
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', caption: 'Main view' }
    ],
    amenities: ['WiFi', 'AC', 'Parking', 'Kitchen', 'Security'],
    roomTypes: [
      { type: 'Single', available: 5, total: 10, price: 2000 },
      { type: 'Double', available: 3, total: 8, price: 1500 }
    ],
    category: 'PG',
    gender: 'Co-ed',
    contact: { phone: '9876543210', email: 'mumbai@hostelfinder.com' }
  },
  {
    name: 'GoNest Hostel Bengaluru',
    description: 'Budget-friendly hostel near IT hubs with bunk beds, co-working space, and 24/7 reception.',
    location: {
      address: '123 5th Block, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      pincode: '560095',
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    price: { perNight: 500, perMonth: 1500, currency: 'INR' },
    images: [
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', caption: 'Main view' }
    ],
    amenities: ['WiFi', 'AC', 'Laundry', 'Kitchen', 'Study Room'],
    roomTypes: [
      { type: 'Dormitory', available: 10, total: 20, price: 1500 },
      { type: 'Double', available: 4, total: 6, price: 1800 }
    ],
    category: 'Hostel',
    gender: 'Co-ed',
    contact: { phone: '9876543211', email: 'bengaluru@hostelfinder.com' }
  }
];

// Import data
const importData = async () => {
  try {
    console.log('🔄 Clearing existing data...');
    await User.deleteMany();
    await Hostel.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();

    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    console.log('🏨 Creating hostels...');
    const hostelData = hostels.map(hostel => ({
      ...hostel,
      owner: createdUsers[0]._id // Assign to admin
    }));
    const createdHostels = await Hostel.create(hostelData);
    console.log(`✅ Created ${createdHostels.length} hostels`);

    console.log('📅 Creating sample bookings...');
    const bookings = [
      {
        user: createdUsers[1]._id,
        hostel: createdHostels[0]._id,
        checkIn: new Date('2024-12-01'),
        checkOut: new Date('2024-12-05'),
        guests: 2,
        rooms: 1,
        roomType: 'Double',
        totalPrice: 7500,
        bookingStatus: 'Confirmed',
        paymentStatus: 'Paid',
        guestDetails: {
          name: createdUsers[1].name,
          email: createdUsers[1].email,
          phone: createdUsers[1].phone
        }
      }
    ];
    const createdBookings = await Booking.create(bookings);
    console.log(`✅ Created ${createdBookings.length} bookings`);

    console.log('⭐ Creating sample reviews...');
    const reviews = [
      {
        user: createdUsers[1]._id,
        hostel: createdHostels[0]._id,
        booking: createdBookings[0]._id,
        rating: 8,
        title: 'Great place to stay!',
        comment: 'Had a wonderful experience. The staff was friendly and the facilities were clean.',
        ratings: {
          cleanliness: 9,
          location: 8,
          facilities: 8,
          staff: 9,
          valueForMoney: 8
        }
      }
    ];
    const createdReviews = await Review.create(reviews);
    console.log(`✅ Created ${createdReviews.length} reviews`);

    console.log('\n✅ Data imported successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin: admin@hostelfinder.com / Admin@123456');
    console.log('User: john@example.com / Password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    console.log('🗑️  Deleting all data...');
    await User.deleteMany();
    await Hostel.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();
    console.log('✅ Data deleted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Usage:');
  console.log('  node seed.js -i  (import data)');
  console.log('  node seed.js -d  (delete data)');
  process.exit(0);
}
