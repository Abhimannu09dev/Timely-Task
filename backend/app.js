require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRoutes');
var taskRouter = require('./routes/taskRoutes');

var app = express();
var cors = require('cors');
const serverless = require('serverless-http');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: [
    'https://timely-task-3xovs2r7r-abhimannu-singh-kunwars-projects.vercel.app',
    'http://localhost:5173'
  ],
}));

// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

// getting-started.js Connect Mongoose 
const mongoose = require('mongoose');

// MongoDB connection
async function main() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully:', conn.connection.name);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
main();



module.exports = serverless(app);
module.exports.app = app;
