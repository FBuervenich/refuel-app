<template>
  <div class="footer">
    <span>ABC</span>
    <span>ABC</span>
    <span>ABC</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  margin-top: 20px;
  span {
    padding: 0 10px;
    font-size: 18px;
    border-right: 1px solid #9fb3c8;
    &:last-child {
      border-right: none;
    }
  }
}
</style>
