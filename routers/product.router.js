const { Router } = require("express");
const proRouter = Router();

const { imageUpload } = require("../middlewares/fileUpload.middleware");
const {
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
} = require("../controllers/product.controller");
const { isAuth } = require("../middlewares/isAuth");

// proRouter.get("/addPost", isAuth, myPost);

proRouter.get("/addCate", isAuth, addCatepage);
proRouter.post("/addCate", isAuth, addCate);

proRouter.get("/addSubCate", isAuth, addSubCatePage);
proRouter.post("/addSubCate", isAuth, addSubCate);

proRouter.get("/addProduct", isAuth, addProductPage);
proRouter.post("/addProduct", isAuth, imageUpload, addProduct);

proRouter.get("/likePost/:id", isAuth, likePost);
proRouter.get("/editPost/:id", isAuth, editPost);
proRouter.get("/deletePost/:id", isAuth, deletePost);

proRouter.post("/editPost/:id", isAuth, imageUpload, editPostPage);

module.exports = { proRouter };
