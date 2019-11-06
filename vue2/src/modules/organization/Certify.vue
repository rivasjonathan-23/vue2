 <template>
  <div id="certify">
    <div class="createNnum">
      <b-button
        id="createC"
        v-bind:class="{fit: sm}"
        variant="primary"
        class="btn"
        v-b-modal.offer
      >Create new</b-button>
      <div class="pbadges" v-bind:class="{fit: sm}">
        Pending badges
        <span class="nb">{{badges.length}}</span>
      </div>
    </div>
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
    <div class="text-center">
      <h3 class="temp" style="display:none">You haven't offered badges yet</h3>
    </div>
    <div class="loading" v-show="isLoading">
      <div class="text-center text-danger my-2">
        <b-spinner id="loading2" class="align-middle"></b-spinner>
      </div>
    </div>
    <div v-for="(badge, index) in badges" v-bind:key="index">
      <div v-if="!badge.granted" class="contain">
        <div v-if="!hasdata" class="nooffered">
          <h3 class="temp">You haven't offered badges yet</h3>
        </div>
        <div class="badgeicon" v-bind:class="{small: resized}">
          <img src="@/assets/image2.png" class="blogo">
          <h5 class="binfo">{{ badge.badgename }}</h5>
          <p class="binfo">{{ badge.venue }}</p>
          <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
          <p id="code" class="binfo">Code:&nbsp;{{ badge.code }}</p>
        </div>
        <div class="recContainer" v-bind:class="{small: resized}">
          <div id="bmenu1">
            <span class="tiRec" v-bind:class="{fit: sm}">Recipients</span>
            <span class="cuRec" v-bind:class="{fit: sm}">
              <span>Recipients&nbsp;</span>
              <span class="nrec">{{badge.recipient.length}}</span>
            </span>
            <span class="cuRec" v-bind:class="{fit: sm}">
              <span>code&nbsp;</span>
              <span class="nrec">{{badge.code}}</span>
            </span>
          </div>
          <div class="recipient">
            <table class="recip" v-if="badge.recipient.length > 0">
              <tr class="thead">
                <td class="imp">
                  <p class="TH">Username</p>
                </td>
                <td class="imp1">
                  <p class="TH">Real name</p>
                </td>
                <td class="nimp"></td>
              </tr>
              <tr
                class="reclist"
                v-for="(recipient, index) in badge.recipient"
                :key="index"
                @mouseover="hover = recipient._id"
                @mouseleave="hover = ''"
              >
                <td class="imp">
                  <p>{{recipient.username}}</p>
                </td>
                <td class="imp1">
                  <p>{{recipient.fullname}}</p>
                </td>
                <td class="nimp">
                  <transition name="slide-fade">
                    <p class="delete" v-if="hover === recipient._id">Delete</p>
                  </transition>
                </td>
              </tr>
            </table>
            <p class="noRec" v-else>No recipient had availed yet</p>
          </div>
          <div id="bmenu" class="text-left">
            <b-button
              variant="primary"
              id="cert"
              class="btn2"
              v-b-modal.certify-modal
              v-bind:class="{fit: sm}"
              v-on:click="getBadgeDetail(badge.code, badge.date)"
            >Certify Recipients</b-button>

            <b-button
              variant="info"
              class="btn2"
              v-bind:class="{fit: sm}"
              v-b-modal.addRecipient-modal
              v-on:click="getBadgeDetail(badge.code, badge.date)"
            >Add Recipient</b-button>
            <b-button
              variant="danger"
              class="btn2"
              v-bind:class="{fit: sm}"
              v-b-modal.addRecipient-modal
              v-on:click="getBadgeDetail(badge.code, badge.date)"
            >Delete badge</b-button>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      class="modl"
      id="addRecipient-modal"
      title="Recepient Information"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-footer
    >
      <form class="addR" @submit.prevent="addRecipient()">
        <span class="error" v-show="error">Cannot find user or user already in the list!</span>
        <br>
        <b-input id="usernamei" required v-model="s_username" placeholder="Enter username"/>
        <br>
        <b-row>
          <b-col>
            <b-button
              v-on:click="handleCancel"
              v-if="!adding"
              variant="danger"
              class="btn btn-block"
            >Cancel</b-button>
          </b-col>
          <b-col cols="8">
            <b-button
              type="submit"
              v-if="!adding"
              variant="primary"
              autocomplete
              class="btn btn-block"
            >Add Recipient</b-button>
            <span v-else class="add">
              <b-spinner class="align-middle"></b-spinner>&nbsp;
              <strong>Adding new recipient...</strong>
            </span>
          </b-col>
        </b-row>
      </form>
    </b-modal>
    <b-modal
      class="modl"
      size="lg"
      id="certify-modal"
      title="Certify The Recipients"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-footer
    >
      <div class="text-center ifont">
        <form @submit.stop.prevent="handleCertificationSubmit()">
          <span>This certificate of</span>
          <br>
          <input
            class="inputline"
            placeholder="Certificate Name"
            v-model="certificateName"
            required
          >
          <br>
          <br>
          <br>
          <span>is awarded to</span>
          <br>
          <p>
            (
            <i>participant/s' name</i>)
            <br>
            <br>
            <br>
          </p>
          <textarea
            name="description"
            id="description"
            rows="4"
            placeholder="Certificate body..."
            class="text-center ifont"
            v-model="descriptions"
            required
          ></textarea>
          <br>
          <br>
          <br>
          <p>Given this {{ date }}</p>
          <hr>
          <br>
          <br>
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
              <b-button
                variant="primary"
                v-if="!certifying & !errorCertifying"
                class="btn btn-block"
                type="sumbit"
              >Certify Now</b-button>
              <span class="errorC" v-if="errorCertifying & !certifying">
                <strong>No recipient to certify!</strong>
              </span>
              <span v-if="certifying" class="add">
                <b-spinner class="align-middle"></b-spinner>&nbsp;
                <strong>Certifying recipient...</strong>
              </span>
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
      // badges: [],
      badges: [
        {
          badgename: "First placer",
          code: "s8fs6df",
          venue: "Passerelles Numeriques coding contest",
          date: { month: "Septembner", day: 23, year: 2019 },
          recipient: [
            {
              username: "jrivas23",
              fullname: "Jonathan Rivas",
              _id: "asdfasfdgdfiau23"
            },
            {
              username: "jrivas23",
              fullname: "Jonathan Rivas",
              _id: "asdfasdfiau23"
            },
            {
              username: "jrivas23",
              fullname: "Jonathan Rivas",
              _id: "asdfasdhgadsdfiau23"
            },
            {
              username: "jrivas23",
              fullname: "Jonathan Rivas",
              _id: "asdfasdsdfiau23"
            }
          ]
        },
        {
          badgename: "First placer",
          code: "s8fs6df",
          venue: "Passerelles Numeriques coding contest",
          date: { month: "Septembner", day: 23, year: 2019 },
          recipient: [
            {
              username: "jrivas23",
              fullname: "Jonathan Rivas",
              _id: "asdfasdfgsdfiau23"
            }
          ]
        }
      ],
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
      tindex: 0,
      size: 0,
      resized: false,
      isLoading: null,
      hasdata: false,
      sm: false,
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
    axios
      .post("http://localhost:8081/user/pendingbadges", {
        data: this.$store.getters.token
      })
      .then(resp => {
        (this.isLoading = false), (this.badges = resp.data.badges.reverse());
        if (this.badges.length == 0) {
          this.hasdata = false;
        }
      });
  },

  methods: {
    handleResize() {
      if (window.innerWidth < 1200) {
        this.resized = true;
        if (window.innerWidth < 600) {
          this.sm = true;
        } else {
          this.sm = false;
        }
      } else {
        this.sm = false;
        this.resized = false;
      }
    },
    
    getBadgeDetail(bcode, date) {
      this.code = bcode;
      this.date = date.month + " " + date.day + ", " + date.year;
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
            $("#usernamei").css({ "border-color": "lightgrey" });
            this.$bvModal.hide("addRecipient-modal");
            this.error = false;
            resolve(true);
          })
          .catch(err => {
            $("#usernamei").css({ "border-color": "red" });
            this.adding = false;
            this.error = true;
          });
      });
    },

    handleCancel() {
      this.resetModal();
      this.$bvModal.hide("addRecipient-modal");
      $("#usernamei").css({ "border-color": "lightgrey" });
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
            this.hasdata = false;
          } else {
            this.hasdata = true;
          }
        });
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    $(".reclist").mouseenter(function() {
      $(this)
        .find(".delete")
        .show();
    });
    $(".reclist").mouseleave(function() {
      $(this)
        .find(".delete")
        .hide();
    });
  }
 
};
</script>

<style scoped>
.loading {
  margin-top: 15px;
  padding-top: 200px;
  padding-bottom: 200px;
  background: #f2f8fa;
}

.align-middle {
  color: rgb(3, 78, 133);
  height: 30px;
  width: 30px;
}

#loading2 {
  color: rgb(3, 78, 133);
  height: 70px;
  width: 70px;
}

.reclist {
  color: #476069;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
.createNnum {
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  /* background-image: linear-gradient(to right, #87cefa , white); */
  height: 40px;
  position: relative;
}
.blogo {
  /* float: left; */
  width: 200px;
  margin-top: 20px;
}
.cerMenu {
  width: 300px;
}

#createC {
  font-size: 18px;
  overflow: hidden;
  float: left;
  border-radius: 2px;
}

.nrec {
  background: #a6d7f5;
  border-radius: 5px;
  padding-left: 8px;
  padding-right: 8px;
  color: #415663;
}

.nb {
  padding-left: 7px;
  padding-right: 7px;
  padding-bottom: 3px;
  padding-top: 3px;
  background: #d1e2e6;
  border-radius: 5px;
  font-size: 20px;
  margin-left: 1px;
}
.delete {
  transition: ease 0.5s;
}
.delete:hover {
  color: red;
}
.btncont {
  width: 100%;
  padding: 0;
}

.brow {
  /* background:red; */
  margin-right: 0;
  width: 100%;
  padding: 0;
  margin: 0;
}

/* #cert {
  margin-right: 2px;
} */

.btn2 {
  float: right;
  margin-top: 5px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 2px;
}

#certifyrec {
  margin-right: 0;
  width: 100%;
  border: none;
}

#addrecip {
  margin-left: 0;
  border: none;
  background: #43aefa;
  width: 100%;
}
.pbadges {
  left: 130px;
  font-size: 20px;
  color: #2a5c82;
  padding-top: 5px;
  padding-left: 20px;
  float: left;
}
textarea:focus,
input:focus {
  outline: none;
}

.nooffered {
  text-align: center;
}
.tiRec {
  float: left;
  font-size: 25px;
  margin: 0;
  padding-left: 9px;
  background: #72c4f7;
}
.cuRec {
  float: left;
  font-size: 17px;
  padding-top: 8px;
  font-weight: normal;
  padding-left: 20px;
  padding-right: 10px;
  margin: 0;
  background: #72c4f7;
}

#description {
  border: none;
  width: 60%;
  font-size: 16px;
  font-style: italic;
  color: #3b3d3d;
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
}

.badgeicon {
  /* -webkit-filter: opacity(80%);
  filter: opacity(80%); */
  height: 400px;
  width: 40%;
  color: white;
  overflow: auto;
  margin-bottom: 0;
  background-image: url("~@/assets/background2.jpg");
  background-size: cover;
  margin-top: 0;
  /* background: white; */
  /* border: 1px solid lightgrey; */
  float: left;
  /* margin-left: 30px; */
}
.fit {
  width: 100%;
  text-align: center;
}

.recContainer {
  width: 59%;
  float: left;
  margin-right: 0;
  margin-bottom: 24px;
}
.small {
  width: 100%;
}
.recipient {
  text-align: center;
  background: #e1eef7;
  margin-bottom: 0;
  /* border-bottom: 3px solid #dce2e6; */
  /* border: 1px solid lightgrey; */
  padding: 0;
  margin-top: 0;
  height: 318px;
  width: 100%;
  overflow: auto;
}
.thead {
  background: #caddeb;
  color: #5b758a;
}
#bmenu {
  width: 100%;
  height: 45px;
  background: #b8e2fc;
  padding-bottom: 0;
  padding-left: 5px;
  padding-right: 2px;
  text-align: right;
  margin-top: 0;
  margin-bottom: 0;
}
#bmenu1 {
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
  padding-bottom: 0;
  text-align: left;
  height: 37px;
  width: 100%;
  margin-bottom: 0;
  /* padding-left: 9px;
  padding-right: 9px; */
  color: #165780;
  background: #72c4f7;
}
.imp {
  width: 40%;
}

.nimp {
  width: 12%;
}

.imp1 {
  width: 48%;
}

p {
  padding: 0;
  margin: 0;
}

.TH {
  font-size: 16px;
}

.btn {
  margin-bottom: 0;
}

.recip {
  width: 100%;
  text-align: left;
  margin: 0;
}

.recip td {
  padding: 5px;
  padding-left: 10px;
  font-size: 15px;
  /* border-bottom: 1px solid lightgrey; */
}

.delete {
  display: none;
}
tr {
  transition: ease 0.4s;
}
.reclist:hover {
  background-color: #c3e3f7;
}

.recip th {
  width: 100%;
}
.errorC {
  color: red;
  font-size: 20px;
}

.noRec {
  margin-top: 140px;
  font-size: 20px;
  color: #2a5c82;
  /* margin-left: 190px; */
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

.inputline {
  font-style: italic;
  font-size: 20px;
  width: 30%;
  color: #3b3d3d;
  background: transparent;
  border: none;
  border-bottom: 1px solid grey;
  text-align: center;
}
.ifont {
  font-family: verdana;
}

.temp {
  margin-top: 50px;
  display: none;
  margin-bottom: 50px;
  color: #2a5c82;
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
  /* background: #f2f7fa; */
  margin-top: 0;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;

  font-family: verdana;
}

.modl {
  background: red;
}
hr {
  margin-top: 0;
  margin-bottom: 0;
}

.contain {
  margin-top: 25px;
  margin-bottom: 10px;
  border-radius: 0;
  width: 100%;
  height: 400px;
  /* border-bottom:2px solid #dce2e6; */
  /* background: lightseagreen; */
  border-radius: 1px;
  /* padding-top: 15px;
  padding-bottom: 15px; */
  text-align: center;
  /* padding-left: 35px;
  padding-right: 25px; */
  /* -webkit-box-shadow: 0px 5px 20px darkgrey;
  box-shadow: 0px 5px 20px darkgrey; */
}
</style>

