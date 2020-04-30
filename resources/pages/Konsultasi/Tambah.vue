<template>
  <div>
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Wali Kelas"
        label-for="wali-select"
        invalid-feedback="Wali Kelas tidak boleh kosong"
      >
        <b-form-select
          id="wali-select"
          v-model="guruId"
          :options="listGuru"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        label="Judul"
        label-for="wali-select"
        invalid-feedback="Wali Kelas tidak boleh kosong"
      >
        <b-form-input id="judul" v-model="judul" required></b-form-input>
      </b-form-group>

      <b-form-group
        label="Pertanyaan"
        label-for="wali-select"
        invalid-feedback="Wali Kelas tidak boleh kosong"
      >
        <ckeditor
          :editor="editor"
          v-model="pertanyaan"
          :config="editorConfig"
          @keyup="onInput"
        ></ckeditor>
      </b-form-group>
      <button class="btn btn-primary">Buat</button>
    </form>
  </div>
</template>
<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import CKEditorClassic from '@ckeditor/ckeditor5-build-classic';

export default {
  components: { ckeditor: CKEditor.component },
  data() {
    return {
      editor: CKEditorClassic,
      judul: '',
      pertanyaan: '',
      editorConfig: {},

      listGuru: [],
      guruId: null,
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
    async handleSubmit() {
      if (!this.validate()) {
        return window.alert('gagal membuat konsultasi');
      }

      this.$root.$emit('loading-on');
      const payload = {
        judul: this.judul,
        pertanyaan: this.pertanyaan,
        guruId: this.guruId,
      };

      try {
        const res = await this.$http.post('konsultasi/tanya', payload);
        if (res.data.error == true) {
          window.alert('gagal membuat konsultasi');
        } else {
          this.$router.push('/konsultasi');
        }
      } catch (error) {
        window.alert('gagal membuat konsultasi');
      }

      this.$nextTick(() => this.$root.$emit('loading-off'));
    },

    validate() {
      return this.judul && this.guruId && this.pertanyaan;
    },
  },
};
</script>
