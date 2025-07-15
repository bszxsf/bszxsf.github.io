<template>
  <nuxt-layout name="default">
    <template v-if="post" #bar>
      <div style="padding: var(--el-menu-base-level-padding)">
        <navigator-post-toc :post-item="post" :flattened-links />
      </div>
    </template>
    <div v-if="post" style="width: 100%; display: flex">
      <div id="post-content">
        <bread-crumb-with-back :paths="postPaths" />
        <div
          v-if="post!.published"
          style="padding: var(--el-main-padding)"
          class="text-sm italic text-gray-800 dark:text-gray-200"
        >
          <p>
            发布于&nbsp;
            {{
              DateTime.fromISO(post!.published).toLocaleString(
                DateTime.DATETIME_FULL
              )
            }}
          </p>
          <p v-if="post!.modified && post!.modified != post!.published">
            最后修改于&nbsp;
            {{
              DateTime.fromISO(post!.modified).toLocaleString(
                DateTime.DATETIME_FULL
              )
            }}
          </p>
        </div>
        <content-renderer
          :value="post"
          style="
            padding: var(--el-main-padding);
            max-width: 100%;
            word-wrap: break-word;
          "
          prose
          class="prose"
        />
      </div>
    </div>
    <error-display404 v-else />
  </nuxt-layout>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content';
import { DateTime } from 'luxon';

// Analyze route
const route = useRoute();

const postIdArr: string[] = ([] as string[]).concat(route.params.postid);
if (postIdArr[postIdArr.length - 1] == '') {
  postIdArr.pop();
}
let postPaths: NamedPaths = [
  { name: '主页', to: '/' },
  { name: '文章', to: '/posts' }
];
let cntPathTo = '/posts';
for (const postIdSeg of postIdArr) {
  cntPathTo += '/' + postIdSeg;
  postPaths.push({ name: postIdSeg, to: cntPathTo });
}

const postIdStr: string = '/' + postIdArr.join('/');
const postTitleStr: string = postIdArr.reverse().join(' | ');

// Get post content
const { data: post } = await useAsyncData(postIdStr, () =>
  queryCollection('posts').path(postIdStr).first()
);

// TOC processing
let flattenedLinks: TocLink[] = [];
const flattenLinks = (src: TocLink[], dst: TocLink[]) => {
  for (const link of src) {
    dst.push(link);
    if (link.children) {
      flattenLinks(link.children, dst);
    }
  }
};
if (post.value) {
  flattenLinks(post.value!.body!.toc!.links, flattenedLinks);
}

// Page meta
useHead({
  title: postTitleStr
});

definePageMeta({
  // TODO: Nuxt does not support layout with named slots currently, this is an ugly workaround.
  layout: false
});
</script>

<style scoped>
#post-content {
  width: 100%;
}
</style>
