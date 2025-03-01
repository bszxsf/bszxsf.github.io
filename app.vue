<template>
  <el-container>
    <el-header style="margin: 0; padding: 0">
      <top-navigator-bar style="position: fixed; width: 100%; z-index: 10" />
    </el-header>
    <el-container style="height: 100%">
      <el-aside style="width: var(--app-sidebar-width)">
        <div id="nav-sidebar-scroll">
          <el-scrollbar>
            <side-navigator
              style="
                height: 100%;
                padding-top: var(--el-menu-base-level-padding);
              "
            />
          </el-scrollbar>
        </div>
      </el-aside>
      <el-main>
        <el-backtop />
        <NuxtPage />
      </el-main>
    </el-container>
  </el-container>
</template>

<!-- Note: Build instructions: https://nuxt.com/deploy/github-pages -->
<!-- npx nuxt build --preset github_pages -->
<!-- Used to test locally. No need to build before pushing -->

<script setup lang="ts">
import TopNavigatorBar from '~/components/layouts/TopNavigatorBar.vue';
import SideNavigator from '~/components/layouts/SideNavigator.vue';
</script>

<style scoped>
#nav-sidebar-scroll {
  position: fixed;
  width: var(--app-sidebar-width);
  height: calc(100vh - var(--el-menu-horizontal-height));
  border-right: 1px solid var(--el-menu-border-color);
}
</style>
