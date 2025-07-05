<template>
  <el-dialog
    destroy-on-close
    :show-close="false"
    v-model="isVisible"
    style="cursor: auto"
  >
    <template #header>
      <el-input
        v-model="queryStringContent"
        placeholder="输入搜索内容"
        @keydown.stop
      >
        <template #prepend>
          <el-icon><search /></el-icon>
        </template>
      </el-input>
    </template>
    <el-scrollbar max-height="400px">
      <navigator-search-item
        v-if="searchResults.length > 0"
        v-for="res of searchResults"
        :key="res.item.id"
        :to="'/posts' + res.item.id"
        :content="res.item.content"
        :title="res.item.title"
        :titles="res.item.titles"
        @click="isVisible = false"
      >
        {{ res.item.content }}
      </navigator-search-item>
      <el-empty v-else />
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js';

const isVisible = defineModel<boolean>();
const queryStringContent = ref('');

const { data: rawSections } = await useAsyncData('search-sections', () => {
  return queryCollectionSearchSections('posts').where(
    'published',
    'IS NOT NULL'
  );
});

// TODO: These need optimization. I'm not familiar with TS...
const contentSections = rawSections.value!.filter((obj) =>
  obj.id.includes('#')
);
const titleSections = rawSections.value!.filter((obj) => !obj.id.includes('#'));

const contentFuse = new Fuse(contentSections, {
  keys: ['content'],
  isCaseSensitive: false,
  ignoreDiacritics: true,
  includeMatches: false,
  shouldSort: true,
  findAllMatches: false
});
const titleFuse = new Fuse(titleSections, {
  keys: ['title'],
  isCaseSensitive: false,
  ignoreDiacritics: true,
  includeMatches: false,
  shouldSort: true,
  findAllMatches: false
});

const searchResults = computed(() => [
  ...titleFuse.search(toValue(queryStringContent)).slice(0),
  ...contentFuse.search(toValue(queryStringContent)).slice(0)
]);
</script>

<style>
/* No 'scoped' to overwrite global style */
/* There seems no standard way to disable scrolling of dialog itself, the only way I found working is this dirty hack. */
.el-overlay-dialog {
  overflow-y: hidden;
}
</style>
