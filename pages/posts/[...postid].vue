<template>
  <div style="width: 100%">
    <div v-if="post" style="width: 100%">
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
    <error-display404 v-else />
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

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

const { data: post } = await useAsyncData(postIdStr, () =>
  queryCollection('posts').path(postIdStr).first()
);

useHead({
  title: postTitleStr
});
</script>
