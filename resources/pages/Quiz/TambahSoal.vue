<template>
  <div class="bg-white p-3">
    <div class="info">
      <p>Nama Kuis : {{ kuis == null ? '...' : kuis.nama }}</p>
      <p>
        Mata Pelajaran : {{ kuis == null ? '...' : kuis.matpel.namaMatpel }}
      </p>
      <p>Jumlah Soal : {{ kuis == null ? '...' : kuis.jumlahSoal }}</p>
    </div>
    <hr />

    <div v-if="kuis != null">
      <div
        class="col-md-12"
        v-for="(soal, index) in kuis.kuis"
        :key="index + '_soal'"
      >
        <div class="row">
          <div class="col-md-11">
            <b>Soal {{ index + 1 }} </b>
          </div>
          <div class="col-md-1">
            <button
              class="btn btn-outline-dark btn-sm float-right"
              @click="edit(index)"
              v-if="!soal.editing"
            >
              <v-icon name="edit"></v-icon>
            </button>
            <button
              class="btn btn-outline-dark btn-sm float-right"
              @click="save(index)"
              v-else
            >
              <v-icon name="save"></v-icon>
            </button>
          </div>
          <div class="col-md-12 pt-4">
            <p v-if="!soal.editing">
              {{ soal == null ? '' : soal.soal }}
            </p>
            <div v-else>
              <textarea v-model="soal.soal" class="form-control"></textarea>
            </div>
          </div>

          <div class="col-md-12 py-2 px-3">
            <div>
              <div class="  row">
                <div class="col-md-1 col-form-label text-right">A.</div>
                <div class="col-md-11 col-form-label" v-if="!soal.editing">
                  {{ soal.a }}
                </div>
                <div class="col-md-11" v-else>
                  <input type="text" class="form-control" v-model="soal.a" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 py-2 px-3">
            <div>
              <div class="row">
                <div class="col-md-1 col-form-label text-right">B.</div>
                <div class="col-md-11 col-form-label" v-if="!soal.editing">
                  {{ soal.b }}
                </div>
                <div class="col-md-11" v-else>
                  <input type="text" class="form-control" v-model="soal.b" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 py-2 px-3">
            <div>
              <div class="row">
                <div class="col-md-1 col-form-label text-right">C.</div>
                <div class="col-md-11 col-form-label" v-if="!soal.editing">
                  {{ soal.c }}
                </div>
                <div class="col-md-11" v-else>
                  <input type="text" class="form-control" v-model="soal.c" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 py-2 px-3">
            <div>
              <div class="row">
                <div class="col-md-1 col-form-label text-right">D.</div>
                <div class="col-md-11 col-form-label" v-if="!soal.editing">
                  {{ soal.d }}
                </div>
                <div class="col-md-11" v-else>
                  <input type="text" class="form-control" v-model="soal.d" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 py-2 px-3">
            <div>
              <div class="row">
                <div class="col-md-1 col-form-label text-right">Kunci</div>
                <div class="col-md-11 col-form-label" v-if="!soal.editing">
                  {{ soal.kunci.toUpperCase() }}
                </div>
                <div class="col-md-11" v-else>
                  <div class="custom-control custom-checkbox1 my-1 mr-sm-2 form-check form-check-inline">
                    <input v-model="soal.kunci"
                      type="radio"
                      class="custom-control-input"
                      :name="`checkbox${soal.id}`"
                      value="a"
                      :id="`customControlInline${soal.id}`"
                    />
                    <label
                      class="custom-control-label"
                      :for="`customControlInline${soal.id}`"
                    >
                      A
                    </label>
                  </div>
                  
                  <div class="custom-control custom-checkbox1 my-1 mr-sm-2 form-check form-check-inline">
                    <input v-model="soal.kunci"
                      type="radio"
                      class="custom-control-input"
                      :name="`checkbox${soal.id}`"
                      value="b"
                      :id="`customControlInline${soal.id}b`"
                    />
                    <label
                      class="custom-control-label"
                      :for="`customControlInline${soal.id}b`"
                    >
                      B
                    </label>
                  </div>
                  
                  <div class="custom-control custom-checkbox1 my-1 mr-sm-2 form-check form-check-inline">
                    <input v-model="soal.kunci"
                      type="radio"
                      class="custom-control-input"
                      :name="`checkbox${soal.id}`"
                      value="c"
                      :id="`customControlInline${soal.id}c`"
                    />
                    <label
                      class="custom-control-label"
                      :for="`customControlInline${soal.id}c`"
                    >
                      C
                    </label>
                  </div>
                  
                  <div class="custom-control custom-checkbox1 my-1 mr-sm-2 form-check form-check-inline">
                    <input v-model="soal.kunci"
                      type="radio"
                      class="custom-control-input"
                      :name="`checkbox${soal.id}`"
                      value="d"
                      :id="`customControlInline${soal.id}d`"
                    />
                    <label
                      class="custom-control-label"
                      :for="`customControlInline${soal.id}d`"
                    >
                      D
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <!-- endfor -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kuis: null,
      mockSoal: {
        idKuis: '',
        soal: '',
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        kunci: '',
        _kategoriKuis: '',
        editing: false,
      },
    };
  },
  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const res = await this.$http.get('kuis/' + this.$route.params['id']);
      this.kuis = res.data.data;

      for (let i = 0; i < this.kuis.jumlahSoal; i++) {
        const soal = this.kuis.kuis[i];
        if (soal == null) {
          soal = { ...this.mockSoal };
          soal.idKuis = `${this.kuis.idKategoriKuis}${i + 1}`;
          soal._kategoriKuis = this.kuis.idKategoriKuis;
        }

        soal.editing = false;
        this.kuis.kuis[i] = soal;
      }
    },

    edit(index) {
      this.kuis.kuis[index].editing = true;
      this.$forceUpdate();
    },

    async save(index) {
      try {
        const res = await this.$http.post('/kuis/save-soal', {
          kuis: [this.kuis.kuis[index]],
        });

        this.kuis.kuis[index] = res.data.data[0];
        this.kuis.kuis[index].editing = false;
        this.$forceUpdate();
      } catch (error) {
        window.alert('gagal menyimpan soal');
      }
    },
  },
};
</script>
