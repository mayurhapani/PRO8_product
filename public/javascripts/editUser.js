document.getElementById("editUserForm").addEventListener("submit", submitEditForm);

function submitEditForm(e) {
  e.preventDefault();
  const formElement = document.getElementById("editUserForm");
  const formData = new FormData(formElement);

  axios
    .patch("/editeduser", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("User edited successfully:", response.data);
      window.location.href = "/myblogs";
    })
    .catch((error) => {
      console.error("Error editing user:", error);
      alert("An error occurred. Please try again.");
    });
}
