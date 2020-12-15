<template>
  <div id="wrapper">
    <h2>Dashboard</h2>
    <RefuelingsTable :refuelings="refuelings" />
    <button @click="loadData">Reload</button>
  </div>
</template>

<script lang="ts">
import RefuelingsTable from '@/components/RefuelingsTable.vue';

import { computed, defineComponent } from 'vue';
import { RefuelingsModule } from '@/store';

export default defineComponent({
  name: 'Dashboard',
  components: {
    RefuelingsTable,
  },

  async setup() {
    const refuelings = computed(() => RefuelingsModule.refuelings);
    await loadData();

    return {
      loadData,
      refuelings,
    };

    function loadData() {
      return RefuelingsModule.fetchAll();
    }
  },
});
</script>

<style scoped>
#wrapper {
  width: 80%;
  margin-left: 10%;
  margin-top: 30px;
}
</style>
