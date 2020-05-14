<template>
  <div class="bg-white rounded p-3">
    <div v-if="forum != null">
      <h1>{{ forum.topik }}</h1>
      <small>
        Pembuat topik: {{ forum.username }}, Tanggal:
        {{ new Date(forum.tanggal).toLocaleDateString() }}
        {{ new Date(forum.tanggal).toLocaleTimeString() }}
      </small>
      <hr />
      <div v-html="forum.isi"></div>
      <hr />
      <div v-for="(comment, index) in forum.comments" :key="`${index}_comment`" class="bg-light rounded p-3 my-2">
        <small>Komentar oleh: {{ comment.username }}</small>
        <div v-html="comment.content"></div>
      </div>
      <div class="col-md-8">
        <textarea class="form-control" v-model="komen"></textarea>
        <button class="btn btn-primary my-2" @click="kirimKomentar">
          kirim Komentar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forum: null,
      komen: '',
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const id = this.$route.params.id;

      try {
        const json = (await this.$http.get('/forum/' + id)).data;
        this.forum = json.data;
      } catch (error) {}
    },

    async kirimKomentar() {
      try {
        const json = (
          await this.$http.post('/forum/komen', {
            forumId: this.forum.idTopik,
            komen: this.komen,
          })
        ).data;
        this.komen = '';
        this.forum.comments.push(json.data);
      } catch (error) {
        window.alert('gagal mengirim komentar');
      }
    },
  },
};
</script>
