const postInputError = (event) => {
  event.preventDefault();
  const userConfirmed = confirm("please fill all the inputs");
  if (userConfirmed) {
    window.location.href = event.currentTarget.href;
  }
};

module.exports = postInputError;
