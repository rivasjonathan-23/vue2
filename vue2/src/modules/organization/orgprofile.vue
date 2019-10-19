<template>
  <div id="Profile">
    <div class="text-center">
      <br>
      <br>
      <img :src="image" alt class="border rounded-circle border-dark" id="profile">
      <div class="card-header">
        <h3>{{orginfo.orgname }}</h3>
        <button v-on:click="InsideMethod" class="btn btn-primary btn-block">Update Profile</button>
      </div>
      <b-card>
        <!-- <h5>Organization Details</h5> -->
        <div class="text-left">
          <!-- <p>Username: {{orginfo.username}}</p> -->
          <p>Organization name: {{orginfo.orgName}}</p>
          <p>Address: {{orginfo.address}}</p>
          <p>Email Address: {{orginfo.email}}</p>
          <p>Description: {{orginfo.description}}</p>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props:{
    username: String
  },
  data() {
    return {
      orginfo: {},
      image: require("@/assets/pn.png")
    };
  },
  created() {
    this.$store.dispatch("getUserInfo").then(resp => {
      this.orginfo = resp.data
    })
    // let uri_orgprofile = `http://localhost:4000/profile-org/${this.username}`;
    // this.axios.get(uri_orgprofile).then(response => {
    //   this.orginfo = response.data;
    // });
  },

  methods: {
    InsideMethod() {
      this.$emit("InsideMethod");
    }
  }
};
</script>
<style scoped>
div {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
