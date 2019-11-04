<template>
  <div id="badges">
    <div id="nholder" class="text-center">
      <span class="pbadges">
        {{by3Data.length}}
        offered
        <span v-if="by3Data.length>0">badges</span>
        <span v-else>badge</span>
      </span>
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
      isLoading: true,
      noData: false,
      temp: []
    };
  },

  created() {
    axios
      .post("http://localhost:8081/user/badges-org", {
        data: this.$store.getters.token
      })
      .then(response => {
        this.by3Data = [];
        this.by3Data = response.data.badges.reverse();
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
  font-size: 18px;
  color: #02416e;
  margin-top: 100px;
  padding-left: 20px;

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
  padding-top:10px;
}
.align-middle {
  color: rgb(3, 78, 133);
  height: 75px;
  width: 75px;
}

.loading {
  margin-top: 50px;
  margin-bottom: 250px;
}
</style>
