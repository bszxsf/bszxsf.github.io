<template>
  <div id="post-surroundings">
    <!-- TODO: Use a variable for paddings and margins -->
    <div
      class="post-surroundings-item"
      v-if="prev"
      @click="navigateTo(`/posts${prev.path}`)"
    >
      <el-icon class="post-surroundings-icon"><arrow-left-bold /></el-icon>
      <div style="width: 100%; min-width: 0">
        <div class="post-surroundings-label">上一篇</div>
        <div class="post-surroundings-title">
          {{ prev.title }}
        </div>
      </div>
    </div>
    <div
      class="post-surroundings-item"
      v-if="next"
      @click="navigateTo(`/posts${next.path}`)"
    >
      <el-icon class="post-surroundings-icon"><arrow-right-bold /></el-icon>
      <div style="width: 100%; min-width: 0">
        <div class="post-surroundings-label">下一篇</div>
        <div class="post-surroundings-title">
          {{ next.title }}
        </div>
      </div>
    </div>
  </div>
  <!-- <test /> -->
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

const { prev, next } = defineProps<{
  prev?: ContentNavigationItem;
  next?: ContentNavigationItem;
}>();
</script>

<style scoped>
#post-surroundings {
  width: 100%;
}

.post-surroundings-item {
  /* TODO: Use a variable for padding and margin */
  padding: 10px;
  margin-top: 10px;

  cursor: pointer;
  border: 1px solid var(--el-border-color-darker);
  border-radius: var(--el-border-radius-base);
  transition:
    color var(--el-transition-duration),
    border-color var(--el-transition-duration);
  display: flex;
}
.post-surroundings-item:hover {
  color: var(--el-menu-hover-text-color);
  border-color: var(--el-menu-active-color);
}

.post-surroundings-icon {
  align-self: center;
  /* TODO: Sync with .post-surroundings-item[padding] */
  margin-right: 10px;
}
.post-surroundings-label {
  color: var(--el-text-color-secondary);
  font-style: italic;
  transition: color var(--el-transition-duration);
}
.post-surroundings-item:hover .post-surroundings-label {
  color: var(--el-menu-hover-text-color);
}
.post-surroundings-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
</style>
