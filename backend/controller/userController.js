const bcrypt = require('bcrypt')
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

// Function to create user
async function createUser(req, res, next){
    try{
        const {name, email, password} = req.body;

        // validation of data through backend
        if(!name || !name.trim()){
            return res.status(400).json({error: 'Name is required'});
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({error: 'Email is required'});
        }
        if(!password || password.length <6){
            return res.status(400).json({error: 'Password must be at least 6 characters'})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({name, email, password:hashedPassword});
        await user.save();
        res.status(201).json({
            message: "User Created",
            user,
        })
    }catch (error){
        console.error("Error creating user");
        return res.status(400).json({error: "The "})
    }
}


// Function to login the user
async function loginUser(req,res,next) {
    try{
        const {email,password} = req.body;
            // validation of data through backend
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                return res.status(400).json({error: 'Email is required'});
            }
            if(!password || password.length <6){
                return res.status(400).json({error: 'Password must be at least 6 characters'});
            }
        
    
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: 'Email not found'});
        }
        // Check if the password is valid or not
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(401).json({error: 'Mismatched password'});
        }

        const userDetails = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };
        
        const payload = {userID: user._id};
        console.log(payload);

        const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: "1h"
            });
            
        res.status(200).json({
            message: 'Login successfull',
            token: token,
            user: userDetails,
        });

    }catch (error){
        console.error('Error logging in');
        res.status(500).json({error: 'Failed to log in. Please try again!'});

    }
}
module.exports = {
    createUser,
    loginUser
}
