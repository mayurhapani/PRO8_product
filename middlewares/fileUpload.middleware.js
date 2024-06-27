const multer = require("multer");

const fileUploads = multer.memoryStorage();
const imageUpload = multer({ storage: fileUploads }).single("image");

module.exports = { imageUpload };
