# HostelFinder Backend - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Server](#running-the-server)
6. [Testing the API](#testing-the-api)
7. [Connecting to Frontend](#connecting-to-frontend)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js

### Check Installations
```bash
node --version  # Should show v14.0.0 or higher
npm --version   # Should show 6.0.0 or higher
mongo --version # Should show 4.4.0 or higher
```

## Installation

### Step 1: Navigate to Backend Directory
```bash
cd Backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- express (Web framework)
- mongoose (MongoDB ODM)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- dotenv (Environment variables)
- cors (Cross-origin resource sharing)
- helmet (Security headers)
- express-validator (Input validation)
- And more...

## Database Setup

### Option 1: Local MongoDB

1. **Start MongoDB Service**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

2. **Verify MongoDB is Running**
```bash
mongo
# Should open MongoDB shell
```

3. **Create Database** (Optional - will be created automatically)
```bash
use hostelfinder
```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Cluster"
   - Choose FREE tier
   - Select region closest to you
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Set permissions to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password

## Environment Configuration

### Step 1: Create .env File
```bash
cp .env.example .env
```

### Step 2: Configure Environment Variables

Open `.env` file and update:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/hostelfinder

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostelfinder

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email Configuration (Optional for now)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@hostelfinder.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Important Notes:
- **JWT_SECRET**: Change this to a random, secure string in production
- **MONGODB_URI**: Use your actual MongoDB connection string
- **FRONTEND_URL**: Update if your frontend runs on a different port

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Expected Output
```
✅ MongoDB Connected: localhost
📊 Database: hostelfinder

╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🏨 HostelFinder Backend Server 🏨             ║
║                                                       ║
║  Status: Running                                      ║
║  Port: 5000                                           ║
║  Environment: development                             ║
║  MongoDB: Connected                                   ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Seeding Sample Data

### Import Sample Data
```bash
node seed.js -i
```

This creates:
- 3 sample users (1 admin, 2 regular users)
- 2 sample hostels
- 1 sample booking
- 1 sample review

### Login Credentials
```
Admin:
Email: admin@hostelfinder.com
Password: Admin@123456

User:
Email: john@example.com
Password: Password123
```

### Delete All Data
```bash
node seed.js -d
```

## Testing the API

### Using Browser
Visit: `http://localhost:5000/health`

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-08T..."
}
```

### Using Postman or Thunder Client

1. **Register a New User**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Password123",
  "phone": "9876543210"
}
```

2. **Login**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123"
}
```

Copy the `token` from response.

3. **Get Current User**
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_token_here>
```

4. **Get All Hostels**
```
GET http://localhost:5000/api/hostels
```

## Connecting to Frontend

### Step 1: Update Frontend API Configuration

Create or update `Frontend/src/config/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  getMe: `${API_BASE_URL}/auth/me`,
  
  // User endpoints
  profile: `${API_BASE_URL}/users/profile`,
  savedHostels: `${API_BASE_URL}/users/saved-hostels`,
  bookings: `${API_BASE_URL}/users/bookings`,
  
  // Hostel endpoints
  hostels: `${API_BASE_URL}/hostels`,
  hostelById: (id) => `${API_BASE_URL}/hostels/${id}`,
  searchHostels: `${API_BASE_URL}/hostels/search`,
  
  // Booking endpoints
  createBooking: `${API_BASE_URL}/bookings`,
  userBookings: `${API_BASE_URL}/bookings`,
  
  // Review endpoints
  reviews: `${API_BASE_URL}/reviews`,
  createReview: `${API_BASE_URL}/reviews`,
};

export default api;
```

### Step 2: Create API Service

Create `Frontend/src/services/authService.js`:

```javascript
import api from '../config/api';

export const authService = {
  async register(userData) {
    const response = await fetch(api.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  async login(credentials) {
    const response = await fetch(api.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
```

### Step 3: Update Frontend Components

Update your login/register components to use the API:

```javascript
import { authService } from '../services/authService';

// In your login component
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const data = await authService.login({ email, password });
    if (data.success) {
      // Redirect to dashboard or home
      navigate('/');
    } else {
      setError(data.message);
    }
  } catch (error) {
    setError('Login failed. Please try again.');
  }
};
```

## Troubleshooting

### MongoDB Connection Issues

**Problem**: Cannot connect to MongoDB
```
❌ MongoDB connection failed: connect ECONNREFUSED
```

**Solutions**:
1. Check if MongoDB is running:
```bash
# Windows
sc query MongoDB

# macOS/Linux
sudo systemctl status mongod
```

2. Verify connection string in `.env`
3. Check firewall settings
4. For Atlas: Verify IP whitelist and credentials

### Port Already in Use

**Problem**: Port 5000 is already in use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions**:
1. Change PORT in `.env` file
2. Kill process using port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### JWT Token Issues

**Problem**: Invalid token errors

**Solutions**:
1. Verify JWT_SECRET is set in `.env`
2. Check token format: `Bearer <token>`
3. Ensure token hasn't expired
4. Clear localStorage and login again

### CORS Issues

**Problem**: CORS policy blocking requests

**Solutions**:
1. Verify FRONTEND_URL in `.env` matches your frontend URL
2. Check CORS configuration in `server.js`
3. Ensure credentials are included in frontend requests

### Validation Errors

**Problem**: Input validation failing

**Solutions**:
1. Check required fields in request body
2. Verify data types match schema
3. Review validation rules in `middleware/validator.js`

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

## Support

For issues or questions:
- Check the [README.md](./README.md) for API documentation
- Review error messages in console
- Check MongoDB logs
- Verify environment variables

## Next Steps

1. ✅ Backend is running
2. ✅ Database is connected
3. ✅ Sample data is seeded
4. ✅ API is tested
5. 🔄 Connect frontend
6. 🔄 Implement authentication in frontend
7. 🔄 Test end-to-end functionality
8. 🚀 Deploy to production

---

**Happy Coding! 🎉**
