# ✅ Timely Task — Personal Task Management App

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)](https://vercel.com/)

---

## 📖 Project Description

**Timely Task** is a full-stack personal task management web application. Users register and log in to a private dashboard where they can create, edit, complete, and delete tasks — all scoped exclusively to their own account.

Each task has a **name**, **priority level** (High / Medium / Low), and a **status** (Pending / Completed). The dashboard shows a live summary of total, pending, and completed tasks, and the list is always sorted by priority — high-priority tasks float to the top automatically.

### Problem it solves

Sticky notes get lost and generic to-do apps don't feel personal. Timely Task gives you a clean, private task list that only you can see, with priority-based sorting so the most important work is always front and centre.

---

## ✨ Features

- **User Authentication** — Register and log in with email and password. Passwords are hashed with bcrypt (10 rounds). JWT tokens (1-hour expiry) are stored in `localStorage` for persistent sessions
- **Private Task Isolation** — Every task is linked to the authenticated user's ID. Users can only ever see and modify their own tasks
- **Create & Edit Tasks** — A shared modal form handles both creating new tasks and editing existing ones. Pre-fills all fields when editing
- **Priority Levels** — High, Medium, and Low — chosen at creation and editable any time
- **Status Toggle** — Click the checkbox on any task to instantly flip it between Pending and Completed
- **Filter Tabs** — Switch between All, Pending, and Completed views with a single click
- **Auto-Sort by Priority** — The task list always renders High → Medium → Low, regardless of filter
- **Dashboard Stats** — Live counters for total tasks, pending tasks, and completed tasks update on every action without a page refresh
- **Delete with Confirmation** — A confirmation dialog prevents accidental deletions
- **Toast Notifications** — Success and error toasts (React Toastify) for all major actions: login, register, create task, update task, delete task
- **Password Visibility Toggle** — Show/hide password on both Sign In and Sign Up forms
- **Frontend + Backend Validation** — Both layers validate inputs independently
- **Deployed on Vercel** — Frontend and backend are both deployed on Vercel (backend via `serverless-http`)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 |
| **Frontend Language** | TypeScript 5.8 |
| **Build Tool** | Vite |
| **Styling** | Plain CSS + CSS Modules |
| **HTTP Client** | Axios |
| **Frontend Routing** | React Router DOM 7 |
| **Notifications** | React Toastify |
| **Icons** | React Icons |
| **Backend Framework** | Express 4 (Node.js) |
| **Database** | MongoDB (Mongoose 8) |
| **Authentication** | JWT (jsonwebtoken) + bcrypt |
| **Serverless Adapter** | serverless-http (Vercel deployment) |

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────┐
│           React Frontend (Vite)              │
│   SignIn → SignUp → HomePage                 │
│   JWT stored in localStorage                 │
│   Axios sends Bearer token on every request  │
└──────────────────────┬───────────────────────┘
                       │  HTTP REST (Bearer JWT)
                       ▼
┌──────────────────────────────────────────────┐
│         Express Backend (Node.js)            │
│   /users  → userController                  │
│   /tasks  → taskController (JWT verified)    │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  MongoDB Atlas  │
              │  Users / Tasks  │
              └─────────────────┘
```

---

## 📁 Project Structure

```
Timely-Task/
│
├── backend/
│   ├── app.js                      # Express app setup, routes, MongoDB connection
│   ├── bin/www                     # HTTP server entry point (local dev)
│   ├── vercel.json                 # Vercel serverless deployment config
│   │
│   ├── controller/
│   │   ├── userController.js       # createUser, loginUser (bcrypt + JWT)
│   │   └── taskController.js       # createTasks, getTasks, updateTask, deleteTask
│   │
│   ├── models/
│   │   ├── userModel.js            # User schema (name, email, password)
│   │   └── taskModel.js            # Task schema (taskName, status, priority, user ref)
│   │
│   ├── routes/
│   │   ├── userRoutes.js           # POST /users/create, POST /users/login
│   │   └── taskRoutes.js           # GET/POST/PUT/DELETE /tasks/*
│   │
│   └── middleware/
│       └── auth.js                 # JWT verification middleware (authMiddleware)
│
└── Frontend/
    ├── index.html
    ├── vite.config.ts
    ├── vercel.json                  # Vite/Vercel frontend config
    │
    └── src/
        ├── App.tsx                 # Route definitions (SignIn / Signup / HomePage)
        ├── App.css / index.css     # Global styles
        │
        ├── pages/
        │   ├── SignIn.tsx          # Login form with validation + show/hide password
        │   ├── Signup.tsx          # Register form with confirm password + validation
        │   └── HomePage.tsx        # Dashboard shell (Heading + Body)
        │
        ├── Component/
        │   ├── Heading.tsx         # Top navbar / header
        │   ├── Body.tsx            # Main dashboard: stats, filter tabs, task list, actions
        │   └── CreateTask.tsx      # Modal form for create AND edit (shared component)
        │
        └── CSS/
            ├── Body.css            # Dashboard and task list styles
            ├── Heading.css         # Header styles
            ├── SignIn.module.css   # Sign in page CSS module
            └── Signup.module.css   # Sign up page CSS module
```

---

## ⚙️ Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or later
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or a local MongoDB instance)

---

### 1. Clone the repository

```bash
git clone https://github.com/Abhimannu09dev/Timely-Task.git
cd Timely-Task
```

---

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```bash
touch .env
```

Add the following variables:

```env
# MongoDB connection string (Atlas or local)
MONGO_URL=mongodb+srv://your-user:your-password@cluster.mongodb.net/timely-task

# JWT secret key — use a long random string
JWT_SECRET=your-super-secret-key-change-this
```

> **💡 Tip (MongoDB Atlas):** In Atlas, go to **Database → Connect → Drivers**, copy the connection string, and replace `<password>` with your actual database user password.

> **⚠️ Note:** Never commit your `.env` file. It is already listed in `.gitignore`.

---

### 3. Set up the frontend

Open a new terminal:

```bash
cd Frontend
npm install
```

> **💡 Note:** The frontend currently has the backend URL hardcoded as `http://localhost:3000` in the component files (`Body.tsx`, `CreateTask.tsx`, `SignIn.tsx`, `Signup.tsx`). This works out of the box for local development. For production, update these to point to your deployed backend URL.

---

## ▶️ How to Run the Project Locally

### Start the backend

```bash
cd backend
npm start
# Server runs on http://localhost:3000
```

### Start the frontend

In a separate terminal:

```bash
cd Frontend
npm run dev
# App runs on http://localhost:5173
```

Open your browser at **http://localhost:5173** to use the app.

> **💡 Tip:** You can run both terminals side-by-side. The backend must be running before the frontend can make API calls.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `MONGO_URL` | ✅ | MongoDB connection string (Atlas URI or `mongodb://localhost:27017/timely-task`) |
| `JWT_SECRET` | ✅ | Secret key used to sign and verify JWT tokens |

The frontend has no `.env` file — the API base URL is set directly in the component files for now.

---

## 📡 API Endpoints

All task routes require an `Authorization: Bearer <token>` header with the JWT received at login.

### 👤 Users — `/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/users/create` | Public | Register a new user account |
| `POST` | `/users/login` | Public | Login — returns a JWT token (1-hour expiry) and user details |

**Register request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Login response:**
```json
{
  "message": "Login successfull",
  "token": "<jwt-token>",
  "user": { "_id": "...", "name": "Jane Doe", "email": "jane@example.com" }
}
```

---

### ✅ Tasks — `/tasks`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/tasks/getTasks` | Required | Fetch all tasks belonging to the authenticated user |
| `POST` | `/tasks/create` | Required | Create a new task |
| `PUT` | `/tasks/update/:id` | Required | Update a task's name, priority, or status |
| `DELETE` | `/tasks/delete/:id` | Required | Delete a task by ID |

**Create task request body:**
```json
{
  "taskName": "Finish the project report",
  "priority": "high",
  "status": "pending"
}
```

**Update task request body** (all fields optional — only send what you want to change):
```json
{
  "status": "completed"
}
```

---

## 🧩 How the System Works

### Authentication Flow

```
User fills Sign Up form → frontend validates → POST /users/create
  └─ Backend hashes password (bcrypt, 10 rounds)
  └─ Stores user in MongoDB
  └─ Redirects to Sign In page

User fills Sign In form → POST /users/login
  └─ Backend finds user by email
  └─ bcrypt.compare(password, storedHash)
  └─ jwt.sign({ userID }, JWT_SECRET, { expiresIn: '1h' })
  └─ Returns token + user details

Frontend stores token in localStorage
Axios sends: Authorization: Bearer <token> on every subsequent request
```

### Task Operations Flow

```
Body.tsx mounts → fetchTasks() → GET /tasks/getTasks (with token)
  └─ Backend decodes token → extracts userID
  └─ Tasks.find({ user: userID }) → returns only that user's tasks
  └─ React state updates → UI renders

User clicks ✅ checkbox → updateTaskStatus() → PUT /tasks/update/:id { status: "completed" }
  └─ Backend finds task by _id AND user (ownership check)
  └─ Updates task → returns updated task
  └─ setTasks(...) updates the task in-place — no re-fetch needed

User clicks ✏️ edit → opens CreateTask modal pre-filled with task data
  └─ On submit → PUT /tasks/update/:id with new fields
  └─ fetchTasks() called to refresh the list

User clicks 🗑️ delete → confirm dialog → DELETE /tasks/delete/:id
  └─ Backend deletes only if task belongs to user
  └─ setTasks(tasks.filter(...)) removes it from state immediately
```

### Priority Sorting

The `sortTasksByPriority` function in `Body.tsx` maps `high → 3`, `medium → 2`, `low → 1` and sorts descending before rendering. This runs on every filter change client-side — no additional API calls.

---

## 🖥️ Frontend Pages

| Route | Page | Description |
|---|---|---|
| `/` | SignIn | Email + password login with show/hide toggle and validation |
| `/signup` | Signup | Full name, email, password, confirm password — with match validation |
| `/homepage` | HomePage | Full task dashboard: stats, filter tabs, task list, create/edit/delete |

---

## 🚀 Deployment

Both the frontend and backend are configured for deployment on **Vercel**.

### Backend (Vercel Serverless)

The backend uses `serverless-http` to wrap the Express app for Vercel's serverless runtime. The `backend/vercel.json` routes all requests through `app.js`.

Set the following environment variables in your Vercel project settings:

```
MONGO_URL   = mongodb+srv://...
JWT_SECRET  = your-production-secret
```

### Frontend (Vercel)

The `Frontend/vercel.json` sets the framework to `vite` and the output directory to `dist`.

Before deploying the frontend, update the hardcoded `http://localhost:3000` API URLs in the component files to your production backend URL:

```ts
// Example — replace in Body.tsx, CreateTask.tsx, SignIn.tsx, Signup.tsx
const API_URL = "https://your-backend.vercel.app";
```

> **💡 Tip:** Moving the API URL to a `VITE_API_URL` environment variable (via `import.meta.env.VITE_API_URL`) would be a cleaner long-term solution and eliminate the need to update multiple files.

---

## 📸 Screenshots / Demo

> Screenshots and a live demo link will be added here.

| View | Description |
|---|---|
| `[Sign In]` | Clean login form with email, password, and show/hide toggle |
| `[Sign Up]` | Registration form with confirm password and inline validation |
| `[Dashboard]` | Stats row, filter tabs, priority-sorted task list |
| `[Create Task Modal]` | Task name, priority dropdown, status dropdown |
| `[Edit Task Modal]` | Same modal, pre-filled with the task's current values |

---

## 🚀 Future Improvements

- [ ] Move hardcoded API URLs to a `VITE_API_URL` environment variable
- [ ] Add due dates per task with overdue highlighting
- [ ] Search/filter tasks by keyword
- [ ] Task categories or labels
- [ ] Drag-and-drop reordering
- [ ] Dark mode toggle
- [ ] Refresh token support for sessions longer than 1 hour
- [ ] Unit tests for controllers (Jest / Supertest)

---

## 🤝 Contributing

Feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: your feature"`
4. Push and open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

> *Built with React, Express, and MongoDB as a personal full-stack project.*
