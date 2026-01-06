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

        const savedUser = await newUser.save();
          const token = await savedUser.getJWT();
      
       res.cookie("token", token, {
    httpOnly: true,
    secure: false,        
    sameSite: "lax",       
    maxAge: 3600000       
});


        res.json({ message: "User created successfully", data: savedUser });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("invalid credentials");
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000
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