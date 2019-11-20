<template>
  <b-row class="con">
    <div class="badgePic rows" v-bind:class="{small: resized}">
      <img class="background" v-if="url" :src="url">
      <div class="bcontent">
        <img src="@/assets/image2.png" class="blogo">
        <h5 class="b">{{ badgename }}</h5>
        <p class="b">{{ venue }}</p>
        <p class="b">{{ date.month+" "+date.day+" "+date.year }}</p>
      </div>
    </div>
    <div class="rows" v-bind:class="{small: resized}">
      <form class="signupform Form" @submit.prevent="createBadge">
        <center>
          <h2 class="sign">Offer A Badge</h2>
        </center>
        <div class="holder">
          <span class="labl">Certificate name | award name</span>
          <b-input v-model="badgename" autocomplete="off" required/>
        </div>
        <div class="holder">
          <span class="labl">Name of event</span>
          <b-input v-model="venue" autocomplete="off" required/>
        </div>
        
        <div class="holder drow">
          <p class="labl">Date</p>
          <table class="bday table">
            <td class="inpt d">
              <b-input
                class="BD table"
                id="mnth"
                v-model="date.month"
                autocomplete="off"
                placeholder="Month"
                min="1"
                ref="month"
                max="12"
                required
              />
              <div class="month">
                <div v-for="(m,n) in cal" :key="n">
                  <h5 class="m" @click="month(m)">{{m}}</h5>
                </div>
              </div>
            </td>

            <td id="day" class="inpt d">
              <b-input
                type="number"
                v-model="date.day"
                autocomplete="off"
                placeholder="Day"
                min="1"
                max="32"
                required
              />
            </td>
            <td class="inpt d">
              <b-input
                type="number"
                autocomplete="off"
                placeholder="Year"
                min="1990"
                max="2019"
                required
                v-model="date.year"
              />
            </td>
          </table>
        </div>
        <div class="mrgnbtm">
          <span class="labl">Badge background</span>
          <b-form-file class="fileinput" placeholder @change="onFileChange" ref="background"></b-form-file>
        </div>
        <div class="bhldr">
          <b-button  v-if="!sending" @click="$bvModal.hide('offer')" class="btn btn-danger nm">Cancel</b-button>
          <b-button class="btn nm" type="submit" variant="primary">
            <span v-if="sending">
              Creating&nbsp;
              <b-spinner class="align-middle"></b-spinner>
            </span>
            <span v-else>Create</span>
          </b-button>
        </div>
      </form>
    </div>
  </b-row>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import "@/Styles/mystyle.css";
export default {
  name: "SignUp",
  props: {
    userInfo: Object
  },
  data() {
    return {
      badgename: "",
      background: null,
      venue: "",
      date: { month: "", day: "", year: "" },
      sending: false,
      rep: 0,
      cal: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      resized: false,
      url: null
    };
  },
  methods: {
    onFileChange(e) {
      console.log(this.background);
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },

    handleResize() {
      if (window.innerWidth < 850) {
        this.resized = true;
      } else {
        this.resized = false;
      }
    },
    validCode() {
      this.sending = true;
      return new Promise(function(resolve, reject) {
        var bcode = "";
        var char = "abcdefghijklmnopqrstuvwxyz1234567890";
        for (var i = 0; i < 7; ++i) {
          var index = Math.floor(Math.random() * char.length);
          bcode += char.charAt(index);
        }
        axios
          .post("http://localhost:8081/user/validatecode", { code: bcode })
          .then(res => {
            resolve(bcode);
          })
          .catch(err => {
            resolve("CODE_ALREADY_TAKEN");
          });
      });
    },
    month(m) {
      this.date.month = m;
    },
    async offerBadge() {
      var ok = false;
      var badgecode = await this.validCode();
      while (true) {
        if (badgecode == "CODE_ALREADY_TAKEN") {
          console.log("regenerating.....");
          badgecode = await this.validCode();
        } else {
          console.log("sending code");
          return new Promise(function(resolve, reject) {
            resolve(badgecode);
          });
        }
      }
    },
    async createBadge() {
      var bdgcode = await this.offerBadge();
      console.log("final result: " + bdgcode);
      var fd = new FormData();
      let badge = {
        granted: false,
        code: bdgcode,
        badgename: this.badgename,
        venue: this.venue,
        recipient: [],
        certificateName: "",
        descriptions: "",
        organization: "",
        date: {
          month: this.date.month,
          day: this.date.day,
          year: this.date.year
        }
      };
      // fd.append("photo",this.$refs.background.files[0]);
      // console.log(this.$refs.background.files[0]);
      // fd.append("data", badge);
      axios
        .post("http://localhost:8081/user/offerbadge", {
          user: this.$store.getters.token,
          badge: badge
          // data: fd,
          // contentType: false,
          // processData: false
        })
        .then(res => {
          this.badgename = "";
          this.venue = "";
          this.date.month = "";
          this.date.day = "";
          this.date.year = "";
          $("p").removeClass(".label-active");
          this.sending = false;
          this.$emit("submit");
          this.$bvModal.hide("offer");
        })
        .catch(err => {
          alert("ERROR OCCURED!");
          console.log(err);
        });
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  mounted() {
    $("#mnth").focus(function() {
      $(".month").slideDown();
    });

    $("#mnth").focusout(function() {
      $(".month").slideUp();
    });
  },
  watch: {
    background(image) {
      if (image != null) {
        console.log(image);
        $(".badgePic").css({
          "background-image": "url(@/assets/" + image.name
        });
      }
    }
  }
};
</script>
<style scoped>
.upic {
  background: red;
  padding-top: 0;
}
.holder2 {
  height: 40px;
  position: relative;
  /* background:red; */
}
.upicture {
  /* top: 0;
  padding-top:0;
  left:0;
  position: absolute; */
}
.slide-enter-active {
  -moz-transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  -o-transition-duration: 0.4s;
  transition-duration: 0.4s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  -o-transition-duration: 0.4s;
  transition-duration: 0.4s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}

.holder {
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 0px;
  margin-right: 0px;
  text-align: left;
}

.labl {
  margin: 0;
  padding: 0;
  color: #555f63;
}

.table {
  /* border:none; */
  margin: 0;
}

.rows {
  width: 50%;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
}
.small {
  width: 100%;
}
.bhldr {
  text-align: right;
}

.nm {
  margin: 5px;
  border-radius: 4px;
}

.inpt {
  margin-left: 0;
  margin-right: 0;
  padding: 0;
}

.drow {
  padding-top: 0;
  margin-top: 0px;
}
.d {
  padding-top: 5px;
}

.con {
  margin: 0;
  padding: 0;
}

.Form {
  width: 100%;
  padding: 10px;
  height: 100%;
  background: #f2f9fc;
  border: 2px solid #93c1dd;
}

.background {
  position: absolute;

  /* z-index: -1; */
  width:100%;
  height: 100%;
  margin: 0;
  left: 0;
  top: 0;
  /* opacity: 0.5; */
     -webkit-filter: brightness(50%); /* Safari 6.0 - 9.0 */
  filter: brightness(50%);
}

.bcontent {
  position: relative;
  -webkit-filter: brightness(120%); /* Safari 6.0 - 9.0 */
  filter: brightness(120%);
  width: 100%;
  height: auto;
  z-index: 99999;
  /* height: 100%; */
  margin: 0;
  left: 0;
  top: 0;
  color:white;
  /* background: red; */
  /* opacity: 0.5; */
}
</style>