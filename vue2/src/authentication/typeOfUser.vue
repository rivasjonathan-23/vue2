<template>
  <div class="contain">
    <h2>Create account as</h2>
      <b-button
        class="btn org"
        variant="primary"
        v-bind:class="{pressed: change}"
        v-on:click="signUpAs('/signUpAs/organization')"
      >Organization</b-button>
      <b-button v-bind:class="{unpressed: !change}" v-on:click="signUpAs('/signUpAs')"  variant="primary" class="btn reg">Regular user</b-button>
    <center>
      <router-view></router-view>
    </center>
  </div>
</template>

<script>
import FullSignUp from "./fullSignUp";
import OrgSignUp from "./orgSignUp";
import $ from "jquery";

export default {
  name: "TypeOfUser",
  data() {
    return {
      change: false,
    };
  },
  components: {
    FullSignUp,
    OrgSignUp
  },
  methods: {
    signUpAs(type) {
      this.$router.push(type);
      if (this.$router.currentRoute.path == "/signUpAs/organization") {
       this.change = true;
      } else {
       this.change= false;
      }
    }
  },
  created() {
     if (this.$router.currentRoute.path == "/signUpAs/organization") {
       this.change = true;
      } else {
       this.change= false;
      }
  }
};
</script>

<style scoped>
.nav {
  background: #e6eff5;
  text-align: center;
}

.contain {
  /* background-image: url("~@/assets/background3.jpg");
  background-size: cover;
  background-attachment: fixed; */
  padding-top: 65px;
  text-align: center;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  /* height: 140vh; */
  font-weight: normal;
}

.tp {
  margin-bottom: 2px;
  padding-bottom: 0;
}



.btn {
  margin: 5px;
  color: white;
  border: none;
  padding: 10px;
  font-size:20px;
  padding-bottom: 8px;
  cursor: pointer;
  transition: ease 0.3s;
}


.org {
  background-color: #d3e0e8;
   color:#136ea8;
}
.btn:focus {
  outline: none;
}
.pressed {
  background-color: #136ea8;
  color:white;
}

.reg {
  background-color: #d3e0e8;
  color:#136ea8;
}

.unpressed {
  background-color: #136ea8;
  color:white;
}

.close {
  padding: 5px;
  margin-left: 0;
  margin-right: 5px;
}
h2 {
  margin: 0;
  padding-top:20px;
  font-family: verdana;
  padding-bottom: 10px;
}
</style>