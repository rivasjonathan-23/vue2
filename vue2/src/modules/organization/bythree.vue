<template>
  <div id="bythree">
    <b-col class="holder" v-for="(badge, index) in this.data" :key="index">
      <b-card class="box" v-bind:class="{small: resized}">
        <img src="@/assets/image.png" class>
        <h5 class="binfo">{{badge.badgename}}</h5>
        <p class="binfo">{{badge.venue}}</p>
        <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
      </b-card>
    </b-col>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  name: "bythree",
  data() {
    return {
      size: 0,
      resized: false
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
      if (window.innerWidth < 1200) {
        this.resized = true;
      } else {
        this.resized = false;
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
  background: white;
  float: left;
  border-radius: 0;
  margin: 10px;
  color: #3b4d70;
  border: lightgrey;
  -webkit-box-shadow: 0px 2px 5px darkgrey;
  box-shadow: 0px 2px 5px darkgrey;
}
.small {
  width: 98%;
}
.holder {
  margin: 0;
  background: red;
}
.binfo {
  margin-bottom: 2px;
  margin-top: 2px;
}

.text-center {
  background: lightblue;
}
#bythree {
  padding: 0;
  margin: 0;
}

.row {
  border-color: white;
}
</style>
