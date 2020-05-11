<template>
  <div>
    <page-title title="Manajemen Guru"></page-title>
    <add-guru @tambah="fetch()"></add-guru>

    <table-content :contents="getTableContents()">
      <thead>
        <tr>
          <th>No</th>
          <th>NIP</th>
          <th>Username</th>
          <th>Nama</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in guru" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.nip }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.nama }}</td>
          <td></td>
        </tr>
      </tbody>
    </table-content>
  </div>
</template>

<script>
import AddGuru from './AddGuru.vue';
import PageTitle from '../../../components/PageTitle/PageTitle.vue';
import TableContent from '../../../components/TableContent/TableContent.vue';

export default {
  components: { AddGuru, PageTitle, TableContent },
  data() {
    return {
      guru: [],
    };
  },

  async created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const res = await this.$http.get('/user/guru');
      this.guru = res.data.data;
    },

    getTableContents() {
      return this.guru.map((data, i) => {
        return [i + 1, data.nip, data.username, data.nama];
      });
    },
  },
};
</script>
