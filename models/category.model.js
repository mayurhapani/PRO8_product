const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  cate_name: String,
});

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
