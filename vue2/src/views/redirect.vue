<template>
  <div>
    <div v-if="notfound">
      <div class="overlay">
        <center>
          <h1 class="white usernotfound">ERROR</h1>
          <p class="st404">404</p>
          <h1 class="white notfoundtext">Not Found</h1>
        </center>
      </div>
    </div>
    <div v-if="regular">
      <ViewUser />
    </div>
    <div v-if="org">
      <ViewOrg />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import ViewUser from "./viewUser.vue";
import ViewOrg from "./viewOrg.vue";
export default {
  name: "redirect",
  components: {
    ViewUser,
    ViewOrg
  },
  data() {
    return {
      username: this.$route.params.username,
      notfound: true,
      regular: false,
      org: false
    };
  },
  watch: {
    "$route.params.username": {
      handler: function(username) {
        console.log("watching route params :", username);
        this.getUser(username);
      }
    }
  },
  beforeMount() {
    this.getUser(this.username);
  },
  methods: {
    getUser(usernamei) {
      let url = "http://localhost:8081/get-user";
      let body = { username: usernamei };
      axios.post(url, body).then(resp => {
        if (resp.data.status) {
          if (resp.data.type == "regular") {
            this.regular = true;
            this.notfound = false;
            this.org = false;
          } else {
            this.org = true;
            this.regular = false;
            this.notfound = false;
          }
        } else {
          this.notfound = true;
          this.regular = false;
          this.org = false;
        }
      });
    }
  }
};
</script>
<style scoped>
.usernotfound {
  position: relative;
  padding-top: 10%;
  width: 30%;
  height: 30%;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
#divnotfound {
  background-color: lightblue;
}
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  height: 100%;
  /* background:#186fa1; */
  background-image: linear-gradient(
    to bottom right,
    rgb(24, 111, 161, 0.6),
    rgb(24, 111, 161, 0.8),
    #186fa1
  );
}
.white {
  color: white;
}
.st404 {
    position: relative;
    margin-top: -7%;
    font-size: 200px;
    font-family: Georgia, serif;
    font-weight: bolder;
    color: white;
    text-decoration: underline;
}
.notfoundtext {
    position: relative;
    margin-top: -4%;
}
</style>