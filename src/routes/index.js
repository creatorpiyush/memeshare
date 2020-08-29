const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("index", { docname: `Republic Of Memers` });
});

module.exports = route;
