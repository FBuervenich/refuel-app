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

logAppInfo();
library.add(fas, fab, far);
const app = createApp(App);

async function init() {
  const AuthPlugin = await Auth0.init({
    onRedirectCallback: appState => {
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

function logAppInfo() {
  console.log(
    `%c ⛽ Refuel app ️%c\n Bulid based on commit %c${VUE_APP_COMMIT_HASH}%c from: %c${new Date(
      VUE_APP_BUILD_TIMESTAMP
    ).toLocaleString()}\n`,
    'font-size: 30px; font-family: Calibri;font-weight: bold; padding: 10px 0;',
    'color: #616161',
    'color: #00a9a5; font-weight: bold',
    'color: #616161',
    'color: #00a9a5; font-weight: bold'
  );
  console.log(
    `%cEnvironment: 🏗️ %c${VUE_APP_ENV}`,
    'color: #616161',
    'color: #00a9a5; font-weight: bold'
  );

  if (VUE_APP_IS_DEV) {
    console.log('%c⚠️ Running in development environment!', 'color: red');
  }
  if (VUE_APP_IS_PROD) {
    console.log('%c✨ Running in production environment!', 'color: green');
  }
}

init();
export default app;
