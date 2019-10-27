const express = require("express");
const userRoute = express.Router();
const User = require("../models/regUser")
const Organization = require("../models/organization")
const bcrypt = require("bcryptjs")
const config = require("./config")
const jwt = require("jsonwebtoken")

var data;

var accounts = [];

function findUser(username) {
  return new Promise(function (resolve, reject) {
    console.log("FINDING IN THE USER COLLECTION")
    User.findOne({
      username: username
    })
      .then(doc => {
        if (doc) {
          console.log("THE USER INFO: " + doc)
          resolve(doc);
        } else {
          resolve("not found")
        }
      }).catch(err => {
        resolve("error");
        console.log(err)
      })
  })
}

async function findOrg(username) {
  var status = await findUser(username);
  return new Promise(function (resolve, reject) {
    console.log("result from user: " + status);
    if (status == "not found") {
      console.log("FINDING IN ORGANIZATION COLLECTION");
      Organization.findOne({
        username: username
      })
        .then(doc => {
          if (doc) {
            console.log("THE ORGANIZATION INFO: " + doc);
            resolve({ data: doc });
          } else {
            resolve({ data: "not found" });
          }
        }).catch(err => {
          resolve({ data: "error" });
          console.log(err);
        })
    } else {
      resolve({ data: status });
    }
  })
}

userRoute.route("/login").post(function (req, res) {
  console.log("LOGIN USER: " + req.body)
  getResult();

  async function getResult() {
    var fuser = await findOrg(req.body.username);
    console.log("result: " + fuser);
    console.log("finalizing request!")
    if (fuser.data != "not found") {
      bcrypt.compare(req.body.password, fuser.data.password)
        .then(match => {
          if (match) {
            console.log("correct")
            var token = jwt.sign({
              username: fuser.data.username,
              type: fuser.data.type,
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
            res.status(200).send({
              auth: true,
              token: token,
              type: fuser.data.type,
              message: "login successful"
            });
          } else {
            console.log("wrong password")
            res.status(401).json({
              message: "Wrong password"
            })
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
            res.status(500).json(err)
          }
        })
    } else if (fuser.data == "not found") {
      res.status(404).json({
        message: "user not found!"
      })
    } else {
      res.status(500).json({
        message: "Unexpected error occured!"
      })
    }
  }
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



userRoute.route("/signedup").get((req, res) => {
  user2 = data
  data = {}
  res.status(200).json(user2)
})

userRoute.route("/userType").post((req, res) => {
  console.log(req.body.credential)
  var user = jwt.decode(req.body.credential)
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
    res.status(401).json({
      message: "incorrect code"
    })
  }
})

userRoute.route("/certify").post((req, res) => {
  console.log(req.body.badgeInfo)
  var org = jwt.decode(req.body.user)
  var success = false;
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].username == org.username) {
      console.log("floop")
      var bad = accounts[i].badges;
      for (var j = 0; j < bad.length; ++j) {
        console.log("2")
        if (bad[j].code == req.body.badgeInfo.code) {
          console.log("3")
          success = true;
          var badge = req.body.badgeInfo;
          accounts[i].badges[j].granted = true;
          accounts[i].badges[j].descriptions = badge.descriptions;
          accounts[i].badges[j].certificateName = badge.certificateName;
          console.log(accounts[i].badges[j].recipient)
        }
      }
    }
  }
  if (success) {
    res.status(200).json({
      message: "successful"
    });
  } else {
    res.status(500).json({
      message: "Something wrong happen!"
    });
  }
})

function findRegUser(Username) {
  return new Promise(resolve => {
    User.findOne({
      username: Username
    }).then(doc => {
      if (doc) {
        resolve(doc);
      } else {
        resolve("not found");
      }
    }).catch(err => {
      console.log(err);
      resolve("error");
    })
  })
}

userRoute.route('/addrecipient').post((req, res) => {
  async function add() {
    var User = await findRegUser(req.body.username);
    if (User != "not found") {
      var org = jwt.decode(req.body.org);
      var newRecipient = { username: req.body.username, fullname: User.firstname + " " + User.lastname };
      Organization.findOne({badges: {$elemMatch: {code: req.body.code}}})
        .then((doc) => {
          console.log(doc);
          console.log("BADGE CODE: "+req.body.code);
          console.log("SUCCESSFULLY ADDED! "+User.firstname+" "+User.lastname);
          res.status(200).json({ message: "User successfully added!" });
        }).catch((err) => {
          console.log(err)
          res.status(500).json({ message: "Unexpected error occured!" });
        })
    } else if (User == "not found") {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.status(500).json({ message: "Unexpected error occured" });
    }
  }
  add();
})

function getBadges(username) {
  return new Promise(resolve => {
    Organization.find({
      'badges.recipient': { $in: { username: username } }
    }, 'badges').then(docs => {
      console.log("DOCS: "+docs);
      resolve(docs);
    }).catch(err => {
      console.log(err);
      resolve("error");
    })
  })
}

userRoute.route("/userbadges").post((req, res) => {
  async function getUserBadges() {
    var user = jwt.decode(req.body.user);
    var result = await getBadges(user.username);
    if (result != "error") {


    } else {
      res.status(500).json({
        message: "Unexpected error occured!"
      })
    }
  }
  getUserBadges();
})

function deleteUsers() {
  return new Promise(function (resolve, reject) {
    User.deleteMany({}).then(() => {
      resolve("ok")
    }).catch(err => {
      console.log(err);
      reject(err)
    })
  })
}

async function deleteAll() {
  var status = await deleteUsers();
  if (status == "ok") {
    Organization.deleteMany({}).then(() => {
      return true;
    }).catch(err => {
      console.log(err);
      return false;
    })
  }
}





//REGULAR USER SIGN UP
userRoute.route("/fullsignup").post((req, res) => {
  // var result = deleteAll();
  // if (result) {
  //   console.log("SUCCESSFULLY DELETED!");
  // } 
  getResult();
  async function getResult() {
    var result = await findOrg(req.body.username);
    console.log("RESULT FROM ORG COLLECTION: " + result);
    if (result.data == "not found") {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const user = new User(req.body)
      console.log(user)
      user.save()
        .then((data) => {
          var token = jwt.sign({
            username: user.username,
            type: user.type
          }, config.secret, {
              expiresIn: 86400
            });
          res.status(200).send({
            auth: true,
            token: token
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        })
    } else if (result.data == "error") {
      res.status(500).json({ message: "Unexpected error occured!" })
    } else {
      console.log("RESPOND 400 ALREADY TAKEN")
      res.status(400).json({ message: "Username is already taken!" })
    }
  }
})


//ORGANIZATION SIGN UP
userRoute.route("/orgsignup").post((req, res) => {
  getResult();
  async function getResult() {
    var result = await findOrg(req.body.username);
    console.log("RESULT FROM ORG COLLECTION: " + result)
    if (result.data == "not found") {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const user = new Organization(req.body)
      console.log(user)
      user.save()
        .then((data) => {
          var token = jwt.sign({
            username: user.username,
            type: user.type
          }, config.secret, {
              expiresIn: 86400
            });
          res.status(200).send({
            auth: true,
            token: token
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        })
    } else if (result.data == "error") {
      res.status(500).json({ message: "Unexpected error occured!" })
    } else {
      console.log("RESPOND 400 ALREADY TAKEN")
      res.status(400).json({ message: "Username is already taken!" })
    }
  }
})

//************************************************************************************************************** */
function orgInfo(username) {
  return new Promise(function (resolve, reject) {
    Organization.findOne({
      username: username
    }).then(doc => {
      if (doc) {
        resolve({ data: doc });
      }
    }).catch(err => {
      resolve({ data: "error" })
      console.log(err);
    })
  })
}



userRoute.route("/offerbadge").post((req, res) => {
  var org = jwt.decode(req.body.user);
  console.log(req.body.badge);
  Organization.updateOne({ username: org.username }, { $push: { badges: req.body.badge } })
    .then(() => {
      console.log("UPDATE SUCCESSFUL");
      res.status(200).json({ message: "successfull added" });
    }).catch(err => {
      res.status(500).json({ message: "un error occured!" });
      console.log(err);
    })
})


userRoute.route("/badges-org").post((req, res) => {
  async function getOrgBadges() {
    var user = jwt.decode(req.body.data);
    var org = await orgInfo(user.username);
    if (org.data != "error") {
      res.status(200).json({
        badges: org.data.badges
      })
    } else {
      res.status(500).json({
        message: "an error has occured!"
      })
    }
  }
  getOrgBadges();
})



userRoute.route("/pendingbadges").post((req, res) => {
  async function getPendingBadges() {
    var user = jwt.decode(req.body.data);
    var org = await orgInfo(user.username);
    if (org.data != "error") {
      var badges = org.data.badges;
      var pendingbadges = [];
      badges.forEach(function (badge) {
        if (!badge.granted) {
          pendingbadges.push(badge);
        }
      });
      console.log("THE ORG HAS " + pendingbadges.length + " PENDING BADGES")
      console.log(pendingbadges);
      res.status(200).json({
        badges: pendingbadges
      })
    } else {
      res.status(500).json({
        message: "unexpected error occured!"
      })
    }
  }
  getPendingBadges();
})


function findSameCode(bcode) {
  return new Promise(function (resolve, reject) {
    console.log("finding in record in org with the code======> " + bcode);
    Organization.findOne({
      badges: { code: bcode }
    }).then((doc) => {
      if (doc) {
        resolve("Taken");
      } else {
        resolve("notTaken");
      }
    }).catch((err) => {
      console.log(err);
    })
  })
}

userRoute.route("/validatecode").post((req, res) => {
  checkCode();
  async function checkCode() {
    var status = await findSameCode(req.body.code);
    console.log("RESULT FROM ORG COLLECTIN: " + status);
    if (status == "notTaken") {
      console.log("THE CODE " + req.body.code + "IS NOT YET TAKEN!");
      res.status(200).json({
        message: "Ok"
      })
    } else {
      console.log("THE CODE " + req.body.code + "IS ALREADY TAKEN!");
      res.status(400).json({
        message: "Code is taken, regenerate new!"
      })
    }
  }
})


//========================================================================================================

userRoute.route("/userInfo").post((req, res) => {
  var user = jwt.decode(req.body.data);
  getResult();
  async function getResult() {
    var result = await findOrg(user.username);
    if (result.data != "not found" && result.data != "error") {
      res.status(200).json({ data: result.data });
    } else if (result.data == "error") {
      res.status(500).json({ message: "Unexpected error occured!" });
    }
  }
})


module.exports = userRoute;
