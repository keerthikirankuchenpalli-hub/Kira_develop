const express = require('express');

const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const Usermodel = require("../models/user");

// requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
// const user = req.user;
//     console.log("Sending Connection Request ");

//     res.send("Connection Request Sent");

//     res.send(user.FirstName + "sent the connection request");
// });

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
 try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ['ignored','interested', 'accepted', 'rejected'];
      if (!allowedStatus.includes(status)) {
         return res
         .status(400)
         .json({ error: 'Invalid status type.' + status });
      }

   

      const toUser = await Usermodel.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: 'Recipient user not found.' });
      }

     const existingRequest = await ConnectionRequest.findOne({
    $or: [ 
        { fromUserId, toUserId },
        { toUserId: fromUserId, fromUserId: toUserId },
    ]
});
if (existingRequest) {  // Check if the request already exists
    return res
    .status(400)
    .json({ message: 'Connection request already exists between these users.' });
}


   const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    });

   const data = await connectionRequest.save();      

    res.status(201).send({
         message: req.user.FirstName+"is" + status + "in" + toUser.FirstName,
        data,
    });

 } catch (error) {
    res.status(500).send({ error: error.message });
 }
});

module.exports = requestRouter;


