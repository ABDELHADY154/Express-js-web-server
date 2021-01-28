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
    },
  );
  con.query(
    "CREATE TABLE IF NOT EXISTS pharmacy.users (id INT AUTO_INCREMENT PRIMARY KEY , full_name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))",
    function (err, result) {
      if (!err) console.log("users table created");
    },
  );
  con.query(
    "CREATE TABLE IF NOT EXISTS pharmacy.customers (id INT AUTO_INCREMENT PRIMARY KEY , full_name VARCHAR(255), email VARCHAR(255), phone_num VARCHAR(15))",
    function (err, result) {
      if (!err) console.log("customers table created");
    },
  );
  con.query(
    "CREATE TABLE IF NOT EXISTS pharmacy.suppliers (id INT AUTO_INCREMENT PRIMARY KEY , full_name VARCHAR(255), email VARCHAR(255), phone_num VARCHAR(15))",
    function (err, result) {
      if (!err) console.log("suppliers table created");
    },
  );
  con.query(
    "CREATE TABLE IF NOT EXISTS pharmacy.category (id INT AUTO_INCREMENT PRIMARY KEY , name VARCHAR(255), description VARCHAR(255))",
    function (err, result) {
      if (!err) console.log("category table created");
    },
  );
};

// Authentication
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
    },
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

// users
db.getAllUsers = function (users) {
  var q = "SELECT * FROM pharmacy.users WHERE 1";
  con.query(q, function (err, result) {
    if (!err) {
      users(result);
    }
  });
};

db.getUser = function (id, getData) {
  var q = "SELECT * FROM pharmacy.users WHERE id=?";
  con.query(q, [id], function (err, result) {
    if (!err) {
      getData(result[0]);
    }
  });
};

db.deleteUser = function (id) {
  var q = "DELETE FROM pharmacy.users WHERE id=?";
  con.query(q, [id], function (err, result) {
    if (err) {
      console.log(err);
    }
  });
};

db.createUser = function (data) {
  var q =
    "INSERT INTO pharmacy.users (full_name,email,password) VALUES (?,?,?)";
  con.query(
    q,
    [data.full_name, data.email, data.password],
    function (err, result) {
      if (!err) {
        console.log(result);
      } else {
        console.log(err);
      }
    },
  );
};
db.updateUser = function (data, id) {
  var q =
    "UPDATE pharmacy.users SET id=?,full_name=?,email=?,password=? WHERE id=?";
  con.query(
    q,
    [id, data.full_name, data.email, data.password, id],
    function (err, result) {
      if (err) {
        console.log(err);
      }
    },
  );
};
// customers
db.getAllCustomer = function (customers) {
  var q = "SELECT * FROM pharmacy.customers WHERE 1";
  con.query(q, function (err, result) {
    if (!err) {
      customers(result);
    }
  });
};

db.getCustomer = function (id, getData) {
  var q = "SELECT * FROM pharmacy.customers WHERE id=?";
  con.query(q, [id], function (err, result) {
    if (!err) {
      getData(result[0]);
    }
  });
};

db.deleteCustomer = function (id) {
  var q = "DELETE FROM pharmacy.customers WHERE id=?";
  con.query(q, [id], function (err, result) {
    if (!err) {
      console.log(result);
    }
  });
};

db.createCustomer = function (data) {
  var q =
    "INSERT INTO pharmacy.customers (full_name,email,phone_num) VALUES (?,?,?)";
  con.query(
    q,
    [data.full_name, data.email, data.phone_num],
    function (err, result) {
      if (!err) {
        console.log(result);
      } else {
        console.log(err);
      }
    },
  );
};
db.updateCustomer = function (data, id) {
  var q =
    "UPDATE pharmacy.customers SET id=?,full_name=?,email=?,phone_num=? WHERE id=?";
  con.query(
    q,
    [id, data.full_name, data.email, data.phone_num, id],
    function (err, result) {
      if (!err) {
        console.log(result);
      } else {
        console.log(err);
      }
    },
  );
};
db.getAllSuppliers = function (customers) {
  var q = "SELECT * FROM pharmacy.suppliers WHERE 1";
  con.query(q, function (err, result) {
    if (!err) {
      customers(result);
    }
  });
};

db.getSupplier = function (id, getData) {
  var q = "SELECT * FROM pharmacy.suppliers WHERE id=?";
  con.query(q, [id], function (err, result) {
    if (!err) {
      getData(result[0]);
    }
  });
};

db.deleteSupplier = function (id) {
  var q = "DELETE FROM pharmacy.suppliers WHERE id=?";
  con.query(q, [id], function (err, result) {
    if (err) {
      console.log(err);
    }
  });
};

db.createSupplier = function (data) {
  var q =
    "INSERT INTO pharmacy.suppliers (full_name,email,phone_num) VALUES (?,?,?)";
  con.query(
    q,
    [data.full_name, data.email, data.phone_num],
    function (err, result) {
      if (err) {
        console.log(err);
      }
    },
  );
};
db.UpdateSupplier = function (data, id) {
  var q =
    "UPDATE pharmacy.suppliers SET id=?,full_name=?,email=?,phone_num=? WHERE id=?";
  con.query(
    q,
    [id, data.full_name, data.email, data.phone_num, id],
    function (err, result) {
      if (err) {
        console.log(err);
      }
    },
  );
};

db.getAllCategory = function (category) {
  var q = "SELECT * FROM pharmacy.category WHERE 1";
  con.query(q, function (err, result) {
    if (!err) {
      category(result);
    }
  });
};
db.getCategory = function (id, getData) {
  var q = "SELECT * FROM pharmacy.category  WHERE id=?";
  con.query(q, [id], function (err, result) {
    if (!err) {
      getData(result[0]);
    }
  });
};
db.deleteCategory = function (id) {
  var q = "DELETE FROM pharmacy.category WHERE id=?";
  con.query(q, [id], function (err, result) {
    if (!err) {
      console.log(result);
    }
  });
};

db.createCategory = function (data) {
  var q = "INSERT INTO pharmacy.category (name,description) VALUES (?,?)";
  con.query(q, [data.name, data.description], function (err, result) {
    if (!err) {
      console.log(result);
    } else {
      console.log(err);
    }
  });
};
db.updateCategory = function (data, id) {
  var q = "UPDATE pharmacy.category SET id=?,name=?,description=? WHERE id=?";
  con.query(q, [id, data.name, data.description, id], function (err, result) {
    if (!err) {
      console.log(result);
    } else {
      console.log(err);
    }
  });
};
module.exports = db;
