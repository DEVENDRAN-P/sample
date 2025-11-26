# Authentication System Setup Guide

## Overview

Your Low Price Tracker app now has real authentication with:

- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Logout functionality
- ✅ Password hashing with bcryptjs
- ✅ SQLite database for user storage
- ✅ Protected routes (only authenticated users can access app)
- ✅ Token persistence in localStorage

## How It Works

### Backend (Node.js + Express + SQLite)

- **Port**: 5000
- **Database**: SQLite (file: `server/users.db`)
- **Authentication**: JWT tokens with 7-day expiration
- **Endpoints**:
  - `POST /api/auth/register` - Register new user
  - `POST /api/auth/login` - Login user
  - `GET /api/auth/me` - Get current user info (protected)

### Frontend (React)

- **AuthContext**: Manages user state, tokens, and authentication
- **Protected Routes**: All app pages require authentication
- **Login Page**: Register or sign in
- **Register Page**: Create new account with validation
- **Profile Page**: Logout and view authenticated user info

## Getting Started

### 1. Start Backend Server

```bash
cd server
npm start
# Server will run on http://localhost:5000
```

### 2. Start Frontend Dev Server

```bash
npm run dev
# Frontend will run on http://localhost:3000
```

### 3. Test Authentication

#### Option A: Create New Account

1. Open http://localhost:3000
2. Click "Sign up" on Login page
3. Fill in:
   - Full Name: Your name
   - Username: Unique username (min 3 chars)
   - Email: Valid email
   - Password: At least 6 characters
4. Click "Sign Up"
5. You'll be automatically logged in and redirected to home

#### Option B: Use Demo Account

- **Username**: demo
- **Password**: demo123
  (You need to register this account first, or modify the backend to seed demo data)

#### Option C: Register First Time

The demo account doesn't exist yet - you'll need to:

1. Register a new account
2. Use those credentials to log in

### 4. Test Features

- ✅ Navigate to different pages - you'll be redirected to login if not authenticated
- ✅ Click logout on Profile page - you'll return to login
- ✅ Refresh page - you stay logged in (token persists)
- ✅ Try logging in with wrong credentials - error shows

## API Endpoints

### Register

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "fullName": "John Doe"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

### Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepass123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

### Get Current User (Protected)

```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_token>

Response:
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "createdAt": "2025-11-27T12:30:00.000Z"
}
```

## File Structure

```
new/
├── server/                 # Backend
│   ├── index.js           # Main server file
│   ├── db.js              # Database setup
│   ├── auth.js            # JWT token generation
│   ├── routes.js          # Auth API routes
│   ├── package.json       # Dependencies
│   └── users.db           # SQLite database (created on first run)
│
└── src/
    ├── context/
    │   └── AuthContext.jsx     # Auth state management
    ├── pages/
    │   ├── Login.jsx           # Login page
    │   ├── Register.jsx        # Registration page
    │   └── ...other pages (protected)
    ├── components/
    │   └── ProtectedRoute.jsx  # Route guard component
    └── App.jsx                 # App with auth integration
```

## Security Features

✅ **Password Hashing**: Passwords are hashed with bcryptjs (salt rounds: 10)
✅ **JWT Tokens**: Secure token-based authentication
✅ **Token Expiration**: Tokens expire after 7 days
✅ **CORS**: Configured to allow frontend requests only
✅ **Protected Routes**: Backend endpoints require valid tokens
✅ **Form Validation**: Email and password validation on frontend
✅ **Error Handling**: Secure error messages (no sensitive info leaked)

## Next Steps

### Optional Enhancements:

1. **Email Verification**: Send confirmation email after registration
2. **Password Reset**: Implement forgot password flow
3. **Refresh Tokens**: Use refresh tokens for better security
4. **Rate Limiting**: Limit login attempts
5. **2FA**: Add two-factor authentication
6. **Role-Based Access**: Admin, user, seller roles
7. **Database**: Migrate to PostgreSQL for production

### Production Checklist:

- [ ] Change JWT_SECRET to strong random string (not hardcoded)
- [ ] Use environment variables (.env file)
- [ ] Enable HTTPS
- [ ] Add rate limiting middleware
- [ ] Set secure cookie flags
- [ ] Add request logging
- [ ] Set up database backups
- [ ] Add error monitoring (Sentry)

## Troubleshooting

**Q: "Cannot connect to server" error**
A: Make sure backend is running on port 5000:

```bash
cd server && node index.js
```

**Q: Login fails with valid credentials**
A: Check that the user is registered. Try registering a new account first.

**Q: Token not persisting after refresh**
A: Check browser console for localStorage errors. Make sure privacy mode is off.

**Q: "No token provided" error**
A: You've been logged out. Token may have expired (7 days). Log in again.

## Contact & Support

For issues or questions, check the backend logs:

- Backend errors show in terminal where server is running
- Frontend errors show in browser console (F12)

---

**Database will auto-create on first run!** 🚀
