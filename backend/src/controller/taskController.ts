import mongoose = require("mongoose");
import jwt = require("jsonwebtoken");
import Tasks = require("../models/taskModel");
import User = require("../models/userModel");
import { Request, Response, NextFunction } from "express";

const { ObjectId } = mongoose.Types;

export async function createTasks(req: Request, res: Response, _next: NextFunction) {
  try {
    const { taskName, status, dueDate, priority } = req.body;

    if (!taskName || taskName.trim() === "") {
      res.status(400).json({ message: "Task name is required" });
      return;
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(400).json({ message: "Token is required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userID: string };
    const user = new mongoose.Types.ObjectId(decoded.userID);

    if (user.toString() === decoded.userID) {
      const task = new Tasks({ taskName, status, dueDate, priority, user });
      await task.save();
      res.status(201).json({ message: "The task is successfully created" });
    } else {
      res.status(400).json({ message: "The user can only create tasks" });
    }
  } catch (error) {
    res.status(400).json("Error creating task");
  }
}

export async function getTasks(req: Request, res: Response, _next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization header missing or invalid" });
      return;
    }

    const token = req.headers.authorization?.split(" ")[1]!;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userID: string };

    const user = await User.findById(decoded.userID);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const tasks = await Tasks.find({ user: decoded.userID });
    res.status(200).json(tasks);
  } catch (error) {
    if ((error as any).name === "JsonWebTokenError") {
      res.status(400).json({ message: "Token not found" });
      return;
    }
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateTask(req: Request, res: Response, _next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization header missing or invalid" });
      return;
    }

    const token = req.headers.authorization?.split(" ")[1]!;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userID: string };

    const taskID = req.params.id as string;
    if (!ObjectId.isValid(taskID)) {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }
    const userID = new ObjectId(decoded.userID);

    const task = await Tasks.findOne({ _id: taskID, user: userID });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const { taskName, status, dueDate, priority } = req.body;

    if (taskName) task.taskName = taskName;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    if ((error as any).name === "JsonWebTokenError") {
      res.status(400).json({ message: "Token not found" });
      return;
    }
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteTask(req: Request, res: Response, _next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization header missing or invalid" });
      return;
    }

    const token = req.headers.authorization?.split(" ")[1]!;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userID: string };

    const taskID = req.params.id as string;
    if (!ObjectId.isValid(taskID)) {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }
    const userID = new ObjectId(decoded.userID);

    const task = await Tasks.findByIdAndDelete({ _id: taskID, user: userID });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (error) {
    if ((error as any).name === "JsonWebTokenError") {
      res.status(400).json({ message: "Token not found" });
      return;
    }
    res.status(500).json({ message: "Server error" });
  }
}
