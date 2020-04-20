<template>
  <div>
    <div class="container-fluid">
      <div class="row header">
        <div class="col-12 d-flex">
          <router-link to="/" class="text-white navbar-brand">
            <i class="fa-th"></i> {{ roles[getRole()] }}
          </router-link>
          <b-dropdown
            id="dropdown-dropleft"
            dropleft
            text=" Akun"
            variant="primary"
            class="m-2 ml-auto"
          >
            <b-dropdown-item href="#/logout">Logout</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <div class="row">
        <div class="sidebar col-md-3 col-lg-2">
          <ul class="navbar-nav mt-2" v-if="isLogin()">
            <li class="nav-item">
              <router-link class="nav-link" to="/"
                ><v-icon name="bar-chart-2"></v-icon> Dashboard</router-link
              >
            </li>
            <li class="nav-item" v-if="getRole() === 'admin'">
              <a
                class="nav-link dropdown"
                href="javascript:void(0);"
                v-b-toggle.manajemen-expand
              >
                <span><v-icon name="database"></v-icon> Manajemen</span>
                <v-icon name="chevron-down" class="v-icon ml-auto"></v-icon>
              </a>
            </li>
            <b-collapse id="manajemen-expand" v-if="getRole() == 'admin'">
              <ul class="navbar-nav ml-2">
                <li class="nav-item">
                  <router-link class="nav-link" to="/user/guru/">
                    Manajemen Pengajar
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/user/murid">
                    Manajemen Murid
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/kelas">
                    Manajemen Kelas
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/user/murid/tambah">
                    Registrasi Murid
                  </router-link>
                </li>
              </ul>
            </b-collapse>
            <li class="nav-item" v-if="getRole() == 'admin'">
              <router-link class="nav-link" to="/mata-pelajaran">
                <v-icon name="book"></v-icon> Mata Pelajaran
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/quiz">
                <v-icon name="monitor"></v-icon> Tugas/Quiz
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/konsultasi"
                ><v-icon name="message-square"></v-icon> Konsultasi</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/forum">
                <v-icon name="flag"></v-icon> Forum
              </router-link>
            </li>
          </ul>
          <ul v-else>
            <h3 class="text-white">
              Silahkan Login untuk mengakses website
            </h3>
          </ul>
        </div>

        <div class="content col-md-9 col-lg-10 p-3">
          <b-overlay :show="loading" rounded="sm">
            <router-view></router-view>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roles: { admin: 'Administrator', guru: 'Guru', murid: 'Murid' },
      loading: false,
    };
  },

  created() {
    this.$root.$on('loading-on', () => {
      this.loading = true;
    });
    this.$root.$on('loading-off', () => {
      this.loading = false;
    });
  },
};
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

.content {
  background-color: #e4ebf3;
  width: 100%;
  float: right;
  min-height: 90vh;
}

.icon {
  width: 18px;
}
</style>
