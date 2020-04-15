import Home from './pages/Home/Home.vue';
import loginRoutes from './pages/Auth/routes';
import UserHome from './pages/User/Home/Home.vue';
import userRoutes from './pages/User/routes';
import quizRoutes from './pages/Quiz/routes';
import materiRoutes from './pages/Materi/routes';
import mataPelajaranRoutes from './pages/MataPelajaran/routes';
import kelasRoutes from './pages/Kelas/routes';

export const routes = [
  { path: '/', component: Home },
  { path: '/user', component: UserHome, children: userRoutes },
  materiRoutes,
  quizRoutes,
  mataPelajaranRoutes,
  kelasRoutes,
  ...loginRoutes,
];
