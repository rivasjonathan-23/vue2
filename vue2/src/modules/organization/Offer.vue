<template>
    <b-card>
       <div class="badgePic">
            <img src="@/assets/image.png" class>
            <h5>{{ badgename }}</h5>
            <p>{{ venue }}</p>
        </div>
      <form class="signupform" @submit.prevent="Offer">
        <center>
          <h1 class="sign">Offer A Badge</h1>
        </center>
        <label>
          <div class="fixedwidth">
            <p class="label-txt">Name of the event</p>
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
         <label>
          <div class="fixedwidth">
            <p class="label-txt">Description | Additional Information</p>
            <input
              type="text"
              class="input"
              name="venue"
              v-model="additionalInfo"
              autocomplete="off"
              required
            >
            <div class="line-box">
              <div class="line"></div>
            </div>
          </div>
        </label>
        <label class="ln">
          <p id="gend" class="label-txt">Date and time</p>
          <table class="bday">
            <td>
              <input
                autocomplete="off"
                type="text"
                class="BD"
                id="mnth"
                placeholder="Month"
                min="1"
                max="12"
                required
                v-model="date.month"
              >
              <div class="month">
                <h5 class="m" @click="month('January')">January</h5>
                <h5 class="m" @click="month('February')">February</h5>
                <h5 class="m" @click="month('March')">March</h5>
                <h5 class="m" @click="month('April')">April</h5>
                <h5 class="m" @click="month('May')">May</h5>
                <h5 class="m" @click="month('June')">June</h5>
                <h5 class="m" @click="month('July')">July</h5>
                <h5 class="m" @click="month('August')">August</h5>
                <h5 class="m" @click="month('September')">September</h5>
                <h5 class="m" @click="month('October')">October</h5>
                <h5 class="m" @click="month('November')">November</h5>
                <h5 class="m" @click="month('December')">December</h5>
              </div>
            </td>
            <td id="day">
              <input
                type="number"
                class="BD"
                placeholder="Day"
                min="1"
                max="32"
                required
                v-model="date.day"
              >
            </td>
            <td>
              <input
                type="number"
                class="BD"
                placeholder="Year"
                min="1990"
                max="2019"
                required
                v-model="date.year"
              >
            </td>
          </table>
          <div class="line-box">
            <div class="line"></div>
          </div>
        </label>
         <button id="postB" class="btn btn-primary btn-block btn-lg">Submit</button>
      </form>
      
    </b-card>
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
      venue: "",
      additionalInfo: "",
      date: {month: "", day: "",year: ""}
    };
  },
  methods: {
     month(m) {
      this.date.month = m;
    },
  },
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
    
     $("#mnth").click(function() {
      if ($(".month").is(":hidden")) {
        $("#mnth").val("");
        $(".month").slideDown();
      } else if  ($("#mnth").val() != "") {
         $(".month").slideUp();
      }
    });
  }
};
</script>