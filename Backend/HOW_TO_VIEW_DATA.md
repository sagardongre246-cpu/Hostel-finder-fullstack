# How to View Your Backend Data - Complete Guide

## 🎯 Quick Answer

You can view your HostelFinder backend data in **4 ways**:

1. **MongoDB Compass** (Easiest - Visual GUI) ⭐ RECOMMENDED
2. **MongoDB Shell** (Command line)
3. **API Routes** (Through Postman/Thunder Client)
4. **Admin Dashboard API** (Built-in endpoints)

---

## 🚀 Fastest Way to Get Started (5 Minutes)

### Option 1: MongoDB Compass (No coding required!)

**Step 1:** Download MongoDB Compass
- Visit: https://www.mongodb.com/try/download/compass
- Download and install (it's free!)

**Step 2:** Open MongoDB Compass

**Step 3:** Connect to your database
```
Connection String: mongodb://localhost:27017
Click "Connect"
```

**Step 4:** View your data
```
Click "hostelfinder" database
→ See all your collections (users, hostels, bookings, reviews)
→ Click any collection to see the data
```

**That's it!** You can now see all your data visually! 🎉

---

## 📊 What Data Can You See?

### 1. **Users Data**
- All registered users
- Names, emails, phone numbers
- User roles (admin/user)
- Saved hostels
- Preferences (currency, language, notifications)
- Join date and last login

### 2. **Hostels Data**
- All PG/Hostel listings
- Names, descriptions, locations
- Prices (per night, per month)
- Images and amenities
- Ratings and reviews count
- View count and booking count

### 3. **Bookings Data**
- All reservations
- User and hostel details
- Check-in and check-out dates
- Payment status (Paid/Pending/Failed)
- Booking status (Confirmed/Pending/Cancelled)
- Total price and confirmation codes

### 4. **Reviews Data**
- All reviews and ratings
- User who wrote the review
- Hostel being reviewed
- Rating (1-10 scale)
- Comments and detailed ratings
- Number of likes

---

## 🔍 Detailed Access Methods

### Method 1: MongoDB Compass (Visual Interface)

**Best for:** Beginners, visual exploration, quick edits

**What you can do:**
- ✅ View all data in a beautiful interface
- ✅ Search and filter data
- ✅ Edit documents directly
- ✅ Delete documents
- ✅ Export data to JSON/CSV
- ✅ Watch real-time changes

**Example: Finding all confirmed bookings**
```
1. Open MongoDB Compass
2. Connect to database
3. Click "bookings" collection
4. In filter box, type: { "bookingStatus": "Confirmed" }
5. Click "Find"
6. See all confirmed bookings!
```

---

### Method 2: MongoDB Shell (Command Line)

**Best for:** Developers, quick queries, automation

**How to access:**
```bash
# Open terminal
mongosh

# Switch to your database
use hostelfinder

# View all users
db.users.find().pretty()

# View all bookings
db.bookings.find().pretty()

# Count total users
db.users.countDocuments()
```

**Common queries:**
```javascript
// Find user by email
db.users.findOne({ email: "john@example.com" })

// Find hostels in Mumbai
db.hostels.find({ "location.city": "Mumbai" })

// Find confirmed bookings
db.bookings.find({ bookingStatus: "Confirmed" })

// Find reviews with rating > 8
db.reviews.find({ rating: { $gt: 8 } })
```

---

### Method 3: API Routes (Postman/Thunder Client)

**Best for:** Testing API, integrating with frontend

**Setup:**
1. Install Postman (https://www.postman.com/downloads/)
2. Start your backend server: `npm run dev`
3. Login to get token:
   ```
   POST http://localhost:5000/api/auth/login
   Body: { "email": "admin@hostelfinder.com", "password": "Admin@123456" }
   ```
4. Copy the token from response

**View data:**
```
GET http://localhost:5000/api/admin/users
Header: Authorization: Bearer <your_token>
→ See all users

GET http://localhost:5000/api/admin/bookings
Header: Authorization: Bearer <your_token>
→ See all bookings

GET http://localhost:5000/api/admin/dashboard
Header: Authorization: Bearer <your_token>
→ See complete statistics
```

---

### Method 4: Admin Dashboard API

**Best for:** Building admin panel, getting statistics

**Available endpoints:**

**Dashboard Statistics:**
```
GET /api/admin/dashboard
Returns:
- Total users, hostels, bookings, reviews
- Total revenue
- Booking statistics
- Recent bookings and users
```

**User Management:**
```
GET /api/admin/users              → All users
GET /api/admin/users/:id          → Single user
PUT /api/admin/users/:id          → Update user
DELETE /api/admin/users/:id       → Delete user
```

**Booking Management:**
```
GET /api/admin/bookings           → All bookings
PUT /api/admin/bookings/:id/status → Update status
```

**Review Management:**
```
GET /api/admin/reviews            → All reviews
DELETE /api/admin/reviews/:id     → Delete review
```

---

## 📱 Creating Your Own Admin Dashboard

You can create a React admin dashboard to view all data:

```javascript
// Example: Admin Dashboard Component
import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/admin/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setStats(data.stats);
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div>Total Users: {stats.totalUsers}</div>
        <div>Total Hostels: {stats.totalHostels}</div>
        <div>Total Bookings: {stats.totalBookings}</div>
        <div>Total Revenue: ₹{stats.totalRevenue}</div>
      </div>
    </div>
  );
}
```

---

## 🎓 Step-by-Step Tutorial

### Tutorial 1: View All Users

**Using MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Click "hostelfinder" database
4. Click "users" collection
5. See all users!

**Using MongoDB Shell:**
```bash
mongosh
use hostelfinder
db.users.find().pretty()
```

**Using API:**
```
POST http://localhost:5000/api/auth/login
(Get token)

GET http://localhost:5000/api/admin/users
Authorization: Bearer <token>
```

---

### Tutorial 2: Find Specific Booking

**Using MongoDB Compass:**
1. Open "bookings" collection
2. In filter box: `{ "confirmationCode": "BK1699456789ABC" }`
3. Click "Find"

**Using MongoDB Shell:**
```javascript
db.bookings.findOne({ confirmationCode: "BK1699456789ABC" })
```

**Using API:**
```
GET http://localhost:5000/api/bookings/:bookingId
Authorization: Bearer <token>
```

---

### Tutorial 3: Get Dashboard Statistics

**Using API:**
```
GET http://localhost:5000/api/admin/dashboard
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "stats": {
    "totalUsers": 150,
    "totalHostels": 45,
    "totalBookings": 320,
    "totalReviews": 180,
    "totalRevenue": 450000
  }
}
```

---

## 🛠️ Tools You Need

### 1. MongoDB Compass (Recommended)
- **What**: Visual database browser
- **Download**: https://www.mongodb.com/try/download/compass
- **Cost**: Free
- **Best for**: Viewing and editing data visually

### 2. Postman
- **What**: API testing tool
- **Download**: https://www.postman.com/downloads/
- **Cost**: Free
- **Best for**: Testing API endpoints

### 3. Thunder Client (VS Code Extension)
- **What**: Lightweight API client
- **Install**: Search "Thunder Client" in VS Code
- **Cost**: Free
- **Best for**: API testing within VS Code

### 4. MongoDB Shell (mongosh)
- **What**: Command-line interface
- **Install**: Comes with MongoDB
- **Cost**: Free
- **Best for**: Quick queries and automation

---

## 📋 Common Tasks

### Task 1: Export All Users to CSV
**Using MongoDB Compass:**
1. Open "users" collection
2. Click "Export Collection"
3. Select "CSV"
4. Choose fields to export
5. Click "Export"

### Task 2: Find All Pending Bookings
**Using MongoDB Compass:**
- Filter: `{ "bookingStatus": "Pending" }`

**Using MongoDB Shell:**
```javascript
db.bookings.find({ bookingStatus: "Pending" })
```

### Task 3: Update User Role to Admin
**Using MongoDB Compass:**
1. Find the user
2. Click "Edit Document"
3. Change `role` to `"admin"`
4. Click "Update"

**Using MongoDB Shell:**
```javascript
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { role: "admin" } }
)
```

**Using API:**
```
PUT http://localhost:5000/api/admin/users/:userId
Body: { "role": "admin" }
```

---

## 🔐 Security Notes

1. **Never share your admin token**
2. **Use strong passwords**
3. **Don't expose admin endpoints publicly**
4. **Regularly backup your database**
5. **Monitor access logs**

---

## 🆘 Troubleshooting

### Can't connect to MongoDB?
```
✓ Check if MongoDB is running: mongod
✓ Verify connection string in .env
✓ Check firewall settings
```

### Can't access API?
```
✓ Check if backend server is running: npm run dev
✓ Verify token is valid
✓ Check if you're using correct endpoint
```

### No data showing?
```
✓ Seed the database: node seed.js -i
✓ Check if you're in correct database
✓ Verify collections exist
```

---

## 📚 Additional Resources

- **MongoDB Compass Docs**: https://docs.mongodb.com/compass/
- **MongoDB Shell Docs**: https://docs.mongodb.com/mongodb-shell/
- **Postman Docs**: https://learning.postman.com/
- **Backend README**: See `Backend/README.md`
- **Setup Guide**: See `Backend/SETUP_GUIDE.md`

---

## 🎯 Quick Reference

| Task | Tool | Command/Action |
|------|------|----------------|
| View all users | Compass | Open users collection |
| View all bookings | Compass | Open bookings collection |
| Search data | Compass | Use filter box |
| Export data | Compass | Export Collection button |
| Quick query | Shell | `db.users.find()` |
| Get statistics | API | GET `/api/admin/dashboard` |
| Test endpoints | Postman | Create request + Add token |

---

## ✅ Summary

**To view your data, you can:**

1. **Use MongoDB Compass** (Easiest)
   - Download, connect, browse collections
   - No coding required!

2. **Use MongoDB Shell** (For developers)
   - Open terminal, run `mongosh`
   - Query with JavaScript

3. **Use API Routes** (For integration)
   - Use Postman or Thunder Client
   - Test endpoints with authentication

4. **Build Admin Dashboard** (For custom UI)
   - Create React component
   - Fetch data from admin endpoints

**Recommended for beginners:** Start with MongoDB Compass! 🎉

---

**Need more help?** Check these files:
- `DATA_ACCESS_GUIDE.md` - Detailed guide
- `VISUAL_DATA_ACCESS_GUIDE.md` - Visual walkthrough
- `README.md` - API documentation
- `SETUP_GUIDE.md` - Setup instructions

---

**Happy Data Exploring! 📊**
