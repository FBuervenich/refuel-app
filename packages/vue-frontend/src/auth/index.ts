import createAuth0Client, {
  Auth0Client,
  LogoutOptions,
  RedirectLoginOptions,
  User,
} from '@auth0/auth0-spa-js';
import { App, computed, reactive, watchEffect, Plugin } from 'vue';
import { NavigationGuardWithThis, RouteLocation } from 'vue-router';

interface Auth0PluginState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | undefined;
  popupOpen: boolean;
  error: any | null;
}

let client: Auth0Client;

const state = reactive<Auth0PluginState>({
  loading: true,
  isAuthenticated: false,
  user: {},
  popupOpen: false,
  error: null,
});

async function loginWithPopup() {
  state.popupOpen = true;

  try {
    await client.loginWithPopup();
  } catch (e) {
    console.error(e);
  } finally {
    state.popupOpen = false;
  }

  state.user = await client.getUser();
  state.isAuthenticated = true;
}

async function handleRedirectCallback() {
  state.loading = true;

  try {
    await client.handleRedirectCallback();
    state.user = await client.getUser();
    state.isAuthenticated = true;
  } catch (e) {
    state.error = e;
  } finally {
    state.loading = false;
  }
}

function loginWithRedirect(o: RedirectLoginOptions) {
  return client.loginWithRedirect(o);
}

function getIdTokenClaims(o: RedirectLoginOptions) {
  return client.getIdTokenClaims(o);
}

function getTokenSilently(o: RedirectLoginOptions) {
  return client.getTokenSilently(o);
}

function getTokenWithPopup(o: RedirectLoginOptions) {
  return client.getTokenWithPopup(o);
}

function logout(o: LogoutOptions) {
  return client.logout(o);
}

const authPlugin = {
  isAuthenticated: computed(() => state.isAuthenticated),
  loading: computed(() => state.loading),
  user: computed(() => state.user),
  getIdTokenClaims,
  getTokenSilently,
  getTokenWithPopup,
  handleRedirectCallback,
  loginWithRedirect,
  loginWithPopup,
  logout,
};

export const routeGuard: NavigationGuardWithThis<undefined> = (
  to: RouteLocation,
  from: RouteLocation,
  next: Function
) => {
  const { isAuthenticated, loading, loginWithRedirect } = authPlugin;

  const verify = () => {
    // If the user is authenticated, continue with the route
    if (isAuthenticated.value) {
      return next();
    }

    // Otherwise, log in
    loginWithRedirect({
      appState: { targetUrl: to.fullPath },
      redirect_uri: location.origin + process.env.BASE_URL + 'callback',
      responseType: 'id_token',
    });
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!loading.value) {
    return verify();
  }

  // Watch for the loading property to change before we check isAuthenticated
  watchEffect(() => {
    if (loading.value === false) {
      return verify();
    }
  });
};

interface Auth0PluginOptions {
  domain: string;
  clientId: string;
  audience: string;
  redirectUri: string;

  onRedirectCallback(appState: any): void;
}

async function init(options: Auth0PluginOptions): Promise<Plugin> {
  client = await createAuth0Client({
    // domain: process.env.VUE_APP_AUTH0_DOMAIN,
    // client_id: process.env.VUE_APP_AUTH0_CLIENT_KEY,
    domain: options.domain,
    client_id: options.clientId,
    audience: options.audience,
    redirect_uri: options.redirectUri,
  });

  try {
    // If the user is returning to the app after authentication
    if (
      window.location.search.includes('code=') &&
      window.location.search.includes('state=')
    ) {
      // handle the redirect and retrieve tokens
      const { appState } = await client.handleRedirectCallback();
      console.log(appState);

      // Notify subscribers that the redirect callback has happened, passing the appState
      // (useful for retrieving any pre-authentication state)
      options.onRedirectCallback(appState);
      console.log(appState);
    }
  } catch (e) {
    state.error = e;
  } finally {
    // Initialize our internal authentication state
    state.isAuthenticated = await client.isAuthenticated();
    state.user = await client.getUser();
    state.loading = false;
  }

  return {
    install: (app: App) => {
      app.provide('Auth', authPlugin);
    },
  };
}

interface Auth0Plugin {
  init(options: Auth0PluginOptions): Promise<Plugin>;
  routeGuard: NavigationGuardWithThis<undefined>;
}

export const Auth0: Auth0Plugin = {
  init,
  routeGuard,
};
