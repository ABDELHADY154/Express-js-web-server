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
<<<<<<< HEAD
=======
// Authentication
>>>>>>> main
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
<<<<<<< HEAD
});

app.get("/logout", function (req, res) {
  controller.logoutController(req, res);
});

=======
});
app.get("/logout", function (req, res) {
  controller.logoutController(req, res);
});

//Users
app.get("/pharmacy/users", function (req, res) {
  controller.UsersController(req, res);
});
app.get("/pharmacy/users/show/:id", function (req, res) {
  controller.UsersShowController(req, res);
});
app.get("/pharmacy/users/delete/:id", function (req, res) {
  controller.UserDelete(req, res);
});
app.get("/pharmacy/users/create", function (req, res) {
  controller.createUser(req, res);
});
app.post("/pharmacy/users/createForm", bodyParser, function (req, res) {
  controller.createUserForm(req, res);
});
app.get("/pharmacy/users/edit/:id", function (req, res) {
  controller.editUser(req, res);
});
app.post("/pharmacy/users/editForm/:id", bodyParser, function (req, res) {
  controller.editUserForm(req, res);
});

// Customers
>>>>>>> main
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

<<<<<<< HEAD
=======
// suppliers
>>>>>>> main
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

<<<<<<< HEAD
app.get("/pharmacy/items", function (req, res) {
  controller.ItemController(req, res);
=======
// category
app.get("/pharmacy/category", function (req, res) {
  controller.CategoryController(req, res);
});
app.get("/pharmacy/category/show/:id", function (req, res) {
  controller.CategoryShowController(req, res);
});
app.get("/pharmacy/category/delete/:id", function (req, res) {
  controller.CategoryDelete(req, res);
});
app.get("/pharmacy/category/create", function (req, res) {
  controller.CreateCategory(req, res);
});
app.post("/pharmacy/category/createForm", bodyParser, function (req, res) {
  controller.CreateCategoryForm(req, res);
});
app.get("/pharmacy/category/edit/:id", function (req, res) {
  controller.editCategory(req, res);
});
app.post("/pharmacy/category/editForm/:id", bodyParser, function (req, res) {
  controller.updateCategoryForm(req, res);
>>>>>>> main
});
app.get("/pharmacy/items/show/:id", function (req, res) {
  controller.ItemShowController(req, res);
});
app.get("/pharmacy/items/create", function (req, res) {
  controller.CreateItems(req, res);
});
app.post("/pharmacy/items/createForm", bodyParser, function (req, res) {
  controller.CreateItemsForm(req, res);
});

app.get("/pharmacy/items/edit/:id", function (req, res) {
  controller.editItems(req, res);
});
app.post("/pharmacy/items/editForm/:id", bodyParser, function (req, res) {
  controller.editItemsForm(req, res);
});

app.get("/pharmacy/items/delete/:id", function (req, res) {
  controller.ItemsDelete(req, res);
});

// fallback route
app.get("*", function (req, res) {
  res.send("page not found");
});
<<<<<<< HEAD
=======

>>>>>>> main
app.listen(3000);
