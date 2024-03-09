"use strict";
var mongoose = require("mongoose");

var database = (function () {
  var conn = null,
    init = function () {
      const dbHost = process.env.MONGO_SERVER;
      const dbUser = process.env.MONGO_INITDB_ROOT_USERNAME;
      const dbPass = process.env.MONGO_INITDB_ROOT_PASSWORD;
      const dbDatabase = process.env.MONGO_DB;
      console.log(
        "Trying to connect to " +
          dbHost +
          "/" +
          dbDatabase +
          " MongoDB database"
      );
      var options = {
        promiseLibrary: global.Promise,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      const connString = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbDatabase}`;
      mongoose.connect(connString, options);
      const conn = mongoose.connection;
      conn.on("error", console.error.bind(console, "connection error:"));
      conn.once("open", function () {
        console.log("db connection open");
      });
      return conn;
    },
    close = function () {
      if (conn) {
        conn.close(function () {
          console.log(
            "Mongoose default connection disconnected through app termination"
          );
          process.exit(0);
        });
      }
    };

  return {
    init: init,
    close: close,
  };
})();

module.exports = database;
