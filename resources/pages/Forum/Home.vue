<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-9">
        <input type="text" class="form-control" placeholder="Cari topik" />
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary" @click="cariTopik">Cari Topik</button>
        <router-link to="/forum/buat" class="btn btn-primary"
          >Buat Topik</router-link
        >
      </div>
    </div>
    <hr />

    <div class="col-md-9 bg-white p-4 rounded my-3" v-if="forums.length < 1">
      <h4>Tidak ada topik</h4>
    </div>
    <div
      class="col-md-12"
      v-for="(forum, index) in forums"
      :key="`${index}_forum`"
    >
      <div class="row">
        <div class="col-md-9 bg-white p-4 rounded my-3">
          <h3>{{ forum.topik }}</h3>
          <div
            class=""
            style="height: 100px; overflow:hidden;"
            v-html="forum.isi"
          ></div>
          <div class="py-2">
            <router-link
              :to="`/forum/read/${forum.idTopik}`"
              class="btn btn-primary"
              >Selengkapnya</router-link
            >
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
      forums: [],
    };
  },

  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const json = (await this.$http.get('/forum')).data;

        this.forums = json.data;
      } catch (error) {
        window.alert(error.toString());
      }
    },
    cariTopik() {},
  },
};
</script>
