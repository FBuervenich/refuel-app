<template>
  <AppNavbar />
  <div id="content">
    <router-view v-slot="{ Component }">
      <Suspense>
        <template #default>
          <component :is="Component" />
        </template>
        <template #fallback>
          <!-- <BaseLoadingAnimation /> -->
          <div>Loading...</div>
        </template>
      </Suspense>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppNavbar from '@/components/layout/AppNavbar.vue';
// import BaseLoadingAnimation from '@/components/BaseLoadingAnimation.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    AppNavbar,
    // BaseLoadingAnimation,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
