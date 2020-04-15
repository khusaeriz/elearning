<template>
  <div>
    <div class="container">
      <b-form>
        <h1>Login</h1>
        <b-form-group label="Username">
          <b-form-input v-model="username"></b-form-input>
        </b-form-group>
        <b-form-group label="password">
          <b-form-input type="password" v-model="password"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" @click="login">Submit</b-button>
      </b-form>
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
    },
  },
};
</script>