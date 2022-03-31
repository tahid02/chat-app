const uploader = require("../../utils/singleUploader");

function avatarUpload(req, res, next) {
  //
  // this func setup all info about file to upload
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // finally this will upload the file and if any error
  // happen this will call the error handler func
  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
