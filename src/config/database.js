const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://kuchenkiran_db_user:l266H3HEo3GC6Jzv@cluster0.jqws8au.mongodb.net/kiraDev");
};

module.exports = connectDB;


