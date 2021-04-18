<template>
  <div></div>
</template>

<script lang="ts">
import { ROUTE_NAMES } from '@/router/routenames';
import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  inject: ['Auth'],
  setup() {
    const auth: any = inject('Auth');
    const router = useRouter();
    // const internalInstance = getCurrentInstance();
    // const globalProps = internalInstance?.appContext.config.globalProperties;
    const currentRoute = router.currentRoute.value;

    if (currentRoute.query.error) {
      auth.logout({
        returnTo:
          window.location.origin +
          `/error?error=${encodeURI(
            currentRoute.query.error.toString()
          )}&error_description=${encodeURI(
            currentRoute.query.error_description?.toString() ?? ''
          )}`,
      });
    } else {
      router.push({ name: ROUTE_NAMES.HOME });
    }
    return {};
  },
});
</script>

<style scoped></style>
