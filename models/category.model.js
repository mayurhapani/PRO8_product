const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
});

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
