<template>
  <!-- TODO: responsive width -->
  <el-menu mode="horizontal" :ellipsis="false">
    <!-- Left side: home page button -->
    <!-- People usually place a logo here, though I don't have one so we put whatever stuff. -->
    <!-- This icon (or whatever) shall navigate to the home page. So using the home icon ought to be a nice choice... -->
    <el-menu-item id="nav-bar-home">
      <el-icon><House /></el-icon>
      Blog主体施工中
    </el-menu-item>

    <!-- Right side: misc stuff -->
    <!-- TODO: search bar, about (author, powered by etc.), github, dark mode switch -->

    <div class="nav-bar-non-btn">
      <el-switch
        v-model="isDark"
        :inactive-action-icon="Sunrise"
        :active-action-icon="MoonNight"
        style="--el-switch-on-color: var(--el-switch-off-color)"
        title="夜间模式"
      />
    </div>
  </el-menu>
</template>

<script setup lang="ts">
  import { Sunrise, MoonNight } from '@element-plus/icons-vue';

  const isDark = useDark()
</script>

<style scoped>
  .el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
  }
  .nav-bar-non-btn {
    height: 100%;
    justify-content: center;
    align-content: center;
    padding: 0 var(--el-menu-base-level-padding);
  }
</style>
