<template>
  <div>

    <router-link to="/quiz/tambah" class="btn btn-primary" v-if="getRole() === 'guru'">
      Tambah Kuis
    </router-link>

    <table-content>
      <thead>
        <tr>
          <th width="5%">No</th>
          <th>Nama</th>
          <th>Jumlah Soal</th>
          <th>Mata Pelajaran</th>
          <th v-if="getRole() == 'admin'">Guru</th>
          <th width="5%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.jumlahSoal }}</td>
          <td>{{ item.matpel.namaMatpel }}</td>
          <td v-if="getRole() == 'admin'">{{ item.guru.nama }}</td>
          <td>
            <router-link :to="'/quiz/tambah-soal/' + item.idKategoriKuis" v-if="getRole() == 'guru'">
              <v-icon name="edit"></v-icon>
            </router-link>
            <router-link :to="'/quiz/kerjakan/' + item.idKategoriKuis" v-if="getRole() == 'murid'">
              <v-icon name="send"></v-icon>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table-content>
  </div>
</template>

<script>
import TableContent from '../../components/TableContent/TableContent.vue';
export default {
  components: { TableContent },
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const res = await this.$http.get('kuis');
      this.items = res.data.data;
    },
  },
};
</script>
