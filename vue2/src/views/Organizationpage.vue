<template>
  <div class="orgpage" v-bind:class="{small: resized}">
    <b-row>
      <b-col cols="12">
        <transition name="slide">
          <Orgprofile class="pro" v-if="nothidden"></Orgprofile>
        </transition>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="views">
        <div class="Nav" v-bind:class="{czindex: under}">
          <div class="option">
            <span
              id="badges"
              class="bdg"
              v-bind:class="{pressed: blpressed}"
              v-on:click="redirect('/organization')"
            >Badge List</span>
            <span
              class="certify"
              v-bind:class="{pressed: !blpressed}"
              v-on:click="redirect('/organization/certify')"
            >Create badge</span>
          </div>
        </div>
        <div>
          <router-view @changeZindex="under = true" ></router-view>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
/*eslint linebreak-style: ["error", "windows"]*/
import Orgprofile from "@/modules/organization/orgprofile.vue";
import UpdateOrg from "@/modules/organization/Update.vue";

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
      blpressed: true,
      under: false
    };
  },
  created() {
    if (this.$router.currentRoute.path == "/organization/certify") {
      this.nothidden = false;
      this.blpressed = false;
    } else {
      this.nothidden = true;
      this.blpressed = true;
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
      if (this.$router.currentRoute.path == "/organization/certify") {
        this.nothidden = false;
        this.blpressed = false;
      } else {
        this.nothidden = true;
        this.blpressed = true;
      }
    },
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
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}

.czindex {
  z-index: -1;
}
.option {
  width: 100%;
  text-align: right;
  margin: 0;
  padding: 0;
}
.Nav {
  height: 39px;
  font-size: 20px;
  background: white;
  /* background: rgb(217, 241, 250,0.9); */
  border-bottom: 4px solid lightblue;
  width: 100%;
  top: 50px;
  padding-top: 4px;
  padding-bottom: 0px;
  overflow: visible;
  z-index: 11111;
}
.pro {
  transition: ease 0.1s;
}

.hide {
  height: 0;
  overflow: hidden;
  transition: ease 0.4s;
}

span {
  color: #2a5c82;
  margin: 0px;
  transition: ease 0.4s;
  /* letter-spacing: 1px; */
  padding-bottom: 4px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 6px;
}

/* .bdg {
  color: #047cd4;
  background:#e6f2f7
} */

.pressed {
  color: #047cd4;
  background: #e6f2f7;
}

span:hover {
  color: #047cd4;
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