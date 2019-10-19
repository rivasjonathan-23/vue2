<template>
  <div>
    <div id="Newsfeed">
      <div v-for="(badge, index) in this.badgelist" :key="index">
        <b-card>
          <b-row class="justify-content-md-center">
            <b-col class="text-center">
              <img src="@/assets/image.png" class>
              <h3>{{badge.badgename}}</h3>
            </b-col>
            <b-col cols="8" class="border-left">
              <div class="text-center ifont">
                <h2>
                  This certificate of
                  <br>
                  {{badge.certificateCategory}}
                </h2>
                <span>is awarded to</span>
                <h3>{{badge.recepient}}</h3>
                <p>for</p>
                <p>{{badge.descriptions}}</p>
                <p>Given this {{ badge.date }} at {{badge.venue}}</p>
                <div class="text-center byorg">
                  <p class="border-bottom">Certified by : {{badge.organization}}</p>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newsfeed",
  props: {
    username: String
  },
  data() {
    return {
      badgelist: []
    };
  },
  mounted() {
    this.badgelist = [
      {
        badgename: "Medical Mission",
        certificateCategory: "Appreciation",
        description:
          "The active voluntarism offered during the medical mission for free vacination",
        venue: "Talamban health center",
        date: "Mon Oct 14 2019",
        time: "9 AM",
        organization: "Passerelles Numeriques",
        recepient: "Redgie Gravador"
      }
    ];
    let uri_badgelist = `http://localhost:8081/regular-badgelist/${this.username}`;
    this.axios.get(uri_badgelist).then(response => {
      this.badgelist = response.data;
    });
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
</style>
