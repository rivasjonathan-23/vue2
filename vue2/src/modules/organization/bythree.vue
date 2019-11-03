<template>
  <div id="bythree">
      <div class="holder" v-for="(badge, index) in this.data" :key="index">
        <b-card class="box">
          <img src="@/assets/image.png" class>
          <h5 class="binfo">{{badge.badgename}}</h5>
          <p class="binfo">{{badge.venue}}</p>
          <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
        </b-card>
      </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  name: "bythree",
  data() {
    return {
      size: 0
    };
  },
  props: {
    data: Array
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth >= this.size) {
        if (window.innerWidth >= 2500) {
          $(".box").css({ width: "99%" });
        } else {
          $(".box").css({ width: "268px" });
        }
      } else if (window.innerWidth < this.size) {
        if (window.innerWidth <= 1000) {
          $(".box").css({ width: "99%" });
        }
      }
    }
  }
};
</script>

<style scoped>
.box {
  width: 268px;
  overflow: hidden;
  height: 400px;
  text-align: center;
  background:white;
  float:left;
  border-radius: 0;
  margin:10px;
  -webkit-box-shadow: 0px 3px 4px darkgrey;
  box-shadow: 0px 3px 4px darkgrey;
}
.holder {
  margin:0;
  padding:0;
  
}
.binfo {
  margin-bottom: 2px;
  margin-top: 2px;
}

.text-center {
  background: lightblue;
}
#bythree {
  padding:0;
  margin:0;
}

.row {
  border-color: white;
}
</style>
