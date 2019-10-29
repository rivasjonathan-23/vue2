const checker = require('./checkUsename');
const Organization = require("../models/organization");

exports.findOrg = async function(username) {
    var status = await checker.findUser(username);
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
          });
      } else {
        resolve({ data: status });
      }
    });
  }
  