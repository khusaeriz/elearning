<template>
  <div>
    <div class="container-fluid">
      <div class="row header">
        <div class="col-12 d-flex">
          <router-link to="/" class="text-white navbar-brand">
            <i class="fa-th"></i> Administrator
          </router-link>
          <a href="#" class="text-white ml-auto my-auto">Admin</a>
        </div>
      </div>

      <div class="row">
        <div class="sidebar col-md-3 col-lg-2">
          <ul class="navbar-nav mt-2">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <a
                class="nav-link dropdown"
                href="javascript:void(0);"
                v-b-toggle.manajemen-expand
              >Manajemen</a>
            </li>
            <b-collapse id="manajemen-expand">
              <ul class="navbar-nav ml-2">
                <li class="nav-item">
                  <router-link class="nav-link" to="/user/guru/">Manajemen Pengajar</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/user/murid">Manajemen Murid</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/kelas">Manajemen Kelas</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/user/murid/tambah">Registrasi Murid</router-link>
                </li>
              </ul>
            </b-collapse>
            <li class="nav-item">
              <router-link class="nav-link" to="/mata-pelajaran">Mata Pelajaran</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/quiz">Tugas/Quiz</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/materi">Materi</router-link>
            </li>
          </ul>
        </div>

        <div class="content col-md-9 col-lg-10 p-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style>
body {
  background-color: #091929;
}

.header,
.sidebar {
  padding: 5px 20px;
}

.sidebar a {
  color: #fff;
}

.sidebar {
  float: left;
  /* position: fixed; */
}

.content {
  background-color: #e4ebf3;
  width: 100%;
  float: right;
  height: 100vh;
}
</style>