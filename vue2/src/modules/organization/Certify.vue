 <template>
  <div id="certify">
    <b-card>
      <b-row class="row">
        <b-col>
          <br>
          <b-card class="bg-light text-center">
            <img src="@/assets/image.png" class>
            <h5>{{ badgename }}</h5>
            <p>{{ venue }}</p>
            
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
          <b-table striped hover :items="people"></b-table>
        </b-col>
        <b-modal class="modl" id="addRecipient-modal" title="Recepient Information" centered no-close-on-esc no-close-on-backdrop hide-header-close hide-footer>
          <form class="addR" @submit.stop.prevent="handleSubmit">
            <b-label for="usernamei">Search Username</b-label>
            <b-input id="usernamei" v-model="s_username" @change="userExit = true" @keyup="suggest"/>
            <br>
            <b-label for="role">Pick Role</b-label>
            <b-card>
              <b-form-select v-model="selectedRole" :options="options" @change="removeWarning"></b-form-select>
              <i>
                <p class="text-center red">{{ warning }}</p>
              </i>
            </b-card>
            <br>
            <b-card v-if="userExit">
              <b-row>
                <b-col class="text-center">
                  <img src="@/assets/pro.png" rounded="circle" class="size50">
                </b-col>
                <b-col cols="9" class="border-left">
                  <p>Role : {{ selectedRole }}</p>
                  <p>Username: {{ s_username }}</p>
                </b-col>
              </b-row>
            </b-card>
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
        <b-modal class="modl" size="dm" id="certify-modal" title="Certify The Recipients" centered no-close-on-esc no-close-on-backdrop hide-header-close hide-footer>
          <div class="text-center ifont">
            <form @submit.stop.prevent="handleCertificationSubmit">
              <span>This certificate of</span>
              <br>
              <input
                class="inputline"
                size="15"
                placeholder="Certificate Category"
                v-model="certificateCategory"
              >
              <br>
              <br>
              <span>is awarded to</span>
              <br>
              <p>
                (Names are auto generated)
                <br>for
              </p>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="3"
                placeholder="Description of the event"
                v-model="descriptions"
              ></textarea>
              <p>at</p>
              <input class="inputline" size="30" placeholder="Venue of the event" v-model="venue">
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
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "certify",
  props:{
    username: String
  },
  data() {
    return {
      people: [],
      options: [{value: "speaker", text: "speaker"}],
      badgename: "",
      venue: "",
      date: new Date().toDateString(),
      selectedRole: "No role selected",
      s_username: "",
      s_src: "",
      warning: "",
      certificateCategory: "",
      descriptions: "",
      userExit: false
    };
  },

  created(){
    let uri_tocertify = `http://localhost:4000/tocertify/${this.username}/${this.date}`
    axios.get(uri_tocertify).then(response =>{
      var get = response.data;
      this.people = get.people;
      this.options = get.options;
      this.badgename = get.badgename;
      this.venue = get.venue;
      this.date = get.date;
    })
  },
  methods: {

    //to continued
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
    handleCertificationSubmit() {
      var temp = [];
      this.people.forEach(each => {
        var newperson = {
          username: each.username,
          role: each.role,
          badgename: this.badgename,
          certificateCategory: this.certificateCategory,
          venue: this.venue,
          date: this.date
        };
        temp.push(newperson);
      });
      let uri_certify = `http://localhost:4000/certifynow/${this.username}`
      axios.post(uri_certify, temp).then(response => {
        /* eslint-disable */
        console.log(response.data)
      })
      this.resetCertification();
    },
    resetCertification() {
      this.descriptions = "";
      this.certificateCategory = "";
      this.$bvModal.hide("certify-modal");
    }
  }
};
</script>

<style scoped>
.size50 {
  height: 50px;
  width: 50px;
  margin-top:100px;
}
.red {
  color: red;
}

b-modal {
  top:100px;
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


#addRecipient-modal {
  padding-top:500px;
}
.modl {
  position: relative;
  margin-top:10% !important;

}

</style>

