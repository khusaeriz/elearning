<template>
  <div>
    <page-title title="Manajemen Mata Pelajaran"></page-title>

    <add @tambah="fetch()"></add>

    <table-content>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Mata Pelajaran</th>
          <th>Keterangan</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-for="(item, i) in items" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.namaMatpel }}</td>
          <td>{{ item.keterangan }}</td>
          <td></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="10" class="text-center">Mengambil data ...</td>
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
      items: [],
      loading: false,
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      this.loading = true;

      const res = await this.$http.get('/matpel');
      this.items = res.data.data;

      this.loading = false;
    },
  },
};
</script>
