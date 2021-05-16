<template>
  <el-table :data="beautifiedRefuelings" stripe class="refuelingsTable">
    <el-table-column prop="id" label="id"> </el-table-column>
    <el-table-column prop="madeAt" label="Datum" sortable> </el-table-column>
    <el-table-column prop="litres" label="Litres" sortable> </el-table-column>
    <el-table-column prop="pricePerLitre" label="Price per litre" sortable>
    </el-table-column>
    <el-table-column prop="price" label="Price" sortable> </el-table-column>
    <el-table-column prop="fullTank" label="Full tank" sortable>
      <template #default="scope">
        <el-tag :type="scope.row.fullTank ? 'primary' : 'info'" disabled>{{
          scope.row.fullTank ? 'Yes' : 'No'
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="remove" label="Delete" width="100">
      <template #default="scope">
        <el-button
          icon="el-icon-delete"
          circle
          @click="deleteRefueling(scope.$index)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row>
    <el-col>
      <el-pagination
        background
        v-model:currentPage="currentPage"
        layout="total, prev, pager, next, sizes"
        :total="paginationData.count"
        :page-sizes="paginationData.pageSizes"
      >
      </el-pagination>
    </el-col>
  </el-row>
  {{ currentPage }}
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
  data() {
    return {
      currentPage: 1,
    };
  },

  setup(props) {
    const beautifiedRefuelings = computed(() =>
      props.refuelings.map(refueling => ({
        id: refueling.id,
        madeAt: refueling.madeAt,
        litres: refueling.litres?.toFixed(2) + 'l',
        pricePerLitre: refueling.pricePerLitre.toFixed(3) + '€',
        price: refueling.price.toFixed(3) + '€',
        fullTank: refueling.fullTank,
      }))
    );

    const paginationData = computed(() => ({
      count: beautifiedRefuelings.value.length * 100,
      pageSizes: [5, 10, 20, 50, 100],
    }));

    return { beautifiedRefuelings, paginationData };
  },
});
</script>

<style lang="scss" scoped>
.refuelingsTable {
  margin-bottom: 10px;
}
</style>
