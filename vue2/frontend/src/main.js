import Vue from "vue";
import Axios from "axios";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.use(Vuelidate);

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
 // eslint-disable-next-line
 /* eslint-disable */
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
