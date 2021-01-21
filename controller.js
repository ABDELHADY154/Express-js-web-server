var express = require("express");
var app = express();
var fs = require("fs");
var db = require("./DBlibrary.js");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
db.connect(function () {
  db.createDBIfNotExists("pharmacy");
});
exports.LandingPageController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.redirect("/pharmacy");
  } else {
    res.redirect("/login");
  }
};
exports.HomeController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.layout("home", {
      layout: "index",
      title: "Home",
      error: "",
    });
  } else {
    res.redirect("/");
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

exports.RegisterFormController = (req, res) => {
  if (req.body.fullName && req.body.email && req.body.password) {
    res.cookie("didlogin", "true");
    var user = {
      full_name: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    };
    db.registerUser(user, function (userData) {
      if (userData) {
        fs.writeFile("users.json", JSON.stringify(userData), function (err) {
          if (err) return console.log(err);
        });
      }
    });
    res.redirect("/pharmacy");
  } else {
    res.layout("register", {
      layout: "index",
      title: "Register",
      error: "enter a valid data",
    });
  }
};

exports.LoginFormController = (req, res) => {
  if (req.body.email && req.body.password) {
    var user = {
      email: req.body.email,
      password: req.body.password,
    };
    db.loginUser(user, function (userData) {
      if (userData) {
        res.cookie("didlogin", "true");
        fs.writeFile("users.json", JSON.stringify(userData), function (err) {
          if (err) return console.log(err);
        });
        res.redirect("/pharmacy");
      } else {
        res.layout("login", {
          layout: "index",
          title: "Login",
          error: "wrong email or password",
        });
      }
    });
  } else {
    res.layout("login", {
      layout: "index",
      title: "login",
      error: "enter a valid data",
    });
  }
};

exports.logoutController = (req, res) => {
  res.cookie("didlogin", "false");
  var user = {};
  fs.writeFile("users.json", JSON.stringify(user), function (err) {
    if (err) return console.log(err);
  });
  res.redirect("/");
};
