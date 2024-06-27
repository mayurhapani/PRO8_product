function confirmBlogDelete(event) {
  event.preventDefault();
  const userConfirmed = confirm("Are you sure you want to delete your post?");
  if (userConfirmed) {
    window.location.href = event.currentTarget.href;
  }
}
