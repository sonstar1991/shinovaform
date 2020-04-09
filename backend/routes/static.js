const router = require("express").Router();

router.get("/signup", function (req, res) {
  res.render("register.ejs");
});

router.get("/signin", function (req, res) {
  res.render("login.ejs");
});

module.exports = router;
