<template>
  <div id="bythree">
    <b-col class="holder" v-for="(badge, index) in this.data" :key="index">
      <div class="box" v-bind:class="{small: resized}">
        <div class="imgholder" v-bind:style="cssProps[Math.floor(Math.random() * 11)]">
        </div>
        <img src="@/assets/image2.png" class="blogo">
        <div class="tholder">
          <h5 class="binfo">{{badge.badgename}}</h5>
          <p class="binfo">{{badge.venue}}</p>
          <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
        </div>
      </div>
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
      resized: false,
      cssProps: [
        {backgroundImage: `url(${require("@/assets/bb/0.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/1.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/2.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/3.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/4.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/5.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/6.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/7.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/8.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/9.jpg")})`},
        {backgroundImage: `url(${require("@/assets/bb/10.jpg")})`},
        
      ]
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
.imgholder {
   -webkit-filter: brightness(70%); /* Safari 6.0 - 9.0 */
  filter: brightness(70%);
  background-size: cover;
  margin: 0;
  height: 250px;
  text-align: left;
  
}
.blogo {
  top:14px;
  left:0;
  width: 100px;
  position: absolute;
  z-index: 9999;
   -webkit-filter: brightness(130%); /* Safari 6.0 - 9.0 */
  filter: brightness(130%);
}

.tholder {
  padding: 5px;
}
.box {
  width: 268px;
  overflow: hidden;
  height: 400px;
  text-align: center;
  background: white;
  float: left;
  border-radius: 0;
  margin: 10px;
  padding: 0;
  color: #3b4d70;
  border: lightgrey;
  -webkit-box-shadow: 0px 0px 7px darkgrey;
  box-shadow: 0px 0px 7px darkgrey;
  position: relative;
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
