import bcrypt = require("bcrypt");
import User = require("../models/userModel");
import jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

export async function createUser(req: Request, res: Response, _next: NextFunction) {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ error: "Name is required" });
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: "Email is required" });
      return;
    }
    if (!password || password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({
        message: "User Created",
        user,
      });
    } else {
      res.status(409).json({ error: "User already exists" });
    }
  } catch (error) {
    console.error("Error creating user");
    res.status(400).json({ error: "Error creating user" });
  }
}

export async function loginUser(req: Request, res: Response, _next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: "Email is required" });
      return;
    }
    if (!password || password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Email not found" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: "Mismatched password" });
      return;
    }

    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    const payload = { userID: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successfull",
      token: token,
      user: userDetails,
    });
  } catch (error) {
    console.error("Error logging in");
    res.status(500).json({ error: "Failed to log in. Please try again!" });
  }
}
