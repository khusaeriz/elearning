<template>
  <div>
    <page-title title="Forum"></page-title>
    <router-view></router-view>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle/PageTitle.vue';
export default {
  components: { PageTitle },
};
</script>