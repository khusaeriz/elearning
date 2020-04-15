<template></template>
<script>
export default {
  created() {
    window.sessionStorage.removeItem('token');
    this.$http.defaults.headers.common.authorization = undefined;
    this.$router.push('/login');
  },
};
</script>