<template>
  <div>
    <page-title title="Manajemen Murid"></page-title>
    <router-link class="btn btn-primary" to="/user/murid/tambah"
      >Tambah Murid</router-link
    >

    <table-content>
      <thead>
        <tr>
          <th>No</th>
          <th>NIS</th>
          <th>Username</th>
          <th>Nama</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in murid" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.nis }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.nama }}</td>
          <td></td>
        </tr>
      </tbody>
    </table-content>
  </div>
</template>

<script>
import PageTitle from '../../../components/PageTitle/PageTitle.vue';
import TableContent from '../../../components/TableContent/TableContent.vue';

export default {
  components: { PageTitle, TableContent },
  data() {
    return {
      murid: [],
    };
  },

  async created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const res = await this.$http.get('/user/murid');
      this.murid = res.data.data;
    },
  },
};
</script>
