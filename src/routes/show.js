const route = require("express").Router();

const memes = require("../db/db");

route.get("/", async (req, res) => {
  const meme = await memes.find({});
  res.status(200).send(meme);
});

module.exports = route;
