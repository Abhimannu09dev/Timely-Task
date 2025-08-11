# Timely Task - Full-Stack Task Management Application 

A complete task management solution with React frontend and Node.js backend. Organize your daily tasks with priority levels, status tracking, and secure user authentication.

## Overview

Timely Task is a full-stack web application that helps users manage their tasks efficiently. Built with modern technologies, it offers a seamless experience from user registration to task completion tracking.

## Architecture

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    MongoDB    ┌─────────────────┐
│                 │◄──────────────────►│                 │◄─────────────►│                 │
│  React Frontend │   JWT Auth + CORS   │ Express Backend │   Mongoose    │  MongoDB Atlas  │
│                 │                     │                 │               │                 │
└─────────────────┘                     └─────────────────┘               └─────────────────┘
```

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + Bcrypt
- **Deployment Ready**: CORS enabled, environment configured

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account (or local MongoDB)
- Git

### Setup & Installation

1. **Clone and setup backend**
   ```bash
   git clone https://github.com/Abhimannu09dev/Timely-Task.git
   cd timely-task/backend
   npm install
   
   # Create .env file
   echo "JWT_SECRET=your_secret_here" > .env
   echo "MONGO_URL=your_mongodb_url" >> .env
   
   # Start backend (runs on :3000)
   npm start
   ```

2. **Setup and start frontend** (new terminal)
   ```bash
   cd ../frontend
   npm install
   
   # Start frontend (runs on :5173)  
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Application Features

### User Management
- Secure registration with password hashing
- JWT-based authentication with 1-hour tokens
- Persistent login sessions via localStorage

### Task Operations
- **CRUD Operations**: Create, read, update, delete tasks
- **Priority Management**: High, Medium, Low priority levels
- **Status Tracking**: Pending ↔ Completed toggle
- **Smart Filtering**: View All, Pending, or Completed tasks
- **Auto-sorting**: Tasks ordered by priority (High → Medium → Low)

### User Interface
- **Dashboard**: Visual task statistics and quick overview
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: No page refresh needed
- **Modern UI**: Clean design with hover effects and animations

## API Communication

The frontend communicates with the backend through REST API:

```javascript
// Authentication endpoints
POST /users/create    // Register
POST /users/login     // Login

// Task management (requires JWT token)  
GET    /tasks/getTasks     // Fetch user tasks
POST   /tasks/create       // Create task
PUT    /tasks/update/:id   // Update task  
DELETE /tasks/delete/:id   // Delete task
```

## Project Structure

```
timely-task/
├── frontend/                 # React application
│   ├── src/
│   │   ├── Component/       # Reusable components
│   │   ├── Pages/           # Route pages
│   │   └── CSS/             # Styling files
│   └── package.json
│
├── backend/                 # Express API server
│   ├── controller/          # Business logic
│   ├── models/             # Database schemas  
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── package.json
│
└── README.md 
```

## Security Implementation

- **Password Security**: Bcrypt hashing with salt
- **Token Authentication**: JWT with expiration
- **Input Validation**: Frontend + Backend validation
- **CORS Protection**: Configured for cross-origin requests
- **User Isolation**: Tasks filtered by authenticated user ID

## Key Workflows

### User Registration Flow
1. User fills registration form → Frontend validation
2. Data sent to backend → Server validation + password hashing  
3. User stored in MongoDB → Success response
4. Auto-redirect to login page

### Task Management Flow
1. User creates/updates task → JWT token sent with request
2. Backend validates token → Extracts user ID
3. Task operation performed → Database updated
4. Response sent → Frontend updates UI immediately

### Authentication Flow  
1. User login → Credentials verified against hashed password
2. JWT token generated → Sent to frontend
3. Token stored in localStorage → Used for subsequent requests
4. Auto-logout after token expiry

## Deployment Guide

### Backend Deployment
```bash
# Environment variables needed:
JWT_SECRET=your_production_secret
MONGO_URL=mongodb+srv://...

```

### Frontend Deployment  
```bash
# Build for production
npm run build

# Deploy to Vercel/Netlify
# Update API URLs in code to point to production backend
```

## Testing the Application

1. **Start Development Servers**
   ```bash
   # Terminal 1: Backend
   cd backend && npm start
   
   # Terminal 2: Frontend  
   cd frontend && npm run dev
   ```

2. **Test User Flow**
   - Register new account → Login → Create tasks
   - Test priority sorting and status filtering
   - Try editing and deleting tasks
   - Test responsive design on mobile

## Performance Features

- **Optimized Queries**: Database indexing on user + status
- **Minimal Re-renders**: React state management
- **Fast Authentication**: Stateless JWT tokens
- **Responsive UI**: CSS optimizations for mobile

## Development Roadmap

**Phase 1**: Core Features 
- User authentication
- Basic task CRUD operations
- Priority and status management

**Phase 2**: Enhanced Features 
- [ ] Due dates and reminders
- [ ] Task categories/tags
- [ ] Search functionality
- [ ] Dark mode

**Phase 3**: Advanced Features 
- [ ] Team collaboration
- [ ] File attachments
- [ ] Analytics dashboard
- [ ] Mobile app

## Contributing

This is a personal project, but feedback and suggestions are welcome!

1. Open an issue for bugs or feature requests
2. Fork for personal modifications
3. Pull requests welcome for improvements

## Environment Security

**Critical**: Never commit sensitive data
- Add `.env` to `.gitignore`
- Use different secrets for dev/production
- Rotate JWT secrets regularly
- Monitor for exposed credentials

---

