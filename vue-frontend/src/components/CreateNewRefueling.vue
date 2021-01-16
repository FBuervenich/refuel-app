<template>
  <el-card class="box-card" v-loading="isLoading">
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
            v-model.number="formData.pricePerLitre"
            prefix-icon="el-icon-coin"
            placeholder="Please insert price per litre"
          >
            <template #append>€</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Litres">
          <el-input
            type="number"
            v-model.number="formData.litres"
            prefix-icon="el-icon-pie-chart"
            placeholder="Please insert amount of litres"
          >
            <template #append>litres</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Total price">
          <el-input
            type="number"
            v-model.number="formData.totalPrice"
            prefix-icon="el-icon-money"
            placeholder="Please insert total price"
          >
            <template #append>€</template>
          </el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Full tank">
          <el-col :span="1">
            <el-switch v-model="formData.fullTank" class></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="Date">
          <el-col :span="1">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="formData.date"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="Day kilometers">
          <el-input
            type="number"
            v-model.number="formData.dayKilometers"
            prefix-icon=""
            placeholder="Please insert day kilometers"
          >
            <template #append>km</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Total kilometers">
          <el-input
            type="number"
            v-model.number="formData.totalKilometers"
            prefix-icon=""
            placeholder="Please insert total kilometers (or use pre-filled value)"
          >
            <template #append>km</template>
          </el-input>
        </el-form-item>
        <i class="fas el-icon-fa-tachometer-alt"></i>
        <el-divider></el-divider>
        <el-form-item>
          <el-button @click="resetformData" :disabled="isLoading"
            >Clear form</el-button
          >
          <el-button
            @click="checkAndSubmit"
            type="primary"
            :disabled="isLoading"
            >Add refueling</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';

import { Refueling } from '@/store/models';
import { RefuelingsModule } from '@/store';
import { SuccessMessage } from '@/util/messages';

export default defineComponent({
  props: {
    lastTotalKilometers: {
      required: false,
      type: Number,
    },
  },

  setup(props) {
    const defaultformData = {
      pricePerLitre: null,
      litres: null as any,
      totalPrice: null as any,
      date: new Date(),
      fullTank: true,
      dayKilometers: null as any,
      totalKilometers: null as any,
    };

    let formData = ref(Object.assign({}, defaultformData));
    const state = reactive({
      isLoading: false,
    });

    watch(() => formData.value.pricePerLitre, calcTotalPrice);
    watch(() => formData.value.litres, calcTotalPrice);

    watch(() => formData.value.dayKilometers, calcTotalKilometers);

    return {
      ...toRefs(state),
      formData,
      resetformData,
      checkAndSubmit,
    };

    /**
     * Calculates the total price based on the price per litre and the
     * amount of litres
     */
    function calcTotalPrice() {
      console.log('calcing');
      const data = formData.value;
      data.totalPrice = (data.pricePerLitre || 0) * (data.litres || 0);
      data.totalPrice = Math.round(data.totalPrice * 100) / 100;
    }

    /**
     * Calculates the total kilometers based on the day kilometers + last
     * value of total kilometers
     */
    function calcTotalKilometers() {
      const dayKilometers = formData.value.dayKilometers || 0;
      const lastTotalKilometers = props.lastTotalKilometers || 0;
      formData.value.totalKilometers = lastTotalKilometers + dayKilometers;
    }

    /**
     * Resets all the form's data fields to it's defaults
     */
    function resetformData() {
      const newformData = Object.assign({}, defaultformData);
      formData.value = newformData;
    }

    /**
     * Checks the inputs and submit the data
     */
    async function checkAndSubmit() {
      state.isLoading = true;
      Math;

      let formDataV = formData.value;
      const refueling: Refueling = {
        id: 0,
        litres: formDataV.litres || 0,
        price: formDataV.totalPrice || 0,
        pricePerLitre: formDataV.pricePerLitre || 0,
        totalKilometers: formDataV.totalKilometers || 0,
        dayKilometers: formDataV.dayKilometers || 0,
        fullTank: formDataV.fullTank,
        madeAt: formDataV.date || new Date(),
      };

      await RefuelingsModule.createRefueling(refueling);
      resetformData();
      state.isLoading = false;
      SuccessMessage.closable('Refueling was added.');
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
