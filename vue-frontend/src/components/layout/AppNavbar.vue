<template>
  <div>
    <el-menu
      :default-active="currentRoute"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item :route="{ name: 'Home' }" index="Home">Home</el-menu-item>
      <el-menu-item :route="{ name: 'Dashboard' }" index="Dashboard"
        >Dashboard</el-menu-item
      >
      <el-menu-item :route="{ name: 'About' }" index="About"
        >About</el-menu-item
      >
      <el-menu-item index="Github">
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
    return {};
  },
  computed: {
    currentRoute(): string {
      return this.$route.name as string;
    },
  },
  methods: {},
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
