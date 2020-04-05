import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { routes } from "./routes";
import App from "./App.vue";

Vue.use(BootstrapVue);
Vue.use(VueRouter);

new Vue({
  router: new VueRouter({ routes }),
  el: '#app',
  render: (h) => h(App),
});
