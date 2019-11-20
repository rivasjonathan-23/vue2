<template>
  <form class="addR" @submit.prevent="addRecipient()">
    <span class="error" v-show="error">Cannot find user<br></span>
    <span class="error" v-show="error">or user already in the list!<br></span>
    
    <b-input id="usernamei" required v-model="username" placeholder="Enter username"/>
    <br>
    <b-row v-if="!adding">
      <b-col class="bl">
        <b-button v-on:click="$bvModal.hide('addRecipient-modal')" variant="danger" class="btn btn-block">Cancel</b-button>
      </b-col>
      <b-col class="br">
        <b-button type="submit" variant="primary" autocomplete class="btn btn-block">Add Recipient</b-button>
      </b-col>
    </b-row>
    <div v-else class="add">
      <b-spinner class="align-middle"></b-spinner>&nbsp;
      <strong>Adding recipient...</strong>
    </div>
  </form>
</template>
<script>
import axios from 'axios';
import $ from "jquery";

export default {
  name: "Addrecipient",
  data() {
    return {
      username: "",
      adding: false,
      error: false
    };
  },
  props: {
      badgeinfo: Object
  },
  methods: {
    add() {
      this.adding = true;
      return new Promise(resolve => {
        axios
          .post("http://localhost:8081/user/addrecipient", {
            username: this.username,
            org: this.$store.getters.token,
            code: this.badgeinfo.code,
            id: this.badgeinfo.id
          })
          .then(res => {
            var badges = [];
             badges = res.data.badges;
            $("#usernamei").css({ "border-color": "lightgrey" });
            this.$bvModal.hide("addRecipient-modal");
            this.error = false;
            this.$emit("submit");
            resolve(true);
          })
          .catch(err => {
            $("#usernamei").css({ "border-color": "red" });
            this.adding = false;
            this.error = true;
          });
      });
    },
     async addRecipient() {
      var done = await this.add();
      if (done) {
        this.adding = false;
      }
    },
  },
};
</script>

