<template>
  <el-table :data="beautifiedRefuelings" stripe height="750">
    <el-table-column prop="id" label="id"> </el-table-column>
    <el-table-column prop="madeAt" label="Datum"> </el-table-column>
    <el-table-column prop="litres" label="Litres"> </el-table-column>
    <el-table-column prop="pricePerLitre" label="Price per litre">
    </el-table-column>
    <el-table-column prop="price" label="Price"> </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Refueling } from '@/store/models';
import { computed, defineComponent, PropType } from 'vue';
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
    const beautifiedRefuelings = computed(() =>
      props.refuelings.map(refueling => ({
        id: refueling.id,
        madeAt: formatDateToISO8601(refueling.madeAt),
        litres: refueling.litres.toFixed(2),
        pricePerLitre: refueling.pricePerLitre.toFixed(3),
        price: refueling.price.toFixed(3),
      }))
    );

    return { beautifiedRefuelings };
  },
});
</script>

<style lang="scss" scoped></style>
