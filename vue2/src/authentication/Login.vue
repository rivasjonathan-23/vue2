<template>
  <div class="container">
    <center>
      <form class="lgn" id="lgn" v-bind:class="{small: resized}" @submit.prevent="login">
        <div class="sign">
          <h1 class="text">Sign in</h1>
        </div>
        <div class="loginbody">
          <div class="inputholder">
            <span>Username</span>
            <b-input type="text" required v-model="username"/>
          </div>

          <div class="inputholder">
            <span>Password</span>
            <b-input type="password" required v-model="password"/>
          </div>

          <b-button type="submit" class="lgnbtn" variant="primary">
            <span v-if="!loading">Login</span>
            <span v-else>
              <span>Loading&nbsp;</span>
              <b-spinner class="align-middle"></b-spinner>&nbsp;
            </span>
          </b-button>
        </div>
      </form>
    </center>
  </div>
</template>


<script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      resized: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      let cred = { username: this.username, password: this.password };
      this.$store
        .dispatch("login", cred)
        .then(res => {
          console.log(res);
          if (res == "Regular user") {
            console.log(res);
            this.loading = false;
            this.$router.push("/user");
          } else {
            this.$router.push("/organization");
          }
        })
        .catch(err => {
          this.loading = false;
          alert("Invalid credentials!");
        });
    },
    handleResize() {
      if (window.innerWidth < 450) {
        this.resized = true;
      } else {
        this.resized = false;
      }
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.size = window.innerWidth;
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    $(".input").focus(function() {
      $(this)
        .parent()
        .find(".label-txt")
        .addClass("label-active")
        .css({ color: "#0071ff" });
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find(".label-txt")
          .removeClass("label-active");
      }
      $(this)
        .parent()
        .find(".label-txt")
        .css({ color: "#555657" });
    });
  }
};
</script>

<style scoped>
.align-middle {
  color: white;
  height: 30px;
  width: 30px;
}

.submitted {
  color: rgb(3, 78, 133);
  background: #b7d4eb;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
}

.ldword {
  font-weight: bold;
  font-family: verdana;
  color: rgb(3, 78, 133);
}
.inputholder {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
}
.lgnbtn {
  font-family: verdana;
  font-size: 18px;
}
.lgn {
  border: 1px solid lightgrey;
  width: 360px;
  /* margin-top: 150px; */
  /* margin-bottom: 40px; */
  background: white;
  padding: 0px;
  text-align: center;
  font-family: verdana;
  margin:0;
  border-radius: 0;
}

.loginbody {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}

.small {
  width: 100%;
}
.container {
  font-family: verdana;
  position: relative;
  justify-content: center;
  margin: 0;
  padding-top: 150px;
  /* width: 200vw; */
  /* background:lightblue; */
  height: 100vh;
}
.input {
  font-weight: normal;
}

label {
  display: block;
  position: relative;
  margin: 40px 0px;
}
.label-txt {
  position: absolute;
  top: -1.6em;
  font-weight: normal;
  font-family: verdana;
  padding: 10px;
  font-size: 16px;
  letter-spacing: 1px;
  color: #555657;
  transition: ease 0.2s;
  margin-top: 15px;
}

.label-active {
  color: #0071ff;
  font-size: 0.8em;
  top: -3em;
}

.input {
  width: 100%;
  padding: 10px;
  /* height: 5px; */
  background: transparent;
  border: none;
  outline: none;
  text-align: left;
}

.line-box {
  position: relative;
  width: 100%;
  height: 1px;
  background: #555657;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  transform: translateX(0%);
  background: #0071ff;
  transition: ease 0.6s;
}

.input:focus + .line-box .line {
  width: 100%;
}

button:hover {
  background: #0071ff;
  color: #ffffff;
}

.sign {
  font-family: verdana;
  padding: 5px;
  margin: 0;
  color: #445f6e;
  background:#e3e7e8;
}

.text {
  font-family: verdana;
}
</style>






