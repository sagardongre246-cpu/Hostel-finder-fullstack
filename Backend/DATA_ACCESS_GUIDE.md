# HostelFinder Backend - Data Access Guide

## 📊 How to View & Access Your Data

This guide explains all the ways you can view and manage the data stored in your HostelFinder backend.

---

## 🎯 Quick Overview

You can access your data through **4 main methods**:

1. **MongoDB Compass** (GUI - Easiest for beginners)
2. **MongoDB Shell** (Command line)
3. **API Routes** (Through Postman/Thunder Client)
4. **Admin Dashboard API** (Built-in admin panel endpoints)

---

## Method 1: MongoDB Compass (Recommended for Beginners) 🖥️

### What is MongoDB Compass?
MongoDB Compass is a **free graphical interface** that lets you visually explore and manage your database.

### Installation

1. **Download MongoDB Compass**
   - Visit: https://www.mongodb.com/try/download/compass
   - Download the version for your OS (Windows/Mac/Linux)
   - Install it

2. **Open MongoDB Compass**

3. **Connect to Your Database**

   **For Local MongoDB:**
   ```
   Connection String: mongodb://localhost:27017
   ```

   **For MongoDB Atlas (Cloud):**
   ```
   Connection String: mongodb+srv://username:password@cluster.mongodb.net/
   ```
   (Get this from your .env file)

4. **Click "Connect"**

### Viewing Your Data

Once connected, you'll see:

```
📁 Databases
  └── 📁 hostelfinder (your database)
      ├── 📄 users (collection)
      ├── 📄 hostels (collection)
      ├── 📄 bookings (collection)
      └── 📄 reviews (collection)
```

#### View Users
1. Click on `hostelfinder` database
2. Click on `users` collection
3. You'll see all user data:
   - Name, Email, Phone
   - Role (user/admin)
   - Saved hostels
   - Preferences
   - Created date

#### View Hostels
1. Click on `hostels` collection
2. You'll see all hostel data:
   - Name, Description
   - Location details
   - Prices
   - Images
   - Amenities
   - Ratings

#### View Bookings
1. Click on `bookings` collection
2. You'll see all booking data:
   - User details
   - Hostel details
   - Check-in/Check-out dates
   - Payment status
   - Booking status
   - Total price

#### View Reviews
1. Click on `reviews` collection
2. You'll see all review data:
   - User who wrote it
   - Hostel reviewed
   - Rating (1-10)
   - Comment
   - Detailed ratings
   - Likes

### Features in Compass

**Search & Filter:**
```json
// Find all confirmed bookings
{ "bookingStatus": "Confirmed" }

// Find users by email
{ "email": "john@example.com" }

// Find hostels in Mumbai
{ "location.city": "Mumbai" }
```

**Edit Documents:**
- Click on any document
- Click "Edit Document"
- Make changes
- Click "Update"

**Delete Documents:**
- Click on any document
- Click "Delete Document"
- Confirm deletion

**Export Data:**
- Click "Export Collection"
- Choose format (JSON/CSV)
- Save to your computer

---

## Method 2: MongoDB Shell (Command Line) 💻

### Access MongoDB Shell

**For Local MongoDB:**
```bash
# Open terminal/command prompt
mongo

# Or if using newer version
mongosh
```

**For MongoDB Atlas:**
```bash
mongosh "mongodb+srv://cluster.mongodb.net/" --username your_username
```

### Basic Commands

#### Switch to Your Database
```javascript
use hostelfinder
```

#### View All Collections
```javascript
show collections
// Output: users, hostels, bookings, reviews
```

#### View All Users
```javascript
db.users.find().pretty()
```

#### View Specific User
```javascript
// By email
db.users.findOne({ email: "john@example.com" })

// By ID
db.users.findOne({ _id: ObjectId("your_user_id") })
```

#### View All Hostels
```javascript
db.hostels.find().pretty()
```

#### View Hostels in Specific City
```javascript
db.hostels.find({ "location.city": "Mumbai" }).pretty()
```

#### View All Bookings
```javascript
db.bookings.find().pretty()
```

#### View Confirmed Bookings
```javascript
db.bookings.find({ bookingStatus: "Confirmed" }).pretty()
```

#### View All Reviews
```javascript
db.reviews.find().pretty()
```

#### Count Documents
```javascript
// Count total users
db.users.countDocuments()

// Count total bookings
db.bookings.countDocuments()

// Count confirmed bookings
db.bookings.countDocuments({ bookingStatus: "Confirmed" })
```

#### Update Data
```javascript
// Update user role to admin
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { role: "admin" } }
)

// Update booking status
db.bookings.updateOne(
  { _id: ObjectId("booking_id") },
  { $set: { bookingStatus: "Confirmed" } }
)
```

#### Delete Data
```javascript
// Delete a user
db.users.deleteOne({ email: "test@example.com" })

// Delete all cancelled bookings
db.bookings.deleteMany({ bookingStatus: "Cancelled" })
```

---

## Method 3: API Routes (Postman/Thunder Client) 🔌

### Setup

1. **Install Postman** (or use Thunder Client in VS Code)
   - Download: https://www.postman.com/downloads/

2. **Start Your Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```

3. **Get Authentication Token**
   ```http
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json

   {
     "email": "admin@hostelfinder.com",
     "password": "Admin@123456"
   }
   ```

   Copy the `token` from response.

### View Data Through API

#### Get All Users (Admin Only)
```http
GET http://localhost:5000/api/admin/users
Authorization: Bearer <your_admin_token>
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 10,
  "users": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-11-08T..."
    }
  ]
}
```

#### Get Single User Details
```http
GET http://localhost:5000/api/admin/users/:userId
Authorization: Bearer <your_admin_token>
```

#### Get All Hostels
```http
GET http://localhost:5000/api/hostels
```

**With Filters:**
```http
GET http://localhost:5000/api/hostels?city=Mumbai&minPrice=1000&maxPrice=5000
```

#### Get Single Hostel
```http
GET http://localhost:5000/api/hostels/:hostelId
```

#### Get All Bookings (Admin)
```http
GET http://localhost:5000/api/admin/bookings
Authorization: Bearer <your_admin_token>
```

**With Filters:**
```http
GET http://localhost:5000/api/admin/bookings?status=Confirmed&page=1&limit=20
```

#### Get User's Bookings
```http
GET http://localhost:5000/api/bookings
Authorization: Bearer <your_user_token>
```

#### Get All Reviews
```http
GET http://localhost:5000/api/reviews?hostel=hostelId
```

#### Get Dashboard Statistics (Admin)
```http
GET http://localhost:5000/api/admin/dashboard
Authorization: Bearer <your_admin_token>
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 150,
    "totalHostels": 45,
    "totalBookings": 320,
    "totalReviews": 180,
    "totalRevenue": 450000,
    "bookingStats": [...],
    "recentBookings": [...],
    "recentUsers": [...]
  }
}
```

---

## Method 4: Admin Dashboard API 📊

### Built-in Admin Endpoints

Your backend includes a complete admin API for managing all data.

#### Dashboard Statistics
```http
GET /api/admin/dashboard
```

**Returns:**
- Total users, hostels, bookings, reviews
- Total revenue
- Booking statistics by status
- Recent bookings
- Recent users

#### User Management

**Get All Users:**
```http
GET /api/admin/users?page=1&limit=20&role=user&search=john
```

**Get Single User:**
```http
GET /api/admin/users/:userId
```

**Update User:**
```http
PUT /api/admin/users/:userId
{
  "role": "admin",
  "isVerified": true
}
```

**Delete User:**
```http
DELETE /api/admin/users/:userId
```

#### Booking Management

**Get All Bookings:**
```http
GET /api/admin/bookings?status=Confirmed&page=1&limit=20
```

**Update Booking Status:**
```http
PUT /api/admin/bookings/:bookingId/status
{
  "status": "Confirmed"
}
```

#### Review Management

**Get All Reviews:**
```http
GET /api/admin/reviews?page=1&limit=20
```

**Delete Review:**
```http
DELETE /api/admin/reviews/:reviewId
```

---

## 🎨 Creating a Frontend Admin Dashboard

You can create a React admin dashboard to visualize this data:

### Example: Admin Dashboard Component

```javascript
// Frontend/src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    
    // Get dashboard stats
    const statsRes = await fetch('http://localhost:5000/api/admin/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const statsData = await statsRes.json();
    setStats(statsData.stats);

    // Get users
    const usersRes = await fetch('http://localhost:5000/api/admin/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const usersData = await usersRes.json();
    setUsers(usersData.users);

    // Get bookings
    const bookingsRes = await fetch('http://localhost:5000/api/admin/bookings', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const bookingsData = await bookingsRes.json();
    setBookings(bookingsData.bookings);
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Hostels</h3>
          <p>{stats.totalHostels}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-section">
        <h2>Recent Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bookings Table */}
      <div className="bookings-section">
        <h2>Recent Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Hostel</th>
              <th>Check-in</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.user.name}</td>
                <td>{booking.hostel.name}</td>
                <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td>{booking.bookingStatus}</td>
                <td>₹{booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
```

---

## 📱 Real-Time Data Monitoring

### Using MongoDB Compass Watch Feature

1. Open MongoDB Compass
2. Select your collection
3. Click "Watch" button
4. See real-time updates as data changes

### Using MongoDB Change Streams (Advanced)

```javascript
// Backend/utils/changeStream.js
const mongoose = require('mongoose');

const watchBookings = () => {
  const Booking = mongoose.model('Booking');
  const changeStream = Booking.watch();

  changeStream.on('change', (change) => {
    console.log('Booking changed:', change);
    // Send notification, update dashboard, etc.
  });
};

module.exports = { watchBookings };
```

---

## 🔍 Data Query Examples

### Find Specific Data

#### Users who joined this month
```javascript
// MongoDB Shell
db.users.find({
  createdAt: {
    $gte: new Date('2024-11-01'),
    $lt: new Date('2024-12-01')
  }
})
```

#### Hostels with rating > 8
```javascript
db.hostels.find({ "rating.average": { $gt: 8 } })
```

#### Bookings with payment pending
```javascript
db.bookings.find({ paymentStatus: "Pending" })
```

#### Reviews with rating < 5
```javascript
db.reviews.find({ rating: { $lt: 5 } })
```

### Aggregate Data

#### Total revenue by month
```javascript
db.bookings.aggregate([
  {
    $match: { paymentStatus: "Paid" }
  },
  {
    $group: {
      _id: { $month: "$createdAt" },
      totalRevenue: { $sum: "$totalPrice" },
      count: { $sum: 1 }
    }
  }
])
```

#### Average rating per hostel
```javascript
db.reviews.aggregate([
  {
    $group: {
      _id: "$hostel",
      avgRating: { $avg: "$rating" },
      count: { $sum: 1 }
    }
  }
])
```

---

## 📊 Export Data

### From MongoDB Compass
1. Select collection
2. Click "Export Collection"
3. Choose format (JSON/CSV)
4. Save file

### From MongoDB Shell
```bash
# Export to JSON
mongoexport --db=hostelfinder --collection=users --out=users.json

# Export to CSV
mongoexport --db=hostelfinder --collection=bookings --type=csv --fields=user,hostel,checkIn,checkOut,totalPrice --out=bookings.csv
```

### From API
```javascript
// Create export endpoint
router.get('/admin/export/users', protect, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});
```

---

## 🛠️ Useful Tools

### 1. **MongoDB Compass** (GUI)
- **Best for**: Visual exploration, beginners
- **Download**: https://www.mongodb.com/try/download/compass

### 2. **Postman** (API Testing)
- **Best for**: Testing API endpoints
- **Download**: https://www.postman.com/downloads/

### 3. **Thunder Client** (VS Code Extension)
- **Best for**: API testing within VS Code
- **Install**: Search "Thunder Client" in VS Code extensions

### 4. **MongoDB Shell** (mongosh)
- **Best for**: Command-line operations
- **Included**: With MongoDB installation

### 5. **Robo 3T** (Alternative GUI)
- **Best for**: Lightweight MongoDB GUI
- **Download**: https://robomongo.org/

---

## 🎯 Quick Access Checklist

✅ **To view all data visually:**
- Use MongoDB Compass

✅ **To query data programmatically:**
- Use MongoDB Shell or API routes

✅ **To manage data as admin:**
- Use Admin API endpoints

✅ **To monitor real-time changes:**
- Use MongoDB Compass Watch feature

✅ **To export data:**
- Use MongoDB Compass export or mongoexport command

---

## 🚨 Important Notes

1. **Security**: Never expose admin endpoints without authentication
2. **Backup**: Regularly backup your database
3. **Monitoring**: Set up monitoring for production
4. **Logging**: Enable logging for all data access
5. **Privacy**: Follow data protection regulations (GDPR, etc.)

---

## 📞 Need Help?

If you can't access your data:
1. Check if MongoDB is running
2. Verify connection string in .env
3. Check if backend server is running
4. Verify authentication token
5. Check firewall/network settings

---

**Happy Data Exploring! 📊**
