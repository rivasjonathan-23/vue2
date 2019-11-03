<template>
  <div id="Profile">
    <div class="prfl">
      <div class="logo">
        <img :src="image" alt id="profile">
      </div>
      <h4 class="fullname">{{ userinf.firstname+" "+userinf.lastname }}</h4>
      <p class="username">{{userinf.username}}</p>
    </div>
    <div class="info">
      <!-- <p>Organization name: {{orgName}}</p> -->

      <p class="occupation">{{userinf.occupation+" for "+userinf.years+yrlabel}} at {{company}}</p>
      <p class="bday">Born on {{birthdate}}</p>
      <p class="age">{{userinf.age}} years old</p>
      <p class="address">Lives in {{userinf.address}}</p>
      <p class="email">
        Email at
        <span class="emailadd">{{userinf.email}}</span>
      </p>

      <b-button
        v-on:click="Alert(userInfo.username)"
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
  data() {
    return {
      userinf: {},
      image: require("@/assets/profile.png"),
      size: 0,
      yrlabel: "",
      company: "Aksintyur",
      birthdate: ""
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();

    this.$store.dispatch("getUserInfo").then(resp => {
      var user = resp.data;
      // this.userInfo = resp.data;
      this.birthdate =
        user.birthdate.month +
        " " +
        user.birthdate.day +
        ", " +
        user.birthdate.year;
      this.userinf = resp.data;
      if (this.userinf.years > 1) {
        this.yrlabel = " years";
      } else {
        this.yrlabel = " year";
      }
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    Alert(o) {
      alert(o);
    },
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
        $(".prfl").css({ width: "300px", "margin-bottom": "25px" });
        $(".logo").css({ width: "250px", height: "250px" });
        $("#profile").css({ width: "auto", height: "250px" });
      } else if (window.innerWidth < this.size) {
        $(".info").css({
          width: "100%",
          "margin-top": "4px",
          "text-align": "center"
        });
        $(".prfl").css({ width: "100%", "margin-bottom": "0px" });
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
div {
  font-family: verdana;
}

.username {
  font-size: 17px;
  margin-top: 0px;
  color: #315273;
  width: 100%;
}

hr {
  margin-top: 0;
  margin-bottom: 0;
}

.occupation {
  font-size: 18px;
  color: #315273;
  width: 100%;
}
.fullname {
  margin-top: 13px;
  margin-bottom: 1px;
  color: #364452;
  width: 100%;
}
.address {
  font-size: 16px;
  color: #3b4d70;
  font-weight: normal;
  width: 100%;
}
.age {
  color: #3b4d70;
}

.bday {
  font-weight: bold;
  color: #3b4d70;
  width: 100%;
}

.des {
  color: #1e4773;
}
.email {
  color: #486399;
  font-size: 15px;
  width: 100%;
}
.emailadd {
  text-decoration: underline;
  width: 100%;
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
  margin-bottom: 0;
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
  width: 300px;
  margin-bottom: 25px;
  /* background:grey; */
}
</style>
