 <template>
  <div id="certify">
    <b-button
      id="createC"
      variant="primary"
      class="btn btn-block"
      v-b-modal.offer
    >Create new certificate</b-button>
    <b-modal
      size="lg"
      id="offer"
      title="Create new badge"
      centered
       no-close-on-esc
      no-close-on-backdrop
      hide-footer
    >
      <Offer v-on:submit="closeCreate"></Offer>
    </b-modal>
    <hr>
    <h3 class="temp" style="display:none">You haven't offered badges yet</h3>
    <div v-for="(badge, index) in badges" v-if="!badge.granted" v-bind:key="index">
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
              <p id="code" class="binfo">Code:&nbsp;{{ badge.code }}</p>
            </b-card>
          </b-col>
          <b-col cols="8" class="cerMenu">
            <hr>
            <div id="bmenu" class="text-center">
              <h2>Recipients</h2>
              <br>
              <b-row>
                <b-col>
                  <b-button
                    id="cer"
                    variant="primary"
                    class="btn btn-block"
                    v-b-modal.certify-modal
                    v-on:click="getBadgeDetail(badge.code, badge.date)"
                  >Certify Recipients</b-button>
                </b-col>
                <b-col>
                  <b-button
                    id="cer"
                    variant="primary"
                    class="btn btn-block"
                    v-b-modal.addRecipient-modal
                    v-on:click="getBadgeDetail(badge.code, badge.date)"
                  >Add Recipient</b-button>
                </b-col>
              </b-row>
              <br>
            </div>
            <b-card class="recipient" >
               <table class="recip" v-if="badge.recipient.length > 0">
                   <tr class="thead">
                     <td class="imp"><p class="TH">Username</p></td>
                     <td class="imp1"><p class="TH">Real name</p>
                     <td class="nimp"></td>
                   </tr>
                   <tr  v-for="(recipient, index) in badge.recipient" :key="index"  @mouseover="mouseOver(recipient._id)" @mouseleave="mouseLeave">
                     <td class="imp"><p>{{recipient.username}}</p></td>
                     <td class="imp1"><p>{{recipient.fullname}}</p></td>
                     <td class="nimp"><span v-show="hover == recipient._id">Delete</span></td>
                   </tr>
               </table>
              <!-- <b-table striped hover :items="badge.recipient"></b-table> -->
              <p class="noRec" v-else >No recipient had availed yet</p>
            </b-card>
          </b-col>
        </b-row>
      </b-card>
    </div>
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
      <form class="addR" @submit.prevent="addRecipient()">
        <span class="error" v-show="error">Cannot find user or user already in the list!</span>
        <br>
        <b-input id="usernamei" required v-model="s_username" placeholder="Enter username"/>
        <br>
        <b-row>
          <b-col>
            <b-button v-on:click="handleCancel" v-if="!adding" variant="danger" class="btn btn-block">Cancel</b-button>
          </b-col>
          <b-col cols="8">
            <b-button type="submit" v-if="!adding" variant="primary" autocomplete="" class="btn btn-block">Add Recipient</b-button>
            <span v-else class="add"><b-spinner class="align-middle"></b-spinner>&nbsp;<strong>Adding new recipient...</strong></span>
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
        <form @submit.stop.prevent="handleCertificationSubmit()">
          <span>This certificate of</span>
          <br>
          <input
            class="inputline"
            size="15"
            placeholder="Certificate Category"
            v-model="certificateName"
            required
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
            required
          ></textarea>
          <br>
          <p>Given this {{ date }}</p>
          <hr>
          <b-row>
            <b-col>
              <b-button
                v-if="!certifying | errorCertifying"
                variant="danger"
                class="btn btn-block"
                v-on:click="resetCertification"
              >Cancel</b-button>
            </b-col>
            <b-col cols="8">
              <b-button variant="primary"  v-if="!certifying & !errorCertifying" class="btn btn-block" type="sumbit">Certify Now</b-button>  
               <span class="errorC" v-if="errorCertifying & !certifying"><strong>No recipient to certify!</strong></span>
              <span v-if="certifying" class="add"><b-spinner class="align-middle"></b-spinner>&nbsp;<strong>Certifying recipient...</strong></span>
            </b-col>
            
          </b-row>
        </form>
      </div>
    </b-modal>
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
      code: "",
      date: "",
      descriptions: "",
      userExit: false,
      error: false,
      adding: false, 
      certifying: false, 
      errorCertifying: false,
      hover: "",
      tindex: 0
    };
  },

  created() {
    axios
      .post("http://localhost:8081/user/pendingbadges", {
        data: this.$store.getters.token
      })
      .then(resp => {
        this.badges = resp.data.badges.reverse();
        if (this.badges.length == 0) {
          $(".temp").show();
        }
      });
  },

  methods: {
    mouseOver(index) {
      this.hover = index;
    },
    mouseLeave(index) {
      this.hover = null;
    },
    getBadgeDetail(bcode, date) {
      this.code = bcode;
      this.date = date.month+" "+date.day+", "+date.year;
    },
    resetModal() {
      this.s_username = "";
      this.selectedRole = "No role selected";
      this.userExit = false;
      this.warning = "";
    },
    async addRecipient() {
      var done = await this.add();
      if (done) {
        this.adding = false;
        this.getData();
      }
    },
    add() {
      this.adding = true;
      return new Promise(resolve => {
        axios
          .post("http://localhost:8081/user/addrecipient", {
            username: this.s_username,
            org: this.$store.getters.token,
            code: this.code
          })
          .then(res => {
            this.badges = res.data.badges;
            this.resetModal();
             $("#usernamei").css({"border-color":"lightgrey"});
            this.$bvModal.hide("addRecipient-modal");
            this.error = false;
            resolve(true);
          })
          .catch(err => {
            $("#usernamei").css({"border-color":"red"});
            this.adding = false;
            this.error = true;
          });
      });
    },

    handleCancel() {
      this.resetModal();
      this.$bvModal.hide("addRecipient-modal");
       $("#usernamei").css({"border-color":"lightgrey"});
      this.error = false;
    },
    handleCertificationSubmit() {
      this.certifying = true;
      let badgeInfo = {
        code: this.code,
        certificateName: this.certificateName,
        descriptions: this.descriptions
      };
      axios
        .post("http://localhost:8081/user/certify", {
          user: this.$store.getters.token,
          badgeInfo: badgeInfo
        })
        .then(res => {
          this.certifying = false;
          this.resetCertification();
          this.getData();
        })
        .catch(err => {
          this.certifying = false;
          this.errorCertifying = true;
        });
    },
    resetCertification() {
      this.errorCertifying = false;
      this.descriptions = "";
      this.certificateName = "";
      this.$bvModal.hide("certify-modal");
    },
    closeCreate() {
      this.$bvModal.hide("offer");
      this.getData();
    },
    getData() {
      axios
        .post("http://localhost:8081/user/pendingbadges", {
          data: this.$store.getters.token
        })
        .then(resp => {
          this.badges = resp.data.badges.reverse();
          if (this.badges.length != 0) {
            $(".temp").hide();
          } else {
            $(".temp").show();
          }
        });
    }
  },
  mounted() {
    if (this.$store.getters.isSubmitted) {
      alert("to close the modal");
    }

    $("tr").on("mouseenter",function() {
      alert($(this).find(".delete").text())
      $(this).find(".delete").show();
    })
  }
};
</script>

<style scoped>
.thead {
  background:lightgrey;
  color: #68707d;
}
.imp {
  width: 40%;
}

.nimp {
  width: 10%;
}

.imp1 {
  width: 50%;
}

p {
  padding:0;
  margin:0;
}

.TH  {
  font-size: 16px;
}

.recip {
  
  width: 100%;
  text-align: center;
  margin:0;
}

.recip td {
  font-size: 15px;
  border-bottom: 1px solid lightgrey;
}

.delete {
  display: none;
}

tr:hover {
  background-color: #e6e8ed;
}

.recip th {
  width:100%;
}
.errorC {
  color:red;
  font-size: 20px;
}
.recipient {
  padding: 0;
  height: 240px;
  overflow: auto;
}
.noRec {
  margin-top: 100px;
  margin-left: 190px;
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
  float: left;
  margin: 5px;
  margin-bottom: 0;
}

.error {
  color: red;
}

b-modal {
  top: 100px;
}

.add {
  color: #0071ff;
}

#createC {
  margin-top: 30px;
  margin-bottom: 20px;
  width: 250px;
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
  margin-left: 250px;
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

.temp {
  margin-top: 250px;
  margin-bottom: 250px;
}

.modl {
  position: relative;
  margin-top: 10% !important;
}

/* .contain {
  margin-top: 100px;
} */
</style>

