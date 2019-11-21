<template>
  <div>
    <div id="mybadge">
      <div class="sheader2">
        <!-- <span class="tbadge" v-bind:class="{fit: sm}">
          <span>Badges&nbsp;</span>
          <span class="nb">{{badgelist.length}}</span>
        </span> -->
        <span class="tbadge" v-bind:class="{fit: sm}">
          <span @click="$bvModal.show('pendings')" class="pndng">Pending badges</span>
          <span class="nb2">{{pending.length}}</span>
        </span>
        <b-button
          variant="primary"
          class="btn bm"
         v-bind:class="{fit: sm}"
          v-b-modal.availBadge-modal
        >Claim certificate</b-button>
      </div>
      <div id="line"></div>
      <div class="loading" v-show="isLoading">
        <div class="text-center text-danger my-2">
          <b-spinner id="loading2" class="align-middle"></b-spinner>
        </div>
      </div>
      <h3 class="temp" v-show="hasData">You haven't availed badges yet</h3>
        <b-row v-for="(badge, index) in badgelist" :key="index" class="row" >
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
              <span class="cern">{{badge.certificateName}}</span>
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
    <b-modal
      size="sm"
      class="modl"
      id="availBadge-modal"
      title="Claim certificate"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <form class="addR" @submit.prevent="searchBadge">
        <span class="error" v-show="error">Incorrect code or badge is not available!</span>
        <span class="error" v-show="availed">You have availed this bade already!</span>
        <b-input
          class="binput"
          v-model="badgeCode"
          autocomplete="off"
          placeholder="Badge code"
          required
        />

        <div class="btnrow nosh text-right" v-if="!availing">
              <b-button
              @click="$bvModal.hide('availBadge-modal')"
              variant="danger"
              class="btn"
              v-on:click="reset"
            >Cancel</b-button>&nbsp;
            <b-button type="submit" variant="primary" class="btn">Claim</b-button>
        </div>
        <div v-else class="add nosh">
          <div>
            <b-spinner class="align-middle"></b-spinner>&nbsp;
            <strong>Searching badge...</strong>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal
      size="sm"
      class="modl"
      id="availed"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-header
      hide-footer
    >
    <div class="text-center">
      <div class="sucav">
      <img src="@/assets/image2.png" class="blogo">
      <p class="pl p1">{{availedbadge.badgename}}</p>      
      <p class="pl p2">{{"From "+availedbadge.organization}}</p>
      </div>
      <p class="pl p3">You have successfull availed this badge. Kindly wait for the certification</p>
      <hr>
      <b-button @click="$bvModal.hide('availed')" variant="primary" class="btn">OK</b-button>
      </div>
    </b-modal>
    <b-modal
      class="modl"
      id="pendings"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-footer
      title="Pending badges"
    >
    <div class="cnt">
    <div class="text-left pcont">
     <div class="pndngb" v-for="(pb, i) in pending" :key="i">
       <p class="pl p2">{{pb.badgename}}</p>
       <p class="pl p3">{{pb.organization}}</p>
       <p class="pl p3 d8">{{pb.date.month+" "+pb.date.day+", "+pb.date.year}}</p>
       <hr class="phr">

     </div>
    </div>
    </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { userInfo } from "os";

export default {
  name: "Badges",
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
      pressed: true,
      availed: false,
      pending: [],
      availedbadge: {badgename: "", organization: ""}
    };
  },
  methods: {
    searchBadge() {
      this.availing = true;
      axios
        .post("http://localhost:8081/user/availbadge", {
          code: this.badgeCode,
          user: this.$store.getters.token
        })
        .then(res => {
          this.availing = false;
          this.reset();
          this.$bvModal.hide("availBadge-modal");
          this.badgelist = res.data.badges.reverse();
          this.pending = res.data.pendingbadges;
          this.availedbadge = res.data.availedbadge;
          this.$bvModal.show("availed");
          if (this.badgelist.length == 0) {
            this.hasData = true;
          }
            var num =0;
          this.badgelist.forEach(element => {
            element["imgnum"] = num;
            num += 1;
            if (num > 10) {
              num = 0;
            }
          })
          // axios
          //   .post("http://localhost:8081/user/userbadges", {
          //     user: this.$store.getters.token
          //   })
          //   .then(res => {
              

          //     this.error= false;
          //     if (this.badgelist.length == 0) {
          //       this.hasData = true;
          //     }
          //   });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.err = true;            
          } else {
            this.availed = true;
          }
          console.log(err)
          this.availing = false;
          $(".binput").css({ "border-color": "red" });
        });
    },
    reset() {
      this.error = false;
      this.availed = false;
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
    this.$emit("badgeCount", this.badgelist.length);
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
    axios
      .post("http://localhost:8081/user/userbadges", {
        user: this.$store.getters.token
      })
      .then(res => {
        this.isLoading = false;
        console.log("badgess" + res.data.badges);
        this.badgelist = res.data.badges.reverse();
        this.pending = res.data.pendingbadges;
        if (this.badgelist.length == 0) {
          this.hasData = true;
        }
        var num = 0;
        this.badgelist.forEach(badge => {
          badge["imgnum"] = num;
          num += 1;
            if (num > 10) {
            num = 0;
          }
        })
      });
  }, watch: {
    availed(val) {
      if (val) {
        this.error = false;
      } 
    }, 
    error(val) {
      if (val) {
        this.availed = false;
      }
    }
  }
};
</script>
<style scoped>
.pndngb {
  /* position: relative; */
}

.pcont {
  height: 500px;
  overflow: auto;
  margin:0;
  background: #e3f0f7;
  padding:10px;
  
}

.cnt {
  height: 500px;
  overflow: hidden;
  border-radius: 4px;

}

.d8 {
  /* top:0; */
  /* position: absolute; */
  /* right: 0; */
}
.pndng:hover {
  background: #e3f0f7;
 color: #047cd4;
 border-radius: 5px;
}
.pndng {
 padding:5px;
 margin:1px;

}
.bl {
  margin-right: 0;
  margin-left: 0;
 padding-right: 5px;
  padding-left: 5px;

}
.bh {
  background:red;
}
.br {
  margin-left: 0;
  margin-right: 0;
  padding-left: 5px;
  padding-right: 5px;

}
.nb2 {
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
  background: #e8f3fa;
  text-align: center;
  font-family: Verdana;
  font-size: 16px;
  height: 390px;
  border-right:6px solid #779cb5;
  border-bottom:8px solid #e8f3fa;
}
.btnrow {
  background: white;
  padding: 0;
}
.blogo {
  margin-top: 30px;
  width: 200px;
}

.cern {
  font-size: 20px;
}

.btn:focus {
  outline: none;
}

.name {
  font-size: 18px;
}
.phr {
  margin-top:8px;
  margin-bottom:8px;
}

.sucav {
  background:#e8f3fa;
  padding:10px;
  margin-bottom: 10px;
}
.row {
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 25px;
  padding: 0;
  margin-bottom: 25px;
  background: #e8f3fa;
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
.sheader2 {
  /* background: rgb(138, 196, 219, 0.9); */
  text-align: right;
  font-family: verdana;
  overflow: visible;
  padding-bottom: 0;
  padding-right: 7px;
}

.bm {
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

.pl {
  color:#31445c;
  font-family: verdana;
  padding:0;
  margin:0;
}

.p1 {
  font-size: 24px;
}

.p2 {
  font-size: 18px;
  margin-bottom: 5px;
}

.p3 {
  margin: 3px;
  font-size: 13px;
}


</style>
