<template>
  <div>
    <div id="mybadge">
      <div class="sheader">
        <span class="tbadge" v-bind:class="{fit: sm}">
          <span>Badges&nbsp;</span>
          <span class="nb">{{badgelist.length}}</span>
        </span>
        <span class="tbadge" v-bind:class="{fit: sm}">
          <span>Pending badges&nbsp;</span>
          <span class="nb">{{badgelist.length}}</span>
        </span>
        <b-button
          id="createC"
          variant="primary"
          class="btn"
         v-bind:class="{fit: sm}"
          v-b-modal.availBadge-modal
        >Avail new certificate</b-button>
      </div>
      <div id="line"></div>
      <div class="loading" v-show="isLoading">
        <div class="text-center text-danger my-2">
          <b-spinner id="loading2" class="align-middle"></b-spinner>
        </div>
      </div>
      <h3 class="temp" v-show="hasData">You haven't availed badges yet</h3>
      <div v-for="(badge, index) in badgelist" :key="index">
        <b-row v-if="badge.granted" class="row" >
          <div class="badgeicon" v-bind:class="{zoomin: resized}" >
            <div class="bpic" v-bind:style='{backgroundImage: `url(${require("@/assets/bb/"+badge.imgnum+".jpg")})`}'>
            </div>
            <div class="background">
              <div class="bcontent">
                <img src="@/assets/image2.png" class="blogo">
                <h5 class="binfo">{{ badge.badgename }}</h5>
                <p class="binfo">{{ badge.venue }}</p>
                <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
              </div>
            </div>
          </div>
          <div class="cerBody" v-bind:class="{zoomin: resized}">
            <p class="name">
              This certificate of
              <br>
              {{badge.certificateName}}
            </p>
            <span>is awarded to</span>
            <h5>{{fullname}}</h5>
            <br>
            <p class="description">{{badge.descriptions}}</p>
            <br>
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

        <b-row class="btnrow nosh" v-if="!availing">
          <b-col class="bl">
              <b-button
              @click="$bvModal.hide('availBadge-modal')"
              variant="danger"
              class="btn btn-block"
              v-on:click="reset"
            >Cancel</b-button>
          </b-col>
          <b-col class="br">
            <b-button type="submit" variant="primary" class="btn btn-block">Avail badge</b-button>
          </b-col>
        </b-row>
        <b-row v-else class="add nosh">
          <div>
            <b-spinner class="align-middle"></b-spinner>&nbsp;
            <strong>Searching badge...</strong>
          </div>
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
      resized: false,
      isLoading: false,
      sm: false,
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
      if (window.innerWidth < 900) {
        this.resized = true;
        if (window.innerWidth < 600) {
          this.sm = true;
        } else {
          this.sm = false;
        }
      } else {
        this.sm = false;
        this.resized = false;
      }
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    this.badgelist = [
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
        },
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
      ];
      var num =0;
    this.badgelist.forEach(element => {
      element["imgnum"] = num;
      num += 1;
      if (num > 10) {
        num = 0;
      }
    });
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
    // axios
    //   .post("http://localhost:8081/user/userbadges", {
    //     user: this.$store.getters.token
    //   })
    //   .then(res => {
    //     this.isLoading = false;
    //     console.log("badgess" + res.data.badges);
    //     this.badgelist = res.data.badges.reverse();
    //     console.log({ badges: this.badgelist });
    //     if (this.badgelist.length == 0) {
    //       this.hasData = true;
    //     }
    //     var num = 0;
    //     this.badgelist.forEach(badge => {
    //       badge["imgnum"] = num;
    //       num += 1;
    //         if (num > 10) {
    //         num = 0;
    //       }
    //     })
    //   });
  }
};
</script>
<style scoped>
.bl {
  margin-right: 0;
  margin-left: 0;
 padding-right: 5px;
  padding-left: 5px;

}

.br {
  margin-left: 0;
  margin-right: 0;
  padding-left: 5px;
  padding-right: 5px;

}
.nb {
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 3px;
  padding-bottom: 3px;
  background: #d1e2e6;
  border-radius: 5px;
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
  height: 390px;
  border-right:6px solid #779cb5;
  border-bottom:8px solid #f2f8fa;
}
.btnrow {
  background: white;
  padding: 0;
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
  -webkit-box-shadow: 0px 1px 6px #74818f;
  box-shadow: 0px 1px 6px #74818f;
}

.nosh {
  margin:0;
  padding:0;
   -webkit-box-shadow: 0px 1px 6px white;
  box-shadow: 0px 1px 6px white;
  background: white;
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
 position: relative;
}

.binfo {
  margin:0;
  padding:0;
}

.background {
  position: absolute;
  margin:0;
  /* z-index: 5555; */
  background-size: cover;
  height: 100%;
  width: 100%;
}

.bcontent {
  width:100%;
  height: 100%;
}

.bpic {
  height: 100%;
  width:100%;
  /* z-index: 3333; */
  -webkit-filter: brightness(50%); /* Safari 6.0 - 9.0 */
  filter: brightness(50%);
  background-size: cover;
  position: absolute;
}



.zoomin {
  width: 100%;
  border:none;
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
  padding-top: 190px;
  padding-bottom: 190px;
  background: #e6f1f5;
}

.align-middle {
  color: rgb(3, 78, 133);
  height: 30px;
  width: 30px;
}

#loading2 {
  color: rgb(3, 78, 133);
  height: 70px;
  width: 70px;
}
.sheader {
  /* background: rgb(138, 196, 219, 0.9); */
  text-align: right;
  font-family: verdana;
  overflow: visible;
  padding-bottom: 0;
  padding-right: 7px;
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

.btn {
  color:white;
}

.fit {
  width:100%;
  text-align: center;
  border:none;
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
  text-align: center;
  color: #0071ff;
  padding: 10px;
  background: lightblue;
  border-radius: 5px;
}

.binput {
  margin-bottom: 15px;
}

.pending {
  padding: 0;
  margin: 0;
}
</style>
