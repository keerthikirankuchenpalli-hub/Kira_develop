const express = require('express');

const connectDB = require("./config/database");
const app = express();
const UserModel = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    FirstName: "Keerthi kiran",
    LastName: "Kuchenpalli",
    Email: "kuchen.kiran@gmail.com",
    Password: "securepassword",
    age: 28,
    gender: "Male"
  }
 const newUser = new UserModel(userObj);
try {
 await newUser.save();
 res.status(201).send("User created successfully");
} catch (err) {
  res.status(400).send("Error creating user");
}
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7272, () => {
  console.log('Server is running on port 7272');
});

})
.catch((err) => {
    console.log("Database connection failed", err);
});

