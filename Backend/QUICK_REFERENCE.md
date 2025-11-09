# HostelFinder Backend - Quick Reference Card

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Seed database
node seed.js -i

# Start development server
npm run dev

# Start production server
npm start
```

## 🔑 Default Login Credentials

```
Admin:
Email: admin@hostelfinder.com
Password: Admin@123456

User:
Email: john@example.com
Password: Password123
```

## 📡 API Base URL

```
http://localhost:5000/api
```

## 🔐 Authentication Header

```
Authorization: Bearer <your_jwt_token>
```

## 📋 Common API Calls

### Register
```bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "9876543210"
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Get Hostels
```bash
GET /api/hostels?city=Mumbai&minPrice=1000&maxPrice=5000
```

### Create Booking
```bash
POST /api/bookings
Authorization: Bearer <token>
{
  "hostel": "hostel_id",
  "checkIn": "2024-12-01",
  "checkOut": "2024-12-05",
  "guests": 2,
  "rooms": 1,
  "roomType": "Double"
}
```

### Create Review
```bash
POST /api/reviews
Authorization: Bearer <token>
{
  "hostel": "hostel_id",
  "rating": 8,
  "comment": "Great place!"
}
```

## 🗂️ Project Structure

```
Backend/
├── config/          # Database configuration
├── controllers/     # Business logic
├── middleware/      # Auth, validation, errors
├── models/          # Database schemas
├── routes/          # API endpoints
├── uploads/         # File uploads
├── .env            # Environment variables
├── server.js       # Entry point
└── seed.js         # Database seeder
```

## 🔧 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hostelfinder
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

## 📊 Database Models

- **User**: Authentication, profile, preferences
- **Hostel**: PG/Hostel details, location, pricing
- **Booking**: Reservations, payments, status
- **Review**: Ratings, comments, likes

## 🛡️ Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Rate Limiting
- Input Validation
- CORS Protection
- Helmet Security Headers

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongod

# Verify connection string in .env
```

### Port Already in Use
```bash
# Change PORT in .env or kill process
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 <PID>
```

### JWT Token Invalid
```bash
# Clear localStorage and login again
# Verify JWT_SECRET in .env
```

## 📚 Documentation Files

- **README.md** - Complete API documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **BACKEND_SUMMARY.md** - Feature overview
- **QUICK_REFERENCE.md** - This file

## 🔗 Useful Links

- MongoDB: https://www.mongodb.com/
- Express: https://expressjs.com/
- JWT: https://jwt.io/
- Postman: https://www.postman.com/

## 💡 Tips

1. Always use environment variables for sensitive data
2. Test API endpoints with Postman/Thunder Client
3. Check server logs for errors
4. Use seed data for testing
5. Keep JWT_SECRET secure in production

## 📞 Need Help?

1. Check error messages in console
2. Review API documentation in README.md
3. Verify environment variables
4. Check MongoDB connection
5. Review setup guide

---

**Quick Reference v1.0.0**
