<template>
  <div class="nav-search-item" @click="gotoPage()">
    <p class="text-xl" :title>{{ title }}</p>
    <el-breadcrumb separator="/" v-if="titles && titles.length > 0">
      <el-breadcrumb-item
        v-for="component of titles"
        :key="component"
        class="nav-search-item-bc"
      >
        {{ component }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <p v-if="content" class="nav-search-item-content">{{ content }}</p>
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
  background-color: var(--el-color-primary-light-3);
}

.nav-search-item > p:first-child {
  margin-bottom: 0.625rem;
  color: var(--el-color-primary-dark-2);
}
.nav-search-item-bc {
  margin-bottom: 1.375rem;
}
.nav-search-item-content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 3;
}
</style>
