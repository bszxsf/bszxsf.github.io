<template>
  <div id="app-content-frame">
    <el-backtop target="#app-content-frame" />
    <div style="flex-grow: 1">
      <slot />
    </div>
    <footer-license-claim />
  </div>
</template>

<style scoped>
#app-content-frame {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--el-main-padding);
}
</style>
