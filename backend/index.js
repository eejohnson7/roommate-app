const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors');
const { db } = require("./models/Users");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://user:woogers@cluster0.qzmqr.mongodb.net/merntut?retryWrites=true&w=majority");

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

/*app.post("/createUser", async (req, res) => {
  let u = new User.UserBuilder(JSON.parse(body).firstName, JSON.parse(body).lastName, JSON.parse(body).id)
      .results(JSON.parse(body).result)
      .roommates(JSON.parse(body).roommates)
      .build();
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user)
});*/

app.post("/setPreferences", (req, res) => {
  console.log("req.body" + req.body);
  var _id = req.body._id;

  var currentUser = {
    name: req.body.name,
    username: req.body.username,
    roomies: req.body.roomies,
    preferences: req.body.preferences,
  };

  UserModel.findByIdAndUpdate(_id, currentUser, { new: true }, function(
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
    UserModel.find({}, (err, result) => {
        if(err){
            res.json(err);
        }
        else{
            console.log(result);
            res.json(result);
        }
    });
});

/*app.get("/getRoomies", (req, res) => {

});*/

app.post("/addRoomie", (req, res) => {
  console.log("req.body", req.body);
  var _id = req.body._id;

  var currentUser = {
    name: req.body.name,
    username: req.body.username,
    roomies: req.body.newRoomie,
    matches: req.body.matches,
    preferences: req.body.preferences,
  };

  UserModel.findByIdAndUpdate(_id, currentUser, { new: true }, function(
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

/*app.post("/removeRoomie", (req, res) => {
});*/

app.listen(3001, () => {
    console.log("Server is running")
});



