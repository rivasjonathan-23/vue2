<template>
  <div>
    <div id="mybadge">
      <b-button
        id="createC"
        variant="primary"
        class="btn btn-block shadow rounded"
        v-b-modal.availBadge-modal
      >Avail new certificate</b-button>
      <div v-for="(badge, index) in this.badgelist" :key="index">
        <b-card class="bdgs">
          <b-row class="justify-content-md-center">
            <b-col class="text-center">
              <img src="@/assets/image.png" class>
              <h5>{{badge.badgename}}</h5>
            </b-col>
            <b-col cols="8" class="border-left">
              <div class="text-center ifont">
                <h4>
                  This certificate of
                  <br>
                  {{badge.certificateName}}
                </h4>
                <span>is awarded to</span>
                <h3>{{fullname}}</h3>
                <p>for</p>
                <h5>{{badge.descriptions}}</h5>
                <br>
                <p>Given this {{ badge.date.month+" "+badge.date.day+", "+badge.date.year }}</p>
                <div class="text-center byorg">
                  <p class="border-bottom">Certified by : {{badge.organization}}</p>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
    <b-modal
      size="sm"
      class="modl"
      id="availBadge-modal"
      title="Avail badge"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <form class="addR" @submit.prevent="searchBadge">
        <label for="bcode">Enter badge code</label>
        <b-input id="bcode" v-model="badgeCode" autocomplete="off" required/>
        <br>
        <b-row>
          <b-col>
            <b-button
              @click="$bvModal.hide('availBadge-modal')"
              variant="danger"
              class="btn btn-block"
            >Cancel</b-button>
          </b-col>
          <b-col cols="6">
            <b-button type="submit" variant="primary" class="btn btn-block">Avail badge</b-button>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Newsfeed",
  props: {
    username: String
  },
  data() {
    return {
      badgelist: [],
      badgeCode: "",
      fullname: ""
    };
  },
  methods: {
    searchBadge() {
      axios
        .post("http://localhost:8081/user/availbadge", {
          code: this.badgeCode,
          credentials: this.$store.getters.token
        })
        .then(resp => {
          alert("You successfully availed the badge");
          this.$bvModal.hide("availBadge-modal");
          this.badgeCode = "";
        })
        .catch(error => {
          alert(
            "Badge is no longer available or the code you entered is incorrect!"
          );
           this.badgeCode = "";
        });
    }
  },
  created() {
    axios
      .post("http://localhost:8081/user/userbadges", {
        user: this.$store.getters.token
      })
      .then(res => {
        console.log(res.data.badges);
        this.fullname = res.data.fullname;
        this.badgelist = res.data.badges;
      });
    // this.badgelist = [
    //   {
    //     badgename: "Medical Mission",
    //     certificateCategory: "Appreciation",
    //     description:
    //       "The active voluntarism offered during the medical mission for free vacination",
    //     venue: "Talamban health center",
    //     date: "Mon Oct 14 2019",
    //     time: "9 AM",
    //     organization: "Passerelles Numeriques",
    //     recepient: "Redgie Gravador"
    //   }
    // ];
    // let uri_badgelist = `http://localhost:8081/regular-badgelist/${this.username}`;
    // this.axios.get(uri_badgelist).then(response => {
    //   this.badgelist = response.data;
    // });
  }
};
</script>
<style scoped>
div {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.byorg {
  position: relative;
  width: 70%;
  left: 15%;
}
#createC {
  margin-top: 30px;
  margin-bottom: 20px;
  width: 250px;
}
label {
  margin-top: 5px;
}

.bdgs {
  margin-bottom: 10px;
}

#mybadge {
  text-align: left;
}
</style>
