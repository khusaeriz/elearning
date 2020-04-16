<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing variant="primary">
      Tambah Kelas
    </b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      size="lg"
      title="Tambah Mata Pelajaran"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="formState"
          label="ID Kelas"
          label-for="userame-input"
          invalid-feedback="ID Kelas tidak boleh kosong"
        >
          <b-form-input
            id="userame-input"
            v-model="data.idKelas"
            :state="formState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="formState"
          label="Nama Kelas"
          label-for="Nama-input"
          invalid-feedback="Nama Kelas tidak boleh kosong"
        >
          <b-form-input
            id="Nama-input"
            v-model="data.namaKelas"
            type="text"
            :state="formState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="formState"
          label="Wali Kelas"
          label-for="wali-select"
          invalid-feedback="Wali Kelas tidak boleh kosong"
        >
          <b-form-select
            id="wali-select"
            v-model="data.waliKelas"
            :options="listGuru"
            :state="formState"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Keterangan" label-for="Keterangan-input">
          <b-form-input
            id="Keterangan-input"
            v-model="data.keterangan"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        idKelas: '',
        namaKelas: '',
        keterangan: '',
        waliKelas: null,
      },
      formState: null,
      listGuru: [],
    };
  },

  created() {
    this.fetchGuru();
  },

  methods: {
    async fetchGuru() {
      const res = await this.$http.get('/user/guru');
      this.listGuru = res.data.data.map((data) => {
        return { value: data.nip, text: data.nama };
      });
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.formState = valid;
      return valid;
    },

    resetModal() {
      for (const key of Object.keys(this.data)) {
        this.data[key] = '';
      }
      this.formState = null;
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },

    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      try {
        await this.$http.post('/kelas', { data: [this.data] });
        this.$emit('tambah', this.data);
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing');
        });
      } catch (error) {
        window.alert('gagal menambah kelas');
      }
    },
  },
};
</script>
