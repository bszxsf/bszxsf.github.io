<template>
  <el-menu mode="vertical" router style="border-right: none">
    <el-menu-item-group title="文章">
      <navigator-post-category :navInfo="navInfo!" />
    </el-menu-item-group>
    <el-menu-item-group title="其他">
      <el-menu-item index="/">
        <template #title>
          <el-icon><home-filled /></el-icon>
          <span>主页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/about">
        <template #title>
          <el-icon><info-filled /></el-icon>
          <span>关于</span>
        </template>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script setup lang="ts">
const { data: navInfo } = await useAsyncData(
  'content-posts-nav-side',
  () =>
    queryCollectionNavigation('posts', ['published', 'modified']).where(
      'published',
      'IS NOT NULL'
    ),
  {
    dedupe: 'defer' // This result shall never change, so using 'defer' is enough.
  }
);
</script>
