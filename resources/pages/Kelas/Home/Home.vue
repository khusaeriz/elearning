<template>
  <div>
    <page-title title="Manajemen Kelas"></page-title>

    <add @tambah="fetch()"></add>

    <table-content>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Kelas</th>
          <th>Wali Kelas</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(kls, i) in kelas" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ kls.namaKelas }}</td>
          <td>{{ kls.guru.nama }}</td>
          <td></td>
        </tr>
      </tbody>
    </table-content>
  </div>
</template>
<script>
import PageTitle from '../../../components/PageTitle/PageTitle.vue';
import TableContent from '../../../components/TableContent/TableContent.vue';
import Add from './Add.vue';

export default {
  components: { PageTitle, TableContent, Add },
  data() {
    return {
      kelas: [],
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const res = await this.$http.get('kelas');
      this.kelas = res.data.data;
    },
  },
};
</script>
