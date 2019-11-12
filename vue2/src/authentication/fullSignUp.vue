<template>
  <div class="innercont" v-bind:class="{ftsize: resized}">
    <form @submit.prevent="register">
      <div class="accinfo">
        <p class="sign">Create an account as a</p>
        <p class="rutext">Regular user*</p>
        <div class="inputholder" v-bind:class="{red: err}">
          <span>Username</span>
          <b-input
            type="text"
            class="binput"
            required
            v-model="username"
            v-bind:class="{unameErr: err}"
          ></b-input>
          <transition name="slide-fade">
            <span class="err" v-bind:class="{red: err}" v-if="err">This username is already taken!</span>
          </transition>
        </div>
        <div class="inputholder">
          <span>Email</span>
          <b-input type="email" class="binput" required v-model="email"></b-input>
        </div>
        <div class="inputholder" v-bind:class="{red: passhort}">
          <span>Password</span>
          <b-input
            type="password"
            class="binput"
            v-bind:class="{unameErr: passhort}"
            required
            v-model="password"
          ></b-input>
          <transition name="slide-fade">
            <span
              class="err"
              v-bind:class="{red: passhort}"
              v-show=" password.length < 8 && password  != ''"
            >must be at least 8 characters!</span>
          </transition>
        </div>
        <div class="inputholder" v-bind:class="{red: passErr}">
          <span>Confirm Password</span>
          <b-input
            type="password"
            v-bind:class="{unameErr: passErr}"
            class="binput"
            required
            v-model="confirmpassword"
          ></b-input>
          <transition name="slide-fade">
            <span
              class="err"
              v-bind:class="{red: passErr}"
              v-show="confirmpassword != password && confirmpassword && password"
            >Password doesn't match!</span>
          </transition>
        </div>
      </div>
      <div class="perinfo">
        <p class="sign2">Personal Information*</p>

        <div class="inputholder">
          <table>
            <tr>
              <td>
                <span>Firstname</span>
                <b-input type="text" class="binput" required v-model="firstname"></b-input>
              </td>
              <td>
                <span>Lastname</span>
                <b-input type="text" class="binput" required v-model="lastname"></b-input>
              </td>
            </tr>
          </table>
        </div>
        <div class="inputholder">
          <span>Address</span>
          <b-input type="text" class="binput" required v-model="address"></b-input>
        </div>
        <div class="inputholder bdd">
          <span>Date of birth</span>
          <table class="bday">
            <td>
              <b-input
                class="binput"
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
                class="binput"
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
                class="binput"
                required
                v-model="birthdate.year"
              ></b-input>
            </td>
          </table>
        </div>
        <div class="inputholder">
          <table class="srow">
            <td>
              <span>Age</span>
              <b-input type="number" class="binput" required v-model="age" min="12"></b-input>
            </td>
            <td class="genders">
              <span class="g">Gender</span>
              <table>
                <tr>
                  <td>
                    <b-form-radio v-model="gender" class="Gender" value="Male">
                      <span class="glabel">Male</span>
                    </b-form-radio>
                  </td>
                  <td>
                    <b-form-radio v-model="gender" class="Gender" value="Female">
                      <span class="glabel">Female</span>
                    </b-form-radio>
                  </td>
                </tr>
              </table>
            </td>
          </table>
        </div>

        <p class="lbl">Are you working already?</p>
        <div class="inputholder">
          <span>Work</span>
          <b-input type="text" class="binput" v-model="occupation"></b-input>
           <transition name="slide-fade">
            <span class="err" v-bind:class="{red: chosedwrk}" v-if="company && !occupation">What is your work?</span>
            
          </transition>
        </div>
        <div class="inputholder">
          <span>Company | organization</span>
          <b-input type="text" class="binput" v-model="company"></b-input>
           <transition name="slide-fade">
            <span class="err" v-bind:class="{red: chosedwrkrvd}" v-if="occupation && !company">Where are you working?</span>
          </transition>
        </div>
        <p class="lbl">Or still studying?</p>
        <div class="inputholder">
          <span>School</span>
          <b-input type="text" class="binput" v-model="school"></b-input>
        </div>
        <div class="noChsn">
          <p class="ertxt" v-if="noChosen">Are you working or studying? Please fill up.</p>
          <p class="ertxt" v-if="err">The username you've entered is already taken!</p>
          <p class="ertxt" v-if="passhort">Your password is less than 8 characters!</p>
          <p class="ertxt" v-if="passErr">Password did not match!</p>
        </div>
        <b-button type="submit" class="lgnbtn" variant="primary">
          <span v-if="!loading">Register</span>
          <span v-else>
            <span>Loading&nbsp;</span>
            <b-spinner class="align-middle"></b-spinner>&nbsp;
          </span>
        </b-button>
      </div>
    </form>
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
      username: "rivas",
      password: "jrivas2398",
      confirmpassword: "jrivas2398",
      firstname: "Jonathan",
      lastname: "Rivas",
      email: "rivas@gmail.com",
      age: 21,
      address: "address",
      occupation: "",
      company: "",
      school: "",
      gender: "",
      birthdate: { month: "February", day: 23, year: 2019 },
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
      focus: false,
      resized: false,
      err: false,
      passErr: false,
      passhort: false,
      workErr: false,
      noChosen: false,
      chosedwrk: false,
      chosedwrkrvd: false
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
      var val = this.validate();
      if (val) {
        this.$store
          .dispatch("fullsignup", userInfo)
          .then(() => {
            this.$router.push("/user");
            this.err = false;
            this.loading = false;
          })
          .catch(error => {
            if (error.response.status === 400) {
              this.err = true;
              this.loading = false;
            } else if (error.response.status === 500) {
              this.loading = false;
            }
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
    validate() {
      this.loading = true;
      this.passhort = this.password.length < 8;
      this.passErr = this.password != this.confirmpassword;
      this.noChosen =
        this.school === "" && (this.occupation === "" || this.company == "");
      var chosedwrk = this.occupation != "" && this.company === "";
      var chosedwrkrvd = this.occupation === "" && this.company != "";
      return !this.passErr && !this.passhort && !this.noChosen && (!chosedwrk || !chosedwrkrvd);
    },
    month(m) {
      this.birthdate.month = m;
      this.focus = true;
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    handleResize() {
      if (window.innerWidth <= 650) {
        this.resized = true;
      } else {
        this.resized = false;
      }
    }
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
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }
};
</script>


<style scoped>
.noChsn {
  padding: 10px;
  font-size: 13px;
  /* border: 1px solid red; */
  /* background: #f7e4e4; */
  color: red;
  /* margin-bottom: 20px; */
  /* border-radius: 5px; */
}

.ertxt  {
  padding:0;
  margin:0;
}
.ws {
  /* background:#fafcfc; */
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
}
.binput {
  background: #f5f9fa;
}
.lbl {
  font-size: 18px;
  margin-top: 35px;
  padding-bottom: 0;
  margin-bottom: 0;
}
.perinfo {
  /* background: white; */
  overflow: visible;
  padding: 0;
  padding-top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}
.accinfo {
  width: 100%;
  padding: 0;
  position: relative;
  margin-top: 0;
}
.innercont {
  color: #385b73;
  padding: 0;
  border-radius: 0;
  width: 600px;
  background: white;
  text-align: center;
  padding: 40px;
}

.ftsize {
  width: 100%;
  padding: 10px;
}
.bdd {
  padding-top: 10px;
}

.genders {
  padding-left: 40px;
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
  /* background:grey; */
  height: 10px;
}

.g {
  top: 10px;
  left: 20px;
  position: absolute;
}
.Gender {
  margin: 0;
  height: 10px;
  padding: 0;
}
.fncol {
  margin: 0;
  width: 50%;
}
.month {
  padding: 0px;
  display: none;
  position: absolute;
  border: 1px solid black;
  z-index: 9999;
  background: #f7fafa;
}
.inputholder {
  margin-top: 0;
  margin-bottom: 20px;
  text-align: left;
}
.unameErr {
  border: 1px solid red;
  background: #f7e4e4;
  color: red;
}

.m {
  margin: 0;
  padding: 3px;
  font-weight: normal;
  font-size: 15px;
  background: #f5f9fa;
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
}
.srow {
  margin-left: 0px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
}

.srow td {
  padding-top: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 0;
  width: 50%;
}

#years {
  width: 150px;
  padding-left: 20px;
}

.gender {
  font-weight: normal;
}
.pholder {
  padding: 0;
}

.err {
  font-weight: normal;
  color: #1a95ed;
  font-size: 11px;
  position: absolute;
  left: 0px;
}
.red {
  color: red;
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
}
.bday {
  width: 100%;
}

.bday td {
  padding: 0;
  width: 33%;
  padding: 1px;
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

.body {
  padding: 0;
  margin: 0;
}

.sign {
  padding: 0px;
  margin-top: 0;
  font-size: 25px;
  font-weight: unset;
  font-family: verdana;
  font-weight: normal;
  margin-bottom: 0px;
}

.rutext {
  font-size: 30px;
}
.sign2 {
  padding: 0px;
  margin-top: 0;
  font-size: 25px;
  font-weight: unset;
  padding-top: 0;
  font-family: verdana;
  font-weight: normal;
  margin-bottom: 10px;
}
</style>






