<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
    >
      <el-menu-item :route="{ name: 'Home' }" index="1">Home</el-menu-item>
      <el-menu-item :route="{ name: 'Dashboard' }" index="2"
        >Dashboard</el-menu-item
      >
      <el-menu-item :route="{ name: 'About' }" index="3">About</el-menu-item>
      <el-menu-item index="4">
        <font-awesome-icon class="mr-2" :icon="['fab', 'github']" />
        <a
          href="https://github.com/FBuervenich/basic-refuel-app/"
          target="_blank"
          >Github</a
        ></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key: string, keyPath: string) {
      // this.$router.push('about');
      console.log(key, keyPath);
    },
  },
});
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.mr-2 {
  margin-right: 2px;
}
</style>
