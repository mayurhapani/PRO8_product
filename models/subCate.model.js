const mongoose = require("mongoose");

const subCateSchema = new mongoose.Schema({
  subCate_name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
});

const subCateModel = mongoose.model("subCat", subCateSchema);

module.exports = subCateModel;
