const express = require('express');

const connectDB = require("./config/database");
const app = express();
const UserModel = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");


app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        // 1. Validate incoming data
        validateSignUpData(req);

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);        

        // 3. Create user
        const newUser = new UserModel({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: hashedPassword,
            age: req.body.age,
            gender: req.body.gender,
            photoUrl: req.body.photoUrl,
            about: req.body.about,
            skills: req.body.skills
        });

        await newUser.save();

        res.status(201).send("User created successfully");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // 1. Find user by email
        const user = await UserModel.findOne({ Email });

        if (!user) {
            throw new Error("invalid credentials");
        }

        // 2. Compare password
        const isPasswordValid = await bcrypt.compare(Password, user.Password);

        if (!isPasswordValid) {
            throw new Error("invalid credentials");
        }

        res.send("Login successful");

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
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

app.delete("/user/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send("User deleted successfully");

    } catch (err) {
        res.status(500).send("SOMETHING WENT WRONG");
    }
});


app.patch("/user/:id", async (req, res) => {
    const userId = req.params?.id;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "FirstName",
            "LastName",
            "Password",
            "age",
            "skills",
            "gender",
            "photoUrl"
        ];

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        if (data?.skills && data.skills.length > 5) {
            throw new Error("Skills count exceeds the limit");
        }

        const user = await UserModel.findByIdAndUpdate(
            userId,
            data,
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        res.status(200).send({
            message: "User updated successfully",
            user
        });

    } catch (err) {
        console.error(err);
        res.status(400).send({ error: "Update failed: " + err.message });
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

