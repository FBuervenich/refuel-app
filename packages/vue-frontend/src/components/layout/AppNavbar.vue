<template>
  <div>
    <el-menu
      :default-active="currentRoute"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item :route="{ name: ROUTENAMES.HOME }" :index="ROUTENAMES.HOME"
        >Home</el-menu-item
      >
      <el-menu-item
        :route="{ name: ROUTENAMES.DASHBOARD }"
        :index="ROUTENAMES.DASHBOARD"
        >Dashboard</el-menu-item
      >
      <el-menu-item
        :route="{ name: ROUTENAMES.ABOUT }"
        :index="ROUTENAMES.ABOUT"
        >About</el-menu-item
      >
      <el-menu-item index="Github">
        <font-awesome-icon class="mr-2" :icon="['fab', 'github']" />
        <a
          href="https://github.com/FBuervenich/basic-refuel-app/"
          target="_blank"
          >Github</a
        >
      </el-menu-item>
      <el-menu-item id="logout-button" index="Logout" @click="userLogout">
        <font-awesome-icon class="mr-2" :icon="['fa', 'sign-out-alt']" />
        Logout
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
// eslint-disable-next-line
import { ROUTE_NAMES } from '@/router/routenames';

export default defineComponent({
  name: 'AppNavbar',
  inject: ['Auth'],
  data() {
    return {
      ROUTENAMES: ROUTE_NAMES,
    };
  },
  computed: {
    currentRoute(): string {
      return this.$route.name as string;
    },
  },
  methods: {
    userLogout() {
      this.Auth.logout({
        returnTo: window.location.origin + process.env.VUE_APP_PUBLIC_PATH,
      });
    },
  },
  setup() {
    const auth: any = inject('Auth');
    return {
      ...auth,
    };
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

#logout-button {
  position: absolute;
  right: 0;
}
</style>
