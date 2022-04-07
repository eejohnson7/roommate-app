import { useState, useEffect } from 'react';
import Axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardGroup } from 'react-bootstrap';
import './UserCard.css';

import logo from './media/Roomie.png';
import girl from './media/girl.png';

import './Preferences';
import './RoommateFinder';
import './ChoreList';

function Settings() {
    const [listOfRoomies, setListOfRoomies] = useState([]);
    const[_id, set_id] = useState("");
    const[name, setName] = useState("");
    const[username, setUsername] = useState("");
    const[exRoomie, setExRoomie] = useState([]);
    const[preferences, setPreferences] = useState([]);
    const[currRoomies, setCurrRoomies] = useState([]);
    
    var currentUser = {  "_id": "624cce80ce757e25629f9879",  "name": "Erin",  "username": "eejohnson",  "roomies": [],  "matches": [    "Pedro"  ],  "preferences": [    "hobbies",    "games"  ]};
    
    /*needs to populate only currentUser's current roommates instead of all users*/
    useEffect(() => {
        Axios.get("http://localhost:3001/getUsers").then((response) => {
            setListOfRoomies(response.data);
        })
    }, []);

    const removeRoomie = () => {
        /*Axios.post("http://localhost:3001/removeRoomie", {
            _id,
            name,
            username,
            exRoomie,
            preferences,
            currRoomies
        }).then((response) => {*/
          alert("ROOMIE REMOVED");
        //});
       };  
    
    return (
      <div className="Settings" style={{backgroundColor:'#F26666'}}>
        <img src={logo} alt="logo" height="80"></img>
        <br></br><br></br><br></br><br></br>
        <h5 class="col-md-12 text-center" style={{ color: "#F2EFE4", fontFamily:'Monaco' }}>Make sure to remove only one at a time!</h5>
        <br></br>

        <CardGroup>
            {listOfRoomies.map((roomie) => {
                return (
                    <div>
                        <Card border="danger" class="rounded" style={{ width:'15rem', color: '#F2EFE4', backgroundColor:'#F28D8D'}}>
                            <Card.Img src={girl} alt="girl"></Card.Img>
                            <Card.Body  class="card text-center" style={{backgroundColor:'#F28D8D'}}>
                                <Card.Title><br></br>{roomie.name}</Card.Title>
                            </Card.Body>
                            {/*preference listing needs to be formatted*/}
                            <Button data-toggle="tooltip" data-placement="top" title={roomie.preferences} variant="outline-danger" onClick={(e1) => {
                                setExRoomie(roomie.name);
                                set_id(currentUser._id);
                                setName(currentUser.name);
                                setUsername(currentUser.username);
                                setPreferences(currentUser.preferences);
                                setCurrRoomies(currentUser.roomies);
                                alert("ROOMIE SELECTED: " + roomie.name);
                            }}>Select Roomie!</Button>
                        </Card>
                    </div>
                );
            })}
        </CardGroup>
        <br></br>

        <div class="col-md-12 text-center">
            <Button style={{borderRadius: '12px'}} variant="danger" onClick={removeRoomie}>Remove Roomie</Button>
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
                window.location.href='/RoommateFinder';
            }}>Open Roomie Finder</Button>
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
export default Settings;
