var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/scores");
mongoose.set('debug',true);
module.exports.Score = require("./score");