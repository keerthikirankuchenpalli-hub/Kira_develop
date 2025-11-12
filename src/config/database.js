const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://kuchenkiran_db_user:qjTqSdu9SuUKcgUH@cluster0.jqws8au.mongodb.net/kiraDev");
};

module.exports = connectDB;


