<template>
  <div>
    <b-card>
      <form class="signupform" @submit.prevent="Offer">
        <center>
          <h1 class="sign">Offer A Badge</h1>
        </center>

        <label>
          <div class="fixedwidth">
            <p class="label-txt">Badge Name</p>
            <input
              type="text"
              class="input"
              name="badgename"
              v-model="badgename"
              autocomplete="off"
              required
            >
            <div class="line-box">
              <div class="line"></div>
            </div>
          </div>
        </label>
        <label>
          <div class="fixedwidth">
            <p class="label-txt">Venue</p>
            <input
              type="text"
              class="input"
              name="venue"
              v-model="venue"
              autocomplete="off"
              required
            >
            <div class="line-box">
              <div class="line"></div>
            </div>
          </div>
        </label>
      </form>
    </b-card>
    <button class="btn btn-primary btn-block btn-lg">Submit</button>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import "@/Styles/mystyle.css";
export default {
  name: "SignUp",
  data() {
    return {
      badgename: "",
      venue: ""
    };
  },
  methods: {},
  mounted() {
    $(".input").focus(function() {
      $(this)
        .parent()
        .find(".label-txt")
        .addClass("label-active");
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find(".label-txt")
          .removeClass("label-active");
      }
    });
  }
};
</script>