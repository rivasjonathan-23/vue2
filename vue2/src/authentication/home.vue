<template>
  <div class="outercont">
    <div class="con">
      <SignUp class="box"></SignUp>
      <!-- <img :src="image" alt class="background"> -->
    </div>
  </div>
</template>

<script>
import SignUp from "./signUp";

export default {
  name: "Home",
  data() {
    return {
      image: require("@/assets/background.jpg")
    };
  },
  components: {
    SignUp
  }
};
</script>


<style scoped>
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
  -webkit-filter: brightness(75%); /* Safari 6.0 - 9.0 */
  filter: brightness(75%);
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






