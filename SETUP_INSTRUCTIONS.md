# 🏨 HostelFinder Setup Instructions

## ✅ Current Status

Your application is **partially running**:
- ✅ **Frontend**: Running on http://localhost:3002
- ⚠️ **Backend**: Running but needs MongoDB connection

## 🔧 Quick Setup (5 minutes)

### Step 1: Set up MongoDB Atlas (FREE)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a **FREE M0 cluster** (no credit card required)
4. Create a database user:
   - Username: `hosteluser`
   - Password: Choose a strong password (save it!)
5. Add IP to whitelist:
   - Click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get your connection string:
   - Click "Database" -> "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://hosteluser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 2: Update Backend/.env

Open `Backend/.env` and replace the MONGODB_URI line:

```
MONGODB_URI=mongodb+srv://hosteluser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hostelfinder?retryWrites=true&w=majority
```

Replace:
- `YOUR_PASSWORD` with your database user password
- `cluster0.xxxxx` with your actual cluster URL

### Step 3: Restart Backend

The backend will automatically reconnect once you save the .env file.

### Step 4: Seed Sample Data (Optional)

```bash
cd Backend
node seed.js -i
```

This will create:
- Admin user: admin@hostelfinder.com / Admin@123456
- Test user: john@example.com / Password123
- 2 sample hostels
- Sample bookings and reviews

## 🚀 Running the Application

### Start Backend (if not running)
```bash
cd Backend
npm start
```

### Start Frontend (if not running)
```bash
cd Frontend
npm start
```

## 📝 API Endpoints

Once MongoDB is connected:
- Health Check: http://localhost:5000/health
- Auth: http://localhost:5000/api/auth
- Hostels: http://localhost:5000/api/hostels
- Bookings: http://localhost:5000/api/bookings
- Reviews: http://localhost:5000/api/reviews

## ❓ Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct in Backend/.env
- Make sure you replaced `<password>` with actual password
- Verify IP whitelist includes your IP or 0.0.0.0/0

### Frontend shows errors
- Check browser console (F12)
- Verify backend is running on port 5000
- Check CORS settings in Backend/.env

### Port already in use
- Frontend: Change port in Frontend/package.json
- Backend: Change PORT in Backend/.env

## 🎉 You're All Set!

Once MongoDB is connected, open http://localhost:3002 and start exploring your hostel booking platform!
