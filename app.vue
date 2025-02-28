<template>
  <div style="height: 100%;">
    <el-affix>
      <top-navigator-bar />
    </el-affix>
    <el-container style="height: 100%;">
      <el-aside style="width: var(--app-sidebar-width);">
        <el-scrollbar view-style="height: 100%;" style="position: fixed; width: var(--app-sidebar-width);">
          <side-navigator style="height: 100%; padding-top: var(--el-menu-base-level-padding);" />
        </el-scrollbar>
      </el-aside>
      <el-main>
        <NuxtPage />
      </el-main>
    </el-container>
  </div>
</template>

<!-- Note: Build instructions: https://nuxt.com/deploy/github-pages -->
<!-- npx nuxt build --preset github_pages -->
<!-- Used to test locally. No need to build before pushing -->

<script setup lang="ts">
  import TopNavigatorBar from '~/components/layouts/TopNavigatorBar.vue'
  import SideNavigator from './components/layouts/SideNavigator.vue'
</script>
