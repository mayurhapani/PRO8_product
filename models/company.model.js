const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company_name: String,
  subCat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCat",
  },
});

const companyModel = mongoose.model("company", companySchema);

module.exports = companyModel;
