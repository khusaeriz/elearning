<template>
  <div class="col-md-12   ">
    <div class="bg-white row p-3">
      <div class="col-md-9">
        <div class="row" v-if="kuis != null">
          <div class="col-md-12 pb-2">
            {{ soalActive + 1 }}. {{ kuis.kuis[soalActive].soal }}
          </div>
          <div class="col-md-6" style="cursor:pointer" @click="jawab('a')">
            A. {{ kuis.kuis[soalActive].a }}
          </div>
          <div class="col-md-6" style="cursor:pointer" @click="jawab('b')">
            B. {{ kuis.kuis[soalActive].b }}
          </div>
          <div class="col-md-6" style="cursor:pointer" @click="jawab('c')">
            C. {{ kuis.kuis[soalActive].c }}
          </div>
          <div class="col-md-6" style="cursor:pointer" @click="jawab('d')">
            D. {{ kuis.kuis[soalActive].d }}
          </div>
          <div class="col-md-2" style="cursor:pointer" @click="jawab('d')">
            Jawaban : {{ kuis.kuis[soalActive].kunci.toUpperCase() }}
          </div>
        </div>
      </div>
      <div class="col-md-3 ">
        <h3>Daftar Soal</h3>

        <div class="row" v-if="kuis != null">
          <div
            v-for="(soal, index) in kuis.kuis"
            :key="`${index}_soal`"
            :class="{
              'col-md-2 border rounded text-center p-2 m-1 font-weight-bold': true,
              'bg-primary border-blue text-white ': soal.kunci != '',
              'bg-light text-dark border-dark': soal.kunci == '',
            }"
            style="cursor:pointer"
            @click="gantiSoal(index)"
          >
            <div v-if="soal.kunci == ''">
              {{ index + 1 }}
            </div>
            <div v-else>
              {{ soal.kunci.toUpperCase() }}
            </div>
          </div>
          <div class="col-md-12 mt-3">
            <button class="btn btn-primary btn-block" @click="kirimJawaban">
              Kirim Jawaban
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kuis: null,
      soalActive: 0,
      mockSoal: {
        idKuis: '',
        soal: '',
        a: '',
        b: '',
        c: '',
        d: '',
        kunci: '',
      },
    };
  },

  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const id = this.$route.params['id'];

        const res = (await this.$http.get(`/kuis/${id}`)).data;
        this.kuis = res.data;

        for (const [key, soal] of Object.entries(this.kuis.kuis)) {
          const userSoal = { ...this.mockSoal };
          userSoal.idKuis = soal.idKuis;
          userSoal.soal = soal.soal;
          userSoal.a = soal.a;
          userSoal.b = soal.b;
          userSoal.c = soal.c;
          userSoal.d = soal.d;

          this.kuis.kuis[key] = userSoal;
        }
      } catch (error) {}
    },
    gantiSoal(nomor) {
      this.soalActive = nomor;
    },
    jawab(pilihan) {
      this.kuis.kuis[this.soalActive].kunci = pilihan;

      this.$forceUpdate();
    },

    async kirimJawaban() {
      // TODO: kalkulasi nilai di server

    //   const countDiJawab = this.kuis.kuis.reduce((c, el) => {
    //     if (el.kunci != '') {
    //       return c++;
    //     }

    //     return c;
    //   }, 0);

      const confirm = window.confirm(
        'Anda yakin akan mengirim jawaban?',
      );

      if (!confirm) {
        return;
      }

      this.$root.$emit('loading-on');

      try {
        await this.$http.post('/kuis/kalkulasi-nilai', {
          kuis: this.kuis,
        });
      } catch (error) {
        window.alert('gagal mengirim jawaban');
      }

      this.$nextTick(() => this.$root.$emit('loading-off'));
    },
  },
};
</script>
