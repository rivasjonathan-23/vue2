 <template>
  <div id="certify">
    <b-button
      id="createC"
      variant="primary"
      class="btn btn-block shadow rounded"
      v-b-modal.offer
    >Create new certificate</b-button>
    <b-modal
      size="lg"
      id="offer"
      title="Create new badge"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <Offer></Offer>
       <b-button
      id="closeM"
      variant="danger"
      class="btn btn-block shadow rounded"
      v-on:click="closeCreate"
    >Exit</b-button>
    </b-modal>
      <div v-for="(badge, index) in badges" :key="index">

    <b-card class="contain">
      <h3 class="temp" style="display:none">You haven't offered badges yet</h3>
        <b-row class="row">
          <b-col>
            <br>
            <b-card class="bg-light text-center">
              <img src="@/assets/image.png" class>
              <h5 class="binfo">{{ badge.badgename }}</h5>
              <p class="binfo">{{ badge.venue }}</p>
              <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
              <p class="binfo">Code:&nbsp;{{ badge.code }}</p>
            </b-card>
          </b-col>
          <b-col cols="8">
            <hr>
            <div class="text-center">
              <h2>Recipients</h2>
              <br>
              <b-row>
                <b-col>
                  <b-button
                    variant="primary"
                    class="btn btn-block shadow rounded"
                    v-b-modal.certify-modal
                  >Certify Recipients</b-button>
                </b-col>
                <b-col>
                  <b-button
                    variant="primary"
                    class="btn btn-block shadow rounded"
                    v-b-modal.addRecipient-modal
                  >Add Recipient</b-button>
                </b-col>
              </b-row>
              <br>
            </div>
            <b-card class="recipient">
              <b-table striped hover :items="badge.recipient"></b-table>
            
            </b-card>
          </b-col>
        </b-row>
    </b-card>
    <b-modal
      class="modl"
      id="addRecipient-modal"
      title="Recepient Information"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <form class="addR" @submit.stop.prevent="handleSubmit">
        <label for="usernamei">Search Username</label>
        <b-input id="usernamei" v-model="s_username" @change="userExit = true" @keyup="suggest"/>
        <br>
        <b-row>
          <b-col>
            <b-button v-on:click="handleCancel" variant="danger" class="btn btn-block">Cancel</b-button>
          </b-col>
          <b-col cols="8">
            <b-button type="submit" variant="primary" class="btn btn-block">Add Recipient</b-button>
          </b-col>
        </b-row>
      </form>
    </b-modal>
    <b-modal
      class="modl"
      size="dm"
      id="certify-modal"
      title="Certify The Recipients"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <div class="text-center ifont">
        <form @submit.stop.prevent="handleCertificationSubmit(badge.code)">
          <span>This certificate of</span>
          <br>
          <input
            class="inputline"
            size="15"
            placeholder="Certificate Category"
            v-model="certificateName"
          >
          <br>
          <br>
          <span>is awarded to</span>
          <br>
          <p>
            (participant/s' name)
            <br>
          </p>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="3"
            placeholder="Description of the event"
            v-model="descriptions"
          ></textarea>
          <!-- <input class="inputline" size="30" placeholder="Venue of the event" v-model="venue"> -->
          <br>
          <p>Given this {{ date }}</p>
          <hr>
          <b-row>
            <b-col>
              <b-button
                variant="danger"
                class="btn btn-block"
                v-on:click="resetCertification"
              >Cancel</b-button>
            </b-col>
            <b-col cols="8">
              <b-button variant="primary" class="btn btn-block" type="sumbit">Certify Now</b-button>
            </b-col>
          </b-row>
        </form>
      </div>
    </b-modal>
      </div>
  </div>
</template>

<script>
import Offer from "./Offer";
import axios from "axios";
import $ from "jquery";

export default {
  name: "certify",
  props: {
    username: String
  },
  components: {
    Offer
  },
  data() {
    return {
      noBadges: false,
      badges: [],
      s_username: "",
      s_src: "",
      warning: "",
      certificateName: "",
      venue: "",
      date: new Date(),
      descriptions: "",
      userExit: false
    };
  },

  created() {
    axios.post("http://localhost:8081/user/badges-org", {data: this.$store.getters.token})
      .then(resp => {
        console.log(resp.data.badges)
        this.badges = resp.data.badges;
        if (this.badges.length == 0) {
          $(".temp").show();
        }
      });
  },
  methods: {
    
    suggest() {
      axios.post(`http://localhost:4000/suggest`).then(response => {
        for (let i = 0; i < response.length; ++i) {
          this.suggestions.push(response[i]);
        }
      });
    },
    validate() {
      if (this.s_username !== "" && this.selectedRole !== "No role selected") {
        return true;
      } else {
        return false;
      }
    },
    resetModal() {
      this.s_username = "";
      this.selectedRole = "No role selected";
      this.userExit = false;
      this.warning = "";
    },
    handleSubmit() {
      if (this.validate() == true) {
        this.people.push({
          username: this.s_username,
          role: this.selectedRole
        });
        this.$bvModal.hide("addRecipient-modal");
        this.resetModal();
      } else {
        this.warning = "Please select a role";
      }
    },
    handleCancel() {
      this.resetModal();
      this.$bvModal.hide("addRecipient-modal");
    },
    removeWarning() {
      if (this.selectedRole !== "No role selected") {
        this.warning = "";
      }
    },
    handleCertificationSubmit(bcode) {
      console.log(bcode)
      let badgeInfo = {bcode : bcode, certificateName: this.certificateName, descriptions: this.descriptions}
      axios.post("http://localhost:8081/user/certify", {user: this.$store.getters.token, badgeInfo: badgeInfo})
      this.resetCertification();
    },
    resetCertification() {
      this.descriptions = "";
      this.certificateCategory = "";
      this.$bvModal.hide("certify-modal");
    },
    closeCreate() {
      this.$bvModal.hide("offer");
      axios.post("http://localhost:8081/user/badges-org", {data: this.$store.getters.token})
      .then(resp => {
        console.log(resp.data.badges)
        this.badges = resp.data.badges;
        if (this.badges.length != 0) {
          $(".temp").hide();
        }
      });
    }
  },
   mounted() {
     if (this.$store.getters.isSubmitted) {
       alert("to close the modal");
     }
  }
};
</script>

<style scoped>
.recipient {
  padding:0;
  height:240px;
  overflow:auto;
}
.size50 {
  height: 50px;
  width: 50px;
  margin-top: 100px;
}
.red {
  color: red;
}

#closeM {
  width: 100px;
  float:left;
  margin:5px;
  margin-bottom: 0;
}

b-modal {
  top: 100px;
}

#createC {
  margin-top:30px;
  margin-bottom: 20px;
  width:250px;
}

.inputline {
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  text-align: center;
}
.ifont {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.temp {
  margin-top: 250px;
  margin-left:250px;
  margin-bottom: 250px;
}

.binfo {
  margin-top: 3px;
  margin-bottom: 3px;
}

#addRecipient-modal {
  padding-top: 500px;
}

#certify {
  text-align: left;
}


.modl {
  position: relative;
  margin-top: 10% !important;
}

/* .contain {
  margin-top: 100px;
} */
</style>

