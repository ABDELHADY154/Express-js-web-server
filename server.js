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
app.get("/pharmacy", function (req, res) {
  controller.HomeController(req, res);
});
app.get("/login", function (req, res) {
  controller.LoginController(req, res);
});
app.get("/register", function (req, res) {
  controller.RegisterController(req, res);
});
app.post("/registerUser", bodyParser, function (req, res) {
  controller.RegisterFormController(req, res);
});
app.post("/loginUser", bodyParser, function (req, res) {
  controller.LoginFormController(req, res);
});

app.get("/logout", function (req, res) {
  controller.logoutController(req, res);
});

app.get("/pharmacy/customers", function (req, res) {
  controller.CustomersController(req, res);
});
app.get("/pharmacy/customers/show/:id", function (req, res) {
  controller.CustomersShowController(req, res);
});
app.get("/pharmacy/customers/delete/:id", function (req, res) {
  controller.CustomersDelete(req, res);
});
app.get("/pharmacy/customers/create", function (req, res) {
  controller.createCustomer(req, res);
});
app.post("/pharmacy/customers/createForm", bodyParser, function (req, res) {
  controller.createCustomerForm(req, res);
});
app.get("/pharmacy/customers/edit/:id", function (req, res) {
  controller.editCustomer(req, res);
});
app.post("/pharmacy/customers/editForm/:id", bodyParser, function (req, res) {
  controller.editCustomerForm(req, res);
});

app.get("/pharmacy/suppliers", function (req, res) {
  controller.SupplierController(req, res);
});
app.get("/pharmacy/suppliers/show/:id", function (req, res) {
  controller.SupplierShowController(req, res);
});
app.get("/pharmacy/suppliers/delete/:id", function (req, res) {
  controller.SupplierDelete(req, res);
});
app.get("/pharmacy/suppliers/create", function (req, res) {
  controller.CreateSupplier(req, res);
});
app.post("/pharmacy/suppliers/createForm", bodyParser, function (req, res) {
  controller.CreateSupplierForm(req, res);
});
app.get("/pharmacy/suppliers/edit/:id", function (req, res) {
  controller.editSupplier(req, res);
});
app.post("/pharmacy/suppliers/editForm/:id", bodyParser, function (req, res) {
  controller.editSupplierForm(req, res);
});

app.get("/pharmacy/items", function (req, res) {
  controller.ItemController(req, res);
});
// fallback route
app.get("*", function (req, res) {
  res.send("page not found");
});
app.listen(3000);
