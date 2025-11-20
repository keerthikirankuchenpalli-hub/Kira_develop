const jwt = require('jsonwebtoken');
const Usermodel = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("Unauthorized: No token provided"); // Return here
        }

        const decodedObj = await jwt.verify(token, "kira@dev$2025");

        const { userId } = decodedObj;

        const user = await Usermodel.findById(userId).select("-Password");

        if (!user) {
            return res.status(401).send("Unauthorized: User not found"); // Return here
        }

        req.user = user; // Attach user to request object
        next(); // Continue to next middleware or route handler
    } catch (error) {
        console.log("Error in userAuth middleware:", error); // Log the error for debugging
        return res.status(401).send("Unauthorized: Invalid or expired token"); // Return here
    }
};

module.exports = { userAuth };

