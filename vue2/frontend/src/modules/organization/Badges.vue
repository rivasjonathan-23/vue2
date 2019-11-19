<template>
  <div id="badges">
    <div id="nholder" class="text-center">
      <div class="pbadges">
        <span>Offered badges</span>
        <span class="nb">{{by3Data.length}}</span>
      </div>
    </div>
    <div class="text-center">
      <h3 class="temp" v-show="noData">You haven't offered badges yet</h3>
    </div>
    <div class="loading" v-show="isLoading">
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
      </div>
    </div>
    <Bythree :data="by3Data"></Bythree>
  </div>
</template>
<script>
import Bythree from "./bythree";
import axios from "axios";
import $ from "jquery";
export default {
  name: "badges",
  components: {
    Bythree
  },
  props: {
    userInfo: Object
  },
  data() {
    return {
      by3Data: [],
      isLoading: false,
      noData: false,
      temp: []
    };
  },

  created() {
    this.by3Data = [
      {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
      {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
      {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
      {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
      {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
       {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
       {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
       {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
       {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
       {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
       {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      },
       {
        badgename: "First Placer",
        venue: "Passerelles Numeriques coding contest",
        date: { month: "June", day: 23, year: 2019 }
      }
    ];
    var num = 0;
    this.by3Data.forEach(element => {
      element["imgnum"] = num;
      num += 1;
       if (num > 10) {
        num = 0;
      }
    });
    this.$emit("@changeZindex");
    axios
      .post("http://localhost:8081/user/badges-org", {
        data: this.$store.getters.token
      })
      .then(response => {
        this.by3Data = [];
        this.by3Data = response.data.badges.reverse();
        var num = 0;
        this.by3Data.forEach(element => {
          element["imgnum"] = num;
          num += 1;
          if (num > 10) {
            num = 0;
          }
        });
        if (this.by3Data.length == 0) {
          this.noData = true;
        }
        this.isLoading = false;
      });
  }
};
</script>

<style scoped>
.inputline {
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  text-align: center;
}

.pbadges {
  text-align: left;
  font-size: 19px;
  color: #02416e;
  padding-left: 25px;
  margin-bottom: 10px;
}
.nb {
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 3px;
  padding-bottom: 3px;
  background: #d1e2e6;
  border-radius: 5px;
  font-size: 20px;
  margin-left: 8px;
}

#badges {
  width: 100%;
  margin: 0;
  text-align: center;
  border: none;
  padding: 2px;
  font-family: verdana;
}

.temp {
  margin-top: 50px;
  margin-bottom: 50px;
  color: #2a5c82;
}
#nholder {
  padding-top: 10px;
}
.align-middle {
  color: rgb(3, 78, 133);
  height: 75px;
  width: 75px;
}

.loading {
  padding-top: 100px;
  padding-bottom: 100px;
  background: #f2f8fa;
}
</style>
