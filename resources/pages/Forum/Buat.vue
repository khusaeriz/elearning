<template>
  <div class="bg-white rounded p-3">
    <div class="col-md-8">
      <input
        type="text"
        class="form-control"
        placeholder="Nama Topik"
        v-model="judul"
      />
    </div>
    <div class="col-md-8 mt-3">
      <textarea
        class="form-control"
        placeholder="Isi Topik"
        v-model="isi"
      ></textarea>
    </div>
    <div class="col-md-3 mt-4">
      <button class="btn btn-primary" @click="buatTopik">Buat Topik</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      judul: '',
      isi: '',
    };
  },

  methods: {
    async buatTopik() {
      try {
        const json = (
          await this.$http.post('/forum', { judul: this.judul, isi: this.isi })
        ).data;
        this.$router.push('/forum/read/' + json.data.idTopik);
      } catch (error) {
        window.alert('gagal membuat topik');
      }
    },
  },
};
</script>
