import Axios from "axios";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import logo from './media/Roomie.png';

function Preferences () {
  const [preferences, setPreferences] = useState([]);
  const [_id, set_id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [roomies, setRoomies] = useState([]);
  
  var currentUser = {  "_id": "624f837b03c31299799e3dc9",  "firstName": "newUserPerson",  "lastName": "userUser",  "username": "newUser105",  "password": "$2b$12$nFe8xYP8NBm7yJXDpfSPGOaRQHFf7Uw6dpfBAe.S1kdrIh20RqNKy",  "roomies": [],  "preferences": [ "bowling" ]};
  var questions = ["ifHouse", "ifApt", "ifPets", "ifDrinker", "ifSmoker", "ifPartier", "ifMornings", "ifNights"];
  var answers = [];

  const updatePreferences = () => {
    answers = questions.map(function(question){
      console.log(question + ": " + document.querySelector("input[name='" + question + "']:checked").id);
      return document.querySelector("input[name='" + question + "']:checked").id;
    });
      
    setPreferences(answers);
    set_id(currentUser._id);
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setUsername(currentUser.username);
    setRoomies(currentUser.roomies);
    setPassword(currentUser.password);

    Axios.post("http://localhost:3001/udpatePreferences", {
      _id,
      firstName,
      lastName,
      username,
      password,
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

      <div style={{ color: "#F2EFE4",  fontSize: "25px"}}>
        <h4 class="fw-bold text-center mt-3"> </h4>

        <form >
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

        <form >
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

        <form >
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
  
        <form >
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

        <form >
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

        <form >
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

        <form >
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

        <form >
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
          window.location.href='/Chores';
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
          window.location.href='/RoommateFinder';
        }}>Find Roomies!</Button>
      </div>

    </div>
  );
}

export default Preferences;