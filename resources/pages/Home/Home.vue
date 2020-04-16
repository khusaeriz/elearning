<template>
  <div>
    <page-title title="Dashboard" subtitle="Info Utama"></page-title>
    <div class="p-5">
      <div class="row justify-content-md-center">
        <div class="col-3 text-center" v-if="getRole() === 'admin'">
          <div class="p-5 bg-white">
            <div class="icon">icons</div>
            <div class="count">1</div>
          </div>
          <div class="link bg-success p-2">
            <a href="#" class="text-white">Data Pengajar</a>
          </div>
        </div>
        <div class="col-3 text-center" v-if="['guru', 'admin'].includes(getRole())">
          <div class="p-5 bg-white">
            <div class="icon">icons</div>
            <div class="count">1</div>
          </div>
          <div class="link bg-warning p-2">
            <a href="#" class="text-white">Data Murid</a>
          </div>
        </div>
        <div class="col-3 text-center">
          <div class="p-5 bg-white">
            <div class="icon">icons</div>
            <div class="count">1</div>
          </div>
          <div class="link bg-danger p-2">
            <a href="#" class="text-white">Tugas/Quiz</a>
          </div>
        </div>
        <div class="col-3 text-center">
          <div class="p-5 bg-white">
            <div class="icon">icons</div>
            <div class="count">1</div>
          </div>
          <div class="link bg-info p-2">
            <a href="#" class="text-white">Materi</a>
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
