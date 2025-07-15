<template>
  <div>
    <p class="text-lg font-bold">目录</p>
    <!-- To keep consistency we always use p as containing element. -->
    <p v-if="titleId" class="post-toc-item post-toc-h1">
      <nuxt-link :to="{ path: '/posts' + postItem.path, hash: '#' + titleId }">
        {{ postItem.title }}
      </nuxt-link>
    </p>
    <p v-else @click="backToTop()" class="post-toc-item post-toc-h1">
      {{ postItem.title }}
    </p>
    <div>
      <p
        class="post-toc-item"
        v-for="tocitem of flattenedLinks"
        :key="tocitem.id"
        :style="{ 'padding-left': tocitem.depth - 1 + 'em' }"
      >
        <nuxt-link
          :to="{ path: '/posts' + postItem.path, hash: '#' + tocitem.id }"
        >
          {{ tocitem.text }}
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  TocLink,
  MinimarkElement,
  PostsCollectionItem
} from '@nuxt/content';

const { postItem, flattenedLinks } = defineProps<{
  postItem: PostsCollectionItem;
  flattenedLinks: TocLink[];
}>();

let titleId: string | undefined = undefined;

if (postItem.body.value[0] && postItem.body.value[0][0] === 'h1') {
  titleId = (postItem.body.value[0] as MinimarkElement)[1].id as string;
}

const backToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
.post-toc-item:not(.post-toc-h1) {
  margin: 0.125em 0;
}
.post-toc-h1 {
  margin: 0.375em 0;
}
.post-toc-item {
  color: var(--el-menu-text-color);
  transition: color var(--el-transition-duration);
}
.post-toc-item:hover {
  color: var(--el-menu-hover-text-color);
}
</style>
