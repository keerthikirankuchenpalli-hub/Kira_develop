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

app.get("/user", async (req, res) => {
    const UserModelEmail = req.body.Email;
    try {
const User = await UserModel.findOne({Email: UserModelEmail}).exec();
res.send(User);

//           const user = await UserModel.find({Email: req.body.Email });
// if (UserModelEmail.length === 0) {
//     return res.status(404).send("User not found");
// } else {
//           res.send(user)
// }
    } catch (err) {
        res.status(400).send("Error fetching user");
    }
    
});
app.get("/feed", async (req, res) => {
   try {
const UserModelEmail = await UserModel.find({});
res.send(UserModelEmail);
   }
   catch (err) {
        res.status(400).send("Error fetching user");
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

