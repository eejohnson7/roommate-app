const User = require('../models/Users')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')



router.post('/signup', (req, res)=> {
    var { firstName, lastName, username, password } = req.body
    console.log(req.body)
    if( !firstName || !lastName || !username || !password )
    {
        return res.status(200).json({error:"Add all data"})
    }
    bcrypt.hash(password, 12)
    .then((hashedpw) => {
        User.findOne({ username: username })
        .then((savedUser) => {
            if (savedUser) {
                 return res.status(422).json({error:"User already exists with that username"})
            }
            const user=new User({
             firstName,
             lastName,
             username,
             password: hashedpw,
         })
         user.save()
         .then((user)=>{
             res.json({message:"Saved Successfully"})
             console.log(user.username)
         })
         .catch((err)=>{
             console.log(err)
         })
    })
    .catch((err)=>{
        console.log(err)
    })   

})
.catch((err)=>{
    console.log(err)
    })
})


const auth = router.post('/login', (req, res) => {
    var { username, password } = req.body
    if(!username || !password )
    {
        return res.status(422).json({error:"Please add all fields"})
    }
    User.findOne({ username: username })
    .then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({ error:"Invalid username or password" })
       }
        bcrypt.compare(password, savedUser.password)
        .then(match => {
            if (match)
            {
                res.json({ 
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    username: savedUser.username,
                    roomies: savedUser.roomies,
                    preferences: savedUser.preferences 
                })
            }
            else{
                return res.status(422).json({error:"Invalid username or password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
})

router.get('getInfo', auth, (req, res) => {
    var { firstName, lastName, username, password} = req.body
    if(auth) {
        User.findOne({ username: username})
            .then((user) => {
                console.log(user.firstName)
            })
            .catch((err) => {
                console.log(err)
            })
    }
})

module.exports = router