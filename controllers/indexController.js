var express = require("express");
const genPassword = require("../lib/passwordUtils").genPassword;
const User = require("../models/user");

exports.getLoginPage = (req, res) => {
  res.render("login");
};

exports.postLoginPage = (req, res) => {};

exports.getRegisterPage = (req, res) => {
  res.render("register");
};

exports.postRegisterPage = (req, res) => {
  const { salt, hash } = genPassword(req.body.password);
  const user = new User({
    username: req.body.username,
    salt: salt,
    hash: hash,
    admin: true,
  });
  console.log(user);

  user
    .save()
    .then(() => res.send("User registered successfully"))
    .catch((err) => res.status(500).send(err.message));
  //console.log(user);
};

exports.getLogoutPage = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.render("logout");
  });
};

exports.specialPage = (req, res) => {
  res.send("You made it to the special page");
};
exports.adminPage = (req, res) => {
  if (req.isAuthenticated() && req.user.admin) {
    res.send("You are an admin");
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized access. You are nlt an admin" });
  }
};

exports.Auther = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to view this page" });
  }
};
