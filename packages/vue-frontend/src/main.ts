import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import api from '@/util/api';

const authConfig = require('../auth_config.json');
// @ts-ignore
import { setupAuth } from './auth';

// element plus UI Library (https://github.com/element-plus/element-plus)
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// global styles
import '@/assets/styles/main.scss';

// font awesome (https://github.com/FortAwesome/vue-fontawesome)
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas, fab, far);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app
  .use(router)
  .use(store)
  .use(ElementPlus);

function callbackRedirect(appState: any) {
  router.push(appState && appState.targetUrl ? appState.targetUrl : '/');
}

setupAuth(authConfig, callbackRedirect).then(async (auth: any) => {
  app.use(auth);
  app.mount('#app');

  app.provide('api', api);
});

export default app;
