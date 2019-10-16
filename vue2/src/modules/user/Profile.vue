<template>
  <div id="Profile">
    <div class="text-center"><br><br>
        <img :src="image" class="border rounded-circle border-dark" id="profile">
      <div class="card-header">
        <h3>{{ userinfo.firstname }} {{userinfo.lastname}}</h3>
        <button v-on:click="InsideMethod" class="btn btn-primary btn-block">Update Profile</button>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">Personal Imformation</h5>
      <div class="card-text">
        <p>Username: {{ userinfo.username }}</p>
        <p>Age: {{userinfo.age}} years old</p>
        <p>Gender: {{ userinfo.gender }}</p>
        <p>Occupation: {{userinfo.occupation}}</p>
        <p>Experience: {{ userinfo.years }} years of work experience</p>
        <p>Address: {{userinfo.address}}</p>
        <p>Email: {{ userinfo.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Profile",
  props:{
    username :String
  },
  data() {
    return {
      userinfo: {},
      image: require('@/assets/profile.png')
    };
  },
  created() {
    this.userinfo = {//this is to be deleted
      firstname: "Redgie",
      lastname: "Gravador",
      age: 22,
      gender: "Male",
      occupation: "Web developer",
      years: 5,
      address: "Talamban",
      email: "redgie@gmail.com",
      username: "mrclay"
    };

    let uri_profile = `http://localhost:8081/profile-regular/${this.username}`;
    this.axios.get(uri_profile).then(response => {
      this.userinfo = response.data;
    });
  },

  methods: {
    InsideMethod() {
      this.$emit('InsideMethod');

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
