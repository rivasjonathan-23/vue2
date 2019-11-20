<template>
  <div class="text-center ifont">
    <form @submit.stop.prevent="handleCertificationSubmit()">
      <span>This certificate of</span>
      <br>
      <input
        class="inputline cername"
        placeholder="Certificate Name"
        v-model="certificateName"
        required
      >
      <br>
      <br>
      <br>
      <center>
      <span class="awardedto">is awarded to</span>
      <div class="awhol">
      <span v-for="(rec, i) in badge.recipients" :key="i">{{" "+rec.fullname}}
      <span v-if="i != badge.recipients.length - 1">,</span>
      </span>
      </div>
      </center>
        <br>
      <textarea
        name="description"
        rows="4"
        placeholder="Certificate body..."
        class="text-center ifont des"
        v-model="descriptions"
        required
      ></textarea>
      <br>
      <br>
       <textarea
        name="description"
        rows="2"
        placeholder="Other information..."
        class="text-center ifont des"
        v-model="other_descriptions"
      ></textarea>
      <br>
      <br>
      <input
        class="inputline cername"
        placeholder="Approved by"
        v-model="approvedby"
        required
      >
      <br><br>
      <p>Given this {{ badge.date }}</p>
      <hr>
      <div class="btnholder">
        <b-button
          v-if="!certifying | errorCertifying"
          variant="danger"
          class="btn cerbtn"
          v-on:click="close"
        >Cancel</b-button>
        <b-button
          variant="primary"
          v-if="!certifying & !errorCertifying"
          class="btn cerbtn"
          type="sumbit"
        >Certify Now</b-button>
        <span class="errorC" v-if="errorCertifying & !certifying">
          <strong>No recipient to certify!</strong>
        </span>
        <span v-if="certifying" class="add">
          <b-spinner class="align-middle"></b-spinner>&nbsp;
          <strong>Certifying recipient...</strong>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import "@/Styles/cerStyle.css";

export default {
  name: "Certificate",
  data() {
    return {
      certifying: false,
      errorCertifying: false,
      descriptions: "",
      other_descriptions:  "",
      certificateName: "",
      approvedby: "",
    };
  },
  props: {
    badge: Object
  },
  methods: {
    handleCertificationSubmit() {
      this.certifying = true;
      let badgeInfo = {
        code: this.badge.code,
        id: this.badge.id,
        certificateName: this.certificateName,
        other_descriptions: this.other_descriptions,
        descriptions: this.descriptions,
        approvedby: this.approvedby
      };
      axios
        .post("http://localhost:8081/user/certify", {
          user: this.$store.getters.token,
          badgeInfo: badgeInfo
        })
        .then(res => {
          this.$bvModal.hide("certify-modal");
          this.$emit("submit");
        })
        .catch(err => {
          this.certifying = false;
          this.errorCertifying = true;
        });
    },
    close() {
      this.$bvModal.hide("certify-modal");
    }
  }
};
</script>

