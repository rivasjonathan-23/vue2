<template>
  <div id="Profile">
      <div class="prfl">
        <div class="logo">
          <img :src="image" alt id="profile">
        </div>
        <h4 class="orgn">{{ orgName }}</h4>
         <p class="username">Since 1999</p>
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
  </div>
</template>

<script>
/*eslint linebreak-style: ["error", "windows"]*/
import $ from "jquery";

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
      image: require("@/assets/logo.jpg"),
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
        $(".info").css({
          width: "74%",
          "margin-top": "155px",
          "text-align": "left"
        });
        $(".prfl").css({ width: "250px", "margin-right": "25px",  "margin-left": "25px" });
        $(".logo").css({ width: "250px", height: "250px" });
        $("#profile").css({ width: "auto", height: "250px" });
      } else if (window.innerWidth < this.size) {
          $(".info").css({
            width: "100%",
            "margin-top": "4px",
            "text-align": "center"
          });
          $(".prfl").css({ width: "100%", "margin": "0px" });
          $(".logo").css({ width: "180px", height: "180px" });
          $("#profile").css({ width: "180px", height: "180px" });
      }
    },
    InsideMethod() {
      this.$emit("InsideMethod");
    }
  }
};
</script>
<style scoped>
.username {
  font-size: 17px;
  margin-top: 0px;
  color: #315273;
  width: 100%;
}
div {
  font-family: verdana;
}

.orgn {
   color:#364452;
   margin-bottom: 0;
}

.address {
  font-size: 15px;
  color: #3b4d70;

  font-weight: bold;
}

.des {
  color: #1e4773;
}
.email {
  color: #486399;
  font-size: 15px;
}
.emailadd {
  text-decoration: underline;
}
.prof {
  float: left;
}
p {
  margin-bottom: 5px;
  margin-top: 5px;
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
  font-family: verdana;
}
.info {
  float: left;
  font-size: 14px;
  width: 74%;
  text-align: left;
  margin-top: 155px;
  padding: 10px;
}

.logo {
  overflow: hidden;
  margin-top: 30px;
  width: 250px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0px 3px 5px #545f6b;
  box-shadow: 0px 3px 5px #545f6b;
  height: 250px;
  background: white;
}
.prfl {
  float: left;
  width: 250px;
  margin-left:25px;
  margin-right: 25px;
  margin-bottom: 0px;
  border-bottom: 2px solid #d0e5f5;
  /* background:grey; */
}
</style>
