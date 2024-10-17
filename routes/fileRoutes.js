const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authMiddleware");

router.get("/upload", isAuth, (req, res) => {
  res.render("upload");
});

module.exports = router;
