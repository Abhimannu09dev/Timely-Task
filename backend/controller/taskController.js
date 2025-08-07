
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { find } = require("../models/userModel");
const Tasks = require("../models/taskModel");
const User = require("../models/userModel");
const { ObjectId } = mongoose.Types;

async function createTasks(req ,res, next) {
    try{
        const {taskName, status, dueDate, priority} = req.body;
        // Check id the taskName is provided or not
        if(!taskName || taskName.trim() === ""){
            return res.status(400).json({message: "Task name is required"});
        }

        // Get and validate token
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);
        
        // Check if the token is valid or not
        if(!token){
            return res.status(400).json({message: "Token is required"});
        }
        
        // Decoded the token through jwt.verify
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        

        let user =new mongoose.Types.ObjectId(decoded.userID);
        console.log("userId",user);
        
        //Add the task according to the user
        if(user.toString() === decoded.userID){
            const task = new Tasks({taskName, status, dueDate, priority, user});
            await task.save();
            res.status(201).json({message: "The task is successfully created"});
        }else{
            return res.status(400).json({message: "The user can only create tasks"});
        }
    }catch (error){
        return res.status(400).json("Error creating task")
    }
}

// Function to get all the task listed by the user
async function getTasks(req,res,next){
    try{
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
        }

        // Get the authentication token through Authorazation header
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);

        // Verify the login token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        // Find the user thorough the User ID
        const user=await User.findById(decoded.userID);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        
        // Filter task according to user
        const tasks = await Tasks.find({user: decoded.userID});
        return res.status(200).json(tasks);
    }catch (error){
        if (error === "JsonWebToken"){
            return res.status(400).json({message:"Token not found"});
        }
        return res.status(500).json({message:"Server error"});
    }
    
}

async function updateTask(req,res,next) {
    try{
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
        }

        // Get the authentication token through Authorazation header
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);

        // Verify the login token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        
        const taskID = req.params.id;
        if (!ObjectId.isValid(taskID)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }
        console.log("taskID" , taskID);
        const userID = new ObjectId(decoded.userID);
        console.log("userID", userID);
        
        const task = await Tasks.findOne({ _id: taskID, user: userID });
        if (!task) {
        return res.status(404).json({ message: "Task not found" });
        }
        
        // Get updated fields from request body
        const { taskName, status, dueDate, priority } = req.body;

        // Update only provided fields
        if (taskName) task.taskName = taskName;
        if (status) task.status = status;
        if (dueDate) task.dueDate = dueDate;
        if (priority) task.priority = priority;
        
        await task.save();

        return res.status(200).json({ message: "Task updated successfully", task });
    }catch (error){
        if (error === "JsonWebToken"){
            return res.status(400).json({message:"Token not found"});
        }
        return res.status(500).json({message:"Server error"});
    }
}

async function deleteTask(req,res,next) {
    try{
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing or invalid" });
        }

        // Get the authentication token through Authorazation header
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);

        // Verify the login token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        
        const taskID = req.params.id;
        if (!ObjectId.isValid(taskID)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }
        console.log("taskID" , taskID);
        const userID = new ObjectId(decoded.userID);
        console.log("userID", userID);
        
        const task = await Tasks.findByIdAndDelete({_id: taskID, user: userID});
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task deleted successfully", task });
    }catch (error){
        if (error === "JsonWebToken"){
            return res.status(400).json({message:"Token not found"});
        }
        return res.status(500).json({message:"Server error"});
    }
}
module.exports = {createTasks, getTasks, updateTask, deleteTask}