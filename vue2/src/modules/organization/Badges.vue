<template>
  <div id="badges">
     <b-card>
    <h3 class="temp" style="display:none">You haven't offered badges yet</h3>
    
    <div v-for="(datapass, index) in by3Data" :key="index">
      <Bythree :data="datapass"></Bythree>
      <br />
    </div>
    <b-row>
      <Bythree :data="excessData"></Bythree>
    </b-row>
  </b-card>
  </div>
</template>
<script>
import Bythree from "./bythree";
import axios from 'axios';
import $ from 'jquery';
export default {
  name: "badges",
  components: {
    Bythree
  },
  data() {
    return {
      by3Data: [],
      temp: [],
      excessData: []
    };
  },

  created() {
    axios.post("http://localhost:8081/user/badges-org", {data: this.$store.getters.token}).then(response => {
      var allData = response.data.badges.reverse();
      console.log(allData)
      var hasContent = false;
      for (let i = 0; i < allData.length; ++i) {
        hasContent = true;
        if ((i + 1) % 3 == 0) {
          this.temp.push(allData[i]);
          this.by3Data.push(this.temp);
          this.temp = [];
        } else {
          this.temp.push(allData[i]);
        }
        if (i - 1 == allData.length - (allData.length % 3)) {
          this.excessData.push(allData[i]);
        } else if (i == allData.length - (allData.length % 3)) {
          this.excessData.push(allData[i]);
        }
      }
      if (!hasContent) {
         $(".temp").show();
      }
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
.ifont {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.temp {
  margin-top:250px;
}
</style>
