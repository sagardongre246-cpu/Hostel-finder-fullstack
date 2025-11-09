# HostelFinder Backend API

Complete backend API for HostelFinder - A PG and Hostel Booking Platform

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Role-Based Access Control**: User and Admin roles
- **User Management**: Profile management, preferences, saved hostels
- **Hostel Management**: CRUD operations, search, filtering, nearby hostels
- **Booking System**: Create, update, cancel bookings with payment tracking
- **Review System**: Rate and review hostels, like reviews
- **Admin Dashboard**: Complete admin panel with statistics and management
- **Security**: Helmet, rate limiting, input validation
- **Error Handling**: Centralized error handling
- **Database**: MongoDB with Mongoose ODM

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
cd Backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

4. **Configure .env file**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hostelfinder
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

5. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "9876543210"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Password
```http
PUT /api/auth/update-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### User Endpoints

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "9876543210",
  "photo": "https://example.com/photo.jpg"
}
```

#### Get Saved Hostels
```http
GET /api/users/saved-hostels
Authorization: Bearer <token>
```

#### Save Hostel
```http
POST /api/users/saved-hostels/:hostelId
Authorization: Bearer <token>
```

#### Get User Bookings
```http
GET /api/users/bookings
Authorization: Bearer <token>
```

### Hostel Endpoints

#### Get All Hostels
```http
GET /api/hostels?city=Mumbai&minPrice=1000&maxPrice=5000&page=1&limit=10
```

#### Get Single Hostel
```http
GET /api/hostels/:id
```

#### Search Hostels
```http
GET /api/hostels/search?q=Mumbai
```

#### Get Nearby Hostels
```http
GET /api/hostels/nearby?lat=19.0760&lng=72.8777&distance=10
```

#### Create Hostel (Admin)
```http
POST /api/hostels
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Mumbai Central PG",
  "description": "Modern PG in Mumbai",
  "location": {
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "coordinates": {
      "lat": 19.0760,
      "lng": 72.8777
    }
  },
  "price": {
    "perNight": 500,
    "perMonth": 10000
  },
  "amenities": ["WiFi", "AC", "Parking"],
  "contact": {
    "phone": "9876543210",
    "email": "contact@hostel.com"
  }
}
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "hostel": "hostel_id",
  "checkIn": "2024-12-01",
  "checkOut": "2024-12-05",
  "guests": 2,
  "rooms": 1,
  "roomType": "Double",
  "specialRequests": "Early check-in if possible"
}
```

#### Get User Bookings
```http
GET /api/bookings
Authorization: Bearer <token>
```

#### Get Single Booking
```http
GET /api/bookings/:id
Authorization: Bearer <token>
```

#### Cancel Booking
```http
PUT /api/bookings/:id/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Change of plans"
}
```

### Review Endpoints

#### Create Review
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "hostel": "hostel_id",
  "rating": 8,
  "title": "Great place!",
  "comment": "Had a wonderful stay. Highly recommended!",
  "ratings": {
    "cleanliness": 9,
    "location": 8,
    "facilities": 8,
    "staff": 9,
    "valueForMoney": 8
  }
}
```

#### Get Reviews
```http
GET /api/reviews?hostel=hostel_id&page=1&limit=10
```

#### Like Review
```http
POST /api/reviews/:id/like
Authorization: Bearer <token>
```

### Admin Endpoints

#### Get Dashboard Stats
```http
GET /api/admin/dashboard
Authorization: Bearer <admin_token>
```

#### Get All Users
```http
GET /api/admin/users?page=1&limit=20
Authorization: Bearer <admin_token>
```

#### Update User
```http
PUT /api/admin/users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "admin",
  "isVerified": true
}
```

#### Get All Bookings
```http
GET /api/admin/bookings?status=Confirmed&page=1&limit=20
Authorization: Bearer <admin_token>
```

#### Update Booking Status
```http
PUT /api/admin/bookings/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "Confirmed"
}
```

## 🗄️ Database Models

### User Model
- name, email, password (hashed)
- phone, photo, role (user/admin)
- preferences (currency, language, notifications)
- savedHostels (array of hostel IDs)
- timestamps

### Hostel Model
- name, description, location
- price (perNight, perMonth)
- images, amenities, roomTypes
- rating (average, count)
- category, gender, rules
- contact info, owner
- timestamps

### Booking Model
- user, hostel references
- checkIn, checkOut dates
- guests, rooms, roomType
- totalPrice, paymentStatus
- bookingStatus, confirmationCode
- cancellation details
- timestamps

### Review Model
- user, hostel, booking references
- rating (1-10), title, comment
- detailed ratings (cleanliness, location, etc.)
- likes array
- response from owner
- timestamps

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevents API abuse
- **Helmet**: Sets security headers
- **Input Validation**: express-validator
- **CORS**: Configured for frontend
- **Error Handling**: No sensitive data exposure

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostelfinder
JWT_SECRET=your_production_secret_key
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **AWS**: EC2 or Elastic Beanstalk
- **DigitalOcean**: Droplets or App Platform
- **Vercel/Netlify**: Serverless functions

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📦 Project Structure

```
Backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User operations
│   ├── hostelController.js  # Hostel operations
│   ├── bookingController.js # Booking operations
│   ├── reviewController.js  # Review operations
│   └── adminController.js   # Admin operations
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── errorHandler.js      # Error handling
│   ├── rateLimiter.js       # Rate limiting
│   └── validator.js         # Input validation
├── models/
│   ├── User.js              # User schema
│   ├── Hostel.js            # Hostel schema
│   ├── Booking.js           # Booking schema
│   └── Review.js            # Review schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── userRoutes.js        # User endpoints
│   ├── hostelRoutes.js      # Hostel endpoints
│   ├── bookingRoutes.js     # Booking endpoints
│   ├── reviewRoutes.js      # Review endpoints
│   └── adminRoutes.js       # Admin endpoints
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
├── README.md               # Documentation
└── server.js               # Entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 👥 Support

For support, email support@hostelfinder.com

## 🎉 Acknowledgments

- Express.js team
- MongoDB team
- All contributors

---

**Built with ❤️ for HostelFinder**
