<template>
  <el-container style="height: 100%">
    <el-header style="margin: 0; padding: 0">
      <el-affix>
        <navigator-top style="width: 100%; z-index: var(--el-index-top)" />
      </el-affix>
    </el-header>
    <el-container
      style="height: calc(100vh - var(--el-menu-horizontal-height))"
    >
      <el-aside style="width: var(--app-sidebar-width)">
        <div id="nav-sidebar-scroll">
          <el-scrollbar>
            <navigator-side
              style="
                height: 100%;
                padding-top: var(--el-menu-base-level-padding);
              "
            />
          </el-scrollbar>
        </div>
      </el-aside>
      <el-main id="app-main-container">
        <nuxt-layout>
          <nuxt-page />
        </nuxt-layout>
      </el-main>
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
#nav-sidebar-scroll {
  position: fixed;
  width: var(--app-sidebar-width);
  height: calc(100vh - var(--el-menu-horizontal-height));
  border-right: 1px solid var(--el-menu-border-color);
}
#app-main-container {
  padding: 0;
}
</style>
