<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing variant="primary"
      >Tambah Mata Pelajaran
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
          label="ID Mata Pelajaran"
          label-for="userame-input"
          invalid-feedback="ID Mata Pelajaran tidak boleh kosong"
        >
          <b-form-input
            id="userame-input"
            v-model="data.idMatpel"
            :state="formState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="formState"
          label="Nama Mata Pelajaran"
          label-for="Nama-input"
          invalid-feedback="Nama Mata Pelajaran tidak boleh kosong"
        >
          <b-form-input
            id="Nama-input"
            v-model="data.namaMatpel"
            type="text"
            :state="formState"
            required
          ></b-form-input>
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
        idMatpel: '',
        namaMatpel: '',
        keterangan: '',
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
        await this.$http.post('/matpel', this.data);
        this.$emit('tambah', this.data);
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing');
        });
      } catch (error) {
        window.alert('gagal menambah mata pelajaran');
      }
    },
  },
};
</script>
