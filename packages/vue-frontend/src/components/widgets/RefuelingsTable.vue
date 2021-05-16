<template>
  <el-table :data="beautifiedRefuelings" stripe>
    <el-table-column prop="id" label="id"> </el-table-column>
    <el-table-column prop="madeAt" label="Datum"> </el-table-column>
    <el-table-column prop="litres" label="Litres"> </el-table-column>
    <el-table-column prop="pricePerLitre" label="Price per litre">
    </el-table-column>
    <el-table-column prop="price" label="Price"> </el-table-column>
    <el-table-column prop="remove" label="Delete">
      <template #default="scope">
        <el-button
          icon="el-icon-delete"
          circle
          @click="deleteRefueling(scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Refueling } from '@/store/models';
import { RefuelingsModule } from '@/store';

export default defineComponent({
  name: 'RefuelingsTable',
  props: {
    refuelings: {
      type: Array as PropType<Refueling[]>,
      default: [],
    },
  },
  methods: {
    deleteRefueling(idx: number) {
      const refueling = this.beautifiedRefuelings[idx];
      const confirmation = confirm(
        `Delete refueling from ${refueling.madeAt}?`
      );
      if (confirmation) {
        RefuelingsModule.deleteRefueling(refueling.id);
      }
    },
  },

  setup(props) {
    const beautifiedRefuelings = computed(() =>
      props.refuelings.map(refueling => ({
        id: refueling.id,
        madeAt: refueling.madeAt,
        litres: refueling.litres?.toFixed(2),
        pricePerLitre: refueling.pricePerLitre.toFixed(3),
        price: refueling.price.toFixed(3),
      }))
    );

    return { beautifiedRefuelings };
  },
});
</script>

<style lang="scss" scoped></style>
