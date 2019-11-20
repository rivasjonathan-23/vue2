 <template>
  <div class="certify" v-bind:class="{nopdng: resized}">
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
      hide-header-close
    >
      <Offer @submit="getData"></Offer>
    </b-modal>
    <div class="loading" v-show="isLoading">
      <div class="text-center text-danger my-2">
        <b-spinner id="loading2" variant="primary" class="align-middle"></b-spinner>
      </div>
    </div>
    <div v-show="!hasdata" class="nooffered">
      <h3 class="temp">You haven't offered badges yet</h3>
    </div>
    <div v-for="(badge, index) in badges" v-bind:key="index">
      <div v-if="!badge.granted" class="contain">
        <div class="badgeicon" v-bind:class="{small: resized}">
          <div class="bpic" v-bind:style='{backgroundImage: `url(${require("@/assets/bb/"+badge.imgnum+".jpg")})`}'>
          </div>
          <div class="background">
            <div class="bcontent">
              <img src="@/assets/image2.png" class="blogo">
              <h5 class="binfo">{{ badge.badgename }}</h5>
              <p class="binfo">{{ badge.venue }}</p>
              <p class="binfo">{{ badge.date.month+" "+badge.date.day+" "+badge.date.year }}</p>
              <p id="code" class="binfo">Code:&nbsp;{{ badge.code }}</p>
            </div>
          </div>
        </div>
        <div class="recContainer" v-bind:class="{small: resized}">
          <div id="bmenu1">
            <!-- <span class="tiRec" v-bind:class="{fit: sm}">Recipients</span> -->
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
                  <p class="TH nmrgn">Username</p>
                </td>
                <td class="imp1">
                  <p class="TH nmrgn">Full name</p>
                </td>
                <td class="nimp"></td>
              </tr>
              <tr
                class="reclist"
                v-for="(recipient, index) in badge.recipient"
                :key="index"
                @mouseenter="hover = recipient._id"
                @mouseleave="hover = ''"
              >
                <td class="imp">
                  <p class="nmrgn">{{recipient.username}}</p>
                </td>
                <td class="imp1">
                  <p class="nmrgn">{{recipient.fullname}}</p>
                </td>
                <td class="nimp">
                    <span @click="remove(badge._id, badge.code, recipient.username, recipient.fullname)" v-if="hover === recipient._id" class="remove nmrgn">Remove</span>
                </td>
              </tr>
            </table>
            <p class="noRec" v-else>No recipient yet</p>
          </div>
          <div id="bmenu" class="text-left">
            <b-button
              variant="primary"
              id="cert"
              class="btn2"
              v-bind:class="{fit: sm}"
              v-on:click="getBadgeDetail('certify-modal', badge._id, badge.code, badge.date, badge.recipient)"
            >Certify Recipients</b-button>

            <b-button
              variant="info"
              class="btn2"
              v-bind:class="{fit: sm}"
              v-on:click="getBadgeDetail('addRecipient-modal', badge._id, badge.code, badge.date, [])"
            >Add Recipient</b-button>
            <b-button
              variant="danger"
              @click="deletebadge(badge._id, badge.code, badge.badgename)"
              class="btn2"
              v-bind:class="{fit: sm}"
            >Delete badge</b-button>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="addRecipient-modal"
      title="Add recipient"
      size="sm"
      centered
      no-close-on-esc
      no-close-on-backdrop
      hide-footer
    >
      <Addrecipient v-on:submit="getData" :badgeinfo="{code: badge_code, id: badge_id}"></Addrecipient>
    </b-modal>
    <b-modal
      class="modl"
      size="lg"
      id="certify-modal"
      title="Certify Recipients"
      centered
      hide-header-close
      no-close-on-esc
      no-close-on-backdrop
      hide-footer
    >
      <Certificate @submit="getData" :badge="{recipients: recipients, code: badge_code, id: badge_id, date: badge_date}"></Certificate>
    </b-modal>
    <b-modal
      class="modl"
      size="sm"
      id="removeRecip"
      centered
      hide-header-close
      title="Remove recipient"
      no-close-on-esc
      no-close-on-backdrop
      hide-footer
    >
      <Remove :recipient="user2remove" @submit="updateData"></Remove>
    </b-modal>
    <b-modal
      class="modl"
      size="sm"
      id="deleteBadge"
      title="Delete badge"
      centered
      hide-header-close
      no-close-on-esc
      no-close-on-backdrop
      hide-footer
    >
    <div class="text-left">
      <b-input v-model="inputbname" placeholder="Type the badge name to confirm"></b-input>
    </div>
    <br>
    <div v-if="!removing" class="text-right">
     <b-button variant="danger" @click="$bvModal.hide('deleteBadge')" class="mrgn3">Cancel</b-button>
     <b-button @click="deleteb" :disabled="inputbname != badgename" variant="primary" class="mrgn3">Delete</b-button>
    </div>
     <div v-else class="add">
      <b-spinner variant="primary" class="align-middle"></b-spinner>&nbsp;
      <strong>Deleting badge...</strong>
    </div>
    </b-modal>
  </div>
</template>

<script>
import Offer from "./Offer";
import axios from "axios";
import Certificate from "./certificate";
import Addrecipient from "./addRecipient";
import Remove from "./removerecip";
import "@/Styles/cerStyle.css";
import $ from "jquery";

export default {
  name: "certify",
  props: {
    username: String
  },
  components: {
    Offer,
    Certificate,
    Addrecipient,
    Remove
  },
  data() {
    return {
      noBadges: false,
      badges: [],
      s_username: "",
      s_src: "",
      warning: "",
      certificateName: "",
      badge_code: "",
      badge_date: "",
      badge_id: "",
      descriptions: "",
      userExit: false,
      error: false,
      adding: false,
      hover: "",
      tindex: 0,
      size: 0,
      resized: false,
      isLoading: false,
      hasdata: true,
      sm: false,
      recipients: [],
      user2remove: {
        recipient_name: "",
        recipient_id: "",
        badge_id: "",
        badge_code: ""
      },
      removing: false,
      badgename: "BADGENNAME123xyz*#",
      inputbname: "",
      btodelete: {
        id: "",
        code: "",
      }
    };
  },

  created() {
    this.isLoading = true;
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
    
    axios
      .post("http://localhost:8081/user/pendingbadges", {
        data: this.$store.getters.token
      })
      .then(resp => {
        this.isLoading = false;
        this.badges = resp.data.badges.reverse();
        if (this.badges.length == 0) {
          this.hasdata = false;
        } else {
          this.hasdata = true;
        }
        var num = 0;
        this.badges.forEach(badge => {
          badge["imgnum"] = num;
          num += 1;
          if (num > 10) {
            num = 0;
          }
        })
      });
  },

  methods: {
    handleResize() {
      if (window.innerWidth < 850) {
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
    
    getBadgeDetail(modal ,id, bcode, date, recip) {
      this.recipients = recip;
      this.badge_id = id;
      this.badge_code = bcode;
      this.badge_date = date.month + " " + date.day + ", " + date.year;
      this.$bvModal.show(modal);
    },
    resetModal() {
      this.s_username = "";
      this.selectedRole = "No role selected";
      this.userExit = false;
      this.warning = "";
    },
    

    handleCancel() {
      this.resetModal();
      this.$bvModal.hide("addRecipient-modal");
      $("#usernamei").css({ "border-color": "lightgrey" });
      this.error = false;
    },
    
    resetCertification() {
      this.errorCertifying = false;
      this.descriptions = "";
      this.certificateName = "";
      this.$bvModal.hide("certify-modal");
    },
    remove(id, code, username, name) {
      this.user2remove = {
        recipient_name:name,
        recipient_username: username,
        badge_code:code,
        badge_id:id,
        data: this.$store.getters.token
      }
      this.$bvModal.show('removeRecip');
    },
    updateData(data) {
      this.badges = data;
      this.manageData();
    },
    getData() {
      axios
        .post("http://localhost:8081/user/pendingbadges", {
          data: this.$store.getters.token
        })
        .then(resp => {
          this.badges = resp.data.badges.reverse();
          this.manageData();
        }).catch(err => {
          alert("Unexpected error occured! Please try again later.");
        })
    },
    deletebadge(id, code, name) {
      this.badgename = name;
      this.btodelete = {
        id: id, code: code
      }
      this.$bvModal.show("deleteBadge");
    },
    deleteb() {
      this.removing = true;
      axios.post("http://localhost:8081/user/deletebadge", {
        data: this.$store.getters.token, badgeinfo: this.btodelete})
     .then(resp => {
        this.badges = resp.data.badges.reverse();
        this.manageData();
        this.removing = false;
        this.$bvModal.hide("deleteBadge");

      }).catch(err => {
        this.removing = false;
        this.$bvModal.hide("deleteBadge");
        alert("Unexpected error occured! Please try again later.");
      })
    },
    manageData() {
      if (this.badges.length != 0) {
        this.hasdata = true;
          var num = 0;
        this.badges.forEach(badge => {
          badge["imgnum"] = num;
          num += 1;
          if (num > 10) {
            num = 0;
          }
        })
      } else {
        this.hasdata = false;
      }
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
 
};
</script>

<style scoped>

</style>


