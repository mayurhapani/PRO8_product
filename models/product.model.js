const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  proname: String,
  disc: String,
  price: Number,
  discount: Number,
  image: Buffer,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  subCat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCat",
  },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
