<template>
  <div class="page-title">
    <h2>
      {{ title }}
      <small>{{ subtitle }}</small>
    </h2>
    <hr />
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    subtitle: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
h2 {
  font-weight: 400;
}

h2 small {
  font-size: 50%;
}
</style>