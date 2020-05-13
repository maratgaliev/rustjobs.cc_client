import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import VeeValidate from 'vee-validate'
Vue.config.productionTip = false;

Vue.use(Argon);
Vue.use(VeeValidate);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
