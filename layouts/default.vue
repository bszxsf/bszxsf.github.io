<template>
  <!-- TODO: Nuxt does not support layout with named slots currently, this is an ugly workaround. -->
  <el-container id="app-content-and-bar">
    <el-main id="app-content-frame">
      <el-backtop target="#app-content-frame" />
      <div style="flex-grow: 1">
        <slot />
      </div>
      <footer-license-claim />
    </el-main>
    <el-aside v-if="$slots['bar']" id="app-content-bar">
      <!-- <div > -->
      <el-scrollbar height="100%" style="padding: var(--el-main-padding)">
        <slot name="bar" />
      </el-scrollbar>
      <!-- </div> -->
    </el-aside>
  </el-container>
</template>

<style scoped>
#app-content-frame {
  height: 100%;
  padding: var(--el-main-padding);
  /* Children flex */
  display: flex;
  flex-direction: column;
  /* This container itself */
  flex: 1;
}
#app-content-and-bar {
  height: 100%;
  display: flex;
}
#app-content-bar {
  width: var(--app-sidebar-width);
  border-left: 1px var(--el-border-color) var(--el-border-style);
}
</style>
