/** @format */

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
    fs.readFile("users.json", function (err, data) {
      if (err) return console.log(err);
      if (data) {
        res.layout("home", {
          layout: "index",
          title: "Home",
          user: JSON.parse(data),
        });
      }
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
      layout: "authIndex",
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
      layout: "authIndex",
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
      layout: "authIndex",
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
          layout: "authIndex",
          title: "Login",
          error: "wrong email or password",
        });
      }
    });
  } else {
    res.layout("login", {
      layout: "authIndex",
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
exports.CustomersController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getAllCustomer(function (data) {
      res.layout("customer/index", {
        layout: "index",
        title: "customer",
        customers: data,
      });
    });
  }
};

exports.createCustomer = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.createCustomer(function (data) {
      res.layout("customer/edit", {
        layout: "index",
        title: "customer create",
        customers: data,
      });
    });
  }
};
exports.createCustomer;
