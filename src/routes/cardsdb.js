const express = require("express");
const route = express.Router();
const multer = require("multer");
const fs = require("fs").promises;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "creatorpiyush",
  api_key: "897718564747982",
  api_secret: "J8UTV3thq628g70AC3R-eXDG5sw",
});

const addmeme = require("../db/db");
const { result } = require("lodash");

// * images upload
const upload = multer({ dest: "src/uploads/" });

route.use("/images", express.static("../images"));

route.post("/add", upload.single("memeimg"), (req, res) => {
  // console.log("req.body", req.body);
  // console.log("req.file", req.file);

  if (req.body.memetitle === "" || req.body.memetitle == null) {
    return res.status(422).render("index", { err: "Please Add a Meme Title" });
  }
  if (req.file == undefined) {
    return res.status(422).render("index", { err: "Please Add a Meme" });
  }

  cloudinary.uploader.upload(req.file.path, (err, result) => {
    // console.log("error: ", err);
    console.log("result:", result);

    const temp = new addmeme({
      memeimg: result.secure_url,
      memeid: Date().split(" ").join("_").split(":").join("_"),
      memetitle: req.body.memetitle,
    });

    temp.save((err, result) => {
      if (err) {
        return res.send(err);
      }
      return res.redirect("/");
    });
  });

  // console.log("req.file", req.file.filename);
});

module.exports = route;
