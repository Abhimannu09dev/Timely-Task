# Timely Task - Backend API 

A robust RESTful API for the Timely Task application built with Node.js, Express, and MongoDB. This backend provides secure user authentication and comprehensive task management functionality.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Password Security**: Bcrypt hashing for password protection
- **Task Management**: Full CRUD operations for tasks
- **User Authorization**: Token-based authentication middleware
- **Data Validation**: Server-side validation for all inputs
- **Database Integration**: MongoDB with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error responses
- **RESTful Design**: Clean and intuitive API endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Environment Variables**: Dotenv
- **Logging**: Morgan
- **CORS**: Cross-Origin Resource Sharing

## Project Structure

```
backend/
├── controller/
│   ├── taskController.js     # Task CRUD operations
│   └── userController.js     # User authentication logic
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── taskModel.js         # Task schema and model
│   └── userModel.js         # User schema and model
├── routes/
│   ├── taskRoutes.js        # Task API endpoints
│   └── userRoutes.js        # User API endpoints
├── .env                     # Environment variables
├── app.js                   # Express app configuration
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhimannu09dev/Timely-Task.git
   cd timely-task-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your_jwt_secret_key_here
   MONGO_URL=your_mongodb_connection_string_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Server will run on**
   ```
   http://localhost:3000
   ```

## Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cookie-parser": "~1.4.4", 
  "cors": "^2.8.5",
  "debug": "~2.6.9",
  "dotenv": "^17.2.1",
  "express": "~4.16.1",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.17.0",
  "morgan": "~1.9.1"
}
```

## API Endpoints

### User Authentication
- `POST /users/create` - Register new user
- `POST /users/login` - User login

### Task Management  
- `GET /tasks/getTasks` - Get all user tasks
- `POST /tasks/create` - Create new task
- `PUT /tasks/update/:id` - Update task by ID
- `DELETE /tasks/delete/:id` - Delete task by ID

> **Note**: All task endpoints require JWT authentication via `Authorization: Bearer <token>` header

## Authentication Flow

1. **User Registration**: Password is hashed using bcrypt before storing
2. **User Login**: Credentials are validated and JWT token is issued
3. **Token Verification**: Each protected route validates the JWT token
4. **User Authorization**: Tasks are filtered by authenticated user ID

## Security Features

- **Password Hashing**: Bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless token-based authentication
- **Input Validation**: Server-side validation for all user inputs
- **CORS Configuration**: Cross-origin request handling
- **Authorization Checks**: User can only access their own tasks

## Validation Rules

### User Registration
- **Name**: Required, non-empty string
- **Email**: Valid email format, unique
- **Password**: Minimum 6 characters

### Task Creation/Update
- **Task Name**: Required, 1-500 characters, trimmed
- **Status**: Must be "pending" or "completed"
- **Priority**: Must be "high", "medium", or "low"

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT token signing | Yes |
| `MONGO_URL` | MongoDB connection string | Yes |

## Deployment

### Local Development
```bash
npm start
```

### Production Deployment
1. Set up environment variables on your hosting platform
2. Configure MongoDB Atlas for production database
3. Deploy to platforms like Heroku, Vercel, or AWS

## API Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Future Enhancements

- [ ] Task due dates functionality
- [ ] Task categories/tags
- [ ] File attachments for tasks
- [ ] Task sharing between users
- [ ] Email notifications
- [ ] Task search and filtering
- [ ] API rate limiting
- [ ] Swagger documentation
- [ ] Unit and integration tests

## Testing

To test the API endpoints, you can use:
- **Postman**: Import the API collection
- **Thunder Client**: VS Code extension
- **cURL**: Command line testing

### Example cURL Commands

```bash
# Register user
curl -X POST http://localhost:3000/users/create \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login user  
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get tasks (replace TOKEN with actual JWT)
curl -X GET http://localhost:3000/tasks/getTasks \
  -H "Authorization: Bearer TOKEN"
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

**Note**: Remember to keep your JWT secret and MongoDB credentials secure. Never commit sensitive information to version control.
