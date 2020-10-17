const mongoose = require("mongoose");
const env = require("./environment");
mongoose.connect(env.Mongo_Db_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to mongodb"));

db.once("open", function () {
  console.log("connected to the database");
});

module.exports = db;
