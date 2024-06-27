const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  subCate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCate",
  },
});

const companyModel = mongoose.model("company", companySchema);

module.exports = companyModel;
