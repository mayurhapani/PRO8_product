const postModel = require("../models/post.model");
const fs = require("fs");
const path = require("path");

const myPost = async (req, res) => {
  try {
    res.render("myblogs");
  } catch (error) {
    console.log(error);
  }
};

const addPost = async (req, res) => {
  try {
    const user = req.user;
    res.render("addpost", { user });
  } catch (error) {
    console.log(error);
  }
};

const addPostpage = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file.path;

    const post = postModel.create({ title, content, image, user: req.user._id });

    req.flash("flashMsg", "postAdded");
    res.redirect("/myblogs");
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

module.exports = { myPost, likePost, editPost, editPostPage, deletePost, addPost, addPostpage };
