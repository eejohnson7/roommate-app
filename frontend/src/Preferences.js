//functionality complete, could be re-formatted to look nicer if time permits

import Axios from "axios";
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import logo from './media/Roomie.png';

import './RoommateFinder';
import './Settings';
import './ChoreList';

function Preferences () {
  const [preferences, setPreferences] = useState([]);
  const[_id, set_id] = useState("");
  const[name, setName] = useState("");
  const[username, setUsername] = useState("");
  const[roomies, setRoomies] = useState([]);

  /*need to test with actual currentUser, but it works with dummy data*/
  var currentUser = {  "_id": "624cce80ce757e25629f9879",  "name": "Erin",  "username": "eejohnson",  "roomies": [],  "matches": [    "Pedro"  ],  "preferences": [    "hobbies",    "games"  ]};
  var questions = ["ifHouse", "ifApt", "ifPets", "ifDrinker", "ifSmoker", "ifPartier", "ifMornings", "ifNights"];
  var answers = [];

  const updatePreferences = () => {
    answers = questions.map(function(question){
      console.log(question + ": " + document.querySelector("input[name='" + question + "']:checked").id);
      return document.querySelector("input[name='" + question + "']:checked").id;
    });
      
    setPreferences(answers);
    set_id(currentUser._id);
    setName(currentUser.name);
    setUsername(currentUser.username);
    setRoomies(currentUser.roomies);

    Axios.post("http://localhost:3001/setPreferences", {
      _id,
      name,
      username,
      roomies,
      preferences
    }).then((response) => {
      alert("PREFERENCES UPDATED"); 
    }); 
  }

  return(
    <div className="Preferences" style={{backgroundColor:'#F26666'}} >
      <img src={logo} alt="logo" height="75"></img>
      <p></p>

      <div>
        <h4 class="fw-bold text-center mt-3"> </h4>

        <form style={{color:"#F2C4C4"}}>
          <p class="fw-bold">Are you looking to rent a house?</p>

          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifHouse" id="house"/>
            <label for="house">
              Yes
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifHouse" id="notHouse" />
            <label for="notHouse">
              No
            </label>
          </div>
        </form>

        <form style={{color:"#F2C4C4"}}>
          <p class="fw-bold">Are you looking to rent an apartment?</p>

          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifApt" id="apt" />
            <label for="apt">
              Yes
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifApt" id="notApt" />
            <label for="notApt">
              No
            </label>
          </div>
        </form>

        <form style={{color:"#F2C4C4"}}>
          <p class="fw-bold">Are you okay with pets?</p>

          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifPets" id="pets" />
            <label for="pets">
              Yes
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifPets" id="pets" />
            <label for="noPets">
              No
            </label>
          </div>
        </form>
  
        <form style={{color:"#F2C4C4"}}>
          <p class="fw-bold">Do you drink?</p>

          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifDrinker" id="drinker" />
            <label for="drinker">
              Yes
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifDrinker" id="nonDrinker" />
            <label for="nonDrinker">
              No
            </label>
          </div>
        </form>

        <form style={{color:"#F2C4C4"}}>
          <p class="fw-bold">Do you smoke?</p>

          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifSmoker" id="smoker" />
            <label for="smoker">
              Yes
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifSmoker" id="nonSmoker" />
            <label for="nonSmoker">
              No
            </label>
          </div>
        </form>

        <form style={{color:"#F2C4C4"}}>
          <p class="fw-bold">Are you okay with having people over?</p>

          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifPartier" id="partier" />
            <label for="partier">
              Yes
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifPartier" id="nonPartier" />
            <label for="nonPartier">
              No
            </label>
          </div>
        </form>

        <form style={{color:"#F2C4C4"}}>
          <p class="fw-bold">Are you a morning person?</p>

          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifMornings" id="mornings" />
            <label for="mornings">
              Yes
            </label>
          </div>
          <div class="form-check mb-2">
            <label> 
              <input class="form-check-input" type="radio" name="ifMornings" id="nonMornings" />
              No
            </label>
          </div>
        </form>

        <form style={{color:"#F2C4C4"}}>
          <p class="fw-bold">Are you a night owl?</p>

          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifNights" id="nights" />
            <label for="mornings">
              Yes
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="ifNights" id="nonNights" />
            <label for="nonNights">
              No
            </label>
          </div>

          <div class="col-md-12 text-center">
            <Button class="rounded" variant="danger" onClick={updatePreferences}>Update Preferences</Button>
          </div>
        </form>
        <br></br>
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
        }}>Find Roomies!</Button>
      </div>

    </div>
  );
}

export default Preferences;
