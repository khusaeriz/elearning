<template>
  <div class="bg-white p-3">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Nama Quiz:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.nama"
          required
          placeholder="Masukan nama quis"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Jumlah Soal:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="number"
          v-model="form.jumlahSoal"
          required
          placeholder="Masukan jumlah soal"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Mata Pelajaran:"
        label-for="input-3"
      >
        <b-form-select
          id="input-3"
          v-model="form._matpel"
          :options="matpels"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Tambah</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nama: '',
        jumlahSoal: '',
        _matpel: null,
      },
      matpels: [],
      show: true,
    };
  },

  created() {
    this.fetchMatpel();
  },

  methods: {
    async fetchMatpel() {
      const res = await this.$http.get('matpel');
      this.matpels = res.data.data.map((data) => {
        return { value: data.idMatpel, text: data.namaMatpel };
      });
    },

    async onSubmit(evt) {
      evt.preventDefault();

      try {
        const res = await this.$http.post('kuis', this.form);
        this.$router.push('/quiz/tambah-soal/' + res.data.data.idKategoriKuis);
      } catch (error) {
        window.alert('gagal menambah kuis');
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
