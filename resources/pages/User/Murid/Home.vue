<template>
  <div>
    <h2>Daftar Murid</h2>
    <button class="btn btn-primary ">Tambah Murid</button>

    <div class="row">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>No</th>
            <th>NIS</th>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mrd, i) in murid" :key="i">
            <td>{{ mrd.nis }}</td>
            <td>{{ mrd.nisn }}</td>
            <td>{{ mrd.nama }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      murid: [],
    };
  },

  async created() {
    const res = await this.$http.get('/user/murid');
    this.murid = res.data.data;
  },
};
</script>