"use strict";

var express = require("express"),
    app = express(),
    db = require("./db"),
    User = db.Users(),
    Prize = db.Prizes(),
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
  findOrCreateUser(req.body, function(data) {
    res.send(data);
  });
});

app.get("/square0", function(req, res) {    
  if(checkDate(new Date(2014, 10, 16))) {
    doLottery(req, res, 0);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square1", function(req, res) {
  if(checkDate(new Date(2014, 10, 16))) {
    doLottery(req, res, 1);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square2", function(req, res) {
  if(checkDate(new Date(2014, 10, 16))) {
    doLottery(req, res, 2);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square3", function(req, res) {
  if(checkDate(new Date(2014, 10, 17))) {
    doLottery(req, res, 3);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square4", function(req, res) {
  if(checkDate(new Date(2014, 10, 17))) {
    doLottery(req, res, 4);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square5", function(req, res) {
  if(checkDate(new Date(2014, 10, 17))) {
    doLottery(req, res, 5);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square6", function(req, res) {
  if(checkDate(new Date(2014, 10, 17))) {
    doLottery(req, res, 6);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square7", function(req, res) {
  if(checkDate(new Date(2014, 10, 17))) {
    doLottery(req, res, 7);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square8", function(req, res) {
  if(checkDate(new Date(2014, 10, 17))) {
    doLottery(req, res, 8);
  }else {
    res.send("wrong_date");
  }
});

app.get("/square9", function(req, res) {
  if(checkDate(new Date(2014, 10, 17))) {
    doLottery(req, res, 9);
  }else {
    res.send("wrong_date");
  }
});

var doLottery = function(req, res, index) {
  Prize.find({$and: [
    {day: index}, 
    {amount: {$gt: 0}}
  ]}, function(err, prizes) {
    if(prizes.length < 1) {
      res.send("price_unavailable");
      return;
    }

    User.findOne({id: req.query.id}, function(err, user) {
      if(err) throw(err);
      if(user.won[index]) {
        res.send("allready_won");
        return;
      }
      if(user.played[index]) {
        res.send("allready_played");
        return;
      }

      if(awardPrize()) {
        user.won.set(index, true);
        user.played.set(0, true);
        prizes[0].amount -= 1;
        user.save(function() {
          prizes[0].save(function() {
            res.send(prizes[0]);
            return;
          });
        });
      }else {
        user.played.set(index, true);
        user.save(function() {
          res.send("lost");
          return;
        });
      }
    });
  });
};

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
    chance = 1;
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
  User.findOne({id: body.id}, function(err, data) {
    if(err) throw(err);
    if(data === null) {
      body.won = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];

      body.played = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];

      var club = new User(body);
      club.save(function(err, data) {
        if(err) throw(err);
        callback(data);
      });
    }else {
      callback(data);
    }
  });
};

var checkDate = function(projectedDate) {
  var currentDate = new Date();

  if(
    currentDate.getMonth() == projectedDate.getMonth() && 
    currentDate.getDate() == projectedDate.getDate() &&
    currentDate.getFullYear() == projectedDate.getFullYear()
  ) { 
    return true;
  }else {
    return false;
  }
}

app.listen(process.env.PORT || 3000);