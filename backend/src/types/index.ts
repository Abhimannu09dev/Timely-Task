import { Request } from "express";

export interface IJwtPayload {
  userID: string;
  iat?: number;
  exp?: number;
}

export interface IAuthRequest extends Request {
  user?: IJwtPayload;
}

export interface ITask {
  _id: string;
  taskName: string;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
  dueDate?: Date;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}
