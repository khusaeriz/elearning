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
      const token = window.sessionStorage.getItem('token');

      this.$http.defaults.headers.common.authorization = token;
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

const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
  if (to.path == '/logout' || to.path == '/login') {
    return next();
  }

  const token = window.sessionStorage.getItem('token');
  if (token) {
    const decoded = JSON.parse(Base64.decode(token.split('.')[1]));

    if (Date.now() > decoded.exp * 1000) {
      return next({ path: '/logout' });
    }
  }

  next();
});

new Vue({
  router: router,
  el: '#app',
  render: (h) => h(App),
});
