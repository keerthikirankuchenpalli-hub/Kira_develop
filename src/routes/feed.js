const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json([
      {
        name: "Demo User",
        photoUrl: "https://randomuser.me/api/portraits/men/1.jpg"
      }
    ]);
});


module.exports = router;
