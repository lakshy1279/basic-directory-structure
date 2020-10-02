const mongoose = require("mongoose");
const env = require("./environment");
mongoose.connect(
  `mongodb+srv://anshita:pipdIq5fqHCYrgO7@cluster0.adtj0.mongodb.net/${env.db}?retryWrites=true&w=majority
  `,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to mongodb"));

db.once("open", function () {
  console.log("connected to the database");
});

module.exports = db;
