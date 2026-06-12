import dotenv = require("dotenv");
dotenv.config();

import express = require("express");
import path = require("path");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import cors = require("cors");
import mongoose = require("mongoose");

import indexRouter = require("./routes/index");
import userRouter = require("./routes/userRoutes");
import taskRouter = require("./routes/taskRoutes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: [
      "https://timely-task-3xovs2r7r-abhimannu-singh-kunwars-projects.vercel.app",
      "http://localhost:5173",
    ],
  })
);

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

async function main() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("Database connected successfully:", conn.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
main();

export { app };
