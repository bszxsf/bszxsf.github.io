<template>
  <el-dialog
    destroy-on-close
    :show-close="false"
    v-model="isVisible"
    style="cursor: auto"
    @opened.once="loadData()"
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
    <el-scrollbar v-loading="loading" max-height="400px">
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
import Fuse, { type FuseResult } from 'fuse.js';

const isVisible = defineModel<boolean>();
const queryStringContent = ref('');

type SectionItem = {
  id: string;
  title: string;
  titles: string[];
  level: number;
  content: string;
};
type FuseInstance = Fuse<SectionItem>;

const contentFuse: Ref<FuseInstance | null> = ref(null);
const titleFuse: Ref<FuseInstance | null> = ref(null);
const loading = ref(true);

const loadData = async () => {
  const rawSections = await $fetch('/api/posts/search.json');

  // TODO: These need optimization. I'm not familiar with TS...
  const contentSections = rawSections.filter((obj) => obj.id.includes('#'));
  const titleSections = rawSections.filter((obj) => !obj.id.includes('#'));

  contentFuse.value = new Fuse(contentSections, {
    keys: ['content'],
    isCaseSensitive: false,
    ignoreDiacritics: true,
    includeMatches: false,
    shouldSort: true,
    findAllMatches: false
  });
  titleFuse.value = new Fuse(titleSections, {
    keys: ['title'],
    isCaseSensitive: false,
    ignoreDiacritics: true,
    includeMatches: false,
    shouldSort: true,
    findAllMatches: false
  });

  loading.value = false;
};

const searchResults = computed(() => {
  // When the two instances are ready, they should trigger another update, thus changing `queryStringContent` before search instances initialization should be fine.
  if (!titleFuse.value || !contentFuse.value) return [];
  return [
    ...titleFuse.value.search(toValue(queryStringContent)).slice(0),
    ...contentFuse.value.search(toValue(queryStringContent)).slice(0)
  ];
});
</script>

<style>
/* No 'scoped' to overwrite global style */
/* There seems no standard way to disable scrolling of dialog itself, the only way I found working is this dirty hack. */
.el-overlay-dialog {
  overflow-y: hidden;
}
</style>
