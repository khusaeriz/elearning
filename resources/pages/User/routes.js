import GuruHome from './Guru/Home.vue';
import MuridHome from './Murid/Home.vue';
import AddMurid from "./Murid/AddMurid.vue";

const guruRoutes = [{ path: '/user/guru', component: GuruHome }];
const muridRoutes = [
  { path: '/user/murid', component: MuridHome },
  { path: '/user/murid/tambah', component: AddMurid },
];

export default [...muridRoutes, ...guruRoutes];
