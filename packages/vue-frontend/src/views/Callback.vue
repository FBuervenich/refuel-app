<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  setup() {
    const internalInstance = getCurrentInstance();
    const globalProps = internalInstance?.appContext.config.globalProperties;

    if (globalProps) {
      if (globalProps.$route.query.error) {
        globalProps.$auth.logout({
          returnTo:
            window.location.origin +
            `/error?error=${encodeURI(
              globalProps.$route.query.error
            )}&error_description=${encodeURI(
              globalProps.$route.query.error_description
            )}`,
        });
      }
    }
    return {};
  },
});
</script>

<style scoped></style>
