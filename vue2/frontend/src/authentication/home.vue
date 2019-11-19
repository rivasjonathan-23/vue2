<template>
  <div class="outercont">
    <div class="con">
      <div class="overlay">
        <div class="title">
          <div class="dv">
          <p class="badgebook" v-bind:class="{smlfnt: resized}" >Badgebook</p>
          <p class="tagline" v-bind:class="{smlfnt2: resized}">Treasure your achievements</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      image: require("@/assets/background.jpg"),
      resized: false
    };
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 800) {
        this.resized = true;
      } else {
        this.resized = false;
      }
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>


<style scoped>

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  height: 100%;
  /* background:#186fa1; */
  background-image: linear-gradient(
    to bottom right,
    rgb(24, 111, 161, 0.6),
    rgb(24, 111, 161, 0.8),
    #186fa1
  );
}
.badgebook {
  color: white;
  font-size: 70px;
  letter-spacing: 3px;
  margin: 0;
  padding: 0;
}
.tagline {
  font-family: verdana;
  margin: 0;
  color: white;
  letter-spacing: 4px;
  font-size: 20px;
}
.smlfnt {
  font-size: 40px;
}

.smlfnt2 {
  font-size: 8px;
}
.title {
  padding-top: 150px;
  width: 100%;
  height: 100%;
  text-align: center;
  height: 100%;
}
.col-sm-3 {
  border: 1px solid lightgrey;
  width: 400px;
  /* margin-top: 85px; */
  margin-bottom: 40px;
  margin-right: 10%;
  margin-left: 10%;
  background: white;
  padding: 4%;
  text-align: center;
  float: right;
  -webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.posts {
  height: 1000px;
  background-color: white;
}

body {
  padding: 0;
  margin: 0;
}

.outercont {
  margin-top: 0;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  margin-right: 0;
  margin-left: 0;
  height: 100vh;
  background-image: url("~@/assets/bb/10.jpg");
  background-size: cover;
  /* -webkit-filter: brightness(80%);
  filter: brightness(80%); */
}

.con {
  position: relative;
  margin-right: 0;
  margin-left: 0;
  /* height: 100vh; */
  padding-top: 0;

  /* height:100%; */
}
</style>






