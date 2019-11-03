<template>
  <div id="Profile">
      <div class="prfl">
        <div class="logo">
          <img :src="image" alt id="profile">
        </div>
        <h4>{{ orgName }}</h4>
      </div>
      <div class="info">
        <!-- <p>Organization name: {{orgName}}</p> -->
        <p class="des">{{description}}</p>
        <p class="address">{{address}}</p>
        <p class="email">
          Email at
          <span class="emailadd">{{email}}</span>
        </p>

        <b-button
          v-on:click="redirect('/signUpAs')"
          squared
          variant="outline-primary"
        >Update Profile</b-button>
      </div>


    <div class="text-center">
      <br>
      <br>
      <img :src="image" class="border rounded-circle border-dark" id="profile">
      <div class="card-header">
        <h3>{{ userinfo.firstname }} {{userinfo.lastname}}</h3>
          <button
            v-on:click="updateInfo"
            class="btn btn-primary btn-block"
          >Update Profile</button>
      </div>
    </div>
    <div class="card-body">
      <div class="card-text">
        <p>
          Username:
          <strong>{{ userinfo.username }}</strong>
        </p>
        <p>
          Real name:
          <strong>{{ userinfo.firstname+" "+userinfo.lastname }}</strong>
        </p>
        <p>
          Age:
          <strong>{{userinfo.age}} years old</strong>
        </p>
        <p>
          Gender:
          <strong>{{ userinfo.gender }}</strong>
        </p>
        <p>
          Occupation:
          <strong>{{userinfo.occupation}}</strong>
        </p>
        <p>
          Work experience:
          <strong>{{ userinfo.years }} years</strong>
        </p>
        <p>
          Address:
          <strong>{{userinfo.address}}</strong>
        </p>
        <p>
          Email:
          <strong>{{ userinfo.email }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      userinfo: {},
      image: require("@/assets/profile.png")
    };
  },
  created() {
    this.$store.dispatch("getUserInfo").then(response => {
      var user = response.data;
      this.userinfo = {
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        gender: user.gender,
        occupation: user.occupation,
        years: user.years,
        address: user.address,
        email: user.email,
        username: user.username
      };
    });
    this.$emit("gotUserInfo", this.userinfo )
    if (this.$store.getters.getInfoStatus == "error") {
      alert("An error occured! Please try again later");
    }
  },

  methods: {
    updateInfo() {
      this.$emit("updateInfo");
    }
  }
};
</script>
<style scoped>
div {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.card-text {
  text-align: left;
}
</style>
