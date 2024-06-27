const express = require("express");
// const postInputError = require("../public/javascripts/postInput");

const postInputError = (event) => {
  event.preventDefault();
  const userConfirmed = confirm("please fill all the inputs");
  if (userConfirmed) {
    window.location.href = event.currentTarget.href;
  }
};

const postInput = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (title && content) {
      next();
    } else {
      postInputError();
      console.log("please fill all the inputs");

      res.redirect("/myblogs");
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postInput };
