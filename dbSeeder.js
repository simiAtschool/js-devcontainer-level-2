"use strict";
var dataInitializer = require("./lib/dataSeeder"),
  db = require("./lib/database");

db.init();

console.log("Initializing Data");
dataInitializer.initializeData(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Data Initialized!");
  }
});
