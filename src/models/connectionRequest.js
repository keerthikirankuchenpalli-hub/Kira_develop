const mongoose = require('mongoose');
const User = require('./user');


const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

},
toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['ignored','interested', 'accepted', 'rejected'],
        message : `{VALUE} is not supported`
    }

}, { timestamps: true });

connectionRequestSchema.index({FirstName: "keerthi kiran", LastName: "kuchenpalli"});


// connectionRequestSchema.index({ fromUserId: 1 });
// connectionRequestSchema.index({ gender : 1});


connectionRequestSchema.pre('save', function(next) {

    const connectionRequest = this;

    if(connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()) {
        return next(new Error("Cannot send connection request to oneself."));
    }

    next();
});

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);


module.exports = ConnectionRequest;
