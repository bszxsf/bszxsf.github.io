<template>
  <!-- To keep consistency we always use p as containing element. -->
  <p v-if="titleId">
    <nuxt-link :to="{ path: '/posts' + postItem.path, hash: '#' + titleId }">
      {{ postItem.title }}
    </nuxt-link>
  </p>
  <p v-else @click="backToTop()">
    {{ postItem.title }}
  </p>
  <div>
    <p
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
</template>

<script setup lang="ts">
import type {
  TocLink,
  MinimarkElement,
  PostsCollectionItem
} from '@nuxt/content';

const { postItem } = defineProps<{
  postItem: PostsCollectionItem;
}>();

const flattenLinks = (src: TocLink[], dst: TocLink[]) => {
  for (var link of src) {
    dst.push(link);
    if (link.children) {
      flattenLinks(link.children, dst);
    }
  }
};
let flattenedLinks: TocLink[] = [];
flattenLinks(postItem.body!.toc!.links, flattenedLinks);

let titleId: string | undefined = undefined;

if (postItem.body.value[0][0] === 'h1') {
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
