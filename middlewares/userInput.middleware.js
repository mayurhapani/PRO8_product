const userInput = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    if (name && username && password && email) {
      next();
    } else {
      console.log("please fill all the inputs");
      res.redirect("/login");
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { userInput };
