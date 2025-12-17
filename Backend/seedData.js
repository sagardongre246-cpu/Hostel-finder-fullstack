/**
 * Quick Seed Script - Seeds data to running server
 */

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const users = [
  {
    name: 'Admin User',
    email: 'admin@hostelfinder.com',
    password: 'Admin@123456',
    role: 'admin',
    phone: '9876543210'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123',
    phone: '9876543211'
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
    price: { perNight: 600, perMonth: 18000, currency: 'INR' },
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
    price: { perNight: 500, perMonth: 15000, currency: 'INR' },
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

async function seedData() {
  try {
    console.log('🌱 Starting to seed data...\n');

    // Register users
    console.log('👥 Creating users...');
    const tokens = [];
    for (const user of users) {
      try {
        const response = await axios.post(`${API_URL}/auth/register`, user);
        tokens.push(response.data.token);
        console.log(`✅ Created user: ${user.email}`);
      } catch (error) {
        if (error.response?.data?.message?.includes('already exists')) {
          console.log(`⚠️  User already exists: ${user.email}`);
          // Try to login
          const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: user.email,
            password: user.password
          });
          tokens.push(loginRes.data.token);
        } else {
          console.error(`❌ Error creating user ${user.email}:`, error.response?.data?.message || error.message);
        }
      }
    }

    // Create hostels
    console.log('\n🏨 Creating hostels...');
    for (const hostel of hostels) {
      try {
        await axios.post(`${API_URL}/hostels`, hostel, {
          headers: { Authorization: `Bearer ${tokens[0]}` }
        });
        console.log(`✅ Created hostel: ${hostel.name}`);
      } catch (error) {
        console.error(`❌ Error creating hostel ${hostel.name}:`, error.response?.data?.message || error.message);
      }
    }

    console.log('\n✅ Data seeding completed!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin: admin@hostelfinder.com / Admin@123456');
    console.log('User: john@example.com / Password123');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  }
}

seedData();
