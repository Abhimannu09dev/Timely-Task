# Timely Task - Frontend 

A modern, responsive task management application built with React and TypeScript. Timely Task helps users organize their daily tasks with an intuitive interface and comprehensive task management features.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality
- **Task Management**: Create, read, update, and delete tasks
- **Priority System**: Organize tasks by priority (High, Medium, Low)
- **Status Tracking**: Track task completion status (Pending, Completed)
- **Task Filtering**: Filter tasks by status (All, Pending, Completed)
- **Real-time Updates**: Instant task status updates
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface with gradient accents

## Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules + Regular CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: React Icons (Lucide, Material Design, Font Awesome, Bootstrap)
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

```
src/
├── Component/
│   ├── Body.tsx              # Main dashboard component
│   ├── CreateTask.tsx        # Task creation/editing modal
│   └── Heading.tsx           # Header navigation component
├── Pages/
│   ├── HomePage.tsx          # Main homepage layout
│   ├── SignIn.tsx           # User authentication (login)
│   └── SignUp.tsx           # User registration
├── CSS/
│   ├── Body.css             # Main dashboard styles
│   ├── Heading.css          # Header styles
│   ├── SignIn.module.css    # Sign-in page styles
│   └── SignUp.module.css    # Sign-up page styles
└── main.tsx                 # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Backend API server running on `http://localhost:3000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd timely-task-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Required Dependencies

Add these dependencies to your `package.json`:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "react-icons": "^4.7.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "typescript": "^4.9.3",
    "vite": "^4.1.0"
  }
}
```

##  Key Components

### Dashboard (Body.tsx)
- Displays task statistics (Total, Pending, Completed)
- Task filtering and sorting by priority
- Real-time task management (create, edit, delete, toggle status)
- Responsive task cards with hover effects

### Authentication Pages
- **SignIn.tsx**: User login with form validation
- **SignUp.tsx**: User registration with password confirmation

### Task Management
- **CreateTask.tsx**: Modal component for creating and editing tasks
- Form validation and error handling
- Priority and status selection

### Navigation
- **Heading.tsx**: Header with user info and logout functionality
- **HomePage.tsx**: Main layout wrapper

## API Integration

The application integrates with a backend API with the following endpoints:

- `POST /users/create` - User registration
- `POST /users/login` - User authentication
- `GET /tasks/getTasks` - Fetch user tasks
- `POST /tasks/create` - Create new task
- `PUT /tasks/update/:id` - Update task
- `DELETE /tasks/delete/:id` - Delete task

## Key Features Implementation

### Task Filtering & Sorting
- Tasks are automatically sorted by priority (High → Medium → Low)
- Filter tabs for viewing All, Pending, or Completed tasks
- Real-time updates when task status changes

### Responsive Design
- Mobile-first approach with responsive breakpoints
- Touch-friendly interface for mobile devices
- Optimized layouts for different screen sizes

### State Management
- Local state management using React hooks
- Token-based authentication with localStorage
- Real-time UI updates without page refresh

## Authentication Flow

1. **Sign Up**: New users register with name, email, and password
2. **Sign In**: Existing users authenticate with email and password
3. **Token Storage**: JWT tokens stored in localStorage
4. **Protected Routes**: Automatic redirection for unauthenticated users
5. **Logout**: Clear local storage and redirect to sign-in

## Styling Architecture

- **CSS Modules**: Scoped styles for authentication pages
- **Regular CSS**: Global styles and component-specific styles
- **Gradient Themes**: Consistent blue-purple gradient throughout
- **Hover Effects**: Interactive feedback for better UX

## Responsive Breakpoints

- **Desktop**: Full-width layout with side-by-side elements
- **Tablet**: Adjusted spacing and font sizes
- **Mobile**: Single-column layout with touch-optimized controls

## Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Future Enhancements

- [ ] Dark mode support
- [ ] Task categories/tags
- [ ] Due date functionality
- [ ] Task search and advanced filtering
- [ ] Drag and drop task reordering
- [ ] Push notifications
- [ ] Offline support with PWA

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

**Note**: Make sure your backend API is running on `http://localhost:3000` before starting the frontend development server.
