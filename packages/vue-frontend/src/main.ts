import { createApp } from 'vue';
import store from './store';
import router from './router';
import App from '@/App.vue';

import api from '@/util/api';

const authConfig = require('../auth_config.json');
// @ts-ignore
import { Auth0 } from './auth';

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

async function init() {
  const AuthPlugin = await Auth0.init({
    onRedirectCallback: appState => {
      console.log(appState);
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    },
    // clientId: process.env.VUE_APP_AUTH0_CLIENT_KEY,
    // domain: process.env.VUE_APP_AUTH0_DOMAIN,
    // audience: process.env.VUE_APP_AUTH0_AUDIENCE,
    clientId: authConfig.client_id,
    domain: authConfig.domain,
    audience: authConfig.audience,
    redirectUri: window.location.origin,
  });

  app.component('font-awesome-icon', FontAwesomeIcon);

  app
    .use(router)
    .use(store)
    .use(ElementPlus)
    .use(AuthPlugin);

  app.mount('#app');
  app.provide('api', api);
}

init();
export default app;
