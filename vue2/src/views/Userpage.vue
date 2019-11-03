<template>
  <div id="userpage">
      <b-row>
        <b-col cols="12">
          <Profile></Profile>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="views" cols="12">
          <router-view></router-view>
        </b-col>
      </b-row>
  </div>
</template>

<script>
/*eslint linebreak-style: ["error", "windows"]*/
import axios from "axios";
import Profile from "@/modules/user/Profile.vue";
import $ from "jquery";

export default {
  name: "userpage",
  props: {
    userInfo: Object
  },
  data() {
    return {
      badgeCode: ""
    };
  },
  components: {
    Profile
  },
  data() {
    return {
      isBadgeList: true,
      isNewsfeed: false,
      isUpdateProfile: false
    };
  },
  created() {
    $("#orgpage").css({ width: "900px" });
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    redirect(path) {
      this.$router.push(path);
    },
    handleResize() {
      if (window.innerWidth >= this.size) {
        $("#userpage").css({ width: "1200px" });
      } else if (window.innerWidth < this.size) {
        $("#userpage").css({ width: "100%" });
      }
    },
     redirect(path) {
      this.$router.push(path);
    }
  }

};
</script>

<style scoped>
#profile {
  height: 200px;
}

.views {
  padding-top:0;
  margin-top:0;
}

.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}

#userpage {
  padding-top: 51px;
  width: 1200px;
}

#availbadge {
  position: fixed;
  top: 100px;
  right: 110px;
  width: 200px;
  z-index: 9999;
}
.modl {
  width: 300px;
}
div {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
