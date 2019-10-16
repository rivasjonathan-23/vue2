<template>
  <div id="badges">
    <div v-for="(datapass, index) in by3Data" :key="index">
      <Bythree :data="datapass"></Bythree>
      <br />
    </div>
    <b-row>
      <Bythree :data="excessData"></Bythree>
    </b-row>
  </div>
</template>
<script>
import Bythree from "./bythree";
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
    let uri_orgbadges = `http://localhost:4000/badges-org/${this.username}`;
    this.axios.post(uri_orgbadges).then(response => {
      var allData = response.data;
      for (let i = 0; i < allData.length; ++i) {
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
</style>
