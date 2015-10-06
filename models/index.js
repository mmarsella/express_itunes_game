var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/itunes_game");
mongoose.set('debug',true);
module.exports.Score = require("./score");
module.exports.User = require("./user");