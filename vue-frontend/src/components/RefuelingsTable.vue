<template>
  <el-table :data="beautifiedRefuelings" stripe height="750">
    <el-table-column prop="id" label="id" width="100"> </el-table-column>
    <el-table-column prop="madeAt" label="Datum" width="250"> </el-table-column>
    <el-table-column prop="litres" label="Litres" width="180">
    </el-table-column>
    <el-table-column prop="pricePerLitre" label="Price per litre" width="180">
    </el-table-column>
    <el-table-column prop="price" label="Price" width="180"> </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Refueling } from '@/store/models';
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue';
import { formatDateToISO8601 } from '@/util/util';

export default defineComponent({
  name: 'RefuelingsTable',
  props: {
    refuelings: {
      type: Array as PropType<Refueling[]>,
      default: [],
    },
  },
  components: {},

  setup(props) {
    let state = reactive({
      beautifiedRefuelings: computed(() =>
        props.refuelings.map(refueling => ({
          id: refueling.id,
          madeAt: formatDateToISO8601(refueling.madeAt),
          litres: refueling.litres.toFixed(2),
          pricePerLitre: refueling.pricePerLitre.toFixed(3),
          price: refueling.price.toFixed(3),
        }))
      ),
    });

    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped></style>
