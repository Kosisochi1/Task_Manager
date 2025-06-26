const mongoose = require("mongoose");
require("dotenv").config();

const connect = async (url) => {
  // connecting to database with database url
  mongoose.connect(url || process.env.DB_URL);

  //successul connection
  mongoose.connection.on("connected", () => {
    console.log("Connected to Database Successfully");
  });

  // failed connection
  mongoose.connection.on("error", (err) => {
    console.log(`Connection failed with ${err}`);
  });
};
module.exports = {
  connect,
};
