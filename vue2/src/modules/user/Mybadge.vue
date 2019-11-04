<template>
  <div>
    <div id="mybadge">
      <div class="sheader">
        <span class="tbadge">
          {{badgelist.length}}
          <span v-if="badgelist.length > 0">badges</span>
          <span v-else>badge</span>
        </span>
        <span class="tbadge">
          {{badgelist.length}}
          <span v-if="badgelist.length > 0">pending badges</span>
           <span v-else >pending badge</span>
        </span>
        <b-button
          id="createC"
          variant="primary"
          class="btn"
          v-b-modal.availBadge-modal
        >Avail new certificate</b-button>
      </div>
      <div id="line"></div>
      <h3 class="temp" v-show="hasData">You haven't availed badges yet</h3>
      <div v-for="(badge, index) in badgelist" :key="index">
        <b-row v-if="badge.granted" class="row">
          <div id="badgeicon" class="badgeicon">
            <img src="@/assets/image.png" class>
            <h5 class="binfo">{{ badge.badgename }}</h5>
            <p class="binfo">{{ badge.venue }}</p>
            <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
            <p id="code" class="binfo">Code:&nbsp;{{ badge.code }}</p>
          </div>
          <div class="cerBody">
            <p class="name">
              This certificate of
              <br>
              {{badge.certificateName}}
            </p>
            <span>is awarded to</span>
            <h5>{{fullname}}</h5><br>
            <p class="description">{{badge.descriptions}}</p>
            <br>
            <p>Given this {{ badge.date.month+" "+badge.date.day+", "+badge.date.year }}</p>
            <div class="text-center byorg">
              <h5>Given by {{badge.organization}}</h5>
            </div>
          </div>
        </b-row>
        <!-- <div v-if="badge.granted">
          <b-card class="bdgs">
            <b-row class="justify-content-md-center">
              <b-col class="text-center">
                <img src="@/assets/image.png" class>
                <h5>{{badge.badgename}}</h5>
              </b-col>
              <b-col cols="8" class="border-left">
                <div class="text-center ifont">
                  <h4>
                    This certificate of
                    <br>
                    {{badge.certificateName}}
                  </h4>
                  <span>is awarded to</span>
                  <h3>{{fullname}}</h3>
                  <p>for</p>
                  <h5>{{badge.descriptions}}</h5>
                  <br>
                  <p>Given this {{ badge.date.month+" "+badge.date.day+", "+badge.date.year }}</p>
                  <div class="text-center byorg">
                    <p class="border-bottom">Certified by {{badge.organization}}</p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </div>-->
        <!-- <div v-else>
          <b-card class="bdgs">
            <p class="pending">PENDING</p>
            <h3 class="pending">{{badge.badgename}}</h3>
            <hr>
            <h5 class="pending">Waiting for ceritification from {{badge.organization}}</h5>
          </b-card>
        </div>-->
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

        <b-row v-if="!availing">
          <b-col>
            <b-button
              @click="$bvModal.hide('availBadge-modal')"
              variant="danger"
              class="btn btn-block"
              v-on:click="reset"
            >Cancel</b-button>
          </b-col>
          <b-col cols="6">
            <b-button type="submit" variant="primary" class="btn btn-block">Avail badge</b-button>
          </b-col>
        </b-row>
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
      badgelist: [],
      badgeCode: "",
      hasData: false,
      error: false,
      fullname: "Jonathan Rivas",
      availing: false,
      size: 0,
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
              // this.fullname = userInfo.firstname+" "+userInfo.lastname;
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
      if (window.innerWidth >= this.size) {
        $(".badgeicon").css({ width: "40%" });
        $(".cerBody").css({ width: "59%" });
      } else if (window.innerWidth < this.size) {
        if (window.innerWidth <= 1000) {
          $(".badgeicon").css({ width: "100%" });
          $(".cerBody").css({ width: "100%" });
        }
      }
    },
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
        console.log("badgess" + res.data.badges);
        this.badgelist = res.data.badges.reverse();
        console.log({ badges: this.badgelist });
        if (this.badgelist.length == 0) {
          this.hasData = true;
        }
      });
  }
};
</script>
<style scoped>
.cerBody {
  width: 59%;
  padding-left:20px;
  padding-right:20px;
  padding-top:30px;
  padding-bottom:20px;
  color:#3d4c54;
  background: #e6f2f7;
  text-align: center;
  font-family: Verdana;
  font-size: 16px;
  height: 420px;
  overflow:auto;
}

.btn:focus {
  outline: none;
}

.name {
  font-size: 18px;
}

.row {
  margin-top: 25px;
  margin-bottom: 25px;
}
#badgeicon {
  -webkit-filter: opacity(80%);
  filter: opacity(80%);
  height: 420px;
  color: white;
  width: 40%;
  overflow: auto;
  margin-bottom: 0;
  background-image: url("~@/assets/background2.jpg");
  background-size: cover;
  margin-top: 0;
}

.badgeicon {
  text-align: center;
}

.description {
  font-size: 17px;
}
.byorg {
  position: relative;
  width: 70%;
  left: 15%;
}

.sheader {
  /* background: rgb(138, 196, 219, 0.9); */
  text-align: right;
  font-family: verdana;
  overflow:visible;
  padding-bottom: 0;
}
#createC {
  border: none;
  border-radius: 0;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 15px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin:4px;
}
#line {
  color: lightblue;
  margin-top: 5px;
  height:4px;
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
