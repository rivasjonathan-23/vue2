<template>
  <div class="outercont">
    <div class="con">
      <div class="overlay">
        <div class="title">
          <p class="badgebook">Badgebook*</p>
          <p class="tagline">Treasure your achievements</p>
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
      image: require("@/assets/background.jpg")
    };
  }
};
</script>


<style scoped>
.overlay {
  position: fixed;
  width:100%;
  height: 100%;
  text-align: center;
  height: 100%;
  /* background:#186fa1; */
  background-image: linear-gradient(to bottom right, rgb(24, 111, 161, .6),rgb(24, 111, 161, .8), #186fa1);
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
  font-size: 20px;
}
.title {
  padding: 300px;
  width:100%;
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






