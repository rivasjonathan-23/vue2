<template>
  <div id="userpage">
    <div class="bv-example-row pd-side">
      <b-row>
        <b-col class="border-right">
          <Profile v-on:InsideMethod="gotoUpdateProfile" :username="this.username"></Profile>
        </b-col>
        <b-col cols="9" class>
          <div class="bg-light text-center">
            <div>
              <h3>
                <b-tabs>
                  <b-tab v-on:click="gotoNewsfeed" title="News feed" active align="left"></b-tab>
                  <b-tab v-on:click="gotoBadgeList" title="Badge List" align="right"></b-tab>
                </b-tabs>
              </h3>
            </div>
          </div>
          <div v-if="isBadgeList">
            <div id="divBabge">
              <Mybadge></Mybadge>
            </div>
          </div>
          <div v-if="isUpdateProfile">
            <Updateform></Updateform>
          </div>
          <div v-if="isNewsfeed">
            <Newsfeed></Newsfeed>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import Mybadge from "@/modules/user/Mybadge.vue";
import Newsfeed from "@/modules/user/Newsfeed.vue";
import Profile from "@/modules/user/Profile.vue";
import Updateform from '@/modules/user/Updateform.vue';
export default {
  name: "userpage",
  props:{
    username: String,
  },
  components: {
    Mybadge,
    Newsfeed,
    Updateform,
    Profile
  },
  data() {
    return {
      isBadgeList: false,
      isNewsfeed: true,
      isUpdateProfile: false,
    };
  },
  created() {
    //this.$root.$emit('method_emit')
  },
  methods: {
    gotoNewsfeed() {
      this.isNewsfeed = true;
      this.isBadgeList = false;
      this.isUpdateProfile = false;
    },
    gotoBadgeList() {
      this.isBadgeList = true;
      this.isNewsfeed = false;
      this.isUpdateProfile = false;
    },
    gotoUpdateProfile() {
      this.isUpdateProfile = true;
      this.isBadgeList = false;
      this.isNewsfeed = false;
    }
  }
};
</script>
<style scoped>
#profile {
  height: 200px;
}
.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}

div {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
