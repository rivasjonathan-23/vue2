<template>
  <div class="orgpage" v-bind:class="{small: resized}">
    <b-row>
      <b-col cols="12">
        <Orgprofile class="pro" v-show="nothidden"></Orgprofile>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="views">
        <b-navbar sticky class="Nav">
            <div class="option">
            <span id="badges" class="bdg" v-on:click="redirect('/organization')">Badge List</span>
            <span id="certify" v-on:click="redirect('/organization/certify')">Create badge</span>
          </div>
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
      size: 0,
      resized: false,
      nothidden: true,
    };
  },
  created() {
    if (this.$router.currentRoute.path == "/organization/certify") {
      this.nothidden = false;
    }
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
      if (path == "/organization/certify") {
        this.nothidden = false;
      } else {
        this.nothidden = true;
      }
    },
    handleResize() {
       if (window.innerWidth < 1200) {
            this.resized = true;
        } else {
          this.resized = false;
        }
    }
  },
  mounted() {
    $("#certify").click(function() {
      $(this).css({ color: "#006aff" });
      $("#badges").css({ color: "#2a5c82" });
    });
    $("#badges").click(function() {
      $(this).css({ color: "#006aff" });
      $("#certify").css({ color: "#2a5c82" });
    });
  }
};
</script>

<style scoped>
.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}


.option {
  width: 100%;
  text-align: right;
  margin:0;
  padding:0;
}
.Nav {
  height: 45px;
  font-size: 20px;
  background: white;
  /* background: rgb(217, 241, 250,0.9); */
  border-bottom: 4px solid lightblue;
  width: 100%;
  top: 50px;
  padding: 0;
  overflow: visible;
}

span {
  color: #2a5c82;
  margin: 0px;
  transition: ease 0.4s;
  /* letter-spacing: 1px; */
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 8px;
}

.bdg {
  color: #006aff;
}

span:hover {
  color: #006aff;
  background: #c5eafc;
}

.orgpage {
  width: 1200px;
  padding-left: 0;
  padding-right: 0;
  padding-top: 50px;
}

.small {
  width: 100%;
}
</style>