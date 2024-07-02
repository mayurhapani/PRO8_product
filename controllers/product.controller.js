const categoryModel = require("../models/category.model");
const subCateModel = require("../models/subCate.model");
const companyModel = require("../models/company.model");
const productModel = require("../models/product.model");

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

const addCompanyPage = async (req, res) => {
  try {
    const user = req.user;
    const subCates = await subCateModel.find({});

    res.render("addCompany", { user, subCates });
  } catch (error) {
    console.log(error);
  }
};
const addCompany = async (req, res) => {
  try {
    const { company_name, subCat } = req.body;
    await companyModel.create({ company_name, subCat });

    req.flash("flashMsg", "CompanyAdded");
    res.redirect("/myProducts");
  } catch (error) {
    console.log(error);
  }
};

const addProductPage = async (req, res) => {
  try {
    const user = req.user;
    const categories = await categoryModel.find({});

    res.render("addProduct", { user, categories });
  } catch (error) {
    console.log(error);
  }
};
const addProduct = async (req, res) => {
  try {
    const { proname, disc, price, discount, subCat, company } = req.body;
    const user = req.user._id;
    const image = req.file.buffer;

    await productModel.create({ proname, disc, price, discount, subCat, user, image, company });

    req.flash("flashMsg", "productAdded");
    res.redirect("/myProducts");
  } catch (error) {
    console.log(error);
  }
};

const editProductPage = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    const companies = await companyModel.find({});
    const user = req.user;
    res.cookie("editProduct", product._id);

    res.render("editProduct", { product, companies, user });
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

const getSubCatData = async (req, res) => {
  try {
    const { id } = req.params;
    const subCat = await subCateModel.find({ category: id });
    res.json(subCat);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCompanyData = async (req, res) => {
  try {
    const { id } = req.params;
    const companies = await companyModel.find({ subCat: id });
    res.json(companies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  deletePost,
  addCate,
  addCatepage,
  addSubCate,
  addSubCatePage,
  addCompany,
  addCompanyPage,
  addProduct,
  addProductPage,
  editProductPage,
  editProduct,

  getSubCatData,
  getCompanyData,
};
