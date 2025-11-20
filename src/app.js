const express = require('express');

const connectDB = require("./config/database");
const app = express();
const UserModel = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');


app.use(express.json());

app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
        res.send("Login successful");

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user; // user attached by userAuth middleware
        res.send(user); // Send the user data as response
    } catch (error) {
        console.log("Error retrieving user profile:", error);
        return res.status(500).send("Internal Server Error"); // Return here to avoid sending multiple responses
    }
});


app.post("/sendConnectionRequest", userAuth, async (req, res) => {
const user = req.user;
    console.log("Sending Connection Request ");

    res.send("Connection Request Sent");

    res.send(user.FirstName + "sent the connection request");
});




connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7272, () => {
  console.log('Server is running on port 7272');
});

})
.catch((err) => {
    console.log("Database connection failed", err);
});

