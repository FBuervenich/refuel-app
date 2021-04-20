<template>
  <div id="wrapper">
    <h2>Refuelings</h2>
    <RefuelingsTable :refuelings="refuelings" />
  </div>
</template>

<script lang="ts">
import RefuelingsTable from '@/components/widgets/RefuelingsTable.vue';

import { computed, defineComponent } from 'vue';
import { RefuelingsModule } from '@/store';

export default defineComponent({
  name: 'Refuelings',
  components: {
    RefuelingsTable,
  },

  async setup() {
    const refuelings = computed(() => RefuelingsModule.refuelings);
    await loadData();

    return {
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
