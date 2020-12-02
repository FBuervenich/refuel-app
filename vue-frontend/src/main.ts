import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// element plus UI Library (https://github.com/element-plus/element-plus)
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// font awesome (https://github.com/FortAwesome/vue-fontawesome)
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas, fab, far);

const app = createApp(App);

app
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app');
