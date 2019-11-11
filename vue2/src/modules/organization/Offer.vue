<template>
  <b-row class="con">
    <div class="badgePic rows" v-bind:class="{small: resized}">
      <img src="@/assets/image2.png" class="blogo">
      <h5 class="b">{{ badgename }}</h5>
      <p class="b">{{ venue }}</p>
      <p class="b">{{ date.month+" "+date.day+" "+date.year }}</p>
    </div>
    <div class="rows" v-bind:class="{small: resized}">
      <form class="signupform Form" @submit.prevent="createBadge">
        <center>
          <h2 class="sign">Offer A Badge</h2>
        </center>
        <div class="holder">
          <b-input
            v-model="badgename"
            autocomplete="off"
            placeholder="Certificate name | award name "
            required
          />
        </div>
        <div class="holder">
          <b-input v-model="venue" autocomplete="off" placeholder="Name of event" required/>
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
                @focus="focus = true"
                required
              />
              <transition name="slide">
                <div class="month" v-show="focus">
                  <div v-for="(m,n) in cal" :key="n">
                    <h5 class="m" @click="month(m)">{{m}}</h5>
                  </div>
                </div>
              </transition>
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

        <div class="bhldr">
          <b-button @click="cancel" class="btn btn-danger btn-lg nm">Cancel</b-button>
          <b-button class="btn btn-lg nm" type="submit" variant="primary">
            <span v-if="sending">
              Creating&nbsp;
              <b-spinner class="align-middle"></b-spinner>
            </span>
            <span v-else>Submit</span>
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
      focus: false,
      resized: false
    };
  },
  methods: {
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
    cancel() {
      this.$emit("cancel");
    },
    month(m) {
      this.date.month = m;
      this.focus = false;
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
      axios
        .post("http://localhost:8081/user/offerbadge", {
          user: this.$store.getters.token,
          badge: badge
        })
        .then(res => {
          this.badgename = "";
          this.venue = "";
          this.date.month = "";
          this.date.day = "";
          this.date.year = "";
          $("p").removeClass(".label-active");
          this.$emit("submit");
          this.sending = false;
          this.$store.dispatch("submit");
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
  }
};
</script>
<style scoped>
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
  margin-bottom: 30px;
  margin-top: 30px;
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
  background: #e1f1f7;
}
</style>