<template>
  <div id="orgpage" class="pd-side">
    <b-row>
      <b-col cols="12">
        <div>
          <Orgprofile v-on:InsideMethod="redirect('/organization/updateprofile')"></Orgprofile>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="views">
        <div class="Nav">
          <span v-on:click="redirect('/organization')">Badges</span>
          <span v-on:click="redirect('/organization/certify')">Certify</span>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
/*eslint linebreak-style: ["error", "windows"]*/
import Orgprofile from "@/modules/organization/orgprofile.vue";
import UpdateOrg from "@/modules/organization/Update.vue";
import $ from "jquery";

export default {
  name: "orgpage",
  components: {
    Orgprofile
  },
  data() {
    return {
      isBadges: true,
      isToCerfify: false,
      postEvent: false,
      isUpdate: false,
      size: 0,
      zoomin: false
    };
  },
  created() {
    $("#orgpage").css({ width: "900px" });
    this.zoomin = false;
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
        this.zoomin = false;
        $("#orgpage").css({ width: "1200px" });
        $(".views").css({ width: "1200px" });
      } else if (window.innerWidth < this.size) {
        this.zoomin = true;
        $("#orgpage").css({ width: "100%" });
        $(".views").css({ width: "100%" });
      }
    }
  }
};
</script>

<style scoped>
.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}
.Nav {

  height: 50px;
  font-size: 30px;
  background: lightblue;
}

span {
  margin: 20px;
}

#orgpage {
  width: 1200px;
  padding-top: 50px;
}
</style>