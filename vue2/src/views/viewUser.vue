<template>
  <div class="page" v-bind:class="{small: resized}">
    <div v-if="userfound">
      <b-row>
        <b-col cols="12">
          <Profile :badgenum="numofbadge" :zindex="index"></Profile>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="views" cols="12">
          <Badges @badgeCount="getBadgeCount"></Badges>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <h1 class="usernotfound">Username Not Found</h1>
    </div>
  </div>
</template>

<script>
/*eslint linebreak-style: ["error", "windows"]*/
import axios from "axios";
import Profile from "@/modules/viewables/user/viewProfile.vue";
import Badges from "@/modules/viewables/user/viewMybadge.vue";
import $ from "jquery";

export default {
  name: "userpage",
  props: {
    userInfo: Object
  },
  data() {
    return {
      badgeCode: "",
      resized: false,
      numofbadge: 0,
      username: "",
      userfound: false
    };
  },
  components: {
    Profile,
    Badges
  },
  beforeMount() {
    this.getUser();
  },
  created() {
    this.routeWatcher = this.$watch(
      function() {
        return this.$route;
      },
      function(route) {
        if (route.name === "viewuser") {
          this.getUser();
        }
      }
    );
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    getUser() {
      this.username = this.$route.params.username;
      let user = { username: this.username };
      axios.post("http://localhost:8081/search", user).then(
        response => {
          if (response.data.status) {
            this.userfound = true;
          } else {
            this.userfound = false;
          }
        },
        err => {
          console.log("error");
        }
      );
    },
    redirect(path) {
      this.$router.push(path);
    },
    handleResize() {
      if (window.innerWidth < 1200) {
        this.resized = true;
      } else {
        this.resized = false;
      }
    },
    redirect(path) {
      this.$router.push(path);
    },
    getBadgeCount(count) {
      this.numofbadge = count;
    }
  }
};
</script>

<style scoped>
#profile {
  height: 200px;
}

.views {
  padding-top: 0;
  margin-top: 0;
}

.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}

.page {
  padding-top: 51px;
  width: 1200px;
  background: white;
}

.small {
  width: 100%;
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
.usernotfound {
  margin-top: 10%;
}
</style>
