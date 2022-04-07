import React, { Component } from 'react'
import logo from './media/Roomie.png'
import './newStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

class RegistrationPage extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    }

    this.changeFirstName = this.changeFirstName.bind(this)
    this.changeLastName = this.changeLastName.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeFirstName(event) {
    this.setState({
      firstName: event.target.value
    })
  }

  changeLastName(event) {
    this.setState({
      lastName: event.target.value
    })
  }

  changeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  changePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()

    const registered = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }

    axios.post('http://localhost:3001/app/signup', registered)
      .then((response) => { 
        alert("You're account has been registered!")
        window.location = '/Preferences'
      })
      .catch((err) => {
        alert('username already in use')
    })
  }
  
  render() {
      return(
      <div style={{backgroundColor: '#F26666'}}>
        <img src={logo} className="logos" alt="logo" />
        <div>
        <form className='registration' onSubmit={this.onSubmit} >
            <label>first name: 
            <input className='registration-input' 
            onChange={this.changeFirstName} 
            value={this.state.firstName}
            type="text" 
            />
            </label>
            <br />
            <br />

            <label>last name: 
            <input className='registration-input' 
            type="text" 
            onChange={this.changeLastName}
            value={this.state.lastName}
            />
            </label>
            <br />
            <br />

            <label>username: 
            <input className='registration-input' 
            type="text" 
            onChange={this.changeUsername}
            value={this.state.username}
            />
            </label>
            <br></br>
            <br></br>

            <label>enter password: 
            <input className='registration-input' 
            type="password" 
            onChange={this.changePassword}
            value={this.state.password} 
            />
            </label>
            <br></br>
            <br></br>

            <input className="acc-button" type="submit" id="button" value="Create Account"/>
        </form>
      </div>
    </div>
    )
  }
}


export default RegistrationPage