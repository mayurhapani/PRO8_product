const mongoose = require("mongoose");

const subCateSchema = new mongoose.Schema({
  name: String,
  subCate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
});

const subCateModel = mongoose.model("subCat", subCateSchema);

module.exports = subCateModel;
