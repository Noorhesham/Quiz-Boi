const express = require("express");
const router = express.Router();
const cloudinary = require("../cloudinary");
const upload = require("../multer");

router.post("/upload", upload.single("image"), function (req:any, res:any) {
  cloudinary.uploader.upload(req.file.path, function (err:any, result:any) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

module.exports = router;
