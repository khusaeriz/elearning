<template>
  <div>
    <div v-if="getRole() == 'murid'">
      <router-link class="btn btn-primary" to="/konsultasi/tambah">
        Buat Konsultasi
      </router-link>
    </div>

    <div>
      <table-content>
        <thead>
          <tr>
            <th width="5%">No</th>
            <th v-if="getRole() == 'guru'">Murid</th>
            <th v-if="getRole() == 'murid'">Guru</th>
            <th>Judul</th>
            <th>Pertanyaan</th>
            <th>Jawaban</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(konsul, i) in listKonsultasi" :key="i">
            <td>{{ i + 1 }}</td>
            <td v-if="getRole() == 'guru'">
              {{ konsul.murid.nama }} ({{ konsul.murid.nis }})
            </td>
            <td v-if="getRole() == 'murid'">{{ konsul.guru.nama }}</td>
            <td>{{ konsul.judul }}</td>
            <td v-html="konsul.pertanyaan"></td>
            <td v-html="konsul.jawaban"></td>
            <td v-if="getRole() == 'guru'">
              <button
                class="btn btn-primary btn-sm"
                v-if="konsul.status == 'wait'"
              >
                Jawab
              </button>
            </td>
            <td v-else>
              <span v-if="konsul.status == 'wait'" class="badge badge-info">
                Menunggu Jawaban
              </span>
              <span v-else-if="konsul.status == 'replied'" class="badge badge-success">
                Sudah Jawaban
              </span>
            </td>
          </tr>
        </tbody>
      </table-content>
    </div>
  </div>
</template>

<script>
import TableContent from '../../components/TableContent/TableContent.vue';
export default {
  components: {
    TableContent,
  },
  data() {
    return {
      listKonsultasi: [],
    };
  },
  async created() {
    const res = await this.$http.get('konsultasi');
    this.listKonsultasi = res.data;
  },
};
</script>
