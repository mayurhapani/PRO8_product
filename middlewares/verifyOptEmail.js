const verifyOtpEmail = (req, res, next) => {
  console.log("verifyOtpEmail", req.vUserEmail);
  if (req.vUserEmail) {
    return next();
  }
  res.redirect("/login");
};

module.exports = { verifyOtpEmail };
