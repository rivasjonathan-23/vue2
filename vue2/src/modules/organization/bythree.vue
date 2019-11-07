<template>
  <div id="bythree">
    <b-col class="holder" v-for="(badge, index) in this.data" :key="index">
      <div class="box" v-bind:class="{small: resized}">
        <div class="imgholder" v-bind:style='{backgroundImage: `url(${require("@/assets/bb/"+badge.imgnum+".jpg")})`}'>
        </div>
        <img src="@/assets/image2.png" class="blogo">
        <div class="tholder">
          <h5 class="binfo bname">{{badge.badgename}}</h5>
          <p class="binfo">{{badge.venue}}</p>
          <p class="binfo date" >{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
          <p class="binfo rec">Given to&nbsp;<span class="num">{{ badge.recipient.length }}</span>&nbsp;<span v-if="badge.recipient.length > 1">recipients</span>
          <span v-else>recipient</span></p>
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
    }       
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
      if (window.innerWidth < 900) {
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
   -webkit-filter: brightness(60%); /* Safari 6.0 - 9.0 */
  filter: brightness(60%);
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
  z-index: 5555;
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
  -webkit-box-shadow: 0px 1px 6px #8492a1;
  box-shadow: 0px 1px 6px #8492a1;
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
  margin-bottom: 1px;
  margin-top: 1px;
  color:#214d70;
}
.rec {
  font-size: 12px;
  color:#2e77b0;
  padding:0px;
  /* background:#d5e5f0; */
  /* border-radius: 5px; */
}
.num  {
  margin-top:0;
  padding:0;
  margin-bottom: 0;
  font-size: 15px;
}

.date {
  font-size: 14px;
  margin-bottom: 0;
}
.bname {
  color: #1a4f78;
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
