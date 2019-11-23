<template>
  <div class="innercont" v-bind:class="{ftsize: resized}">
    <form @submit.prevent="register">
      <div class="accinfo">
        <p class="sign">Create an account as a</p>
        <p class="rutext">Organization</p>
        <div class="inputholder" v-bind:class="{red: err || errlen}">
          <span>Username</span>
          <b-input
            type="text"
            class="binput"
            required
            v-model="username"
            v-bind:class="{unameErr: err  || errlen}"
          ></b-input>
          <transition name="slide-fade">
            <span class="err" v-bind:class="{red: err}" v-if="err">This username is already taken!</span>
            <span
              class="err"
              v-bind:class="{red: errlen}"
              v-if="username && username.length < 7"
            >must be at least 7 characters!</span>
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
        <p class="sign2">About your organization</p>

        <div class="inputholder">
          <span>Name</span>
          <b-input type="text" class="binput" required v-model="orgName"></b-input>
        </div>
        <div class="inputholder">
          <span>Address</span>
          <b-input type="text" class="binput" required v-model="address"></b-input>
        </div>
        <div class="inputholder">
          <span>Year started</span>
          <b-input type="number" class="binput" min="1800" required v-model="years"></b-input>
        </div>
        <div class="inputholder">
          <span>What your organization do? | Description</span>
          <b-form-textarea type="text" rows="5" class="binput" required v-model="description"></b-form-textarea>
        </div>
        <div class="noChsn" v-show="hasError">
          <p class="ertxt" v-if="err">The username you've entered is already taken!</p>
          <p class="ertxt" v-if="passhort">Your password is weak! Must be 8 or more characters.</p>
          <p class="ertxt" v-if="errlen">Your username is less than 7 characters!</p>
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
  name: "OrgSignUp",
  data() {
    return {
      username: "jrivas23",
      password: "jrivas2398",
      confirmpassword: "jrivas2398",
      orgName: "Passerelles Numeriques",
      email: "rivas23@gmail.com",
      years: "2001",
      address: "Nasipit, Talamban, Cebu City",
      description:"Our mission is to provide education, technical and professional training in the digital sector to young underprivileged people by leveraging their potential and willpower. We endeavour to truly develop their employability which will allow them and their families to escape poverty in a sustainable way, and contribute to the social and economic development of their countries.",
      err: false,
      loading: false,
      type: "",
      resized: false,
    };
  },

  methods: {
    register() {
      let userInfo = {
         username: this.username,
        password: this.password,
        email: this.email,
        address: this.address,
        orgName: this.orgName,
        years: this.years,
        description: this.description,
        type: "Organization",
        badges: [],
      };
      var val = this.validate();
      if (val) {
        this.$store
          .dispatch("orgsignup", userInfo)
          .then(() => {
            this.$router.push("/user");
            this.err = false;
            this.loading = false;
            this.hasError = false;
          })
          .catch(error => {
            if (error.response.status === 400) {
              this.err = true;
              this.loading = false;
              this.hasError = true;
            } else if (error.response.status === 500) {
              alert("Unpected error occured! Pleaser try again later");
              this.loading = false;
              this.hasError = false;
            }
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.hasError = true;
      }
    },
    validate() {
      this.loading = true;
      this.passhort = this.password.length < 8;
      this.passErr = this.password != this.confirmpassword;
      this.errlen = this.username.length < 7;
      return !this.errlen && !this.passErr && !this.passhort && !this.noChosen;
    },
    handleResize() {
      if (window.innerWidth <= 650) {
        this.resized = true;
      } else {
        this.resized = false;
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
  background: #f7e4e4;
  color: red;
  margin-bottom: 20px;
  border-radius: 5px;
}

.ertxt {
  padding: 0;
  margin: 0;
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






