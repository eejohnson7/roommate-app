import React, { Component } from 'react'
import logo from './media/Roomie.png'
import pic from './media/roommates.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './newStyle.css'
import axios from "axios"
var currentUser

class LoginPage extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '' 
        }
        this.checkUsername = this.checkUsername.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    checkUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    checkPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const login = {
          username: this.state.username,
          password: this.state.password
        }
    
        axios.post('http://localhost:3001/app/login', login)
          .then((user) => { 
            currentUser = user.data.firstName
            window.location = '/Chores'
            alert("The current user is " + currentUser)
          })
          .catch((err) => {
            alert('Invalid username or password')
        })
      }


    render() {
        return (
        <>
            <div style={{backgroundColor: "#F26666"}}>
            <div>
            <img src={logo} className="logos" alt="Logo" />
            </div>
            <div className='text-read' >
                <h2 className='header-one'>Welcome to Roomie!</h2>
                <br />
                <div>
                    <form onSubmit={this.onSubmit}>
                    <label>enter username:  </label>
                    <input 
                    type="text" 
                    onChange={this.checkUsername}
                    value={this.state.username}
                    />
                    <br />
                    <br />

                    <label>enter password: </label>
                    <input 
                    type="password" 
                    onChange={this.checkPassword}
                    value={this.state.password}
                    />
                    <br />
                    <br />

                    <input className="acc-button" type="submit" id="button" value="Login" />
                    </form>
                </div>
                    <br />
                    <h4>Don't have an account? <a href='/RegistrationPage'><u>Sign Up</u></a></h4>
                    <div>
            <img src={pic} className='picture' alt="picture"/>
            </div>
            </div>
            </div>
        </>
        )
    }
}

export default LoginPage