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
app.use(cors({ origin: 'https://timely-task-3xovs2r7r-abhimannu-singh-kunwars-projects.vercel.app' }));

// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

// getting-started.js Connect Mongoose 
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose
  .connect(process.env.MONGO_URL)
  .then(data=>{
    console.log("Database connected successfully",data.connection.name)
  });
}



module.exports = serverless(app);
module.exports.app = app;
