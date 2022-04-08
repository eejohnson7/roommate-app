import './UserCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Axios from "axios";
import logo from './media/findRoomie.png';
import girl from './media/girl.png';
import './Settings';
import './Preferences';

function RoommateFinder() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [_id, set_id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newRoomie, setNewRoomie] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [currRoomies, setCurrRoomies] = useState([]);

  var currentUser = {  "_id": "624f837b03c31299799e3dc9",  "firstName": "newUserPerson",  "lastName": "userUser",  "username": "newUser105",  "password": "$2b$12$nFe8xYP8NBm7yJXDpfSPGOaRQHFf7Uw6dpfBAe.S1kdrIh20RqNKy",  "roomies": [],  "preferences": [ "bowling"]};
  var currUserPref = currentUser.preferences;

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    })
  }, []);

  
  const addRoomie = () => {
    Axios.post("http://localhost:3001/addRoomie", {
      _id,
      firstName,
      lastName,
      username,
      password,
      currRoomies,
      newRoomie,
      preferences
    }).then((response) => { 
      alert("ROOMIE ADDED: " + newRoomie); 
    });
  };

  return (
    <div className="RoommateFinder" style={{backgroundColor:'#F26666'}}>
      <img src={logo} alt="logo" height="225"></img>
      <h5 class="col-md-12 text-center" style={{ color: "#F2EFE4", fontFamily:'Monaco' }}>Make sure to add only one at a time!</h5>
      <br></br>

      <CardGroup>
        {listOfUsers.map((user) => {
          var formatPreferences = "";
          for(var i = 0; i < user.preferences.length; i++){
            formatPreferences += user.preferences[i];
            if(i < user.preferences.length - 1){
              formatPreferences += ", ";
            }
          }

          if(user.username !== currentUser.username){
            var score = 0;

            for(var i = 0; i < currUserPref.length; i++){
              if(currUserPref[i] === user.preferences[i]){
               score++;
              }
            }
            return (
              <div>
                <Card border="danger" class="rounded" style={{ width:'15rem', color: '#F2EFE4', backgroundColor:'#F28D8D'}}>
                  <Card.Img src={girl} alt="girl"></Card.Img>
                  <Card.Body  class="card text-center" style={{backgroundColor:'#F28D8D'}}>
                    <Card.Title><br></br>{user.firstName}</Card.Title>
                    <Card.Text>Preference Score: {score}</Card.Text>
                  </Card.Body>
                  <Button data-toggle="tooltip" data-placement="top" title={formatPreferences} variant="outline-danger" onClick={(e1) => {
                    setNewRoomie(user.username);
                    set_id(currentUser._id);
                    setFirstName(currentUser.firstName);
                    setUsername(currentUser.username);
                    setPreferences(currentUser.preferences);
                    setCurrRoomies(currentUser.roomies);
                    setPassword(currentUser.password);
                    setLastName(currentUser.lastName);
                    alert("ROOMIE SELECTED: " + user.firstName);
                    }}>Select Roomie!</Button>
                </Card>
              </div>
            );
          }
          else{
            return null;
          }
        })}
      </CardGroup>
      <br></br>

      <div class="col-md-12 text-center">
        <Button style={{borderRadius: '12px'}} variant="danger" onClick={addRoomie}>Add Roomie!</Button>
      </div>

      <div>
        <Button style={{borderRadius: '12px', position: 'absolute', right: 5, top: 5}} variant="danger" onClick={(e2) => {
          e2.preventDefault();
          window.location.href='/ChoreList';
        }}>Open Chore List</Button>
      </div>

      <div>
        <Button style={{borderRadius: '12px', position: 'absolute', right: 5, top: 50}} variant="danger" onClick={(e2) => {
          e2.preventDefault();
          window.location.href='/Settings';
        }}>Open Settings</Button>
      </div>

      <div>
        <Button style={{borderRadius: '12px', position: 'absolute', right: 5, top: 95}} variant="danger" onClick={(e2) => {
          e2.preventDefault();
          window.location.href='/Preferences';
        }}>Change Your Preferences!</Button>
      </div>

    </div>
  );
}

export default RoommateFinder;