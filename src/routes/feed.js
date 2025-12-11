const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json([
      {
        name: "Demo User",
        photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        about: "This is a demo user profile.",
        skills: ["JavaScript", "Node.js", "Express", "MongoDB"],
      }
    ]);
});


module.exports = router;
