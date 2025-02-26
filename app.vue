<template>
  <el-container>
    <el-header style="margin: 0; padding: 0">
      <TopNavigatorBar />
    </el-header>
    <el-main>
     <div>TODO：自适应：左上角一串在屏幕缩小时应当只显示一个home图标；左侧侧边栏在屏幕够小时缩减为一个按钮（现在还一点没加）；夜晚模式支持，并右对齐</div>
     <div>框架里没有特别满意的header样式，准备手搓header按钮</div>
     <el-button @click='popup'>element-plus样式测试（防止改炸）</el-button>
    </el-main>
  </el-container>
</template>

<!-- Note: Build instructions: https://nuxt.com/deploy/github-pages -->
<!-- npx nuxt build --preset github_pages -->
<!-- Used to test locally. No need to build before pushing -->

<script setup lang="ts">
  import TopNavigatorBar from '~/components/TopNavigatorBar.vue'

  let popup = function() {
    alert("弹出窗口")
  }
</script>
