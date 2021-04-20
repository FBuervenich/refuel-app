<template>
  <div id="container" v-loading="true"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 100px;
}
</style>
