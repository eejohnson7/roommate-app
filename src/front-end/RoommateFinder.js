import './RoommateFinder.css';
import { useState, useEffect } from 'react';
import Axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card } from 'react-bootstrap'
import { logDOM } from '@testing-library/react';

function RoommateFinder() {
  const[currentUser, setCurrentUser] = useState("");
  const[listOfRoomies, setListOfRoomies] = useState([]);
  const[listOfMatches, setListOfMatches] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getCurrentUser").then((response) => {
      setCurrentUser(response.data);
    });
  });

  var json = JSON.parse(currentUser);
  var matches = json["Matches"];
  var roomies = json["Roomies"];

  useEffect(() => {
    Axios.post("http://localhost:3001/getMatches", {
      matches
    }).then((response) => {
      setListOfMatches(response.data);
    });
  });

  if(roomies.length !== 0){
    useEffect(() => {
      Axios.post("http://localhost:3001/getRoomies", {
        roomies
      }).then((response) => {
        setListOfRoomies(response.data);
      });
    });
  }

  const addRoomie = () => {
    Axios.post("http://localhost:3001/addRoomie", {
      matches
    }).then((response) => {
      alert("ROOMIE ADDED"); 
    }); 
  }; 

  const removeRoomie = () => {
    Axios.post("http://localhost:3001/removeRoomie", {
      roomies
    }).then((response) => {
      alert("ROOMIE REMOVED");
    });
   };  

  return (
    <body style={{backgroundColor:'#F26666'}}> 
      <img src="https://cdn.discordapp.com/attachments/953028681272549426/953860160688902154/Roomie.png" alt="logo" height="50"></img>
      <br></br><br></br><br></br>

      {listOfRoomies.map((roomie) => {
        return (
          <div>
            <Card class="rounded" style={{ width:'15rem', color: '#F2EFE4', backgroundColor:'#F28D8D'}}>
              <Card.Img src="https://www.kindpng.com/picc/m/73-732812_girl-png-clipart-cute-girl-clipart-transparent-png.png" alt="test"></Card.Img>
              <Card.Body  class="card text-center" style={{backgroundColor:'#F28D8D'}}>
                <Card.Title><br></br>{roomie.name}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        );
      })}

      {listOfMatches.map((match) =>{
        return (
          <div>
            <Card class="rounded" style={{ width:'15rem', color: '#F2EFE4', backgroundColor:'#F28D8D'}}>
              <Card.Img src="https://www.kindpng.com/picc/m/73-732812_girl-png-clipart-cute-girl-clipart-transparent-png.png" alt="test" height="150"></Card.Img>
              <Card.Body  class="card text-center" style={{backgroundColor:'#F28D8D'}}>
                <Card.Title><br></br>{match.name}</Card.Title>
              </Card.Body>
              <Button data-toggle="tooltip" data-placement="top" title={match.preferences} class="rounded" variant="outline-danger" onClick={addRoomie}>Add Roomie!</Button>
            </Card>
          </div>
        );
      })}

      <br></br><br></br>
      <Button class="rounded" variant="outline-danger"> <a href="/ChoreList"></a>Submit</Button>
    </body>
  );
}

export default RoommateFinder;
