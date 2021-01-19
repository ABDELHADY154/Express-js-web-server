var express = require("express");
var app = express();
var bodyParser = require("body-parser");
bodyParser = bodyParser.urlencoded({ extended: false });
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var controller = require("./controller");
app.set("view engine", "ejs");
app.use(require("ejs-yield"));

app.get("/", function (req, res) {
  controller.LandingPageController(req, res);
});
app.get("/login", function (req, res) {
  controller.LoginController(req, res);
});
app.get("/register", function (req, res) {
  controller.RegisterController(req, res);
});

// fallback route
app.get("*", function (req, res) {
  res.send("page not found");
});
app.listen(3000);
