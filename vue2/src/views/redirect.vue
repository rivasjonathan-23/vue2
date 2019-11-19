<template>
  <div>
    <div v-if="notfound">
      <div id="divnotfound">
        <center>
          <img class="usernotfound" src="@/assets/error.png" />
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
}
#divnotfound {
    background-color:lightblue;
}
</style>