<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-5 bg-white p-3 rounded pb-5">
          <b-form class="">
            <h1>Login</h1>
            <b-form-group label="Username">
              <b-form-input v-model="username"></b-form-input>
            </b-form-group>
            <b-form-group label="password">
              <b-form-input type="password" v-model="password"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" @click="login">
              Submit
            </b-button>
          </b-form>
        </div>
        <div class="col-md-5  offset-md-1 rounded alert alert-light">
          <b>Info</b>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  created() {
    if (this.$http.defaults.headers.common.authorization != undefined) {
      this.$router.push('/');
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();

      try {
        const res = await this.$http.post('user/login', {
          username: this.username,
          password: this.password,
        });

        if (res.data.error) {
          window.alert('Login Gagal');
          return;
        }

        window.sessionStorage.setItem('token', res.data.data);
        this.$http.defaults.headers.common.authorization = res.data.data;
        this.$router.push({ path: '/' });
      } catch (error) {
        window.alert('Login Gagal');
        return;
      }
    },
  },
};
</script>
