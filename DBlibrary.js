/** @format */

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

var db = {};

db.connect = function (afterConnect) {
  con.connect(function (err) {
    if (!err) {
      console.log("connected successfully");
      afterConnect();
    }
  });
};

db.createDBIfNotExists = function (databaseName) {
  con.query(
    "CREATE DATABASE IF NOT EXISTS " + databaseName,
    function (err, result) {
      if (!err) console.log("database created");
    }
  );
  con.query(
    "CREATE TABLE IF NOT EXISTS pharmacy.users (id INT AUTO_INCREMENT PRIMARY KEY , full_name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))",
    function (err, result) {
      if (!err) console.log("users table created");
    }
  );
  con.query(
    "CREATE TABLE IF NOT EXISTS pharmacy.customers (id INT AUTO_INCREMENT PRIMARY KEY , full_name VARCHAR(255), email VARCHAR(255), phone_num VARCHAR(15))",
    function (err, result) {
      if (!err) console.log("customers table created");
    }
  );
};

db.registerUser = function (data, userData) {
  var q =
    "INSERT INTO pharmacy.users (full_name,email,password) VALUES (?,?,?)";
  con.query(
    q,
    [data.full_name, data.email, data.password],
    function (err, result) {
      if (!err) {
        var q = "SELECT * FROM pharmacy.users WHERE email=? AND password=?";
        con.query(q, [data.email, data.password], function (err, result) {
          if (!err) {
            userData(result[0]);
          }
        });
      }
    }
  );
};
db.loginUser = function (data, user) {
  var q = "SELECT * FROM pharmacy.users WHERE email=? AND password=?";
  con.query(q, [data.email, data.password], function (err, result) {
    if (!err) {
      user(result[0]);
    }
  });
};

db.getAllCustomer = function (customers) {
  var q = "SELECT * FROM pharmacy.customers WHERE 1";
  con.query(q, function (err, result) {
    if (!err) {
      customers(result);
    }
  });
};
db.createCustomer = function (data, userData) {
  var q =
    "INSERT INTO pharmacy.customers (full_name,email,phone_num) VALUES (?,?,?)";
  con.query(
    q,
    [data.full_name, data.email, data.phone_num],
    function (err, result) {
      if (!err) {
        var q = "SELECT * FROM pharmacy.users WHERE email=? AND phone_num=?";
        con.query(q, [data.email, data.phone_num], function (err, result) {
          if (!err) {
            userData(result[0]);
          }
        });
      }
    }
  );
};

module.exports = db;
