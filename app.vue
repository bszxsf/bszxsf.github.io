<template>
  <el-container style="height: 100%;">
    <el-header style="margin: 0; padding: 0;">
      <top-navigator-bar />
    </el-header>
    <el-container>
      <el-aside>
        <side-navigator style="height: 100%; padding-top: var(--el-menu-base-level-padding);" />
      </el-aside>
      <el-main>
        <NuxtPage />
      </el-main>
    </el-container>
  </el-container>
</template>

<!-- Note: Build instructions: https://nuxt.com/deploy/github-pages -->
<!-- npx nuxt build --preset github_pages -->
<!-- Used to test locally. No need to build before pushing -->

<script setup lang="ts">
  import TopNavigatorBar from '~/components/layouts/TopNavigatorBar.vue'
  import SideNavigator from './components/layouts/SideNavigator.vue'
</script>
