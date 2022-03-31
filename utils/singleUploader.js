const path = require("path");
const multer = require("multer");
const fileNameWithExt = require("./fileNameWithExt");
const createError = require("http-errors");

// this func will return the upload object created by calling multer
function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  // upload folder destination
  const UPLOAD_FOLDER = path.join(
    __dirname,
    "..",
    "public",
    "uploads",
    subfolder_path
  );

  // define the storage =>> which will define destination folder to upload
  // and the  name under which the file will be saved
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // this is not middleware
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      cb(null, fileNameWithExt(file));
    },
  });

  // returning multer obj
  return multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });
}
console.log({ uploader });
module.exports = uploader;
