const verifyOtpEmail = (req, res, next) => {
  const userEmail = req.cookies.userEmail;

  if (userEmail) {
    return next();
  }
  res.redirect("/login");
};

module.exports = { verifyOtpEmail };
