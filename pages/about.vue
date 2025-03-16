<template>
  <div>
    <!-- This page is always here so we hardcode the component. -->
    <bread-crumb-with-back :paths="aboutPaths" />

    <content-renderer
      :value="about!"
      style="padding: var(--el-main-padding); max-width: 100%"
      class="prose dark:prose-invert"
    />
  </div>
</template>

<script setup lang="ts">
const aboutPaths: NamedPaths = [
  { name: '主页', to: '/' },
  { name: '关于', to: '/about' }
];

useHead({
  title: '关于'
});

const { data: about } = await useAsyncData(() =>
  queryCollection('site').path('/about').first()
);
</script>
