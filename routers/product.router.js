const { Router } = require("express");
const proRouter = Router();

const { imageUpload } = require("../middlewares/fileUpload.middleware");
const {
  deletePost,
  addCate,
  addCatepage,
  addSubCate,
  addSubCatePage,
  addProduct,
  addCompanyPage,
  addCompany,
  addProductPage,
  editProduct,
  editProductPage,
  getSubCatData,
  getCompanyData,
} = require("../controllers/product.controller");

const { isAuth } = require("../middlewares/isAuth");

proRouter.get("/addCate", isAuth, addCatepage);
proRouter.post("/addCate", isAuth, addCate);

proRouter.get("/addSubCate", isAuth, addSubCatePage);
proRouter.post("/addSubCate", isAuth, addSubCate);

proRouter.get("/addCompany", isAuth, addCompanyPage);
proRouter.post("/addCompany", isAuth, addCompany);

proRouter.get("/addProduct", isAuth, addProductPage);
proRouter.post("/addProduct", isAuth, imageUpload, addProduct);

proRouter.get("/editProduct/:id", isAuth, editProductPage);
proRouter.post("/editProduct", isAuth, imageUpload, editProduct);

proRouter.get("/deletePost/:id", isAuth, deletePost);

// Define a route to fetch data
proRouter.get("/api/subCat/:id", getSubCatData);
proRouter.get("/api/company/:id", getCompanyData);

module.exports = { proRouter };
