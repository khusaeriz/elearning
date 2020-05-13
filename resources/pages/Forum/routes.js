import App from './App.vue';
import Home from './Home.vue';

export default {
  path: '/forum',
  component: App,
  children: [{ path: '/', component: Home },],
};
