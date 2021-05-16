<template>
  <div id="wrapper">
    <h2>Refuelings</h2>
    <RefuelingsTable
      @pagination-changed="triggerDataLoading"
      :refuelings="refuelings"
    />
  </div>
</template>

<script lang="ts">
import RefuelingsTable from '@/components/widgets/RefuelingsTable.vue';

import { computed, defineComponent } from 'vue';
import { RefuelingsModule } from '@/store';
import { PaginationSettings } from '@/store/modules/types';

export default defineComponent({
  name: 'Refuelings',
  components: {
    RefuelingsTable,
  },

  methods: {
    async triggerDataLoading(settings: PaginationSettings) {
      await RefuelingsModule.fetchAll(settings);
    },
  },

  async setup() {
    const refuelings = computed(() => RefuelingsModule.refuelings);
    await loadData();

    return {
      refuelings,
    };

    async function loadData() {
      return await RefuelingsModule.fetchAll();
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
