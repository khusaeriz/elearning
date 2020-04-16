import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue } from 'bootstrap-vue';

import { Base64 } from 'js-base64';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { routes } from './routes';
import App from './App.vue';
import Axios from 'axios';
import feather from 'vue-icon';

Vue.use(feather, 'v-icon');
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
      this.getRole();
      return this.$http.defaults.headers.common.authorization !== undefined;
    },

    getRole() {
      const payload = this.$http.defaults.headers.common.authorization;

      if (!payload) {
        return;
      }

      const data = JSON.parse(Base64.decode(payload.split('.')[1]));
      return data.hakAkses;
    },
  },
});

new Vue({
  router: new VueRouter({ routes }),
  el: '#app',
  render: (h) => h(App),
});
