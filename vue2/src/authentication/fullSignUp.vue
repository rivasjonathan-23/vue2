<template>
  <div class="innercont">
    <b-form @submit.prevent="register">
      <b-row>
        <b-col sm="4">
          <p class="sign">Sign Up</p>
          <div class="inputholder">
            <span>Username</span>
            <b-input type="text" placeholder="Username" required v-model="username"></b-input>
            <transition name="slide-fade">
              <span class="err" v-if="err">Username already taken!</span>
            </transition>
          </div>
          <div class="inputholder">
            <b-input type="password" placeholder="Password" required v-model="password"></b-input>
            <transition name="slide-fade">
              <span
                class="err"
                v-show=" password.length < 8 && password  != ''"
              >must be at least 8 characters!</span>
            </transition>
          </div>
          <div class="inputholder">
            <b-input
              type="password"
              placeholder="Confirm passwords"
              required
              v-model="confirmpassword"
            ></b-input>
            <transition name="slide-fade">
              <span
                class="err"
                v-show="confirmpassword != password && confirmpassword && password"
              >Password doesn't match!</span>
            </transition>
          </div>
        </b-col>
        <b-col id="perinfo" sm="8">
          <p class="sign2">Personal Information</p>
          <b-row class="fllnameholder">
            <b-col class="fncol">
              <div class="inputholder2">
                <span>Firstname</span>
                <b-input type="text" placeholder="First name" required v-model="firstname"></b-input>
              </div>
            </b-col>
            <b-col class="fncol">
              <div class="inputholder2">
                <span>Lastname</span>
                <b-input type="text" placeholder="Last name" required v-model="lastname"></b-input>
              </div>
            </b-col>
          </b-row>
          <div class="inputholder2">
            <span>Address</span>
            <b-input type="text" placeholder="Address" required v-model="address"></b-input>
          </div>
          <table class="srow">
            <td>
              <div class="fname">
                <div class="inputholder2">
                  <span>Age</span>
                  <b-input type="number" placeholder="Age" required v-model="age" min="12"></b-input>
                </div>
              </div>
            </td>
            <td>
              <div class="fname">
                <div class="inputholder2">
                  <span>Birthdate</span>
                  <table class="bday">
                    <td>
                      <b-input
                        autocomplete="off"
                        type="text"
                        placeholder="Month"
                        min="1"
                        id="mnth"
                        max="12"
                        required
                        v-model="birthdate.month"
                      ></b-input>
                      <div class="month">
                        <div v-for="(m,n) in cal" :key="n">
                          <h5 class="m" @click="month(m)">{{m}}</h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <b-input
                        type="number"
                        placeholder="Day"
                        min="1"
                        max="32"
                        required
                        v-model="birthdate.day"
                      ></b-input>
                    </td>
                    <td>
                      <b-input
                        type="number"
                        placeholder="Year"
                        min="1990"
                        max="2019"
                        required
                        v-model="birthdate.year"
                      ></b-input>
                    </td>
                  </table>
                </div>
              </div>
            </td>
            <td>
              <div class="inputholder2 genders">
                <span class="g">Gender</span>
                <table>
                  <tr>
                    <td>
                      <b-form-radio v-model="gender" class="Gender" value="A">
                        <span class="glabel">Female</span>
                      </b-form-radio>
                    </td>
                    <td>
                      <b-form-radio v-model="gender" class="Gender" value="A">
                        <span class="glabel">Female</span>
                      </b-form-radio>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </table>
          <div class="inputholder2">
            <span>Email</span>
            <b-input type="email" placeholder="Email" required v-model="email"></b-input>
          </div>
          <table class="lastrow">
            <td>
              <div class="inputholder2">
                <span>Work</span>
                <b-input
                  type="text"
                  placeholder="Occupation | optional"
                  required
                  v-model="occupation"
                ></b-input>
              </div>
            </td>
            <td>
              <div class="inputholder2">
                <span>Company</span>
                <b-input
                  type="text"
                  placeholder="Occupation | optional"
                  required
                  v-model="occupation"
                ></b-input>
              </div>
            </td>
            <td id="years">
              <div class="inputholder2">
                <span>Years</span>
                <b-input type="number" placeholder="Years" required v-model="years" min="1"></b-input>
              </div>
            </td>
          </table>
          <b-button
            v-on:click="redirect('/signUpAs')"
            type="submit"
            class="lgnbtn"
            variant="primary"
          >
            <span v-if="!loading">Login</span>
            <span v-else>
              <span>Loading&nbsp;</span>
              <b-spinner class="align-middle"></b-spinner>&nbsp;
            </span>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "FullSignUp",
  data() {
    return {
      username: "",
      password: "",
      confirmpassword: "",
      firstname: "Jonathan",
      lastname: "Rivas",
      email: "rivas@gmail.com",
      age: 21,
      address: "Sa imong heart ayeehh",
      occupation: "POORgrammer",
      gender: "Male",
      birthdate: { month: "September", day: 23, year: 1998 },
      isValid: true,
      years: 10,
      err: false,
      type: "",
      loading: false,
      cal: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      focus: false
    };
  },

  methods: {
    register() {
      let userInfo = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        birthdate: this.birthdate,
        email: this.email,
        address: this.address,
        occupation: this.occupation,
        gender: this.gender,
        years: this.years,
        age: this.age,
        type: "Regular user"
      };
      if (
        this.isValid &&
        this.password != "" &&
        this.password == this.confirmpassword
      ) {
        this.loading = true;
        this.$store
          .dispatch("fullsignup", userInfo)
          .then(() => {
            this.$router.push("/user");
            this.err = false;
            $("#unameErr").css({ background: "#555657" });
          })
          .catch(err => {
            $("#unameErr").css({ background: "red" });
            this.err = true;
          });
      } else {
        alert("invalid credentials!");
      }
    },
    checkUsername() {
      axios
        .post("http://localhost:8081/user/checkusername", {
          username: this.username
        })
        .then(response => {
          this.err = false;
          this.isValid = true;
        })
        .catch(err => {
          this.err = true;
          this.isValid = false;
        });
    },
    month(m) {
      this.birthdate.month = m;
      this.focus = true;
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  },
  created() {
    if (
      this.username != "" &&
      this.password != "" &&
      this.confirmpassword != ""
    ) {
      $(".label-txt1").addClass("label-active");
    }
    axios.get("http://localhost:8081/user/signedup").then(
      response => {
        if (response.data.username != null) {
          this.isValid = true;
          this.username = response.data.username;
          this.password = response.data.password;
          this.confirmpassword = response.data.password;
          $(".label-txt1")
            .addClass("label-active")
            .css({ color: "#555657" });
        }
      },
      err => {
        console.log("error");
      }
    );
  },
  watch: {
    focus(val) {
      if (this.birthdate.month != "") {
        $(".month").slideUp();
        this.focus = false;
      }
    }
  },
  mounted() {
    $("#mnth").focus(function() {
      $(".month").slideDown();
    });
  }
};
</script>


<style scoped>
.genders {
  padding-left: 20px;
  padding-right: 20px;
  padding-top:0;
  padding-bottom: 0;
  position: relative;
  /* background:grey; */
  height: 10px;
  
}

.g {
  top: 10px;
  position: absolute;
}
.Gender {
  margin: 0;
  height: 10px;
  padding: 0;
}
.fncol {
  margin: 0;
}
.month {
  padding: 0px;
  display: none;
  position: absolute;
  border: 1px solid lightgray;
  z-index: 9999;
  background: #f7fafa;
}
.inputholder {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
}

.inputholder2 {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.m {
  margin: 0;
  padding: 3px;
  font-weight: normal;
  font-size: 15px;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.lgnbtn {
  font-family: verdana;
  font-size: 18px;
}

.lgt {
  color: red;
  text-decoration: underline;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #b3b4b5;
  margin: 1em 0;
  padding: 0;
}

.signup {
  overflow: auto;
  background: #e3e3e3;
  padding: 40px;
  text-align: center;
  border-right: none;
  height: 648px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-right: 1px solid #b3b4b5;
}
.uname {
  text-decoration: underline;
}
h5 {
  margin: 0;
  padding: 3px;
  font-weight: normal;
  font-size: 15px;
}

h5:hover {
  background-color: #0071ff;
  color: white;
}

.month {
  padding: 0px;
  display: none;
  position: absolute;
  border: 1px solid lightgray;
  z-index: 9999;
  background: #f7fafa;
}

#mnth {
  width: 100%;
  margin-left: 0;
}
#gend {
  font-size: 0.8em;
}

.bd {
  width: 100%;
  background: red;
}
.srow {
  margin-left: 0px;
  padding:0;
  margin-top:0;
  margin-bottom: 0;
  width: 100%;
}

.srow td {
  padding-top:0;
  padding-bottom:0;
  width: 33%;
}

#years {
  width: 150px;
  padding-left: 20px;
}

#perinfo {
  background: white;
  overflow: visible;
  padding: 40px;
  margin: 0;
  height: 100%;
  text-align: left;
}

.gender {
  font-weight: normal;
}
.pholder {
  padding: 0;
}

.err {
  font-weight: normal;
  color: red;
  font-size: 14px;
  position: absolute;
  left: 0px;
}

.fname {
  width: 100%;
  padding-right: 10px;
  margin: 0;
}
.ln {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

#day {
  width: 10%;
}

.gg {
  margin-bottom: 0;
  /* height: 5px; */
  /* padding-top: 5px; */
  width: 100%;
  background: green;
}

.gg td {
  position: relative;
  padding: 0;
  margin: 0;
  /* width: 50%; */
  background: red;
}
.bday {
  width: 250px;
  padding: 0;
  /* padding-top: 20px;
  margin-top: 10px; */
}

.bday td {
  padding: 0;
  width: 33%;
}
.ln {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.lname {
  padding-left: 10px;
  width: 100%;
  margin: 0;
}
table {
  width: 100%;
  margin-top: 0;
  padding-top: 0;
  margin: 0;
  padding: 0;
  overflow: visible;
}

.innercont {
  padding: 0;
  border-radius: 2px;
  border: 1px solid #bdbebf;
  /* overflow: hidden; */
  /* width: 970px; */
  /* height: 650px; */
}

.body {
  padding: 0;
  margin: 0;
}

label {
  display: block;
  position: relative;
  margin: 40px 0px;
}
.label-txt {
  position: absolute;
  top: -1.6em;
  font-weight: normal;
  padding: 10px;
  font-family: sans-serif;
  font-size: 1em;
  letter-spacing: 1px;
  color: #555657;
  transition: ease 0.2s;
  margin-top: 15px;
}

.label-txt1 {
  position: absolute;
  top: -1.6em;
  font-weight: normal;
  padding: 10px;
  font-family: sans-serif;
  font-size: 1em;
  letter-spacing: 1px;
  color: #555657;
  transition: ease 0.2s;
  margin-top: 15px;
}
.label-txt2 {
  position: absolute;
  top: -1.6em;
  padding: 10px;
  font-family: sans-serif;
  font-size: 1em;
  font-weight: normal;
  letter-spacing: 1px;
  color: #555657;
  transition: ease 0.2s;
}

.label-active {
  color: #0071ff;
  font-size: 0.8em;
  top: -3em;
}
.input {
  width: 100%;
  padding: 10px;
  /* height: 5px; */
  background: transparent;
  border: none;
  outline: none;
  text-align: left;
}

.line-box {
  position: relative;
  width: 100%;
  height: 1px;
  background: #555657;
}

.input {
  font-weight: normal;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  transform: translateX(0%);
  background: #0071ff;
  transition: ease 0.6s;
}

.input:focus + .line-box .line {
  width: 100%;
}

button:hover {
  background: #0071ff;
  color: #ffffff;
}

.sign {
  padding: 0px;
  margin-top: 0;
  font-size: 40px;
  font-weight: unset;
  font-family: verdana;
  font-weight: normal;
  margin-bottom: 60px;
}
.sign2 {
  padding: 0px;
  margin-top: 0;
  font-size: 25px;
  font-weight: unset;
  font-family: verdana;
  font-weight: normal;
  margin-bottom: 20px;
}
</style>






