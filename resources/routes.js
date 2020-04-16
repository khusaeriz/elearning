import Home from './pages/Home/Home.vue';
import loginRoutes from './pages/Auth/routes';
import UserHome from './pages/User/Home/Home.vue';
import userRoutes from './pages/User/routes';
import quizRoutes from './pages/Quiz/routes';
import forumRoutes from './pages/Forum/routes';
import mataPelajaranRoutes from './pages/MataPelajaran/routes';
import kelasRoutes from './pages/Kelas/routes';
import konsultasiRoutes from './pages/Konsultasi/routes';

export const routes = [
  { path: '/', component: Home },
  { path: '/user', component: UserHome, children: userRoutes },
  forumRoutes,
  quizRoutes,
  mataPelajaranRoutes,
  kelasRoutes,
  konsultasiRoutes,
  ...loginRoutes,
];
