<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Tambah Guru</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      size="lg"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="formState"
          label="Username"
          label-for="userame-input"
          invalid-feedback="Username tidak boleh kosong"
        >
          <b-form-input id="userame-input" v-model="data.userame" :state="formState" required></b-form-input>
        </b-form-group>

        <b-form-group
          :state="formState"
          label="Password"
          label-for="password-input"
          invalid-feedback="Password tidak boleh kosong"
        >
          <b-form-input
            id="password-input"
            v-model="data.password"
            type="password"
            :state="formState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="formState"
          label="NIP"
          label-for="NIP-input"
          invalid-feedback="NIP tidak boleh kosong"
        >
          <b-form-input id="NIP-input" v-model="data.nip" :state="formState" required></b-form-input>
        </b-form-group>

        <b-form-group
          :state="formState"
          label="NUPTK"
          label-for="NUPTK-input"
          invalid-feedback="NUPTK tidak boleh kosong"
        >
          <b-form-input id="NUPTK-input" v-model="data.nuptk" :state="formState" required></b-form-input>
        </b-form-group>

        <b-form-group
          :state="formState"
          label="Nama"
          label-for="nama-input"
          invalid-feedback="nama tidak boleh kosong"
        >
          <b-form-input id="nama-input" v-model="data.nama" :state="formState" required></b-form-input>
        </b-form-group>

        <b-form-group :state="formState" label="Jabatan" label-for="jabatan-input">
          <b-form-input id="jabatan-input" v-model="data.jabatan"></b-form-input>
        </b-form-group>

        <b-form-group :state="formState" label="No Telepon" label-for="telp-input">
          <b-form-input id="telp-input" v-model="data.telp"></b-form-input>
        </b-form-group>

        <b-form-group :state="formState" label="Tempat, Tanggal Lahir" label-for="ttl-input">
          <b-form-input id="ttl-input" v-model="data.ttl"></b-form-input>
        </b-form-group>

        <b-form-group :state="formState" label="Email" label-for="email-input">
          <b-form-input id="email-input" v-model="data.email"></b-form-input>
        </b-form-group>

        <b-form-group :state="formState" label="Alamat" label-for="alamat-input">
          <b-form-input id="alamat-input" v-model="data.alamat"></b-form-input>
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
        nama: '',
        nip: '',
        nuptk: '',
        username: '',
        password: '',
        ttl: '',
        alamat: '',
        jabatan: '',
        telp: '',
        email: '',
      },
      formState: null,
    };
  },
  methods: {
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
        await this.$http.post('/user/guru/tambah', { data: [this.data] });
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing');
        });
      } catch (error) {
          window.alert('gagal menambah guru');
      }
    },
  },
};
</script>