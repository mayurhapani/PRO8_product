const userModel = require("../models/user.model");
const fs = require("fs");
const path = require("path");
const mailer = require("nodemailer");
const productModel = require("../models/product.model");
const jwt = require("jsonwebtoken");

let otp = "";
const secret = "secret";
// let vUserEmail = "";

const allProducts = async (req, res) => {
  try {
    const user = req.user;
    const myProducts = await productModel
      .find({})
      .populate("user")
      .populate({ path: "company", populate: { path: "subCat", populate: { path: "category" } } });
    // console.log(myProducts);

    res.render("index", { user, myProducts });
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (req, res) => {
  res.render("signup");
};

const addUserPage = async (req, res) => {
  try {
    const { userOtp } = req.body;
    // console.log(userOtp, otp);

    if (otp == userOtp) {
      const userData = req.cookies.userData;
      const user = jwt.verify(userData, secret);
      const imagePath = user.imagePath;

      const image = fs.readFileSync(imagePath);

      await userModel.create({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        image,
      });

      fs.unlinkSync(imagePath);
      res.clearCookie("userData");
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
};

const userOptPage = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const imagePath = req.userImagePath;

    const user = await userModel.findOne({ email });
    if (user)
      return res.status(400).send("User already exist! <br/> Please use other email id......");

    const userData = { name, username, email, password, imagePath };
    const token = jwt.sign(userData, secret);

    res.cookie("userData", token);
    res.redirect("/addUserOtp");
  } catch (err) {
    console.log(err);
  }
};

const userOtp = async (req, res) => {
  try {
    otp = Math.floor(Math.random() * 900000);

    const userData = req.cookies.userData;
    const user = jwt.verify(userData, secret);

    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: "hapanimayur@gmail.com",
        pass: "ofwo yiky rskz wxkt",
      },
    });

    const sendMail = {
      from: "hapanimayur@gmail.com",
      to: user.email,
      subject: "Register User Verification OTP",
      text: `Subject: Your OTP for Registration Verification

Dear User,

Thank you for registering with Sunadaram Enterprise.

To complete your registration, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone.

Your OTP:${otp.toString()}

If you did not initiate this request, please contact our support team immediately.

Thank you for choosing [Your Company/Service Name]. We look forward to serving you.

Best regards,

Mayur Hapani
Co-Founder
`,
    };

    transporter.sendMail(sendMail, (err, info) => {
      if (err) console.log(err);
      else {
        console.log(info);
      }
    });

    res.render("addUserOtp");
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  res.render("login", { messages: req.flash("flashMsg") });
};

const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("User Not exist!");

    if (password !== user.password) return res.redirect("/login");

    res.status(200);
    res.cookie("token", user.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const edituser = async (req, res) => {
  const user = req.user;
  res.render("edituser", { user });
};

const editUserPage = async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const id = req.user._id;
    let image = req.user.image;

    if (req.file) {
      fs.unlinkSync(req.user.image);
      image = req.file.path;
    }
    await userModel.findOneAndUpdate({ _id: id }, { name, username, email, image });
    req.flash("flashMsg", "userEdited");
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
  }
};

const myProducts = async (req, res) => {
  try {
    const user = req.user;
    const myProducts = await productModel.find({ user: user._id });

    res.render("myProducts", { user, myProducts, messages: req.flash("flashMsg") });
  } catch (error) {
    console.log(error);
  }
};

const deleteuser = async (req, res) => {
  try {
    const id = req.user.id;

    const products = await productModel.find({ user: id });
    products.map(async (product) => {
      await productModel.deleteOne({ _id: product._id });
    });

    await userModel.findOneAndDelete({ _id: id });

    console.log("User and associated posts deleted successfully");
    req.flash("flashMsg", "deleteUser");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteuser:", error);
    res.status(500).json({ message: "An error occurred while deleting the account" });
  }
};

const changePasswordPage = (req, res) => {
  return res.render("changePassword");
};

const changePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword, confirmpassword } = req.body;
    const user = req.user;

    if (oldpassword == user.password) {
      if (newpassword === confirmpassword) {
        await userModel.findOneAndUpdate({ _id: user._id }, { password: newpassword });
        console.log("Password Changed Successfully");
        req.flash("flashMsg", "changePassword");
        res.redirect("/myblogs");
      } else {
        console.log("New Password And Confirm Password Does Not Match");
        return res.redirect("/changePassword");
      }
    } else {
      console.log("Current Password Is Incorrect");
      return res.redirect("/changePassword");
    }
  } catch (error) {
    console.log(error);
  }
};

const forgetPassPage = (req, res) => {
  res.render("forgetPassword");
};

const forgetPass = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const user = await userModel.findOne({ email: userEmail });

    if (user) {
      res.cookie("userEmail", userEmail);

      otp = Math.floor(Math.random() * 900000);
      // console.log("otp ", otp);

      const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
          user: "hapanimayur@gmail.com",
          pass: "ofwo yiky rskz wxkt",
        },
      });

      const sendMail = {
        from: "hapanimayur@gmail.com",
        to: req.body.userEmail,
        subject: "Reset Password",
        text: `Subject: Your OTP for Registration Verification

Dear User,

Thank you for registering with Sunadaram Enterprise.

To complete your registration, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone.

Your OTP:${otp.toString()}

If you did not initiate this request, please contact our support team immediately.

Thank you for choosing [Your Company/Service Name]. We look forward to serving you.

Best regards,

Mayur Hapani
Co-Founder
`,
      };

      transporter.sendMail(sendMail, (err, info) => {
        if (err) console.log(err);
        else {
          console.log(info);
        }
      });

      res.redirect("/otpVerification");
    } else {
      console.log("user not exist");
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

const otpPage = async (req, res) => {
  res.render("otpPage");
};

const otpVerification = async (req, res) => {
  try {
    if (otp != "") {
      const userOTP = req.body.otp;
      if (otp == userOTP) {
        otp = "";
        res.render("newPassword");
      } else {
        res.clearCookie("userEmail");
        req.flash("flashMsg", "wrongOtp");
        res.redirect("/");
      }
    }
  } catch (error) {}
};

const otpPassword = async (req, res) => {
  try {
    const { newpassword, confirmpassword } = req.body;
    const userEmail = req.cookies.userEmail;

    if (userEmail != "") {
      const user = await userModel.findOne({ email: userEmail });

      if (newpassword === confirmpassword) {
        console.log(user);

        await userModel.findOneAndUpdate({ _id: user.id }, { password: newpassword });
        console.log("Password Changed Successfully");

        req.flash("flashMsg", "changePassword");
        res.clearCookie("userEmail");
        res.redirect("/");
      } else {
        console.log("New Password And Confirm Password Does Not Match");
        res.clearCookie("userEmail");
        return res.redirect("/otpPassword");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allProducts,
  addUser,
  addUserPage,
  userOptPage,
  userOtp,
  login,
  loginAuth,
  myProducts,
  edituser,
  editUserPage,
  deleteuser,
  changePassword,
  changePasswordPage,
  forgetPass,
  forgetPassPage,
  otpPage,
  otpVerification,
  otpPassword,
};
