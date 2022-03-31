const path = require("path");

function fileNameWithExt(file) {
  const fileExt = path.extname(file.originalname);
  const fileName =
    file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") +
    "-" +
    Date.now();
  return fileName + fileExt; // returns filename.ext
}
module.exports = fileNameWithExt;
