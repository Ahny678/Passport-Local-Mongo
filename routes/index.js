var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount += 1;
  } else {
    req.session.viewCount = 1;
  }
  console.log(req.session);
  res.render("index", { title: "Express", count: req.session.viewCount });
});

router.get("/login", indexController.getLoginPage);
router.get("/register", indexController.getRegisterPage);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/",
  })
);
router.post("/register", indexController.postRegisterPage);
router.get("/logout", indexController.getLogoutPage);
router.get(
  "/special-route",
  indexController.Auther,
  indexController.specialPage
);
router.get("/admin-route", indexController.adminPage);

module.exports = router;
