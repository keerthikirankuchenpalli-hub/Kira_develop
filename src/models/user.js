const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName :  
    { type: String, 
    },
    LastName :  
    { type: String, 
    },
    Email :  
    { type: String,
    },
    Password :  
    { type: String,
    },
    age : 
    { type: Number,
    },
    gender :
    { type: String,
    },        
});


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

