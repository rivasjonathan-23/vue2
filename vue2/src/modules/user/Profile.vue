<template>
  <div id="Profile">
    <div v-bind:class="{small: resized}" class="prfl">
      <div class="logo" v-bind:class="{smallLogo: resized}">
        <img :src="image" alt v-bind:class="{smallpro: resized}" class="profile">
      </div>
      <h4 class="fullname">{{ userinf.firstname+" "+userinf.lastname }}</h4>
      <p class="username">{{userinf.username}}</p>
    </div>
    <div v-bind:class="{smallinfo: resized}" class="info">
      <p class="occupation">{{userinf.occupation+" for "+userinf.years+yrlabel}} at {{company}}</p>
      <p class="bday">Born on {{birthdate}}</p>
      <p class="age">{{userinf.age}} years old</p>
      <p class="address">Lives in {{userinf.address}}</p>
      <p class="email">
        Email at
        <span class="emailadd">{{userinf.email}}</span>
      </p>

      <b-button 
        class="update"
        v-on:click="Alert(userInfo.username)"
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
      userinf: {
        username: "jrivas2398",
        firstname: "Jonathan",
        lastname: "Rivas",
        occupation: "POORgrammer",
        years: "2",
        address: "Nasipit, Talamban, Cebu, Philippines",
        email: "jrivas@gmail.com",
        birthdate: { month: "September", day: 23, year: 1998},
        age: 21
      },
      image: require("@/assets/profile.jpg"),
      size: 0,
      yrlabel: "",
      company: "Aksintyur",
      birthdate: "September 23, 1998",
      resized: false
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
      if (window.innerWidth < 1200) {
        this.resized = true;
      } else {
        this.resized = false;
      }
    },
    InsideMethod() {
      this.$emit("InsideMethod");
    }
  }
};
</script>
<style scoped>
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

.update {
  border-radius: 2px;
}

.profile {
  width: auto;
  height: 250px;
}

.btn {
  border-radius: 2px;
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
  -webkit-box-shadow: 0px 1px 5px #545f6b;
  box-shadow: 0px 1px 5px #545f6b;
  height: 250px;
  border:1px solid white;
  background: white;
}

.prfl {
  float: left;
  width: 250px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 0;
  margin-bottom: 0px;
  border-bottom: 2px solid #d5e7f5;
  /* background:grey; */
}

.small {
  width: 100%;
  margin: 0;
}

.smallinfo {
  width: 100%;
  margin-top: 4px;
  text-align: center;
}

.smallLogo {
  width: 180px;
  height: 180px;
  overflow: hidden;
}
.smallpro {
  width: auto;
  height: 180px;
}

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
</style>
