var express = require("express");
var app = express();
var fs = require("fs");
var db = require("./myDb.js");
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

// Authentication
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

// user
exports.UsersController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getAllUsers(function (data) {
      res.layout("user/index", {
        layout: "index",
        title: "customer",
        users: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.UsersShowController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getUser(req.params.id, function (data) {
      res.layout("user/show", {
        layout: "index",
        title: data.full_name,
        user: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.UserDelete = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.deleteUser(req.params.id);
    res.redirect("/pharmacy/users");
  } else {
    res.redirect("/");
  }
};
exports.createUser = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.layout("user/create", {
      layout: "index",
      title: "create",
    });
  }
};
exports.createUserForm = (req, res) => {
  db.createUser(req.body);
  res.redirect("/pharmacy/users");
};
exports.editUser = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getUser(req.params.id, function (data) {
      res.layout("user/edit", {
        layout: "index",
        title: data.full_name,
        user: data,
      });
    });
  }
};
exports.editUserForm = (req, res) => {
  console.log(req.params.id);
  db.updateUser(req.body, req.params.id);
  res.redirect("/pharmacy/users");
};

// customer
exports.CustomersController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getAllCustomer(function (data) {
      res.layout("customer/index", {
        layout: "index",
        title: "customer",
        customers: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.CustomersShowController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getCustomer(req.params.id, function (data) {
      res.layout("customer/show", {
        layout: "index",
        title: data.full_name,
        customer: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.CustomersDelete = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.deleteCustomer(req.params.id);
    res.redirect("/pharmacy/customers");
  } else {
    res.redirect("/");
  }
};
exports.createCustomer = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.layout("customer/create", {
      layout: "index",
      title: "create",
    });
  }
};
exports.createCustomerForm = (req, res) => {
  db.createCustomer(req.body);
  res.redirect("/pharmacy/customers");
};

exports.editCustomer = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getCustomer(req.params.id, function (data) {
      res.layout("customer/edit", {
        layout: "index",
        title: data.full_name,
        customer: data,
      });
    });
  }
};
exports.editCustomerForm = (req, res) => {
  console.log(req.params.id);
  db.updateCustomer(req.body, req.params.id);
  res.redirect("/pharmacy/customers");
};
// supplier
exports.SupplierController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getAllSuppliers(function (data) {
      res.layout("supplier/index", {
        layout: "index",
        title: "supplier",
        suppliers: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.SupplierShowController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getSupplier(req.params.id, function (data) {
      res.layout("supplier/show", {
        layout: "index",
        title: data.full_name,
        supplier: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.SupplierDelete = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.deleteSupplier(req.params.id);
    res.redirect("/pharmacy/suppliers");
  } else {
    res.redirect("/");
  }
};
exports.CreateSupplier = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.layout("supplier/create", {
      layout: "index",
      title: "create",
    });
  }
};
exports.CreateSupplierForm = (req, res) => {
  db.createSupplier(req.body);
  res.redirect("/pharmacy/suppliers");
};

exports.editSupplier = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getSupplier(req.params.id, function (data) {
      res.layout("supplier/edit", {
        layout: "index",
        title: data.full_name,
        supplier: data,
      });
    });
  }
};
exports.editSupplierForm = (req, res) => {
  console.log(req.params.id);
  db.UpdateSupplier(req.body, req.params.id);
  res.redirect("/pharmacy/suppliers");
};

exports.CategoryController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getAllCategory(function (data) {
      res.layout("category/index", {
        layout: "index",
        title: "category",
        category: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.CategoryShowController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getCategory(req.params.id, function (data) {
      res.layout("category/show", {
        layout: "index",
        title: "category",
        category: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.CategoryDelete = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.deleteCategory(req.params.id);
    res.redirect("/pharmacy/category");
  } else {
    res.redirect("/");
  }
};
exports.CreateCategory = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.layout("category/create", {
      layout: "index",
      title: "category",
    });
  }
};
exports.CreateCategoryForm = (req, res) => {
  db.createCategory(req.body);
  res.redirect("/pharmacy/category");
};

exports.editCategory = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getCategory(req.params.id, function (data) {
      res.layout("category/edit", {
        layout: "index",
        title: "category",
        category: data,
      });
    });
  }
};
exports.updateCategoryForm = (req, res) => {
  db.updateCategory(req.body, req.params.id);
  res.redirect("/pharmacy/category");
};
