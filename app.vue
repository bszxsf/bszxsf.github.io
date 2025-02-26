<template>
  <el-container>
    <el-header>
      <TopNavigatorBar />
    </el-header>
    <el-main>
     <div>Nuxt3 + ElementPlus样式测试</div>
     <el-button @click='popup'>弹出窗口</el-button>
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
