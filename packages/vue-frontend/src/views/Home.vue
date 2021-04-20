<template>
  <div class="home">
    <CreateNewRefueling
      class="newRefuelingCard"
      :lastTotalKilometers="125683"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateNewRefueling from '@/components/CreateNewRefueling.vue';

export default defineComponent({
  name: 'Home',
  components: {
    CreateNewRefueling,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.newRefuelingCard {
  width: 80%;
  margin: auto;
  margin-top: 10px;
}
</style>
