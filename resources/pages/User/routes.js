import MuridHome from './Murid/Home.vue';
import GuruHome from "./Guru/Home.vue";

const muridRoutes = [{ path: '/user/murid', component: MuridHome }];
const guruRoutes = [{ path: '/user/guru', component: GuruHome }];

export default [...muridRoutes, ...guruRoutes];
