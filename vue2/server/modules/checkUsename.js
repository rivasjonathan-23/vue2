const express = require("express");
const userRoute = express.Router();
const User = require("../models/regUser");
const Organization = require("../models/organization");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.findUser = function (username) {
  return new Promise(function (resolve, reject) {
    console.log("FINDING IN THE USER COLLECTION")
    User.findOne({
      username: username
    })
      .then(doc => {
        if (doc) {
          console.log("THE USER INFO: " + doc);
          resolve(doc);
        } else {
          resolve("not found");
        }
      }).catch(err => {
        resolve("error");
        console.log(err);
      });
  });
};

