<template>
  <el-container style="height: 100%">
    <el-header style="margin: 0; padding: 0">
      <navigator-top
        style="width: 100%; z-index: var(--el-index-top); position: fixed"
      />
    </el-header>
    <el-container
      style="height: calc(100vh - var(--el-menu-horizontal-height))"
    >
      <el-aside style="width: var(--app-sidebar-width)">
        <div id="app-nav-l-container">
          <navigator-side id="app-nav-l" />
        </div>
      </el-aside>
      <div id="app-main-container">
        <nuxt-layout>
          <nuxt-page />
        </nuxt-layout>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Blog施工中` : 'Blog施工中';
  }
});
</script>

<style scoped>
#app-nav-l-container {
  position: fixed;
  width: var(--app-sidebar-width);
  height: calc(100vh - var(--el-menu-horizontal-height));
  border-right: 1px solid var(--el-menu-border-color);
}
#app-nav-l {
  border-right: none;
  overflow-x: hidden;
  overscroll-behavior: contain;
  height: 100%;
  padding-top: var(--el-menu-base-level-padding);
}
#app-main-container {
  padding: 0;
}
</style>
