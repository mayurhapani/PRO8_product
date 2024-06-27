const { Router } = require("express");
const postRouter = Router();

const { imageUpload } = require("../middlewares/fileUpload.middleware");
const { postInput } = require("../middlewares/postInput.middleware");
const {
  myPost,
  likePost,
  editPost,
  editPostPage,
  deletePost,
  addPost,
  addPostpage,
} = require("../controllers/post.controller");
const { isAuth } = require("../middlewares/isAuth");

postRouter.get("/addPost", isAuth, myPost);
postRouter.get("/addpostpage", isAuth, addPost);

postRouter.post("/addpostpage", isAuth, imageUpload, postInput, addPostpage);

postRouter.get("/likePost/:id", isAuth, likePost);
postRouter.get("/editPost/:id", isAuth, editPost);
postRouter.get("/deletePost/:id", isAuth, deletePost);

postRouter.post("/editPost/:id", isAuth, imageUpload, postInput, editPostPage);

module.exports = { postRouter };
