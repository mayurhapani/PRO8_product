const { Router } = require("express");
const router = Router();

const { userInput } = require("../middlewares/userInput.middleware");

const { imageUpload } = require("../middlewares/fileUpload.middleware");
const { isAuth } = require("../middlewares/isAuth");
const { verifyOtpEmail } = require("../middlewares/verifyOptEmail");
const passport = require("passport");

const {
  addUser,
  addUserPage,
  login,
  edituser,
  editUserPage,
  allBlogs,
  myblogs,
  deleteuser,
  changePassword,
  changePasswordPage,
  forgetPass,
  forgetPassPage,
  otpPage,
  otpVerification,
  otpPassword,
} = require("../controllers/user.controller");

router.get("/addUser", addUser);
router.get("/login", login);
router.get("/edituser", isAuth, edituser);
router.get("/", isAuth, allBlogs);
router.get("/myblogs", isAuth, myblogs);
router.delete("/deleteUser", isAuth, deleteuser);

router.post("/addUser", imageUpload, userInput, addUserPage);
router.patch("/editeduser", isAuth, imageUpload, editUserPage);

router.get("/changePassword", isAuth, changePasswordPage);
router.post("/changePassword", isAuth, changePassword);

router.get("/forget", forgetPassPage);
router.post("/forget", forgetPass);
router.get("/otpVerification", verifyOtpEmail, otpPage);
router.post("/otpVerification", verifyOtpEmail, otpVerification);
router.post("/otpPassword", verifyOtpEmail, otpPassword);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      // req.flash("flashMsg", "userLogout");
      res.redirect("/login");
    });
  });
});

module.exports = { router };
