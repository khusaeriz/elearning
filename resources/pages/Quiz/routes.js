import App from './App.vue';
import Home from './Home.vue';
import Tambah from './Tambah.vue';
import TambahSoal from './TambahSoal.vue';

export default {
  path: '/quiz',
  component: App,
  children: [
    { path: '', component: Home },
    { path: 'tambah', component: Tambah },
    { path: 'tambah-soal/:id', component: TambahSoal },
  ],
};
