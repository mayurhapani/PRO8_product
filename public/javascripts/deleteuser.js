function confirmDelete(event) {
  event.preventDefault();
  const userConfirmed = confirm("Are you sure you want to delete your account?");
  if (userConfirmed) {
    axios({
      method: "delete",
      url: "/deleteUser",
    })
      .then((response) => {
        console.log("Account deleted successfully");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while deleting your account. Please try again.");
      });
  }
}

document.getElementById("deleteAccount").addEventListener("click", confirmDelete);
