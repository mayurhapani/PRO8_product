const addUser = (userFormData) => {
  axios({
    method: "post",
    url: "/addUser",
    data: userFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      console.log("User added successfully");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.log(error);
      alert("An error occurred while adding the user. Please try again.");
    });
};

document.getElementById("addUserForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formElement = document.getElementById("addUserForm");
  const formData = new FormData(formElement);

  addUser(formData);
});
