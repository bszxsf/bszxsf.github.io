<template>
  <div>
    这是关于页面。下一次测试中我们会填充这里。
    <el-button @click="router.back()">点击这里返回</el-button>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()
</script>
