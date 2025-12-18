# HostelFinder Deployment Guide

## 🚀 Render Deployment Instructions

### 1️⃣ Backend Deployment (Deploy First)

#### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub account
3. Connect your GitHub repository

#### Step 2: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `sagardongre246-cpu/Hostel-finder-fullstack`
3. Configure the service:

**Basic Settings:**
- **Name**: `hostelfinder-backend`
- **Environment**: `Node`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Root Directory**: `Backend`

**Build & Deploy Settings:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
```
NODE_ENV=production
JWT_SECRET=HostelFinder_Super_Secret_JWT_Key_2024_Production_Ready
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_FROM=noreply@hostelfinder.com
MAX_FILE_SIZE=5242880
FILE_UPLOAD_PATH=./uploads
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ADMIN_EMAIL=admin@hostelfinder.com
ADMIN_PASSWORD=Admin@123456
FRONTEND_URL=https://hostelfinder-frontend.onrender.com
MONGODB_URI=mongodb+srv://hostelfinder:HostelFinder2024@cluster0.mongodb.net/hostelfinder?retryWrites=true&w=majority
```

4. Click "Create Web Service"
5. Wait for deployment (5-10 minutes)
6. Note the backend URL: `https://hostelfinder-backend.onrender.com`

### 2️⃣ Frontend Deployment (Deploy Second)

#### Step 1: Deploy Frontend
1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure the service:

**Basic Settings:**
- **Name**: `hostelfinder-frontend`
- **Branch**: `main`
- **Root Directory**: `Frontend`

**Build Settings:**
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

**Environment Variables:**
```
REACT_APP_BASE_URL=https://hostelfinder-backend.onrender.com
GENERATE_SOURCEMAP=false
```

4. Click "Create Static Site"
5. Wait for deployment (3-5 minutes)
6. Note the frontend URL: `https://hostelfinder-frontend.onrender.com`

### 3️⃣ MongoDB Atlas Setup (Required)

#### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (M0 Free Tier)

#### Step 2: Configure Database
1. Create database user:
   - Username: `hostelfinder`
   - Password: `HostelFinder2024`
2. Add IP whitelist: `0.0.0.0/0` (Allow from anywhere)
3. Get connection string and update `MONGODB_URI` in Render

### 4️⃣ Final Configuration Updates

#### Update Backend Environment Variables
After both services are deployed, update the backend's `FRONTEND_URL`:
```
FRONTEND_URL=https://hostelfinder-frontend.onrender.com
```

#### Update Frontend Environment Variables
Ensure the frontend has the correct backend URL:
```
REACT_APP_BASE_URL=https://hostelfinder-backend.onrender.com
```

## 🔧 Troubleshooting

### Common Issues:
1. **Build Failures**: Check Node.js version compatibility
2. **CORS Errors**: Verify FRONTEND_URL in backend environment
3. **Database Connection**: Ensure MongoDB Atlas is properly configured
4. **Environment Variables**: Double-check all required variables are set

### Health Check URLs:
- Backend: `https://hostelfinder-backend.onrender.com/health`
- Frontend: `https://hostelfinder-frontend.onrender.com`

## 📝 Post-Deployment Checklist

- [ ] Backend health check returns 200
- [ ] Frontend loads without errors
- [ ] Authentication flow works
- [ ] Dark/Light mode toggle works
- [ ] Responsive design works on mobile
- [ ] All API endpoints respond correctly

## 🔄 Future Updates

To update the deployed application:
1. Push changes to GitHub main branch
2. Render will automatically redeploy both services
3. Monitor deployment logs for any issues

## 📞 Support

If you encounter issues:
1. Check Render deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check browser console for frontend errors