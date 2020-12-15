<template>
  <el-card class="box-card">
    <template #header>
      <div class="">
        <h3>Add new refueling</h3>
      </div>
    </template>
    <div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Price per litre">
          <el-input
            type="number"
            v-model.number="pricePerLitre"
            prefix-icon="el-icon-coin"
            placeholder="Please insert price per litre"
          >
            <template #append>€</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Litres">
          <el-input
            type="number"
            v-model.number="litres"
            prefix-icon="el-icon-pie-chart"
            placeholder="Please insert amount of litres"
          >
            <template #append>litres</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Total price">
          <el-input
            type="number"
            v-model.number="totalPrice"
            prefix-icon="el-icon-money"
            placeholder="Please insert total price"
          >
            <template #append>€</template>
          </el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Full tank">
          <el-col :span="1">
            <el-switch v-model="fullTank" class></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="Date">
          <el-col :span="1">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="date"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Day kilometers">
          <el-input
            type="number"
            v-model.number="dayKilometers"
            prefix-icon=""
            placeholder="Please insert day kilometers"
          >
            <template #append>km</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Total kilometers">
          <el-input
            type="number"
            v-model.number="calculatedTotalKilometers"
            prefix-icon=""
            placeholder="Please insert total kilometers (or use pre-filled value)"
          >
            <template #append>km</template>
          </el-input>
        </el-form-item>
        <i class="fas el-icon-fa-tachometer-alt"></i>
        <el-divider></el-divider>
        <el-form-item>
          <el-button @click="resetState">Clear form</el-button>
          <el-button @click="checkAndSubmit" type="primary"
            >Add refueling</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';

import { Refueling } from '@/store/models';
import { RefuelingsModule } from '@/store';

export default defineComponent({
  props: {
    lastTotalKilometers: {
      required: false,
      type: Number,
    },
  },
  setup(props, { emit }) {
    const defaultState = {
      pricePerLitre: null,
      litres: null,
      totalPrice: null,
      date: new Date(),
      fullTank: true,
      dayKilometers: 0,
      totalKilometers: null,
    };

    // let state = Object.assign({}, defaultState);
    let state = reactive(Object.assign({}, defaultState));

    let calculatedTotalKilometers = computed(() => {
      return (props.lastTotalKilometers || 0) + state.dayKilometers;
    });

    return {
      ...toRefs(state),
      resetState,
      checkAndSubmit,
      calculatedTotalKilometers,
    };

    function resetState() {
      const newState = reactive(Object.assign({}, defaultState));
      console.log(state);
      console.log(defaultState);
      console.log(newState);
      console.log(state === defaultState);
      state = newState;
    }

    async function checkAndSubmit() {
      // check
      const refueling: Refueling = {
        id: 0,
        litres: state.litres || 0,
        price: state.totalPrice || 0,
        pricePerLitre: state.pricePerLitre || 0,
        totalKilometers: state.totalKilometers || 0,
        dayKilometers: state.dayKilometers || 0,
        fullTank: state.fullTank,
        madeAt: state.date || new Date(),
      };

      await RefuelingsModule.createRefueling(refueling);
      emit('form-submitted', refueling);
    }
  },
});
</script>

<style scoped>
.input-field {
  width: 150px;
}
.input-label {
  margin-right: 5px;
}
.el-row {
  margin-bottom: 5px;
}
</style>
