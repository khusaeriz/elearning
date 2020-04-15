import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { routes } from './routes';
import App from './App.vue';
import Axios from 'axios';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.prototype.$http = Axios;
Vue.mixin({
  created() {
    if (window.sessionStorage.getItem('token') != null) {
      this.$http.defaults.headers.common.authorization = window.sessionStorage.getItem(
        'token',
      );
    }
  },
  methods: {
    checkAuth() {
      if (!this.isLogin()) {
        this.$router.push('/login');
      }
    },
    isLogin() {
      return this.$http.defaults.headers.common.authorization !== undefined;
    },
  },
});

new Vue({
  router: new VueRouter({ routes }),
  el: '#app',
  render: (h) => h(App),
});
