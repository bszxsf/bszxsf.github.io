<template>
  <div>
    <!-- This page is always here so we hardcode the component. -->
    <bread-crumb-with-back :paths="aboutPaths" />

    这是关于页面。接下来的测试中我们会填充这里。
    <el-button @click="router.back()">点击这里返回</el-button>
  </div>
</template>

<script setup lang="ts">
  import BreadCrumbWithBack from '~/components/BreadCrumbWithBack.vue'

  const router = useRouter()
  const aboutPaths:NamedPaths = [{name: "主页", to: "/"}, {name: "关于", to: "/about"}]
</script>
