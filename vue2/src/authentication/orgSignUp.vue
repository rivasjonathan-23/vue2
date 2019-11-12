<template>
  <div class="innercont" v-bind:class="{ftsize: resized}">
    <form @submit.prevent="register">
      <div class="accinfo">
         <p class="sign">Create an account for your</p>
        <p class="rutext">Organization*</p>
        <div class="inputholder">
          <span>Username</span>
          <b-input type="text" class="binput" required v-model="username"></b-input>
          <transition name="slide-fade">
            <span class="err" v-if="err">Username already taken!</span>
          </transition>
        </div>
        <div class="inputholder">
          <span>Email</span>
          <b-input type="email" class="binput" required v-model="email"></b-input>
        </div>
        <div class="inputholder">
          <span>Password</span>
          <b-input type="password" class="binput" required v-model="password"></b-input>
          <transition name="slide-fade">
            <span
              class="err"
              v-show=" password.length < 8 && password  != ''"
            >must be at least 8 characters!</span>
          </transition>
        </div>
        <div class="inputholder">
          <span>Confirm Password</span>
          <b-input type="password" class="binput" required v-model="confirmpassword"></b-input>
          <transition name="slide-fade">
            <span
              class="err"
              v-show="confirmpassword != password && confirmpassword && password"
            >Password doesn't match!</span>
          </transition>
        </div>
      </div>
      <div class="perinfo">
        <p class="sign2">About your organization*</p>

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
          <b-input type="text" class="binput" required v-model="years"></b-input>
        </div>
        <div class="inputholder">
          <span>What your organization do? | Description</span>
          <b-form-textarea type="text" rows="5" class="binput" required v-model="description"></b-form-textarea>
        </div>

        <b-button v-on:click="redirect('/signUpAs')" type="submit" class="lgnbtn" variant="primary">
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

export default {
  name: "OrgSignUp",
  data() {
    return {
      username: "",
      password: "",
      confirmpassword: "",
      orgName: "",
      email: "",
      years: "",
      address: "",
      description:"",
      isValid: true,
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
        description: this.description,
        type: "Organization",
        badges: [],
        posts: [],
        
      };
      if (
        this.isValid &&
        this.password != "" &&
        this.password == this.confirmpassword
      ) {
        this.loading = true;
        this.$store
          .dispatch("orgSignUp", userInfo)
          .then(() => {
            this.err = false;
            $("#unameErr").css({ "background-color": "#555657" });
            this.$router.push("/organization");
          })
          .catch(err => {
            this.err = true;
            $("#unameErr").css({ "background-color": "red" });
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
  
  mounted() {
    $(".label-txt")
      .addClass("label-active")
      .css({ color: "#555657" });
    $(".input").focus(function() {
      $(this)
        .parent()
        .find("p")
        .addClass("label-active")
        .css({ color: "#0071ff" });
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find("p")
          .removeClass("label-active");
      }
      $(this)
        .parent()
        .find("p")
        .css({ color: "#555657" });
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
.perinfo {
  /* background: white; */
  overflow: visible;
  padding: 0;
  padding-top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.accinfo {
  width: 100%;
  padding: 0;
  position: relative;
}
.innercont {
  color:#385b73;
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
  color: red;
  font-size: 11px;
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
  margin-bottom: 0;
  color:#385b73;
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
  color:#385b73;
}
</style>






