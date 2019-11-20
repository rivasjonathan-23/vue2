<template>
  <div>
    <div class="text-center modaltext">
      <p>
        Are you sure you want to remove
        <strong>{{" "+recipient_name+" "}}</strong>?
      </p>
    </div>
    <hr>
    <div v-if="!removing" class="text-center">
      <b-button variant="danger" @click="close" class="mrgn3">Cancel</b-button>
      <b-button variant="primary" @click="removeRecipient" class="mrgn3">Remove</b-button>
    </div>
    <div v-else class="add">
      <b-spinner variant="primary" class="align-middle"></b-spinner>&nbsp;
      <strong>Removing recipient...</strong>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@/Styles/cerStyle.css";

export default {
  name: "Remove",
  data() {
    return {
      recipient_name: "",
      removing: false
    };
  },
  props: {
    recipient: Object
  },
  created() {
    this.recipient_name = this.recipient.recipient_name;
  },
  methods: {
    removeRecipient() {
      this.removing = true;
      axios
        .post("http://localhost:8081/user/remove", this.recipient)
        .then(res => {
          this.removing = false;
          this.$emit("submit", res.data.badges.reverse());
          this.$bvModal.hide("removeRecip");
        })
        .catch(err => {
          console.log(err);
          this.removing = false;
          this.$bvModal.hide("removeRecip");
          alert("Unexpected error occured! Please try again later.");
        });
    },
    close() {
      this.$bvModal.hide('removeRecip');
    }
  }
};
</script>
