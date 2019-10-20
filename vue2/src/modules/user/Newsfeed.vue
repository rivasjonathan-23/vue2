<template>
  <div>
    <div id="Newsfeed">
      <b-row>
        <div v-for="(badge, index) in this.upcoming_list" :key="index">
          <b-col class="text-center">
            <b-card class="badge" @click="availBadge">
              <img src="@/assets/image.png">
              <h5>{{badge.badgename}}</h5>
              <p>{{badge.venue}}</p>
              <p>{{badge.date.month+" "+badge.date.day+", "+badge.date.year}}</p>
            </b-card>
          </b-col>
        </div>
      </b-row>
      <h3 class="temp" style="display:none">There's no offered badges yet</h3>
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
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
export default {
  name: "Newsfeed",
  props: {
    username: String
  },
  data() {
    return {
      upcoming_list: [],
      badgeCode: "",
    };
  },
  methods: {
    availBadge() {
      this.$bvModal.show("availBadge-modal");
    },
    searchBadge() {
      axios
        .post("http://localhost:8081/user/availbadge", {
          code: this.badgeCode,
          credentials: this.$store.getters.token
        })
        .then(resp => {
          if (resp.data.message == "successful") {
            alert("You successfully availed the badge");
            this.$bvModal.hide("availBadge-modal");
          } else {
            alert(
              "Badge is no longer available or the code you entered is incorrect!"
            );
          }
        });
    }
  },
  created() {
    axios.get("http://localhost:8081/user/postbadges").then(res => {
      this.upcoming_list = res.data.badges.reverse();
      if (this.upcoming_list.length == 0) {
        $(".temp").show();
      }
    });
  }
};
</script>
<style scoped>
div {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.badge {
  margin-bottom: 30px;
}
label {
  margin-top: 5px;
}

.badge:hover {
  /* background: lightgray; */
  box-shadow: 0px 10px 30px lightgrey;
}
.temp {
  margin-top: 250px;
}
</style>
