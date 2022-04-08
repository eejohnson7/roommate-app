const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routeURL = require('./routes/signin')
const cors = require('cors');
const User = require("./models/Users");

mongoose.connect("mongodb+srv://qyork:Caddie5587@cluster0.fqy0m.mongodb.net/Roommate-App?retryWrites=true&w=majority", 
              () => console.log("Database is running"));

app.use(express.json());
app.use(cors());
app.use('/app', routeURL)

app.post("/updatePreferences", (req, res) => {
  console.log("req.body" + req.body);
  var _id = req.body._id;

  var currentUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    roomies: req.body.roomies,
    preferences: req.body.preferences,
  };

  User.findByIdAndUpdate(_id, currentUser, { new: true }, function(
    err,
    currentUser
    ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(currentUser);
      }
    });
});

app.get("/getUsers", (req, res) => {
    User.find({}, (err, result) => {
        if(err){
            res.json(err);
        }
        else{
            console.log(result);
            res.json(result);
        }
    });
});

app.post("/addRoomie", (req, res) => {
  console.log("req.body", req.body);
  var _id = req.body._id;

  var currentUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    roomies: req.body.newRoomie,
    preferences: req.body.preferences,
  };

  User.findByIdAndUpdate(_id, currentUser, { new: true }, function(
    err,
    currentUser
    ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(currentUser);
      }
    });
});

app.post("/removeRoomie", (req, res) => {
  console.log("req.body", req.body);
  var _id = req.body._id;
  var exRoomie = req.body.exRoomie;
  var roomies = req.body.currRoomies;

  for(var i = 0; i < roomies.length; i++){
    if(roomies[i] === exRoomie){
      roomies.splice(i, 1);
    }
  }

  var currentUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    roomies: roomies,
    preferences: req.body.preferences,
  };

  User.findByIdAndUpdate(_id, currentUser, { new: true }, function(
    err,
    currentUser
    ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(currentUser);
      }
    });
});


app.listen(3001, () => {
    console.log("Server is running")
});