# Low Price Tracker 🛍️

A modern web app to track product prices, find nearby shops, and earn rewards on savings.

## Features

✨ **Price Tracking** - Search and compare product prices across shops
🎯 **Nearby Shops** - Find shops near your location with geolocation
💰 **Rewards** - Earn points on searches and bill uploads
📊 **Search History** - Track your searches and patterns
📱 **Bill Upload** - Upload receipts to track savings
🔐 **Authentication** - Secure login with JWT tokens

## Tech Stack

**Frontend:**

- React 18.2.0
- Vite 4.5.14
- React Router v6
- Tailwind CSS 3.3.0
- Lucide Icons

**Backend:**

- Node.js + Express 4.18.2
- SQLite3 Database
- JWT Authentication
- bcryptjs Password Hashing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev
```

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Start backend server (runs on http://localhost:5000)
npm start
```

## Project Structure

```
├── src/
│   ├── pages/           # Page components
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context (Auth, User)
│   ├── App.jsx          # Main app component
│   └── index.css        # Global styles
├── server/
│   ├── index.js         # Express server
│   ├── routes.js        # API routes
│   ├── db.js            # Database setup
│   ├── auth.js          # JWT authentication
│   └── package.json
├── package.json         # Frontend dependencies
└── vite.config.js       # Vite configuration
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

## Features in Detail

### Authentication

- Register with username, email, and password
- Secure login with JWT tokens (7-day expiration)
- Password hashing with bcryptjs (10 salt rounds)
- Token persistence across browser sessions

### User Data Isolation

- Each user's search history and bills stored separately
- localStorage keys include user ID for isolation
- Automatic cleanup on logout

### Savings Calculation

- 50 points per unique search
- 25 points per repeated search
- 10% cashback on bill amounts
- 10 points per uploaded bill

## Development

Start both frontend and backend in separate terminals:

**Terminal 1 - Frontend:**

```bash
npm run dev
```

**Terminal 2 - Backend:**

```bash
cd server
npm start
```

## Database

SQLite database automatically created on first run at `server/users.db`

**Tables:**

- `users` - Stores user credentials and profile info

## Future Enhancements

- Real OCR for bill processing
- Email verification
- Password reset flow
- Reward redemption backend
- Shop management dashboard
- Analytics and reporting

## License

MIT License

## Author

Low Price Tracker Team
