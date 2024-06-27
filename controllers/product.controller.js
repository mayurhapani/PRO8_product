const fs = require("fs");
const path = require("path");
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

    req.flash("flashMsg", "categoryAdded");
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
    console.log(user);

    await productModel.create({ proname, disc, price, discount, subCat, user, image });

    req.flash("flashMsg", "categoryAdded");
    res.redirect("/myProducts");
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id }).populate("user");

    if (post.likes.indexOf(req.user._id) === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(post.likes.indexOf(req.user._id), 1);
    }

    await post.save();
    if (req.query.mypath == "myblogs") {
      res.redirect("/myblogs");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id }).populate("user");
    res.render("edit", { post });
  } catch (error) {
    console.log(error);
  }
};

const editPostPage = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await postModel.findOne({ _id: req.params.id });
    let image = post.image;

    if (req.file) {
      fs.unlinkSync(post.image);

      image = req.file.path;
    }

    await postModel.findOneAndUpdate({ _id: req.params.id }, { title, content, image });
    req.flash("flashMsg", "postEdited");
    res.redirect("/myblogs");
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);

    if (post.user.valueOf() != req.user.id) {
      return res.status(403).send("Unauthorized");
    }

    if (post.image) {
      let subImagePath = post.image.replace(/\\/g, "/");
      if (subImagePath.startsWith("public/")) {
        subImagePath = subImagePath.substring("public/".length);
      }
      const imagePath = path.join(__dirname, "..", "public", subImagePath);
      fs.unlinkSync(imagePath);
    }

    await postModel.findByIdAndDelete(postId);
    req.flash("flashMsg", "deletePost");
    res.redirect("/myblogs");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  myPost,
  likePost,
  editPost,
  editPostPage,
  deletePost,
  addCate,
  addCatepage,
  addSubCate,
  addSubCatePage,
  addProduct,
  addProductPage,
};
