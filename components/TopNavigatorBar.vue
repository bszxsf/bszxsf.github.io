<template>
  <!-- TODO: responsive width -->
  <div id="top-nav-bar">
    <!-- Left side: home page button -->
    <!-- People usually place a logo here, though I don't have one so we put whatever stuff. -->
    <!-- This icon (or whatever) shall navigate to the home page. So using the home icon ought to be a nice choice... -->
    <div id="nav-bar-home" class="nav-bar-content nav-bar-button">
      <el-icon><House /></el-icon>
      Blog主体施工中
    </div>

    <!-- Right side: misc stuff -->
    <!-- TODO: search bar, about (author, powered by etc.), github, dark mode switch -->
    <!-- In this commit we add a dark mode button, yet useless for now. We focus on nav bar button effect for now. -->
    <!-- Next: https://vueuse.org/core/useDark/#usedark -->
    <div id="nav-bar-utils" class="nav-bar-content">
      <el-switch
        class="nav-bar-content"
        v-model="enable_dark_mode"
        :inactive-action-icon="Sunrise"
        :active-action-icon="MoonNight"
        style="--el-switch-on-color: #001a26"
        title="目前没实现"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Sunrise, MoonNight } from '@element-plus/icons-vue';

  const enable_dark_mode = ref(false)
</script>

<style scoped>
  #top-nav-bar {
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: 1.5rem;
    height: 4rem;
    border-bottom: 5px;
    box-shadow: 0 5px 5px grey;
  }
  .nav-bar-content {
    height: 100%;
    align-items: center;
    text-align: center;
    line-height: 100%;
  }
</style>
