<template>
  <div id="wrapper">
    <RefuelingsTable :refuelings="refuelings" />
  </div>
</template>

<script lang="ts">
import RefuelingsTable from '@/components/RefuelingsTable.vue';

import { defineComponent, reactive, toRefs } from 'vue';
import { RefuelingsModule } from '@/store';
import { Refueling } from '@/store/models';

export default defineComponent({
  name: 'Dashboard',
  components: {
    RefuelingsTable,
  },

  setup() {
    let state = reactive({
      refuelings: RefuelingsModule.refuelings as Refueling[],
    });

    loadData();

    return toRefs(state);

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
