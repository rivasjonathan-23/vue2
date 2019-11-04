<template>
  <div id="orgpage" class="pd-side">
    <b-row>
      <b-col cols="12">
        <Orgprofile class="pro"></Orgprofile>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="views">
        <b-navbar sticky class="Nav">
            <b-navbar-nav class="ml-auto">
            <span id="badges" class="bdg" v-on:click="redirect('/organization')">Badge List</span>
            <span id="certify" v-on:click="redirect('/organization/certify')">Create badge</span>
          </b-navbar-nav>
        </b-navbar>
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
      size: 0
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
        $("#orgpage").css({ width: "1200px" });
      } else if (window.innerWidth < this.size) {
        $("#orgpage").css({ width: "100%" });
      }
    }
  },
  mounted() {
    $("#certify").click(function() {
      $(this).css({ color: "#006aff" });
      $("#badges").css({ color: "#2a5c82" });
      $(".pro").slideUp();
    });
    $("#badges").click(function() {
      $(this).css({ color: "#006aff" });
      $("#certify").css({ color: "#2a5c82" });
      $(".pro").slideDown();
    });
  }
};
</script>

<style scoped>
.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}
.Nav {
  height: 45px;
  font-size: 20px;
  background: white;
  /* background: rgb(217, 241, 250,0.9); */
  border-bottom: 4px solid lightblue;

  top: 50px;
  padding: 0;
  overflow: auto;
}

span {
  color: #2a5c82;
  margin: 0px;
  transition: ease 0.4s;
  /* letter-spacing: 1px; */
  padding-bottom: 5px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 6px;
}

.bdg {
  color: #006aff;
}

span:hover {
  color: #006aff;
  background: #c5eafc;
}

#orgpage {
  width: 1200px;
  padding-top: 50px;
}
</style>