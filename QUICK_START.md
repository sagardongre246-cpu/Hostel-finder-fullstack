# 🚀 Hostel Finder - Quick Start Guide

## ✅ Current Status - RUNNING!

Your application is fully operational:

- **Frontend**: http://localhost:3002 ✅
- **Backend**: http://localhost:5000 ✅
- **Database**: In-Memory MongoDB (auto-configured) ✅

## 🎯 What Was Fixed

1. ✅ Installed all Backend dependencies
2. ✅ Fixed MongoDB connection errors (using in-memory database)
3. ✅ Removed deprecated Mongoose options
4. ✅ Fixed duplicate schema index warning
5. ✅ Fixed duplicate route in server.js
6. ✅ Removed unused React import
7. ✅ Both servers running successfully

## 📝 Available NPM Commands

### Backend Commands
```bash
cd Backend

# Start backend server
npm start

# Start with auto-reload (development)
npm run dev

# Seed database with sample data
npm run seed

# Delete all data
npm run seed:delete
```

### Frontend Commands
```bash
cd Frontend

# Start frontend (already running)
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🌱 Seed Sample Data

To add sample hostels and users to your database:

```bash
cd Backend
npm run seed
```

This creates:
- **Admin User**: admin@hostelfinder.com / Admin@123456
- **Test User**: john@example.com / Password123
- **2 Sample Hostels**: Mumbai Central PG & GoNest Hostel Bengaluru
- **Sample Bookings & Reviews**

## 🔗 Access Your Application

- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **API Docs**: http://localhost:5000/api

## 📊 API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/hostels` - Get all hostels
- `POST /api/hostels` - Create hostel (auth required)
- `GET /api/bookings` - Get bookings (auth required)
- `POST /api/bookings` - Create booking (auth required)
- `GET /api/reviews` - Get reviews
- `POST /api/reviews` - Create review (auth required)

## 🔧 Database Configuration

Currently using **in-memory MongoDB** for development (no setup required!).

### Want to use MongoDB Atlas instead?

1. Get free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get connection string
3. Update `Backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostelfinder
   ```
4. Restart backend: `npm run dev`

## 🛠️ Troubleshooting

### Backend won't start
```bash
cd Backend
npm install
npm start
```

### Frontend won't start
```bash
cd Frontend
npm install
npm start
```

### Port already in use
- Frontend: Edit `Frontend/package.json` to change port
- Backend: Edit `Backend/.env` PORT variable

### Database is empty
```bash
cd Backend
npm run seed
```

## 🎉 You're All Set!

Open http://localhost:3002 in your browser and start exploring!
