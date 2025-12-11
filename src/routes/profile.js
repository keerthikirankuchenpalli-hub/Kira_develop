const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');
const Usermodel = require("../models/user");

const crypto = require("crypto");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    console.log("SERVER: GET /profile/view - cookies:", req.cookies);
    console.log("SERVER: GET /profile/view - headers.authorization:", req.headers.authorization);
    console.log("SERVER: user attached by middleware:", req.user);
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  } catch (error) {
    console.log("Error retrieving user profile:", error);
    return res.status(500).send("Internal Server Error");
  }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        console.log("PATCH BODY RECEIVED:", req.body);
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid profile data");
        }

        const user = req.user;
        console.log("User before update:", user);
        
        Object.assign(user, req.body);
        await user.save(); // if it's a Mongoose model

        console.log("User after update:", user);

        res.json({ message: `${user.FirstName}, your profile has been updated successfully!`,
        data: user });
    } catch (err) {
        return res.status(400).send("ERROR: " + err.message);
    }
});


profileRouter.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Usermodel.findOne({ email });
        if (!user) return res.status(404).send("User not found");

        // 1️⃣ Generate raw token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // 2️⃣ Hash token and save to DB
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour expiry for testing
        await user.save();

        // 3️⃣ Send raw token to user (here, console for testing)
        console.log(`Reset link for Postman: http://localhost:7272/forgot-password/${resetToken}`);

        res.send("Password reset token generated. Check console for token.");
    } catch (err) {
        console.log("FORGOT PASSWORD ERROR:", err);
        res.status(500).send("Error generating reset token");
    }
});

profileRouter.post("/reset-password/:token", async (req, res) => {
    try {
        const resetToken = req.params.token;
        const newPassword = req.body.password;

        if (!newPassword) return res.status(400).send("Password is required");

        // Hash the token from URL
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Find user with token and check expiry
        const user = await Usermodel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).send("Invalid or expired token");

        // Hash and save new password
        user.Password = await bcrypt.hash(newPassword, 10);

        // Clear token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.send("Password has been updated successfully!");
    } catch (err) {
        console.log("RESET PASSWORD ERROR:", err);
        res.status(500).send("Error resetting password");
    }
});

module.exports = profileRouter;