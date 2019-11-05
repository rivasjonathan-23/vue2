<template>
  <div>
    <div id="mybadge">
      <div class="sheader">
        <span class="tbadge">
          <span>Badges&nbsp;</span>
          <span class="nb">{{badgelist.length}}</span>
        </span>
        <span class="tbadge">
          <span>Pending badges&nbsp;</span>
          <span class="nb">{{badgelist.length}}</span>
        </span>
        <b-button
          id="createC"
          variant="primary"
          class="btn"
          v-b-modal.availBadge-modal
        >Avail new certificate</b-button>
      </div>
      <div id="line"></div>
      <div class="loading" v-show="isLoading">
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </div>
      <h3 class="temp" v-show="hasData">You haven't availed badges yet</h3>
      <div v-for="(badge, index) in badgelist" :key="index">
        <b-row v-if="badge.granted" class="row">
          <div class="badgeicon" v-bind:class="{zoomin: resized}">
            <img src="@/assets/image2.png" class="blogo" />
            <h5 class="binfo">{{ badge.badgename }}</h5>
            <p class="binfo">{{ badge.venue }}</p>
            <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
          </div>
          <div class="cerBody" v-bind:class="{zoomin: resized}">
            <p class="name">
              This certificate of
              <br />
              {{badge.certificateName}}
            </p>
            <span>is awarded to</span>
            <h5>{{fullname}}</h5>
            <br />
            <p class="description">{{badge.descriptions}}</p>
            <br />
            <p>Given this {{ badge.date.month+" "+badge.date.day+", "+badge.date.year }}</p>
            <div class="text-center byorg">
              <h5>Given by {{badge.organization}}</h5>
            </div>
          </div>
        </b-row>
      </div>
    </div>
    <b-modal
      size="sm"
      class="modl"
      id="availBadge-modal"
      title="Avail badge"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <form class="addR" @submit.prevent="searchBadge">
        <span class="error" v-show="error">Incorrect code or badge is not available</span>
        <b-input
          class="binput"
          v-model="badgeCode"
          autocomplete="off"
          placeholder="Badge code"
          required
        />

        <div class="btnrow" v-if="!availing">
          <b-button type="submit" variant="primary" class="btn btn-block">Avail badge</b-button>
          <b-button
            @click="$bvModal.hide('availBadge-modal')"
            variant="danger"
            class="btn btn-block"
            v-on:click="reset"
          >Cancel</b-button>
        </div>
        <b-row v-else class="add">
          <span>
            <b-spinner class="align-middle"></b-spinner>&nbsp;
            <strong>Searching badge...</strong>
          </span>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { userInfo } from "os";

export default {
  name: "Newsfeed",
  props: {
    userInfo: Object
  },
  data() {
    return {
      badgelist: [
        {
          granted: true,
          badgename: "First Place",
          venue: "Passerelles Numeriques coding contest",
          date: { month: "June", day: 23, year: 2019 },
          descriptions:
            "For winnig first place in the passerelles numeriques coding contest held at Nasipit, Talamban, Cebu City at June 19, 2019",
          organization: "Passerelless numeriques"
        },
        {
          granted: true,
          badgename: "First Place",
          venue: "Passerelles Numeriques coding contest",
          date: { month: "June", day: 23, year: 2019 },
          descriptions:
            "For winnig first place in the passerelles numeriques coding contest held at Nasipit, Talamban, Cebu City at June 19, 2019",
          organization: "Passerelless numeriques"
        }
      ],
      badgeCode: "",
      hasData: false,
      error: false,
      fullname: "Jonathan Rivas",
      availing: false,
      size: 0,
      resized: false,
      isLoading: false
    };
  },
  methods: {
    searchBadge() {
      this.availing = true;
      axios
        .post("http://localhost:8081/user/availbadge", {
          code: this.badgeCode,
          credentials: this.$store.getters.token
        })
        .then(resp => {
          this.availing = false;
          this.reset();
          this.$bvModal.hide("availBadge-modal");
          axios
            .post("http://localhost:8081/user/userbadges", {
              user: this.$store.getters.token
            })
            .then(res => {
              alert("got updated data");
              console.log("badgess" + res.data.badges);
              this.badgelist = res.data.badges.reverse();
              this.fullname = userInfo.firstname + " " + userInfo.lastname;
              console.log({ badges: this.badgelist });
              if (this.badgelist.length == 0) {
                this.hasData = true;
              }
            });
        })
        .catch(error => {
          this.availing = false;
          $(".binput").css({ "border-color": "red" });
          this.error = true;
        });
    },
    reset() {
      this.error = false;
      this.badgeCode = "";
      $(".binput").css({ "border-color": "gray" });
    },
    handleResize() {
      if (window.innerWidth < 1200) {
        this.resized = true;
      } else {
        this.resized = false;
      }
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
    axios
      .post("http://localhost:8081/user/userbadges", {
        user: this.$store.getters.token
      })
      .then(res => {
        this.isLoading = false;
        // console.log("badgess" + res.data.badges);
        // this.badgelist = res.data.badges.reverse();
        // console.log({ badges: this.badgelist });
        // if (this.badgelist.length == 0) {
        //   this.hasData = true;
        // }
      });
  }
};
</script>
<style scoped>
.nb {
  padding-left: 7px;
  padding-right: 7px;
  padding-top:3px;
  padding-bottom:3px;
  background: #d1e2e6;
  border-radius: 25px;
  font-size: 20px;
}

.cerBody {
  width: 59%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 20px;
  color: #3d4c54;
  background: #f2f8fa;
  text-align: center;
  font-family: Verdana;
  font-size: 16px;
  height: 420px;
}
.btnrow {
  background: white;
  padding: 0;
  box-shadow: none;
  -webkit-box-shadow: 0px 2px 6px white;
  box-shadow: 0px 2px 6px white;
}
.blogo {
  margin-top: 30px;
  width: 200px;
}

.btn:focus {
  outline: none;
}

.name {
  font-size: 18px;
}

.row {
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 25px;
  padding: 0;
  margin-bottom: 25px;
  background: #f2f8fa;
  -webkit-box-shadow: 0px 2px 6px darkgrey;
  box-shadow: 0px 2px 6px darkgrey;
}
.badgeicon {
  /* -webkit-filter: opacity(80%);
  filter: opacity(80%); */
  height: 420px;
  color: white;
  width: 40%;
  margin-bottom: 0;
  text-align: center;
  background-image: url("~@/assets/background2.jpg");
  background-size: cover;
  margin-top: 0;
}

.zoomin {
  width: 100%;
}

.btn2 {
  width: 100%;
}

.description {
  font-size: 17px;
}
.byorg {
  position: relative;
  width: 70%;
  left: 15%;
}
.loading {
  margin-top: 30px;
  padding-top: 100px;
  padding-bottom: 100px;
  background: #f2f8fa;
}

.align-middle {
  color: rgb(3, 78, 133);
  height: 30px;
  width: 30px;
}
.sheader {
  /* background: rgb(138, 196, 219, 0.9); */
  text-align: right;
  font-family: verdana;
  overflow: visible;
  padding-bottom: 0;
}
#createC {
  border: none;
  border-radius: 2px;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 15px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin: 4px;
}
#line {
  color: lightblue;
  margin-top: 5px;
  height: 4px;
  background: lightblue;
}
.tbadge {
  font-size: 18px;
  margin-left: 2%;
  margin-bottom: 0;
  padding-bottom: 0;
  margin-right: 2%;
  color: #225880;
  padding-top: 10px;
  margin-top: 20px;
}
label {
  margin-top: 5px;
}

.bdgs {
  border-radius: 0;
  margin-bottom: 10px;
  background: #f2f5f5;
}
.temp {
  margin-top: 50px;
  margin-bottom: 100px;
  color: #2a5c82;
}

#mybadge {
  text-align: center;
  margin-top: 0px;
  padding-top: 0;
  font-family: verdana;
  overflow: hidden;
}
.error {
  color: red;
  font-size: 13px;
}

.add {
  color: #0071ff;
  text-align: center;
  margin-left: 27px;
}

.binput {
  margin-bottom: 15px;
}

.pending {
  padding: 0;
  margin: 0;
}
</style>
