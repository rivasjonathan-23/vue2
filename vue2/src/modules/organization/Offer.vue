<template>
  <b-row>
    <b-col class="badgePic">
      <img src="@/assets/image.png">
      <h5 class="b">{{ badgename }}</h5>
      <p class="b">{{ venue }}</p>
      <p class="b">{{ date.month+" "+date.day+" "+date.year }}</p>
    </b-col>
    <b-col>
    <form class="signupform" @submit.prevent="createBadge">
      <center>
        <h1 class="sign">Offer A Badge</h1>
      </center>
      <label>
        <div class="fixedwidth">
          <p class="label-txt">Certificate name</p>
          <input
            type="text"
            class="input"
            name="badgename"
            v-model="badgename"
            autocomplete="off"
            required
          >
          <div class="line-box">
            <div class="line"></div>
          </div>
        </div>
      </label>
      <label>
        <div class="fixedwidth">
          <p class="label-txt">Name of the event</p>
          <input type="text" class="input" name="venue" v-model="venue" autocomplete="off" required>
          <div class="line-box">
            <div class="line"></div>
          </div>
        </div>
      </label>
      <label class="ln">
        <p id="gend" class="label-txt">Date</p>
        <table class="bday">
          <td>
            <input
              autocomplete="off"
              type="text"
              class="BD"
              id="mnth"
              placeholder="Month"
              min="1"
              max="12"
              required
              v-model="date.month"
            >
            <div class="month">
              <h5 class="m" @click="month('January')">January</h5>
              <h5 class="m" @click="month('February')">February</h5>
              <h5 class="m" @click="month('March')">March</h5>
              <h5 class="m" @click="month('April')">April</h5>
              <h5 class="m" @click="month('May')">May</h5>
              <h5 class="m" @click="month('June')">June</h5>
              <h5 class="m" @click="month('July')">July</h5>
              <h5 class="m" @click="month('August')">August</h5>
              <h5 class="m" @click="month('September')">September</h5>
              <h5 class="m" @click="month('October')">October</h5>
              <h5 class="m" @click="month('November')">November</h5>
              <h5 class="m" @click="month('December')">December</h5>
            </div>
          </td>
          <td id="day">
            <input
              type="number"
              class="BD"
              placeholder="Day"
              min="1"
              max="32"
              required
              v-model="date.day"
            >
          </td>
          <td>
            <input
              type="number"
              class="BD"
              placeholder="Year"
              min="1990"
              max="2019"
              required
              v-model="date.year"
            >
          </td>
        </table>
        <div class="line-box">
          <div class="line"></div>
        </div>
      </label>
      <button id="postB" class="btn btn-primary btn-lg">
        <span v-if="sending">Creating&nbsp;
          <b-spinner class="align-middle"></b-spinner>
        </span>
        <span v-else>Submit</span>
      </button>
    </form>
    </b-col>
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
      rep: 0
    };
  },
  methods: {
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

  mounted() {
    $(".input").focus(function() {
      $(this)
        .parent()
        .find(".label-txt")
        .addClass("label-active");
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find(".label-txt")
          .removeClass("label-active");
      }
    });

    $("#mnth").focus(function() {
      if ($(".month").is(":hidden")) {
        $("#mnth").val("");
        $(".month").slideDown();
      } else if ($("#mnth").val() != "") {
        $(".month").slideUp();
      }
    });
  }
};
</script>