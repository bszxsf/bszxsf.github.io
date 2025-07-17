<template>
  <client-only>
    <nuxt-loading-indicator :color="elPrimaryColor" />
  </client-only>
  <el-container style="height: 100%">
    <el-header style="margin: 0; padding: 0">
      <navigator-top
        style="width: 100%; z-index: var(--el-index-top); position: fixed"
      />
    </el-header>
    <el-container id="app-non-hdr">
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

// Well, the prop requires it to be string | boolean | undefined... A bit weird but works.
const elPrimaryColor = ref<string | undefined>(undefined);
if (import.meta.client)
  elPrimaryColor.value = useCssVar('--el-color-primary').value!;
</script>

<style scoped>
#app-non-hdr {
  height: calc(100vh - var(--el-menu-horizontal-height));
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
}
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
  width: 100%;
  min-width: 0;
}
</style>
