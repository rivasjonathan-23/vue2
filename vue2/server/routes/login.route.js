const express = require("express");
const checker = require("../modules/checkOrgname");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("./config");
const loginRoute = express.Router();

loginRoute.route("/").post(function (req, res) {
    console.log("LOGIN USER: " + req.body)
    getResult();
  
    async function getResult() {
      var fuser = await checker.findOrg(req.body.username);
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
              });
            }
          })
          .catch(err => {
            if (err) {
              console.log(err)
              res.status(500).json(err)
            }
          });
      } else if (fuser.data == "not found") {
        res.status(404).json({
          message: "user not found!"
        });
      } else {
        res.status(500).json({
          message: "Unexpected error occured!"
        });
      }
    }
  });

  module.exports = loginRoute