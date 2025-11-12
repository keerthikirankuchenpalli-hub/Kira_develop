const express = require('express');

const connectDB = require("./config/database");
const app = express();
const UserModel = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
console.log(req.body);

const newUser = new UserModel(req.body);
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

