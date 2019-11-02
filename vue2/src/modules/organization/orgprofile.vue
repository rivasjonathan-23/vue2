<template>
  <div id="Profile">
    <div>
      <div class="prfl">
        <div class="logo">
          <img :src="image" alt id="profile">
        </div>
        <h4>{{ orgName }}</h4>
      </div>
      <div class="info">
        <!-- <p>Organization name: {{orgName}}</p> -->
        <p>{{description}}</p>
        <p>
          <strong>Admin email address:</strong>
          {{email}}
        </p>
        <p>
          <strong>Address:</strong>
          {{address}}
        </p>
        <button v-on:click="InsideMethod" class="btn btn-primary">Update Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint linebreak-style: ["error", "windows"]*/
import $ from 'jquery';

export default {
  name: "Profile",
  props: {
    userInfo: Object
  },
  data() {
    return {
      orgName: "",
      address: "",
      email: "",
      description: "",
      image: require("@/assets/background.jpg"),
      size: 0
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();

    this.$store.dispatch("getUserInfo").then(resp => {
      this.orgName = resp.data.orgName;
      this.address = resp.data.address;
      this.email = resp.data.email;
      this.description = resp.data.description;
    });
  },

  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    handleResize() {
      if (window.innerWidth >= this.size) {
        $(".info").css({ "width": "74%", "margin-top":"155px","text-align":"left" });
        $(".prfl").css({ "width": "300px" });
      } else if (window.innerWidth < this.size) {
        // if (window.innerWidth <= 600) {
          $(".info").css({ "width": "100%", "margin-top":"10px","text-align":"center" });
          $(".prfl").css({ "width": "100%"});
        // }
      }
    },
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

.prof {
  float: left;
}

#profile {
  /* height: 200px; */

  width: auto;
  height: 250px;
}

.btn {
  border-radius: 0;
}

#Profile {
  height: 150px;
  background-image: url("~@/assets/orgbackground.jpg");
  background-size: cover;
}
.info {
  float: left;
  font-size: 18px;
  width: 74%;
  text-align: left;
  margin-top: 155px;
  padding: 10px;
}

.logo {
  overflow: hidden;
  margin-top: 50px;
  width: 250px;
  height: 250px;
  border: 2px solid lightblue;
}
.prfl {
  float: left;
  width: 300px;
  margin-bottom: 20px;
  /* background-image: linear-gradient(
    transparent,
    transparent,
    transparent,
    #d8e3eb
  ); */
  /* background:grey; */
}
</style>
