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
  tempdata = {};
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







var tempdata = {
  username: "",
  password: ""
}
userRoute.route("/signup").post((req, res) => {
  tempdata = req.body
  res.status(200).end()
});



userRoute.route("/signedup").get((req, res) => {
  res.status(200).json(tempdata)
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

function findBadge(bcode) {
  return new Promise(resolve => {
    console.log("finding badge.................")
    Organization.findOne({ badges: { $elemMatch: { code: bcode } } })
      .then((doc) => {
        if (doc) {
          resolve(doc);
        } else {
          resolve("not found");
        }
      }).catch((err) => {
        console.log(err);
        resolve("error");
      })
  })
}

userRoute.route("/certify").post((req, res) => {
  async function certify() {
    var badge = req.body.badgeInfo;
    var result = await findBadge(badge.code);
    if (result == "error") {
      console.log("badge not found");
      res.status(500).json({ message: "Error occured!" });
    } else if (result != "not found") {
      console.log("badge found: ==> " + result.badges);
      for (var i = 0; i < result.badges.length; ++i) {
        if (result.badges[i].code == badge.code) {
          console.log("updating badge.....");
          result.badges[i].granted = true;
          result.badges[i].certificateName = badge.certificateName;
          result.badges[i].descriptions = badge.descriptions;
          Organization.updateOne({ badges: { $elemMatch: { code: badge.code } } }, result)
            .then(() => {
              console.log(result.badges[i]);
              res.status(200).json({
                message: "Successfully ceritified"
              })
            }).catch(err => {
              console.log("errror in certifying...")
              console.log(err);
              res.status(500).json({
                message: "Unexpected error occured!"
              })
            })
        }
      }
    }
  }
  certify();
})

function findRegUser(Username) {
  return new Promise(resolve => {
    User.findOne({
      username: Username
    }, { '_id': 0 }).then(doc => {
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

function addAndAvailBadge(data, User) {
  return new Promise(resolve => {
    var newRecipient = { username: data.username, fullname: User.firstname + " " + User.lastname };
    Organization.findOne({ badges: { $elemMatch: { code: data.code } } })
      .then((doc) => {
        var badges = doc.badges;
        for (var i = 0; i < badges.length; ++i) {
          if (badges[i].code == data.code) {
            var obadge = badges[i].recipient;
            var existed = false;
            for (var j = 0; j < obadge.length; ++j) {
              if (obadge[j].username == data.username) {
                existed = true;
                resolve("UserAlreadyInTheList");
              }
            }
            if (!existed) {
              doc.badges[i].recipient.push(newRecipient);
              console.log(doc.badges[i].recipient);
              Organization.updateOne({ badges: { $elemMatch: { code: data.code } } }, doc, { new: true })
                .then(() => {
                  resolve("Successful");
                }).catch((err) => {
                  console.log(err);
                  resolve("Error");
                });
            }
          }
        }
      }).catch((err) => {
        console.log(err)
        resolve("Error");
      })
  })
}

userRoute.route('/addrecipient').post((req, res) => {
  async function add() {
    var data = req.body;
    var User = await findRegUser(data.username);
    if (User != "not found") {
      var result = await addAndAvailBadge(req.body, User);
      if (result == "Successful") {
        console.log("User successfully added")
        res.status(200).json({ message: "User successfully added" });
      } else if (result == "UserAlreadyInTheList") {
        console.log("User already exist in the list!")
        res.status(400).json({ message: "User already exist in the list!" });
      } else {
        res.status(500).json({ message: "Unexpected error occured" });
      }
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
    Organization.find({}, "badges").then(docs => {
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
      var badges = [];
      result.forEach(function (b) {
        b.badges.forEach(function (bdg) {
          bdg.recipient.forEach(function (re) {
            if (re.username == user.username) {
              badges.push(bdg);
            }
          })

        })
      })
      res.status(200).json({ badges: badges });
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
  tempdata = {};
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
  tempdata = {};
})

//************************************************************************************************************** */
function orgInfo(username) {
  return new Promise(function (resolve, reject) {
    Organization.findOne({
      username: username
    }, { '_id': 0 }).then(doc => {
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
  async function offer() {
    var org = jwt.decode(req.body.user);

    var orginf = await orgInfo(org.username);
    req.body.badge.organization = orginf.data.orgName;
    Organization.updateOne({ username: org.username }, { $push: { badges: req.body.badge } })
      .then(() => {
        console.log("UPDATE SUCCESSFUL");
        res.status(200).json({ message: "successfull added" });
      }).catch(err => {
        res.status(500).json({ message: "un error occured!" });
        console.log(err);
      })
  }
  offer();
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
          var recipient = [];
          badge.recipient.forEach(function (re) {
            recipient.push({ username: re.username, fullname: re.fullname });
          })
          badge.recipient = recipient;
          console.log(recipient);
          console.log(badge);
          pendingbadges.push(badge);
        }
      });
      console.log("THE ORG HAS " + pendingbadges.length + " PENDING BADGES")
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
