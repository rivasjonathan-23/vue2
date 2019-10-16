import axios from "axios";
export function checkName(username) {
    console.log(username)
  axios
    .post("http://localhost:8081/user/checkusername", {
      username: username
    })
    .then(
      response => {
        if (response.data.message != "username already exist") {
          return false
        } else {
          return true
        }
      },
      err => {
        console.log("error occured");
      }
    );
}
