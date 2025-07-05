<template>
  <div class="nav-search-item" @click="gotoPage()">
    <span class="text-lg" :title>{{ title }}</span>
    <el-breadcrumb separator="/" v-if="titles && titles.length > 0">
      <el-breadcrumb-item v-for="component of titles" :key="component">
        {{ component }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="content">{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
const { content, to, title, titles } = defineProps<{
  content?: string;
  to: string;
  title: string;
  titles?: string[];
}>();

const gotoPage = () => {
  return navigateTo(to);
};
</script>

<style scoped>
.nav-search-item {
  border-radius: 5px;
  background-color: var(--el-fill-color-light);
  padding: 0.625em;
  margin: 0.625em 1em;
  transition: background-color var(--el-transition-duration-fast);
}
.nav-search-item:hover {
  cursor: pointer;
  /* background-color: var(--el-menu-item-hover-fill); */
  background-color: var(--el-color-primary-light-3);
}
</style>
