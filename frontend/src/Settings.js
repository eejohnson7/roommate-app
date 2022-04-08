import { useState, useEffect } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardGroup } from 'react-bootstrap';
import './UserCard.css';
import logo from './media/Roomie.png';
import girl from './media/girl.png';
import './Preferences';
import './RoommateFinder';


function Settings() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [_id, set_id] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [exRoomie, setExRoomie] = useState([]);
    const [preferences, setPreferences] = useState([]);
    const [currRoomies, setCurrRoomies] = useState([]);
    
    var currentUser = {  "_id": "624f837b03c31299799e3dc9",  "firstName": "newUserPerson",  "lastName": "userUser",  "username": "newUser105",  "password": "$2b$12$nFe8xYP8NBm7yJXDpfSPGOaRQHFf7Uw6dpfBAe.S1kdrIh20RqNKy",  "roomies": [ "computer" ],  "preferences": [ "bowling" ]};
    
    useEffect(() => {
        Axios.get("http://localhost:3001/getUsers").then((response) => {
            setListOfUsers(response.data);
        })
    }, []);

    const removeRoomie = () => {
        Axios.post("http://localhost:3001/removeRoomie", {
            _id,
            firstName,
            lastName,
            username,
            password,
            exRoomie,
            preferences,
            currRoomies
        }).then((response) => {
          alert("ROOMIE REMOVED");
        });
    };  
    
    return (
      <div className="Settings" style={{backgroundColor:'#F26666'}}>
        <img src={logo} alt="logo" height="80"></img>
        <br></br><br></br><br></br><br></br>
        <h5 class="col-md-12 text-center" style={{ color: "#F2EFE4", fontFamily:'Monaco' }}>Make sure to remove only one at a time!</h5>
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

                for(var i = 0; currentUser.roomies.length; i++){
                    if(user.username === currentUser.roomies[i]){
                        return (
                            <div>
                                <Card border="danger" class="rounded" style={{ width:'15rem', color: '#F2EFE4', backgroundColor:'#F28D8D'}}>
                                    <Card.Img src={girl} alt="girl"></Card.Img>
                                    <Card.Body  class="card text-center" style={{backgroundColor:'#F28D8D'}}>
                                        <Card.Title><br></br>{user.firstName}</Card.Title>
                                    </Card.Body>
                                    <Button data-toggle="tooltip" data-placement="top" title={formatPreferences} variant="outline-danger" onClick={(e1) => {
                                        setExRoomie(user.username);
                                        set_id(currentUser._id);
                                        setFirstName(currentUser.firstName);
                                        setUsername(currentUser.username);
                                        setPreferences(currentUser.preferences);
                                        setCurrRoomies(currentUser.roomies);
                                        setLastName(currentUser.lastName);
                                        setPassword(currentUser.password);
                                        alert("ROOMIE SELECTED: " + user.name);
                                    }}>Select Roomie!</Button>
                                </Card>
                            </div>
                        );
                    }
                    else {
                        return null;
                    }
                }
                
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
