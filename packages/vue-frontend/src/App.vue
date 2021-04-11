<template>
  <div id="wrapper">
    <AppNavbar />
    <div class="content">
      <router-view v-slot="{ Component }">
        <Suspense>
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            <BaseLoadingAnimation />
          </template>
        </Suspense>
      </router-view>
    </div>
    <footer class="footer">
      <div id="footer">
        <AppFooter />
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppNavbar from '@/components/layout/AppNavbar.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import BaseLoadingAnimation from '@/components/BaseLoadingAnimation.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    AppNavbar,
    AppFooter,
    BaseLoadingAnimation,
  },
});
</script>

<style lang="scss" scoped>
#wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}
</style>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
