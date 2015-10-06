var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/itunes_game");
mongoose.set('debug',true);
module.exports.User = require("./user");