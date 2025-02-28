<template>
  <el-container style="height: 100%;">
    <el-header style="margin: 0; padding: 0;">
      <TopNavigatorBar />
    </el-header>
    <el-container>
      <el-aside>
        <!-- TODO: 宽度自适应 -->
        <SideNavigator style="height: 100%; padding-top: var(--el-menu-base-level-padding);" />
      </el-aside>
      <el-main>
        <NuxtPage />
        <!-- <div>TODO：自适应：左上角一串在屏幕缩小时应当只显示一个home图标；左侧侧边栏在屏幕够小时缩减为一个按钮（现在还一点没加）；搜索栏；根据时间决定加载导航栏时是否启用夜晚模式；github链接</div> -->
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
