const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

const userRoute = require('../routes/forTesting')

// const config = require('./DB')
    
// mongoose.Promise = global.Promise;

// mongoose.connect(config.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(
//     () => {
//         console.log('Database is connected')
//     },
//     err => {
//        console.log('Can not connect to the database' + err)
//     }
// );

app.use(cors())




app.use("/user",userRoute)

// var user = {username: "", password: ""}
app.get("/", (req, res) => {
    res.send("Hello")
})

// app.post("/login", (req, res) => {
//     console.log(req.body.accountinfo)
//     console.log(req.body)
//     if ("rivas" == req.body.username && req.body.password == "123") {
//         res.status(200).end("login successful")
//     } else {
//         res.status(200).end("invalid credential")
//     }
// })

// app.post("/fullsignup", (req, res) => {
//     user.username = ''
//     user.password = ''
//     console.log(req.body)
// })

// app.post("/checkusername", (req, res) => {
//     var user = "rivas"
//     if (user == req.body.username) {
//         res.status(200).end("username already used!")
//     } else {
//         console.log(req.body)
//         res.status(200).end("success")
//     }
// })


// app.post("/signup", (req, res) => {
//     user = {
//         username: req.body.username,
//         password: req.body.password
//     }
//     console.log(req.body)
//     res.status(200).end("successful")
// })

// app.post("/search", (req, res) => {
//     if (req.body.user == "rivas"){
//         res.status(200).json({"respond":"Congratulations, you found Jonathan Rivas, bwahahahaha"})
//     } else {
//         res.status(200).json({"respond":"Cannot find user!"})
//     }
// })

// app.get("/signedup", (req, res) => {
   
//     var data = user
//     if (data.username != '') {
//         res.status(200).json({"data": data})
//     } else {
//         res.status(200).json({"data":"error"})
//     }
// })

app.listen(process.env.PORT || 8081)
console.log("app listening on post 8089")