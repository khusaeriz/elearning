<template>
  <div>
    <page-title title="Dashboard" subtitle="Info Utama"></page-title>
    <div class="p-5">
      <div class="row justify-content-md-center">
        <div class="col-3 text-center" v-if="getRole() === 'admin'">
          <div class="p-5 bg-white">
            <div class="icon mx-auto">
              <v-icon name="user" class="icon-dashboard mx-auto text-success"></v-icon>
            </div>
            <div class="count">1</div>
          </div>
          <div class="link bg-success p-2">
            <a href="#" class="text-white">Data Pengajar</a>
          </div>
        </div>
        <div
          class="col-3 text-center"
          v-if="['guru', 'admin'].includes(getRole())"
        >
          <div class="p-5 bg-white">
            <div class="icon mx-auto">
              <v-icon name="users" class="icon-dashboard mx-auto text-warning"></v-icon>
            </div>
            <div class="count">1</div>
          </div>
          <div class="link bg-warning p-2">
            <a href="#" class="text-white">Data Murid</a>
          </div>
        </div>
        <div class="col-3 text-center">
          <div class="p-5 bg-white">
            <div class="icon mx-auto">
              <v-icon name="monitor" class="icon-dashboard mx-auto text-danger"></v-icon>
            </div>
            <div class="count">1</div>
          </div>
          <div class="link bg-danger p-2">
            <a href="#" class="text-white">Tugas/Quiz</a>
          </div>
        </div>
        <div class="col-3 text-center">
          <div class="p-5 bg-white">
            <div class="icon mx-auto">
              <v-icon name="message-square" class="icon-dashboard mx-auto text-info"></v-icon>
            </div>
            <div class="count">1</div>
          </div>
          <div class="link bg-info p-2">
            <a href="#" class="text-white">Konsultasi</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle/PageTitle.vue';

export default {
  components: { PageTitle },
  created() {
    this.checkAuth();
  },
};
</script>

<style scoped>
.icon {
  width: 50px;
}
</style>