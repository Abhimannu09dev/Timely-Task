
const mongoose = require("mongoose");
const Tasks = require("../models/taskModel");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { find } = require("../models/userModel");
const User = require("../models/userModel");

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
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        const user=await User.findById(decoded.userID);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const tasks = await Tasks.find();
        return res.status(200).json(tasks);
    }catch (error){
        if (error === "JsonWebToken"){
            return res.status(400).json({message:"Token not found"});
        }
        return res.status(500).json({message:"Server error"});
    }
    
}

module.exports = {createTasks, getTasks}