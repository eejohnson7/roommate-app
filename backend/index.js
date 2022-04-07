const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routeURL = require('./routes/signin')
const cors = require('cors');
const { db } = require("./models/Users");
const User = require("./models/Users");



mongoose.connect("mongodb+srv://qyork:Caddie5587@cluster0.fqy0m.mongodb.net/Roommate-App?retryWrites=true&w=majority", 
              () => console.log("Database is running"));

app.use(express.json());
app.use(cors());
app.use('/app', routeURL)

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
    name: req.body.name,
    username: req.body.username,
    roomies: req.body.newRoomie,
    matches: req.body.matches,
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

})

app.listen(3001, () => {
    console.log("Server is running")
});



