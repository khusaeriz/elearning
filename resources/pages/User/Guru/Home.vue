<template>
  <div>
    <h2>Daftar Guru</h2>
    <add-guru></add-guru>

    <div class="row">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>No</th>
            <th>NIP</th>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(gr, i) in guru" :key="i">
            <td>{{ i+1 }}</td>
            <td>{{ gr.nip }}</td>
            <td>{{ gr.nama }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AddGuru from './AddGuru.vue';
export default {
  components: {AddGuru},
  data() {
    return {
      guru: [],
    };
  },

  async created() {
    const res = await this.$http.get('/user/guru');
    this.guru = res.data.data;
  },
};
</script>