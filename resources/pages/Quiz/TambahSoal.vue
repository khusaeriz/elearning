<template>
  <div class="bg-white p-3">
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      kuis: { jumlahSoal: 0 },
    };
  },
  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const res = await this.$http.get('kuis/' + this.$route.params['id']);
      this.kuis = res.data.data;
    },
  },
};
</script>
