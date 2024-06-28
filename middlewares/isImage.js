const fs = require("fs");
const path = require("path");

const isImage = async (req, res, next) => {
  if (req.file) {
    const tmpDir = path.join(__dirname, "tmp");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    const image = req.file.buffer;
    const fileName = Date.now() + path.extname(req.file.originalname);
    const filePath = path.join(__dirname, "tmp", fileName);

    fs.writeFileSync(filePath, image);
    req.userImagePath = filePath;
    return next();
  }
  return next();
};

module.exports = { isImage };

// const isImage = async (req, res, next) => {
//   if (req.file) {
//     const image = req.file.buffer;
//     req.userImage = image;
//     return next();
//   }
//   return next();
// };

// module.exports = { isImage };
