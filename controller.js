var express = require("express");
var app = express();

var db = require("./DBlibrary.js");
db.connect(function () {
  db.createDBIfNotExists("pharmacy");
});
var cookieParser = require("cookie-parser");
app.use(cookieParser());
exports.LandingPageController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/home");
  } else {
    res.cookie("didlogin", "false");
    res.redirect("/login");
  }
};

exports.LoginController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/");
  } else {
    res.layout("login", {
      layout: "index",
      title: "Login",
      error: "",
    });
  }
};

exports.RegisterController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/");
  } else {
    res.layout("register", {
      layout: "index",
      title: "Register",
      error: "",
    });
  }
};

exports.logoutController = (req, res) => {
  res.cookie("didlogin", "false");
  res.redirect("/");
};
