<template>
  <!-- <div id="nav"></div> -->
  <AppNavbar />
  <div id="content">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppNavbar from '@/components/layout/AppNavbar.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    AppNavbar,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
