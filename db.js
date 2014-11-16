"use strict";

/*
 * handles the database by building a model
 * and an equivalent document
 */

var mongoose = require("mongoose");

// returns the Work model
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var uristring =
  process.env.MONGOLAB_URI ||
  "mongodb://localhost/dmkraslot";

// var uristring = "mongodb://@ds053978.mongolab.com:53978/heroku_app26464182";

mongoose.connect(
  uristring,
  {user: "steven", pass: "j444h000r"},
  function(err) {
    if(err) throw(err);
});

module.exports.Users = function() {
  var UserSchema = new Schema({
    id: String,
    first_name: String,
    last_name: String,
    name: String,
    gender: String,
    email: String,

    // day the player won
    won: [Boolean],
    playedOnDay: [Boolean]
  }); 

  //no indexes needed here (<100 objects)

  var User = mongoose.model("user", UserSchema);
  return User;
};