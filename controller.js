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
  db.UpdateSupplier(req.body, req.params.id);
  res.redirect("/pharmacy/suppliers");
};

exports.ItemController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getAllItems(function (data) {
      res.layout("items/index", {
        layout: "index",
        title: "Items",
        items: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.ItemShowController = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getItems(req.params.id, function (data) {
      res.layout("items/show", {
        layout: "index",
        title: "Item",
        item: data,
      });
    });
  } else {
    res.redirect("/");
  }
};
exports.CreateItems = (req, res) => {
  if (req.cookies.didlogin == "true") {
    res.layout("items/create", {
      layout: "index",
      title: "create",
    });
  }
};
exports.CreateItemsForm = (req, res) => {
  db.createItems(req.body);
  res.redirect("/pharmacy/items");
};

exports.editItems = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.getItems(req.params.id, function (data) {
      res.layout("items/edit", {
        layout: "index",
        title: "Update",
        items: data,
      });
    });
  }
};
exports.editItemsForm = (req, res) => {
  db.UpdateItems(req.body, req.params.id);
  res.redirect("/pharmacy/items");
};

exports.ItemsDelete = (req, res) => {
  if (req.cookies.didlogin == "true") {
    db.deleteItems(req.params.id);
    res.redirect("/pharmacy/items");
  } else {
    res.redirect("/");
  }
};
