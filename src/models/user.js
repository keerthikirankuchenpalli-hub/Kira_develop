const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    FirstName :  
    { type: String, 
        required: true,
        minLength : 5,
        maxLength : 20,
    },
    LastName :  
    { type: String, 
    },
    Email :  
    { type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    Password :  
    { type: String,
        required: true,
    },
    age : 
    { type: Number,
        min: 18,
        max: 65,
    },
    gender :
    { type: String,
        Validate(value) {
            if(!
                ["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid");
            } }
        
      },        
    photoUrl :{
        type: String,
        default : "https://www.vecteezy.com/vector-art/45944199-male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration"
    },
    about : {
        type: String,
        default : "This is a default about of user!"
    },
    skills : {
        type: [String],
        Validate(value) {
            if(value.length > 5){
                throw new Error("Skills count exceeds the limit");
            }
    },
},
},
    {
    timestamps : true,
    }

);


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
