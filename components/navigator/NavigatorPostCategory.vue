<template>
  <div>
    <!-- Placeholder when there is no post -->
    <el-menu-item v-if="navInfo!.length == 0" disabled> 空空如也 </el-menu-item>
    <!-- Categories -->
    <!-- Note: Nuxt content does not add empty directories, thus there should be at least one post if the v-for expression doesn't evaluate to an empty array. -->
    <el-sub-menu
      v-for="cat of navInfo!.filter(isDirectory)"
      :key="cat.title"
      :index="cat.title"
    >
      <template #title>
        <el-icon><folder /></el-icon>
        {{ cat.title }}
      </template>
      <navigator-post-category :navInfo="cat.children!" :catTitle="cat.title" />
    </el-sub-menu>
    <!-- Posts outside any category -->
    <el-menu-item
      v-for="post of navInfo!.filter(isPost)"
      :key="post.path"
      :index="'/posts' + post.path"
      >{{ post.title != catTitle ? post.title : '概览' }}</el-menu-item
    >
  </div>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';

let { navInfo } = defineProps<{
  navInfo: ContentNavigationItem[];
  catTitle?: string;
}>();

// Nodes with a 'children' field is a diectory, while others are leaves.
const isDirectory = (node: ContentNavigationItem) => {
  return node.children != undefined;
};
const isPost = (node: ContentNavigationItem) => {
  return !isDirectory(node);
};
</script>
