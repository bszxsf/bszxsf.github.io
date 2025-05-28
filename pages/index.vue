<template>
  <div>这里是索引页。将来这里会列出本站的各类内容。</div>
  <el-button type="primary" @click="gotoPosts()">点此进入文章页</el-button>
</template>

<script setup lang="ts">
useHead({
  title: '主页'
});

const gotoPosts = () => {
  return navigateTo('/posts');
};
</script>
