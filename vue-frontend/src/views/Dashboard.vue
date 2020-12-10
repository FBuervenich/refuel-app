<template>
  <div id="wrapper">
    <RefuelingsTable :refuelings="refuelings" />
    <button @click="reloadData">Reload</button>
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

  setup() {
    const refuelings = computed(() => RefuelingsModule.refuelings);

    loadData();

    return {
      reloadData,
      refuelings,
    };

    function reloadData() {
      RefuelingsModule.fetchAll();
    }

    async function loadData() {
      await RefuelingsModule.fetchAll();
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
