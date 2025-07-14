<template>
  <!-- TODO: Nuxt does not support layout with named slots currently, this is an ugly workaround. -->
  <el-container id="app-content-and-bar">
    <el-main id="app-content-frame">
      <client-only>
        <!-- On server side `backtopPosRight` cannot be computed correctly, so we wrap this with `client-only` to avoid hydration problem. -->
        <el-backtop target="#app-content-frame" :right="backtopPosRight" />
      </client-only>
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

<script setup lang="ts">
// Default is 40, defined by element
let backtopPosRight = 40;

// `useCssVar` does not work on server side, so we change the value only at client side.
if (import.meta.client) {
  if (useSlots()['bar']) {
    const appSidebarWidth: string = useCssVar('--app-sidebar-width').value!;
    if (!appSidebarWidth.endsWith('px'))
      console.warn(
        "[app] '--app-sidebar-width' does not end with 'px', this may cause unexpected results."
      );
    backtopPosRight += parseInt(appSidebarWidth);
  }
}
</script>

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
