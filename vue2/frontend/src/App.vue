<template>
  <div id="app">
    <b-navbar class="navbar" toggleable="lg" type="dark">
      <b-navbar-brand class="web-name" @click="redirect('/')">Badgebook</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav></b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item class="opt" @click="$bvModal.show('searchUser')">Search</b-nav-item>
          <b-nav-item 
            v-if="!inlogin"
            v-show="!this.$store.getters.isLoggedIn"
            class="opt"
            @click="redirect('/login')"
          >Sign in</b-nav-item>
          <b-nav-item
            v-if="!insignup"
            v-show="!this.$store.getters.isLoggedIn"
            class="opt"
            @click="redirect('/signUpAs')"
          >Sign up</b-nav-item>
          <b-nav-item v-show="this.$store.getters.isLoggedIn" class="opt" @click="signout">Sign out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal
      id="searchUser"
      title="Search other user | organization"
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      centered
      hide-footer
    >
      <b-form>
        <b-form-input id="searchb" v-model="person" placeholder="Enter username"></b-form-input>
      </b-form>
      <b-button class="closeSearch" block @click="$bvModal.hide('searchUser')">Exit</b-button>
    </b-modal>
    <div>
      <center>
        <router-view :userInfo="info"/>
      </center>
    </div>
  </div>
</template>


<script>
// eslint-disable-next-line
/* eslint-disable */
import $ from "jquery";
import axios from "axios";
import UserProfile from "./modules/user/Profile.vue";
import OrgProfile from "./modules/organization/orgprofile.vue";

export default {
  name: "app",
  props: {
    info: Object
  },
  data() {
    return {
      person: "",
      notlogin: true,
      isloginConfirm: false,
      inlogin: false,
      insignup: false,
      path: ""
    };
  },
  components: {
    UserProfile,
    OrgProfile
  },
  methods: {
    getData(data) {
      this.info = data;
    },
    redirect(path) {
      this.$router.push(path);
      this.path = path;
      this.locate();
    },
    search() {
      let user = { user: this.person };
      axios.post("http://localhost:8081/search", user).then(
        response => {
          if (response.data.respond != "Cannot find user!") {
            console.log(response.data);
            alert(response.data.respond);
          } else {
            alert(response.data.respond);
          }
        },
        err => {
          console.log("error");
        }
      );
    },
    locate() {
      if (this.$router.currentRoute.path == "/login") {
        this.inlogin = true;
        this.insignup = false;
      } else if  (this.$router.currentRoute.path == "/signUpAs") {
        this.inlogin = false;
        this.insignup = true;
      } else {
        this.inlogin = false;
        this.insignup = false;
      }
    },
    signout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
        this.notlogin = true;
        this.isloginConfirm = false;
        this.isRuser = false;
        this.isOrg = false;
      });
    }
  },
  mounted() {
    $(".fa").click(function() {
      if ($("ul").is(":visible")) {
        $("ul").hide();
      } else {
        $("ul").show();
      }
    });
    $(window).on("resize", function() {
      var win = $(this);
      if (win.width() >= 750) {
        $("ul").show();
        $(".fa").hide();
      }
    });

    $(window).on("resize", function() {
      var win = $(this);
      if (win.width() <= 750) {
        $("ul").hide();
        $(".fa").show();
      }
    });
  },
  
  created() {
    if (this.$router.currentRoute.path == "/login") {
        this.inlogin = true;
        this.insignup = false;
      } else if  (this.$router.currentRoute.path == "/signUpAs") {
        this.inlogin = false;
        this.insignup = true;
      } else {
        this.inlogin = false;
        this.insignup = false;
      }
    var url = window.location.href;
    if (url.includes("/user")) {
      this.notlogin = false;
      this.isloginConfirm = true;
      this.isRUser = true;
      this.isOrg = false;
      // this.$router.push("/user/mybadge")
    } else if (url.includes("organzation")) {
      this.notlogin = false;
      this.isloginConfirm = true;
      this.isRUser = false;
      this.isOrg = true;
    }
  }
};
</script>

<style scoped>
.closeSearch {
  width: 90px;
  float: right;
}

.closeSearch:hover {
  background-color: rgb(3, 78, 133, 0.9);
  border-color: 1px solid rgb(3, 78, 133, 0.9);
}

#searchb {
  padding-left: 10px;
  border: 1px solid gray;
}

.opt {
  margin: 0;
  color: white;
  padding: 7px;
  padding-left: 5px;
  padding-right: 5px;
}

.opt:hover {
  background: gray;
}
.icon {
  padding-top: 0;
  display: none;
}

.fa {
  height: 40px;
  padding: 14px;
  padding-bottom: 5px;
  position: fixed;
  top: 0px;
  right: 0px;
  margin: 10px;
  display: none;
  color: white;
  cursor: pointer;
  transition: ease 0.3s;
}

.searchbox {
  /* margin: 10px; */
  padding: 0;
}

.content {
  height: 100vh;
  /* width: 100vw; */
  text-align: center;
  /* background-image: url("~@/assets/bb/3.jpg"); */
  /* background-size: cover; */
  /* background-attachment: fixed; */
  /* background:lightblue; */
}

#app,
body,
html {
  height: 100vh;
  font-family: verdana;
}

#srch {
  margin: 0;
  font-size: 13px;
  padding: 8px;
  width: 190px;
}

.fa:hover {
  background-color: lightblue;
  border-radius: 25px;
}
p {
  cursor: pointer;
  transition: ease 0.3s;
}
.btn:hover {
  border-color: gray;
}

p:hover {
  text-shadow: 5px 5px 5px black;
}

#search {
  margin: 12px;
}

#search:hover {
  box-shadow: 5px 5px 5px #1b2c3d;
}

.navbar {
  z-index: 1000;
  position: absolute;
  width: 100%;
  margin-top: 0px;
  border-radius: 0;
  padding-right: 2%;
  padding-left: 2%;
  margin-bottom: 0;
  background: #186fa1;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}

.btn {
  float: right;
  padding: 5px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  margin: 8px;
  cursor: pointer;
  transition: ease 0.3s;
}

#su {
  padding-right: 0px;
  border: none;
}

ul {
  padding: 0;
  margin: 0;
}

body {
  zoom: 10%;
}

.auth {
  margin: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 17px;
  color: white;
}

.singout {
  margin: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 17px;
  color: white;
  font-weight: normal;
  padding-right: 10px;
}

.web-name {
  padding: 8px;
  color: white;
  letter-spacing: 3px;
  margin: 2px;
}

.material-icons {
  color: grey;
  top: 5px;
  left: 4px;
  position: absolute;
  margin-bottom: 0;
}

button {
  margin-left: 0px;
}

.form-control {
  margin: 0;
  border: none;
  padding-left: 30px;
}

.navbar-form {
  background-color: white;
  border-radius: 3px;
  position: relative;
  padding: 0;
  margin-right: 7px;
  margin-left: 10px;
  cursor: pointer;
  transition: ease 0.3s;
}
label {
  display: block;
  position: relative;
  margin: 40px 0px;
}
.label-txt {
  position: absolute;
  top: -1.6em;
  padding: 10px;
  font-family: sans-serif;
  font-size: 0.8em;
  letter-spacing: 1px;
  color: rgb(120, 120, 120);
  transition: ease 0.3s;
}
.input {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  outline: none;
  text-align: left;
}

.line-box {
  position: relative;
  width: 100%;
  height: 2px;
  background: #bcbcbc;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  /* left: 50%; */
  transform: translateX(0%);
  background: #0071ff;
  transition: ease 0.6s;
}

.input:focus + .line-box .line {
  width: 100%;
}

.label-active {
  top: -3em;
}

button {
  display: inline-block;
  padding: 12px 24px;
  background: rgb(220, 220, 220);
  font-weight: bold;
  color: rgb(120, 120, 120);
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  transition: ease 0.3s;
}

/* #nav {
  width: 450px;
  text-align: right;
} */

button:hover {
  background: #5d5f61;
  color: #ffffff;
}
</style>
