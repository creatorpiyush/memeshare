const express = require("express");
const route = express.Router();
const multer = require("multer");
const fs = require("fs").promises;

const addmeme = require("../db/db");

// * images upload
const upload = multer({ dest: "src/uploads/" });

route.use("/images", express.static("../images"));
route.get("/", (req, res) => {
  res.render("addmeme");
});
route.post("/add", upload.single("memeimg"), (req, res) => {
  // console.log("req.body", req.body);
  // console.log("req.file", req.file);
  // console.log("req.file", req.file.filename);
  if (req.body.memetitle === "" || req.body.memetitle == null) {
    return res
      .status(422)
      .render("addmeme", { err: "Please Add a Meme Title" });
  }
  if (req.file == undefined) {
    return res.status(422).render(".", { err: "Please Add a Meme" });
  }

  const oldPath = "src/uploads/" + req.file.filename;

  const newPath =
    "src/public/images/" +
    "memeimg_" +
    Date().split(" ").join("_").split(":").join("_") +
    "." +
    req.file.mimetype.split("/").pop();

  fs.rename(oldPath, newPath);

  const temp = new addmeme({
    memeimg: newPath.replace("src/public", ""),
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

module.exports = route;
