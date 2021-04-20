<template>
  <div class="home">
    <CreateNewRefuelingCard
      class="newRefuelingCard"
      :lastTotalKilometers="125683"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateNewRefuelingCard from '@/components/widgets/CreateNewRefuelingCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    CreateNewRefuelingCard,
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
