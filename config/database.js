const mongoose = require("mongoose");

const db = async () => {
  await mongoose.connect("mongodb+srv://hapanimayur:Love1224@cluster0.iyurgqh.mongodb.net/PRO8");
  console.log("Database Connected Successfully");
};

module.exports = db;
