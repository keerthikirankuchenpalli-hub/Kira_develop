const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const { connection } = require('mongoose');
const User = require("../models/user");





const USER_SAFE_DATA
= ['_id', 'FirstName', 'LastName', 'age', 'gender', 'photoUrl'];

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
const loggedInUser = req.user;

const connectionRequests = await ConnectionRequest
.find({
    toUserId: loggedInUser._id,
    status: 'interested '
}). populate('fromUserId', ['FirstName' , 'LastName', 'age', 'gender', 'photoUrl']);

res.status(200).json({ requests: connectionRequests });
 } catch (err){
    console.error("Error fetching user requests:", err);
    res.status(500).json({ error: "Internal server error" });
    return;      
    }
    
    res.send("User Request Endpoint");
});


userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
     const loggedInUser = req.user;

     const connectionRequests = await ConnectionRequest
     .find({
        $or: [
            { fromUserId: loggedInUser._id, status: 'accepted' },
            { toUserId: loggedInUser._id, status: 'accepted' }
        ]
     })
        .populate('fromUserId', USER_SAFE_DATA)
        .populate('toUserId', USER_SAFE_DATA);


        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        
        });

     res.json({data });

    }   catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page)|| 1 ;
        let  limit = parseInt(req.query.limit)|| 10;
        limit = limit>50 ? 50 : limit;
        const skip = (page-1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        })
        .select("fromUserId toUserId")
        .populate("fromUserId", "_id FirstName")
        .populate("toUserId", "_id FirstName");

        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((req) => {
            if (req.fromUserId?._id) hideUsersFromFeed.add(req.fromUserId._id.toString());
            if (req.toUserId?._id) hideUsersFromFeed.add(req.toUserId._id.toString());
        });

        const users = await User.find({
            _id: { $nin: [...hideUsersFromFeed, loggedInUser._id.toString()] }
        }).select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        res.json({
            message: "Feed data fetched successfully",
            data: users,
        });

    } catch (err) {
        console.error("❌ FEED ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = userRouter;