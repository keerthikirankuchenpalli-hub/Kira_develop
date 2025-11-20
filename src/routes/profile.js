const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user; // user attached by userAuth middleware
        res.send(user); // Send the user data as response
    } catch (error) {
        console.log("Error retrieving user profile:", error);
        return res.status(500).send("Internal Server Error"); // Return here to avoid sending multiple responses
    }
});


module.exports = profileRouter;