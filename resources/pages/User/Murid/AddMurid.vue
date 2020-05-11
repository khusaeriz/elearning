<template>
  <div>
    <page-title title="Registrasi Murid"></page-title>

    <div class="table-responsive bg-white my-3 p-3">
      <p class="text-danger">* Kolom wajib diisi</p>
      <p>
        Pilih Kelas:
        <select class="form-control" v-model="kelas">
          <option v-for="(kls, i) in listKelas" :value="kls.idKelas" :key="i">
            {{ kls.namaKelas }}
          </option>
        </select>
      </p>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th width="100%">Username*</th>
            <th>Password*</th>
            <th>NIS*</th>
            <th>NISN*</th>
            <th>Nama*</th>
            <th>Telepon</th>
            <th>Email</th>
            <th>Alamat</th>
            <th>Tempat, Tanggal Lahir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sws, i) in siswa" :key="i">
            <td>
              <button class="btn btn-danger" @click="remove(i)">Hapus</button>
            </td>
            <td>
              <input type="text" v-model="sws.username" class="form-control" />
            </td>
            <td>
              <input type="text" v-model="sws.password" class="form-control" />
            </td>
            <td>
              <input type="text" v-model="sws.nis" class="form-control" />
            </td>
            <td>
              <input type="text" v-model="sws.nisn" class="form-control" />
            </td>
            <td>
              <input type="text" v-model="sws.nama" class="form-control" />
            </td>
            <td>
              <input type="text" v-model="sws.telp" class="form-control" />
            </td>
            <td>
              <input type="text" v-model="sws.email" class="form-control" />
            </td>
            <td>
              <input type="text" v-model="sws.alamat" class="form-control" />
            </td>
            <td>
              <input type="text" v-model="sws.ttl" class="form-control" />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="100" class>
              <button class="btn btn-primary" @click="add()">Tambah</button>
              <button class="btn btn-success" @click="save()">Simpan</button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
import PageTitle from '../../../components/PageTitle/PageTitle.vue';
export default {
  components: { PageTitle },
  data() {
    return {
      siswa: [],
      kelas: null,
      listKelas: [],
      mockSiswa: {
        username: '',
        password: '',
        kelasId: '',
        nis: '',
        nisn: '',
        nama: '',
        telp: '',
        email: '',
        alamat: '',
        ttl: '',
      },
    };
  },

  created() {
    this.add();
    this.fetchKelas();
  },

  methods: {
    async fetchKelas() {
      const res = await this.$http.get('kelas');
      this.listKelas = res.data.data;
    },
    add() {
      this.siswa.push(Object.assign({}, this.mockSiswa));
    },

    remove(i) {
      this.siswa.splice(i, 1);
    },

    async save() {
      console.log(this.siswa);
      
      const data = this.siswa.map((data) => {
        data.kelasId = this.kelas;
        return data;
      });

      try {
        await this.$http.post('/user/murid/tambah', { data });

        this.$router.push('/user/murid');
        this.$root.$emit('tambah-murid');
      } catch (error) {
        window.alert('gagal menambah data murid');
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  width: 170px;
}
</style>
