"use strict";

var express = require("express"),
    app = express(),
    db = require("./db"),
    User = db.Users(),
    bodyParser = require("body-parser");

app.set("view engine", "jade");
app.set("views", __dirname + "/views");

app.use("/js", express.static(__dirname + "/public/js"));
app.use(bodyParser.urlencoded());

app.get("/", function(req, res) {
  if(awardPrize()) {
    res.render("index", {won: "GEWONNEN!"});
  }else {
    res.render("index", {won: "VERLOREN!"});
  }
});

app.post("/", function(req, res) {
  if(awardPrize()) {
    res.render("index", {won: "GEWONNEN!"});
  }else {
    res.render("index", {won: "VERLOREN!"});
  }
});

app.post("/user", function(req, res) {
  console.log(req.body);
  findOrCreateUser(req.body, function(data) {
    res.send(data);
  });
})

app.get("/square1", function(req, res) {

});

// returns true or false to see if the user has won
var awardPrize = function() {
  var chance = 1000,
  date = new Date(),
  hours = date.getHours();
  
  if(hours < 12) {
    chance = 1000;
    console.log("%d %d", chance, hours);
  }else if(hours < 15) {
    chance = 500;
    console.log("%d %d", chance, hours);
  }else if(hours < 18) {
    chance = 250;
    console.log("%d %d", chance, hours);
  }else if(hours < 22) {
    chance = 125;
    console.log("%d %d", chance, hours);
  }else {
    chance = 1;
  } 

  var out = (Math.random() * chance);
  if(out < 1) { 
    return true;
  }else {
    return false;
  }
};

var findOrCreateUser = function(body, callback) {
  console.log(body);
  User.findOne({id: body.id}, function(err, data) {
    if(err) throw(err);
    if(data === null) {
      var club = new User(body);
      club.save(function(err, data) {
        if(err) throw(err);
        callback(data);
      });
    }else {
      callback(data);
    }
  });
}

app.listen(process.env.PORT || 3000);