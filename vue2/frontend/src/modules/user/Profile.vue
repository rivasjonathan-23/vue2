<template>
  <div id="Profile">
    <div v-bind:class="{small: resized}" class="prfl">
      <div class="logo" v-bind:class="{smallLogo: resized}">
        <img :src="image" alt v-bind:class="{smallpro: resized}" class="profile">
      </div>
      <h4 class="fullname">{{ userinf.firstname+" "+userinf.lastname }}</h4>
      <p class="username">{{userinf.username}}</p>
    </div>
    <div v-bind:class="{smallinfo: resized, changepad: chpad}" class="info">
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
        v-on:click="$router.push('/user_edit_profile')"
        variant="outline-primary"
      >Update Profile</b-button>
    </div>
    <div class="outercont" v-bind:class="{smlbcount: resized}">
      <div class="bcountoutercont" v-bind:class="{sml: resized}">
        <div class="countinnercont">
          <h1>{{badgenum}}</h1>
        </div>
        <h3 v-if="resized" class="btext2">{{badgenum > 1 ? 'Badges': 'Badge'}}</h3>
        <div class="bnumdesign" v-bind:class="{changedes: resized}"></div>
        <p v-if="!resized" class="btext">{{badgenum > 1 ? 'Badges': 'Badge'}}</p>
      </div>
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
        birthdate: { month: "September", day: 23, year: 1998 },
        age: 21
      },
      image: require("@/assets/profile.jpg"),
      size: 0,
      yrlabel: "",
      company: "Aksintyur",
      birthdate: "September 23, 1998",
      resized: false,
      btext: "Badge",
      chpad: false
    };
  },
  props: {
    badgenum: Number,
  },
  created() {
    this.btext = this.badgenum > 1 ? "Badges" : "Badge";
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
    redirect(path) {
      this.$router.push(path);
    },
    handleResize() {
      if (window.innerWidth < 1200) {
        if (window.innerWidth > 900) {
          this.chpad = true;
        } else {
          this.chpad = false;
        }
        if (window.innerWidth < 900) {
          this.resized = true;
        } else {
          this.resized = false;
        }
      } else {
        this.resized = false;
        this.chpad = false;
      }
    },
    InsideMethod() {
      this.$emit("InsideMethod");
    }
  }
};
</script>
<style scoped>
.outercont {
  width: 20%;
  float: left;
  font-family: verdana;
  margin-top: 160px;
}
.smlbcount {
  width: 100%;
  margin: 0;
  padding-bottom: 40px;
}

.info {
  float: left;
  font-size: 14px;
  width: 55%;
  text-align: left;
  margin-bottom: 0;
  margin-top: 155px;
  padding: 10px;
}

.changepad {
  padding-left: 6%;
}
.countinnercont {
  z-index: 55555;
  background: #b8d6e3;
  border-radius: 50px;
  padding-top: 9px;
  margin-left: 40px;
  color: #416e82;
  padding-bottom: 9px;
  width: 80px;
  top: 24px;
  border-bottom: 5px solid #89bfd6;
  border-top: 5px solid #f0fbff;
  border-right: 5px solid #f0fbff;
  border-left: 5px solid #f0fbff;
  overflow: visible;
  position: absolute;
  z-index: 1000;
}

.changeinner {
  border-bottom: 5px solid #f0fbff;
  border-top: 5px solid #f0fbff;
  border-right: 5px solid #89bfd6;
  border-left: 5px solid #89bfd6;
}

.changezi {
  z-index: -1;
}
.bnumdesign {
  width: 100%;
  padding: 0;
  border-right: 20px solid white;
  border-left: 20px solid white;
  border-bottom: 20px solid #daedf5;
  border-top: 20px solid #daedf5;
}
.changedes {
  border-left: 20px solid #daedf5;
}
.bcountoutercont {
  width: 180px;
  padding-top: 45px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  color: #416e82;
  border-bottom: 2px solid #d5e7f5;
}

.sml {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: none;
}
.btext {
  margin-top: 20px;
  font-size: 22px;
}

.btext2 {
  position: absolute;
  left: 140px;
  top: 50px;
  font-size: 22px;
}
.logo {
  overflow: hidden;
  margin-top: 30px;
  width: 250px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0px 1px 5px #0e222b;
  box-shadow: 0px 1px 5px #0e222b;
  height: 250px;
  border: 1px solid white;
  background: white;
}

.prfl {
  float: left;
  width: 25%;
  padding-left: 25px;
  padding-right: 25px;
  margin-top: 0;
  margin-bottom: 0px;
  border-bottom: 2px solid #d5e7f5;
  /* background:grey; */
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
