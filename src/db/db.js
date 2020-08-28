const mongoose = require("mongoose");

const db_url = `mongodb+srv://meme_share:memeshare@cluster0.6ivvq.mongodb.net/MEMESHAREWEB?retryWrites=true&w=majority`;

mongoose.connect(
  db_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err, info) => {
    if (err) console.log(err);
    else {
      console.log(`DB connect Sucess...`);
      // console.log(info);
    }
  }
);

const memeSchema = mongoose.Schema({
  memeid: {
    type: String,
    require: true,
    unique: true,
  },
  memeimg: {
    type: String,
    require: true,
  },
  memetitle: {
    type: String,
    require: true,
  },
  publishDate: Date,
});

mongoose.model("memes", memeSchema);

module.exports = mongoose.model("memes");
