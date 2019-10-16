<template>
  <div>
    <div id="Newsfeed">
      <b-row>
        <div v-for="(badge, index) in this.upcoming_list1" :key="index">
          <b-col class="text-center">
            <b-card>
              <img src="@/assets/image.png">
              <h5>{{badge.badgename}}</h5>
              <p>{{badge.venue}}</p>
              <p>{{badge.date}}</p>
            </b-card>
          </b-col>
        </div>
      </b-row>
      <br>
      <b-row>
        <div v-for="(badge, index) in this.upcoming_list2" :key="index">
          <b-col class="text-center">
            <b-card>
              <img src="@/assets/image.png">
              <h5>{{badge.badgename}}</h5>
              <p>{{badge.venue}}</p>
              <p>{{badge.date}}</p>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newsfeed",
  props:{
    username: String
  },
  data() {
    return {
      upcoming_list1: [],
      upcoming_list2: []
    };
  },
  created() {
    this.upcoming_list1 = [//to be deleted
      { badgename: "Programming Workshop", venue: "J Center Mall Mandaue", date: "10/15/2019" },
      { badgename: "Programming Workshop", venue: "J Center Mall Mandaue", date: "10/15/2019" },
      { badgename: "Programming Workshop", venue: "J Center Mall Mandaue", date: "10/15/2019" }
    ];
    this.upcoming_list2 = [
      { badgename: "Programming Workshop", venue: "J Center Mall Mandaue", date: "10/15/2019" },
      { badgename: "Programming Workshop", venue: "J Center Mall Mandaue", date: "10/15/2019" },
      { badgename: "Programming Workshop", venue: "J Center Mall Mandaue", date: "10/15/2019" }
    ];

    let uri_upcomingbadge = `http://localhost:8081/newsfeed-regular/${this.username}`;
    this.axios.get(uri_upcomingbadge).then(response => {
      for (let i = 0; i <= 6; ++i) {
        if (i <= 3) {
          this.upcoming_list1 = response.data[i];
        } else {
          this.upcoming_list2 = response.data[i];
        }
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
</style>
