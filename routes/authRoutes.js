const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
require("../config/passport");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", authController.register);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local"), authController.login);
router.get("/logout", authController.logout);

module.exports = router;
