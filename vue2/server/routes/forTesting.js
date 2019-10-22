const express = require("express");
const userRoute = express.Router();
// const User = require("../models/User")
// const bcrypt = require("bcryptjs")
const config = require("./config")
const jwt = require("jsonwebtoken")

var data;

var accounts = [];

userRoute.route("/login").post(function (req, res) {
  console.log(accounts)
  sent = false;
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].username == req.body.username && accounts[i].password == req.body
      .password) {
      console.log("HELLO PEOPLE")
      var token = req.headers["authorization"];
      console.log(token)

      var token = jwt.sign({
        username: req.body.username,
        password: req.body.password,
        type: accounts[i].type
      }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
      sent = true;
      res.status(200).json({
        auth: true,
        type: accounts[i].type,
        token: token,
        message: "login successful"
      });
      console.log("this is the " + token)
    }

  }
  if (true) {
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
  var availed = false;
  for (var j = 0; j < accounts.length; ++j) {
    if (accounts[j].type == "Organization") {
      var bad = accounts[j].badges;
      for (var i = 0; i < bad.length; ++i) {
        if (bad[i].code == req.body.code) {
          availed = true;
          var user = jwt.decode(req.body.credentials);
          accounts[j].badges[i].recipient.push({
            username: user.username,
            Fullname: "Jonathan Rivas"
          });
          res.status(200).json({
            message: "successful"
          });
          break;
        }
      }
    }
  }
  if (!availed) {
    res.status(200).json({
      message: "incorrect code"
    })
  }
})

userRoute.route("/certify").post((req, res) => {
  console.log(req.body.badgeInfo)
  var org = jwt.decode(req.body.user)
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].username == org.username) {
      console.log("floop")
      var bad = accounts[i].badges;
      for (var j = 0; j < bad.length; ++j) {
        console.log("2")
        if (bad[j].code == req.body.badgeInfo.bcode) {
          console.log("3")
          var badge = req.body.badgeInfo;
          accounts[i].badges[j].granted = true;
          accounts[i].badges[j].descriptions = badge.descriptions;
          accounts[i].badges[j].certificateName = badge.certificateName;
          console.log(accounts[i].badges[j])
        }
      }
    }
  }

})

userRoute.route("/userbadges").post((req, res) => {
  var user = jwt.decode(req.body.user);
  console.log(user)
  var badges = [];
  
  for (var i=0;i<accounts.length;++i) {
    var bad = accounts[i].badges;
    for (var j=0;j<bad.length;++j){
      for (var h=0; h < bad[j].recipient.length;++h) {
        if (bad[j].recipient[h].username == user.username && bad[j].granted) {
          badges.push(bad)[j];
        }
      }
    }
  }
  res.status(200).json({badges: badges});

})

var userInfo; //temporary storage of information
userRoute.route("/fullsignup").post((req, res) => {
  data = {}
  console.log("hello")
  console.log(req.body)
  userInfo = req.body
  user = req.body;
  accounts.push(user);
  console.log(accounts)
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
  accounts.push(user);
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
  var org = jwt.decode(req.body.user);
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].username == org.username) {
      req.body.badge.organization = accounts[i].orgName;
      accounts[i].badges.push(req.body.badge);
    }
  }
})

userRoute.route("/badges-org").post((req, res) => {
  console.log(req.body.data);
  var org = jwt.decode(req.body.data);
  console.log("this badges org request");
  console.log(org);
  var orgbadge = [];
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].username == org.username) {
      console.log("IM HERE")
     orgbadge = accounts[i].badges;
    }
  }
  res.status(200).json({badges: orgbadge});
})



//========================================================================================================


userRoute.route("/userInfo").post((req, res) => { //to get the information of the user
  console.log(req.body.data)
  var user = jwt.decode(req.body.data)
  //decode the token and use the username and password to search the information of that account
  //user.username and user.password will be used to retrieve information
  console.log("this the org")
  console.log(user)
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].username == user.username && accounts[i].password == user.password)
      userInfo = accounts[i];
  }
  res.status(200).json({
    data: userInfo //wil be replaced by the data from database
  })
})







module.exports = userRoute
