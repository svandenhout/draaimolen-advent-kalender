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
    played: [Boolean]
  }); 

  //no indexes needed here (<100 objects)

  var User = mongoose.model("user", UserSchema);
  return User;
};

module.exports.Prizes = function() {
  var PrizeSchema = new Schema({
    day: Number,
    name: String,
    amount: Number,
    img: String
  }); 

  //no indexes needed here (<100 objects)
  var Prize = mongoose.model("prizes", PrizeSchema);
  Prize.findOne({name: "Paardenlul"}, function(err, data) {
    if(data === null) {
      data = new Prize({
        day: 0,
        name: "Paardenlul",
        amount: 3
      });
    }

    data.save();
  });

  Prize.findOne({name: "PaardenVagina"}, function(err, data) {
    if(data === null) {
      data = new Prize({
        day: 1,
        name: "PaardenVagina",
        amount: 3
      });
    }

    data.save();
  });
  
  return Prize;
};