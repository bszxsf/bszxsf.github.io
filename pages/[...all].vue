<template>
  <div>
    这里是404页面。目前这里没有其他东西，我们稍后会让这里看起来不这样荒芜。
    <el-button @click="router.back()">点击这里返回</el-button>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()
</script>
