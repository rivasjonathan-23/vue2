const express = require("express");
const userRoute = express.Router();
// const User = require("../models/User")
// const bcrypt = require("bcryptjs")
const config = require("./config")
const jwt = require("jsonwebtoken")

var data;



userRoute.route("/login").post(function (req, res) {
  var token = req.headers["authorization"];
  console.log(token)
  if (req.body.username == "rivas" && req.body.password == "password") {
    var token = jwt.sign({
      username: req.body.username,
      password: req.body.password,
      type: "Regular user"
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
    console.log("wrong password")
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
  //                         console.log("this is the "+ token)
  //                     } else {
  //                         console.log("wrong password")
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
    res.status(200).json({
      message: "username already exist"
    })
  } else {
    res.status(200).json({
      message: "ok"
    })
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


var user = {
  username: "",
  password: ""
}
userRoute.route("/signup").post((req, res) => {
  data = req.body
  user = req.body;
  res.status(200).end()
});

// let user = new User(req.body)
// user.save()
//     .then(() => {
//         console.log("saved")
//         console.log("id"+ user._id)
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
//         console.log("this is the "+ token)
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
// })

userRoute.route("/signedup").get((req, res) => {
  user2 = data
  data = {}
  res.status(200).json(user2)
})

userRoute.route("/userType").post((req, res) => {
  console.log(req.body.data)
  var user = jwt.decode(req.body.data)
  console.log(user)
  var type = user.type //example the user type is "Regular user"
  res.status(200).json({
    userType: type
  })
})
var badges = [] //temporary storage for offered or posted badges


userRoute.route("/availbadge").post((req, res) => {
  console.log(req.body);
  var availed =false;
  for (var i=0;i<badges.length; ++i) {
    if (badges[i].code == req.body.code) {
      availed = true;
      var user = jwt.decode(req.body.credentials);
      badges[i].recipient.push({username: user.username, role: "role model haha"});
      res.status(200).json({message: "successful"});
    }
  }
  if (!availed) {
    res.status(200).json({message: "incorrect code"})
  }
})

userRoute.route("/certify").post((req, res) => {
  var user = jwt.decode(req.body.credentials)
  if (user.username == "Jonathan") { //as if gipangita nato sa database
    console.log(badges);
    res.status(200).json({badges: badges});
  }
})



userRoute.route("/postbadges").get((req, res) => {
  res.status(200).json({badges: badges})
})

var userInfo; //temporary storage of information
userRoute.route("/fullsignup").post((req, res) => {
  data = {}
  console.log("hello")
  console.log(req.body)
  userInfo = req.body
  user = req.body;
  var token = jwt.sign({
    username: user.username,
    password: user.password,
    type: user.type
  }, config.secret, {
    expiresIn: 86400
  });
  res.status(200).send({
    user: user,
    auth: true,
    token: token
  });
})


//=========================FOR ORGANIZATION============================================================
userRoute.route("/orgsignup").post((req, res) => {
  data = {}
  console.log("hello")
  console.log(req.body)
  user = req.body;
  userInfo = req.body
  var token = jwt.sign({
    username: user.username,
    password: user.password,
    type: user.type
  }, config.secret, {
    expiresIn: 86400
  });
  res.status(200).send({
    user: user,
    auth: true,
    token: token
  });
})

userRoute.route("/offerbadge").post((req, res) => {
  console.log(badges)
  badges.push(req.body)
})

userRoute.route("/badges-org").post((req, res) => {
  console.log(req.body.data)
  var org = jwt.decode(req.body.data)
  console.log(org.username)//gamiton ang username nga gikan sa token para makuha iyang mga badge sa database
  if (org.username == "Jonathan") {
    res.status(200).json({badges: badges})
  }
})

//========================================================================================================


userRoute.route("/userInfo").post((req, res) => { //to get the information of the user
  console.log(req.body.data)
  var user = jwt.decode(req.body
    .data) //decode the token and use the username and password to search the information of that account
  //user.username and user.password will be used to retrieve information
  res.status(200).json({
    data: userInfo //wil be replaced by the data from database
  })
})







module.exports = userRoute
