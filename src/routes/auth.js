const express = require('express');
const authRouter = express.Router();

const {validateSignUpData} = require("../utils/validation");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
        // 1. Validate incoming data
        validateSignUpData(req);

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);        

        // 3. Create user
        const newUser = new UserModel({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: hashedPassword,
            age: req.body.age,
            gender: req.body.gender,
            photoUrl: req.body.photoUrl,
            about: req.body.about,
            skills: req.body.skills
        });

        await newUser.save();

        res.status(201).send("User created successfully");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // 1. Find user by email
        // console.log("Login attempt for email:", Email);
        const user = await UserModel.findOne({ Email });
        // console.log("User found:", user);

        if (!user) {
            throw new Error("invalid credentials");
        }

        // 2. Compare password
        const isPasswordValid = await user.validatePassword(Password);
        // console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {

            throw new Error("invalid credentials");
            
        }
        const token = await user.getJWT();
      
        // console.log("Generated Token:", token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            maxAge: 3600000 // 1 hour
        });
        res.send(user);

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
res.cookie("token", null,{
    expires: new Date(Date.now())

});
res.send("Logged out successfully");
});

 




module.exports = authRouter;