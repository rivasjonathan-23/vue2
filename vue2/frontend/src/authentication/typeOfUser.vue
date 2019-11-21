<template>
  <div class="contain">
    <div class="btns">
      <h2>Create account as</h2>
      <b-button
        class="btn org"
        variant="primary"
        v-bind:class="{pressed: change}"
        v-on:click="signUpAs('/signUpAs/organization')"
      >Organization</b-button>
      <b-button
        v-bind:class="{unpressed: !change}"
        v-on:click="signUpAs('/signUpAs')"
        variant="primary"
        class="btn reg"
      >Regular user</b-button>
    </div>
    <center>
      <router-view></router-view>
      <Footer></Footer>
    </center>
  </div>
</template>

<script>
import $ from "jquery";
import Footer from "../modules/user/footer";

export default {
  name: "TypeOfUser",
  data() {
    return {
      change: false
    };
  },
  methods: {
    signUpAs(type) {
      this.$router.push(type);
      if (this.$router.currentRoute.path == "/signUpAs/organization") {
        this.change = true;
      } else {
        this.change = false;
      }
    }
  },
  created() {
    if (this.$router.currentRoute.path == "/signUpAs/organization") {
      this.change = true;
    } else {
      this.change = false;
    }
  }
  ,components: {
    Footer
  }
};
</script>

<style scoped>
.btns {
  /* margin-top:50px; */
  padding:60px;
  color:white;
  /* background-image: linear-gradient(to bottom right, #80b7d1 , #e4f1f7); */
  margin-bottom: 0;
  /* text-align: center; */
  /* background-image: url("~@/assets/bb/11.jpg"); */
  /* background-size: cover; */
  /* background-attachment: fixed; */
   background:#186fa1;
}

.contain {
  padding-top: 50px;
  text-align: center;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  /* height: 140vh; */
  font-weight: normal;
  color: #385b73;
  /* color:white; */
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
  font-size: 20px;
  padding-bottom: 8px;
  cursor: pointer;
  transition: ease 0.3s;
}

.org {
  background-color: #1d7fb8;
  color: white;
}
.btn:focus {
  outline: none;
}

.btn:hover {
  background-color: #d3e0e8;
  color:#186fa1;
}
.pressed {
  background-color: #d3e0e8;
  color: #186fa1;
}

.reg {
   background-color: #1d7fb8;
  color: white;
}

.unpressed {
  background-color: #d3e0e8;
  color: #186fa1;
}

.close {
  padding: 5px;
  margin-left: 0;
  margin-right: 5px;
}
h2 {
  margin: 0;
  padding-top: 20px;
  font-family: verdana;
  padding-bottom: 10px;
}
</style>