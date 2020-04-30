import App from "./App.vue";
import Home from "./Home.vue";
import Tambah from "./Tambah.vue";

export default {
  path: '/konsultasi',
  component: App,
  children: [
    {path: '', component: Home},
    {path: 'tambah', component: Tambah}
  ],
};
