const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("index", { docname: `Meme Page` });
});

module.exports = route;
