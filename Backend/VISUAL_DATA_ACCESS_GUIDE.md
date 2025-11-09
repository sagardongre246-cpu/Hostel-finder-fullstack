# Visual Guide: Accessing Your Backend Data

## 🎯 Step-by-Step Visual Guide

This guide shows you **exactly** what you'll see when accessing your data.

---

## Method 1: MongoDB Compass (Easiest) 🖥️

### Step 1: Download & Install
```
Visit: https://www.mongodb.com/try/download/compass
Download → Install → Open
```

### Step 2: Connect to Database

**What you'll see:**
```
┌─────────────────────────────────────────────────────┐
│  MongoDB Compass                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  New Connection                                     │
│                                                     │
│  Connection String:                                 │
│  ┌───────────────────────────────────────────────┐ │
│  │ mongodb://localhost:27017                     │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  [Connect]                                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 3: View Databases

**What you'll see after connecting:**
```
┌─────────────────────────────────────────────────────┐
│  MongoDB Compass                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📁 Databases                                       │
│    ├── 📁 admin                                     │
│    ├── 📁 config                                    │
│    ├── 📁 hostelfinder  ← YOUR DATABASE            │
│    └── 📁 local                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 4: View Collections

**Click on "hostelfinder" database:**
```
┌─────────────────────────────────────────────────────┐
│  hostelfinder Database                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Collections:                                       │
│                                                     │
│  📄 users          (3 documents)                    │
│  📄 hostels        (2 documents)                    │
│  📄 bookings       (1 document)                     │
│  📄 reviews        (1 document)                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 5: View User Data

**Click on "users" collection:**
```
┌─────────────────────────────────────────────────────────────────┐
│  users Collection                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Document 1:                                                    │
│  {                                                              │
│    "_id": "673e5f2a1b2c3d4e5f6a7b8c",                          │
│    "name": "Admin User",                                        │
│    "email": "admin@hostelfinder.com",                          │
│    "role": "admin",                                             │
│    "phone": "9876543210",                                       │
│    "isVerified": true,                                          │
│    "preferences": {                                             │
│      "currency": "INR",                                         │
│      "language": "English",                                     │
│      "notifications": {                                         │
│        "email": true,                                           │
│        "sms": false                                             │
│      }                                                          │
│    },                                                           │
│    "savedHostels": [],                                          │
│    "createdAt": "2024-11-08T10:30:00.000Z",                    │
│    "lastLogin": "2024-11-08T15:45:00.000Z"                     │
│  }                                                              │
│                                                                 │
│  Document 2:                                                    │
│  {                                                              │
│    "_id": "673e5f2a1b2c3d4e5f6a7b8d",                          │
│    "name": "John Doe",                                          │
│    "email": "john@example.com",                                │
│    "role": "user",                                              │
│    ...                                                          │
│  }                                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 6: View Hostel Data

**Click on "hostels" collection:**
```
┌─────────────────────────────────────────────────────────────────┐
│  hostels Collection                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Document 1:                                                    │
│  {                                                              │
│    "_id": "673e5f2a1b2c3d4e5f6a7b8e",                          │
│    "name": "Mumbai Central PG",                                 │
│    "description": "Modern PG in the heart of Mumbai...",       │
│    "location": {                                                │
│      "address": "456 SV Road, Andheri West",                   │
│      "city": "Mumbai",                                          │
│      "state": "Maharashtra",                                    │
│      "pincode": "400058",                                       │
│      "coordinates": {                                           │
│        "lat": 19.1136,                                          │
│        "lng": 72.8697                                           │
│      }                                                          │
│    },                                                           │
│    "price": {                                                   │
│      "perNight": 600,                                           │
│      "perMonth": 1800,                                          │
│      "currency": "INR"                                          │
│    },                                                           │
│    "amenities": ["WiFi", "AC", "Parking", "Kitchen"],         │
│    "rating": {                                                  │
│      "average": 8.7,                                            │
│      "count": 342                                               │
│    },                                                           │
│    "category": "PG",                                            │
│    "isActive": true,                                            │
│    "views": 1250,                                               │
│    "bookings": 45                                               │
│  }                                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 7: View Booking Data

**Click on "bookings" collection:**
```
┌─────────────────────────────────────────────────────────────────┐
│  bookings Collection                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Document 1:                                                    │
│  {                                                              │
│    "_id": "673e5f2a1b2c3d4e5f6a7b8f",                          │
│    "user": "673e5f2a1b2c3d4e5f6a7b8d",  ← User ID              │
│    "hostel": "673e5f2a1b2c3d4e5f6a7b8e", ← Hostel ID           │
│    "checkIn": "2024-12-01T00:00:00.000Z",                      │
│    "checkOut": "2024-12-05T00:00:00.000Z",                     │
│    "guests": 2,                                                 │
│    "rooms": 1,                                                  │
│    "roomType": "Double",                                        │
│    "totalPrice": 7500,                                          │
│    "paymentStatus": "Paid",                                     │
│    "bookingStatus": "Confirmed",                                │
│    "confirmationCode": "BK1699456789ABC",                       │
│    "guestDetails": {                                            │
│      "name": "John Doe",                                        │
│      "email": "john@example.com",                              │
│      "phone": "9876543211"                                      │
│    },                                                           │
│    "createdAt": "2024-11-08T10:30:00.000Z"                     │
│  }                                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 8: Search & Filter

**Using the filter bar:**
```
┌─────────────────────────────────────────────────────────────────┐
│  bookings Collection                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Filter: ┌────────────────────────────────────────────────┐    │
│          │ { "bookingStatus": "Confirmed" }              │    │
│          └────────────────────────────────────────────────┘    │
│          [Apply]                                               │
│                                                                 │
│  Results: 15 documents found                                    │
│                                                                 │
│  Document 1: { ... bookingStatus: "Confirmed" ... }            │
│  Document 2: { ... bookingStatus: "Confirmed" ... }            │
│  Document 3: { ... bookingStatus: "Confirmed" ... }            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Method 2: Postman API Testing 🔌

### Step 1: Install Postman
```
Download from: https://www.postman.com/downloads/
Install → Open
```

### Step 2: Login to Get Token

**Create new request:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Postman                                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  POST  http://localhost:5000/api/auth/login                    │
│                                                                 │
│  Headers:                                                       │
│    Content-Type: application/json                              │
│                                                                 │
│  Body (raw JSON):                                               │
│  {                                                              │
│    "email": "admin@hostelfinder.com",                          │
│    "password": "Admin@123456"                                  │
│  }                                                              │
│                                                                 │
│  [Send]                                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Response you'll get:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Response (200 OK)                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  {                                                              │
│    "success": true,                                             │
│    "message": "Login successful",                               │
│    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  ← COPY │
│    "user": {                                                    │
│      "id": "673e5f2a1b2c3d4e5f6a7b8c",                         │
│      "name": "Admin User",                                      │
│      "email": "admin@hostelfinder.com",                        │
│      "role": "admin"                                            │
│    }                                                            │
│  }                                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3: Get All Users

**Create new request:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Postman                                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  GET  http://localhost:5000/api/admin/users                    │
│                                                                 │
│  Headers:                                                       │
│    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...       │
│                                                                 │
│  [Send]                                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Response:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Response (200 OK)                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  {                                                              │
│    "success": true,                                             │
│    "count": 3,                                                  │
│    "total": 3,                                                  │
│    "users": [                                                   │
│      {                                                          │
│        "id": "673e5f2a1b2c3d4e5f6a7b8c",                       │
│        "name": "Admin User",                                    │
│        "email": "admin@hostelfinder.com",                      │
│        "role": "admin",                                         │
│        "phone": "9876543210",                                   │
│        "createdAt": "2024-11-08T10:30:00.000Z"                 │
│      },                                                         │
│      {                                                          │
│        "id": "673e5f2a1b2c3d4e5f6a7b8d",                       │
│        "name": "John Doe",                                      │
│        "email": "john@example.com",                            │
│        "role": "user",                                          │
│        "phone": "9876543211",                                   │
│        "createdAt": "2024-11-08T11:00:00.000Z"                 │
│      }                                                          │
│    ]                                                            │
│  }                                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 4: Get Dashboard Stats

```
┌─────────────────────────────────────────────────────────────────┐
│  GET  http://localhost:5000/api/admin/dashboard                │
│  Authorization: Bearer <token>                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Response:                                                      │
│  {                                                              │
│    "success": true,                                             │
│    "stats": {                                                   │
│      "totalUsers": 150,                                         │
│      "totalHostels": 45,                                        │
│      "totalBookings": 320,                                      │
│      "totalReviews": 180,                                       │
│      "totalRevenue": 450000,                                    │
│      "bookingStats": [                                          │
│        { "_id": "Confirmed", "count": 250 },                   │
│        { "_id": "Pending", "count": 50 },                      │
│        { "_id": "Cancelled", "count": 20 }                     │
│      ],                                                         │
│      "recentBookings": [...],                                   │
│      "recentUsers": [...]                                       │
│    }                                                            │
│  }                                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Method 3: MongoDB Shell 💻

### What You'll See

**Open terminal and type `mongosh`:**
```
$ mongosh

Current Mongosh Log ID: 673e5f2a1b2c3d4e5f6a7b8c
Connecting to: mongodb://127.0.0.1:27017
Using MongoDB: 6.0.0
Using Mongosh: 1.10.0

test>
```

**Switch to your database:**
```
test> use hostelfinder
switched to db hostelfinder

hostelfinder>
```

**View all collections:**
```
hostelfinder> show collections
bookings
hostels
reviews
users

hostelfinder>
```

**View all users:**
```
hostelfinder> db.users.find().pretty()

{
  _id: ObjectId('673e5f2a1b2c3d4e5f6a7b8c'),
  name: 'Admin User',
  email: 'admin@hostelfinder.com',
  role: 'admin',
  phone: '9876543210',
  isVerified: true,
  preferences: {
    currency: 'INR',
    language: 'English',
    notifications: { email: true, sms: false }
  },
  savedHostels: [],
  createdAt: ISODate('2024-11-08T10:30:00.000Z'),
  lastLogin: ISODate('2024-11-08T15:45:00.000Z')
}

{
  _id: ObjectId('673e5f2a1b2c3d4e5f6a7b8d'),
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  ...
}
```

**Count documents:**
```
hostelfinder> db.users.countDocuments()
3

hostelfinder> db.bookings.countDocuments()
1

hostelfinder> db.hostels.countDocuments()
2
```

**Find specific data:**
```
hostelfinder> db.users.findOne({ email: "john@example.com" })

{
  _id: ObjectId('673e5f2a1b2c3d4e5f6a7b8d'),
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  phone: '9876543211',
  ...
}
```

---

## 📊 What Each Data Type Looks Like

### User Document
```json
{
  "_id": "unique_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": "9876543210",
  "photo": "https://example.com/photo.jpg",
  "isVerified": true,
  "preferences": {
    "currency": "INR",
    "language": "English",
    "notifications": {
      "email": true,
      "sms": false,
      "marketing": true
    }
  },
  "savedHostels": ["hostel_id_1", "hostel_id_2"],
  "createdAt": "2024-11-08T10:30:00.000Z",
  "lastLogin": "2024-11-08T15:45:00.000Z"
}
```

### Hostel Document
```json
{
  "_id": "unique_id",
  "name": "Mumbai Central PG",
  "description": "Modern PG in Mumbai...",
  "location": {
    "address": "456 SV Road",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400058",
    "coordinates": { "lat": 19.1136, "lng": 72.8697 }
  },
  "price": {
    "perNight": 600,
    "perMonth": 1800,
    "currency": "INR"
  },
  "images": [
    { "url": "https://...", "caption": "Main view" }
  ],
  "amenities": ["WiFi", "AC", "Parking"],
  "rating": { "average": 8.7, "count": 342 },
  "category": "PG",
  "isActive": true,
  "views": 1250,
  "bookings": 45
}
```

### Booking Document
```json
{
  "_id": "unique_id",
  "user": "user_id",
  "hostel": "hostel_id",
  "checkIn": "2024-12-01T00:00:00.000Z",
  "checkOut": "2024-12-05T00:00:00.000Z",
  "guests": 2,
  "rooms": 1,
  "roomType": "Double",
  "totalPrice": 7500,
  "paymentStatus": "Paid",
  "bookingStatus": "Confirmed",
  "confirmationCode": "BK1699456789ABC",
  "guestDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543211"
  },
  "createdAt": "2024-11-08T10:30:00.000Z"
}
```

### Review Document
```json
{
  "_id": "unique_id",
  "user": "user_id",
  "hostel": "hostel_id",
  "booking": "booking_id",
  "rating": 8,
  "title": "Great place!",
  "comment": "Had a wonderful stay...",
  "ratings": {
    "cleanliness": 9,
    "location": 8,
    "facilities": 8,
    "staff": 9,
    "valueForMoney": 8
  },
  "likes": ["user_id_1", "user_id_2"],
  "isVerified": true,
  "createdAt": "2024-11-08T10:30:00.000Z"
}
```

---

## 🎯 Quick Access Summary

| What You Want | Best Tool | How to Access |
|---------------|-----------|---------------|
| **View all data visually** | MongoDB Compass | Open Compass → Connect → Browse collections |
| **Quick queries** | MongoDB Shell | `mongosh` → `use hostelfinder` → `db.users.find()` |
| **Test API** | Postman | Create requests → Add auth token → Send |
| **Admin dashboard** | API Endpoints | GET `/api/admin/dashboard` with admin token |
| **Export data** | MongoDB Compass | Select collection → Export → Choose format |
| **Real-time monitoring** | Compass Watch | Select collection → Click "Watch" |

---

**Now you know exactly how to access and view all your backend data! 🎉**
