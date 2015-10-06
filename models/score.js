var mongoose = require("mongoose");

var scoreSchema = new mongoose.Schema({
  name: String,
  score: Number
});

var Score = mongoose.model("Score", scoreSchema);
module.exports = Score;