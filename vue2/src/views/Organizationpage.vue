<template>
  <div id="orgpage" class="pd-side">
    <b-row>
      <b-col>
        <div>
          <Orgprofile v-on:InsideMethod="gotoUpdate"></Orgprofile>
        </div>
      </b-col>
      <b-col cols="9">
        <div>
          <h3>
            <b-tabs>
              <b-tab v-on:click="togoBadges" title="Badge Offers" active align="left"></b-tab>
              <b-tab v-on:click="gotoCertify" title="Certify" align="right"></b-tab>
              <b-tab v-on:click="gotooffer" title="Offer A Badge" align="right"></b-tab>
            </b-tabs>
          </h3>
        </div>
        <div v-if="isBadges">
          <Badges></Badges>
        </div>
        <div v-if="isToCerfify">
          <Certify></Certify>
        </div>
        <div v-if="isOffer">
          <Offer></Offer>
        </div>
        <div v-if="isUpdate">
          <UpdateOrg></UpdateOrg>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Badges from "@/modules/organization/Badges.vue";
import Certify from "@/modules/organization/Certify.vue";
import Orgprofile from "@/modules/organization/orgprofile.vue";
import Offer from "@/modules/organization/Offer.vue";
import UpdateOrg from '@/modules/organization/Update.vue';

export default {
  name: "orgpage",
  components: {
    Badges,
    Certify,
    Orgprofile,
    Offer,
    UpdateOrg
  },
  data() {
    return {
      isBadges: true,
      isToCerfify: false,
      isOffer: false,
      isUpdate: false
    };
  },
  methods: {
    togoBadges() {
      this.isBadges = true;
      this.isToCerfify = false;
      this.isOffer = false;
      this.isUpdate = false
    },
    gotoCertify() {
      this.isToCerfify = true;
      this.isBadges = false;
      this.isOffer = false;
      this.isUpdate = false
    },
    gotooffer() {
      this.isOffer = true;
      this.isToCerfify = false;
      this.isBadges = false;
      this.isUpdate = false
    },
    gotoUpdate(){
      this.isUpdate = true,
      this.isOffer = false;
      this.isToCerfify = false;
      this.isBadges = false;
    }
  }
};
</script>

<style scoped>
.pd-side {
  padding-left: 20px;
  padding-right: 20px;
}
</style>




