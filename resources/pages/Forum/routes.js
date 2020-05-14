import App from './App.vue';
import Home from './Home.vue';
import Buat from './Buat.vue';
import Read from './Read.vue';

export default {
  path: '/forum',
  component: App, 
  children: [
    { path: '', component: Home },
    { path: 'buat', component: Buat },
    { path: 'read/:id', component: Read },
  ],
};
