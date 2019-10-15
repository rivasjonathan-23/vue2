const express = require('express');
const userRoute = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('./config')
const jwt = require('jsonwebtoken')

var data;



userRoute.route("/login").post(function (req, res) {
    var token = req.headers['authorization'];
    console.log(token)
    if (req.body.username == "rivas" && req.body.password == "password") {
        var token = jwt.sign({
            id: req.body.username,                            
        }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({
            auth: true,
            token: token,
            message: "login successful"
        });
        console.log("this is the " + token)
    } else {
        console.log('wrong password')
        res.status(200).json({
            message: "login unsuccessful"
        })
    }
    // User.findOne({
    //         username: req.body.username
    //     })
    //     .then(doc => {
    //         if (doc) {
    //             console.log(doc)
    //             bcrypt.compare(req.body.password, doc.password)
    //                 .then(match => {
    //                     if (match) {
    //                         console.log("correct")
    //                         var token = jwt.sign({
    //                             id: doc._id,                            
    //                         }, config.secret, {
    //                             expiresIn: 86400 // expires in 24 hours
    //                         });
    //                         res.status(200).send({
    //                             auth: true,
    //                             token: token,
    //                             message: "login successful"
    //                         });
    //                         console.log("this is the " + token)
    //                     } else {
    //                         console.log('wrong password')
    //                         res.status(200).json({
    //                             message: "Wrong password"
    //                         })
    //                     }
    //                 })
    //                 .catch(err => {
    //                     if (err) {
    //                         console.log(err)
    //                         res.json(err)
    //                     }
    //                 })
    //         }
    //     })
})



userRoute.route("/checkusername").post((req, res) => {
    console.log(req.body)

    if (req.body.username == "rivas") {
        res.status(200).json({message: "username already exist"})
    } else {
        res.status(200).json({message: "ok"})
    }
    // User.findOne({
    //         username: req.body.username
    //     })
    //     .then(doc => {
    //         if (doc) {
    //             res.status(200).json({
    //                 message: "username already exist"
    //             })
    //             //console.log(doc)
    //         }
    //         if (!doc) {
    //             res.status(200).json({message: "ok"})
    //         }

    //     })
    //     .catch(err => {
    //         console.log(err)
    //         if (err) {
    //             res.status(200).json({
    //                 message: err.name
    //             })
    //         }
    //     })
})

var user= { username: "", password: ""}
userRoute.route("/signup").post((req, res) => {

    data = req.body
    user = req.body;
    var token = jwt.sign({
        username: user.username,
        password: user.password
    }, config.secret, {
        expiresIn: 86400 
    });
    res.status(200).send({
        user: user,
        auth: true,
        token: token
    });
    
    // let user = new User(req.body)
    // user.save()
    //     .then(() => {
    //         console.log('saved')
    //         console.log("id" + user._id)
    //         data = req.body
    //         var token = jwt.sign({
    //             username: user.username,
    //             password: user.password
    //         }, config.secret, {
    //             expiresIn: 86400 // expires in 24 hours
    //         });
    //         res.status(200).send({
    //             auth: true,
    //             token: token
    //             //user : 
    //         });
    //         console.log("this is the " + token)
    //         // res.status(200).json({
    //         //     message: "Sign up successfully"
    //         // })

    //     })
    //     .catch(err => {
    //         if (err) {
    //             res.status(200).json({
    //                 message: "Unexpected error occured"
    //             })
    //         }

    //     })
})

userRoute.route('/signedup').get((req,res) => {
    res.status(200).json(data)
})

userRoute.route('/fullsignup').post((req,res) =>{
    data = {}
    console.log("hello")
    console.log(req.body)
})



module.exports = userRoute