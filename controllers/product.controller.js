const categoryModel = require("../models/category.model");
const subCateModel = require("../models/subCate.model");
const productModel = require("../models/product.model");

const myPost = async (req, res) => {
  res.render("myblogs");
};

const addCatepage = async (req, res) => {
  try {
    const user = req.user;
    res.render("addCate", { user });
  } catch (error) {
    console.log(error);
  }
};
const addCate = async (req, res) => {
  try {
    const { cate_name } = req.body;
    await categoryModel.create({ cate_name });

    req.flash("flashMsg", "categoryAdded");
    res.redirect("/myProducts");
  } catch (error) {
    console.log(error);
  }
};

const addSubCatePage = async (req, res) => {
  try {
    const user = req.user;
    const cates = await categoryModel.find({});

    res.render("addSubCate", { user, cates });
  } catch (error) {
    console.log(error);
  }
};
const addSubCate = async (req, res) => {
  try {
    const { subCate_name, category } = req.body;
    await subCateModel.create({ subCate_name, category });

    req.flash("flashMsg", "subCateAdded");
    res.redirect("/myProducts");
  } catch (error) {
    console.log(error);
  }
};

const addProductPage = async (req, res) => {
  try {
    const user = req.user;
    const subCates = await subCateModel.find({});

    res.render("addProduct", { user, subCates });
  } catch (error) {
    console.log(error);
  }
};
const addProduct = async (req, res) => {
  try {
    const { proname, disc, price, discount, subCat } = req.body;
    const user = req.user._id;
    const image = req.file.buffer;

    await productModel.create({ proname, disc, price, discount, subCat, user, image });

    req.flash("flashMsg", "productAdded");
    res.redirect("/myProducts");
  } catch (error) {
    console.log(error);
  }
};

const editProductPage = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    const subCates = await subCateModel.find({});
    const user = req.user;
    res.cookie("editProduct", product._id);

    res.render("editProduct", { product, subCates, user });
  } catch (error) {
    console.log(error);
  }
};
const editProduct = async (req, res) => {
  try {
    const { proname, disc, price, discount, subCat } = req.body;
    const productId = req.cookies.editProduct;

    const product = await productModel.findOne({ _id: productId });
    let image = product.image;

    if (req.file) {
      image = req.file.buffer;
    }

    await productModel.findOneAndUpdate(
      { _id: productId },
      { proname, disc, price, discount, subCat, image }
    );

    req.flash("flashMsg", "postEdited");
    res.clearCookie("editProduct");
    res.redirect("/myProducts");
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId);

    await productModel.findByIdAndDelete(postId);
    req.flash("flashMsg", "deleteProduct");
    res.redirect("/myProducts");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  myPost,

  deletePost,
  addCate,
  addCatepage,
  addSubCate,
  addSubCatePage,
  addProduct,
  addProductPage,
  editProductPage,
  editProduct,
};
