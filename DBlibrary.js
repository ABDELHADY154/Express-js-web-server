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
    "CREATE TABLE IF NOT EXISTS pharmacy.users (id INT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))",
    function (err, result) {
      if (!err) console.log("users table created");
    },
  );
};

// db.createDBAndTables = function () {
// con.query(
//   "CREATE TABLE IF NOT EXISTS SOUQ.users (id INT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))",
//   function (err, result) {
//     if (!err) console.log("users table created");
//   },
// );

// con.query(
//   "INSERT INTO SOUQ.employees (id,name,age,city) values (1,'ahmed',31,'alexandria')",
//   function (err, result) {
//     if (!err) console.log("data Inserted");
//   },
// );
// };

/////////////////////////////////////
db.deleteLastChar = function (str) {
  return str.substr(0, str.length - 1);
};

db.insert = function (tableName, data) {
  var sql =
    "CREATE TABLE IF NOT EXISTS " +
    tableName +
    " (id  INT PRIMARY KEY AUTO_INCREMENT,";
  var sqlColumns = "";
  var sqlQuestionMarks = "";
  var valuesArray = [];
  for (var prop in data) {
    if (prop == "id") continue;
    if (!isNaN(data[prop])) data[prop] = Number(data[prop]);

    switch (typeof data[prop]) {
      case "number":
        sql += prop + " INT ,";
        break;
      case "string":
        sql += prop + " VARCHAR(300) ,";
        break;
      case "object":
        break;
    }
    sqlColumns += prop + ",";
    sqlQuestionMarks += "?,";
    valuesArray.push(data[prop]);
  }
  sql = db.deleteLastChar(sql);
  sqlColumns = db.deleteLastChar(sqlColumns);
  sqlQuestionMarks = db.deleteLastChar(sqlQuestionMarks);
  sql += ")";
  con.query(sql, null, function (error, result) {
    if (!error) {
      console.log("table created");
      var sqlInsert =
        "INSERT INTO " +
        tableName +
        "(" +
        sqlColumns +
        ") values (" +
        sqlQuestionMarks +
        ")";
      con.query(sqlInsert, valuesArray, function (error2, result) {
        if (!error2) {
          console.log("data inserted");
        } else {
          console.log(error2);
        }
      });
    } else {
      console.log(error);
    }
  });
};

db.update = function (tableName, data) {
  //Update SOUQ.employees set name=? , age=?, city=? where id=?
  var sql = "Update " + tableName + " set ";
  var valuesArray = [];
  for (var prop in data) {
    if (prop == "id") continue;

    if (!isNaN(data[prop])) data[prop] = Number(data[prop]);

    sql += prop + "=?,";
    valuesArray.push(data[prop]);
  }
  sql = db.deleteLastChar(sql);
  sql += " where id=?";
  valuesArray.push(data.id);
  console.log(sql);
  console.log(data.id);
  con.query(sql, valuesArray, function (err, result) {
    if (!err) console.log("item updated " + data.id);
    else console.log(err);
  });
};

db.select = function (tableName, id, afterselect) {
  con.query(
    "Select * from " + tableName + " where id=?",
    [id],
    function (err, result) {
      if (!err) {
        console.log("item selected " + id, result);
        if (result.length > 0) afterselect(result[0]);
        else afterselect(null);
      }
    },
  );
};

db.selectAll = function (tableName, afterselect) {
  con.query("Select * from " + tableName + " ", null, function (err, result) {
    if (!err) {
      console.log("items selected ", result);
      afterselect(result);
    } else {
      afterselect([]);
    }
  });
};

module.exports = db;
