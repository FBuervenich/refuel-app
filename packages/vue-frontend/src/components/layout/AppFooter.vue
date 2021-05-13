<template>
  <div class="footer">
    <div></div>
    <div>
      <span>ABC</span>
      <span>ABC</span>
      <span>ABC</span>
      <span>
        <font-awesome-icon class="mr-2" :icon="['fab', 'github']" />
        <el-link
          href="https://github.com/FBuervenich/basic-refuel-app/"
          target="_blank"
          >Github</el-link
        >
      </span>
    </div>
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
  margin-top: 30px;
  padding: 30px 0;
  background-color: #f8f8f8;
  text-align: center;
  // width: 100%;
  // display: flex;

  span {
    padding: 0 10px;
    font-size: 18px;
    border-right: 1px solid #9fb3c8;
    &:last-child {
      border-right: none;
    }
  }
}

.mr-2 {
  margin-right: 2px;
}
</style>
