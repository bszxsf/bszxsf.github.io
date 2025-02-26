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

<!-- TODO: beginner question: do I have to keep both 'script' blocks if setup syntax used O.o? -->
<script lang="ts">
  import TopNavigatorBar from '~/components/TopNavigatorBar.vue';
</script>

<script lang="ts" setup>
  let popup = function() {
    alert("弹出窗口")
  }
</script>
