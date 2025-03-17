<template>
  <div style="width: 100%">
    <div v-if="post" style="width: 100%">
      <bread-crumb-with-back :paths="postPaths" />
      <content-renderer
        :value="post"
        style="
          padding: var(--el-main-padding);
          max-width: 100%;
          word-wrap: break-word;
        "
        :prose="true"
        class="prose dark:prose-invert"
      />
    </div>
    <error-display404 v-else />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const postIdArr: string[] = ([] as string[]).concat(route.params.postid);
if (postIdArr[postIdArr.length - 1] == '') {
  postIdArr.pop();
}
let postPaths: NamedPaths = [
  { name: '主页', to: '/' },
  { name: '文章', to: '/posts' }
];
let cntPathTo = '/posts/';
for (const postIdSeg of postIdArr) {
  cntPathTo += postIdSeg;
  postPaths.push({ name: postIdSeg, to: cntPathTo });
}

const postIdStr: string = '/' + postIdArr.join('/');
const postTitleStr: string = postIdArr.reverse().join(' | ');

const { data: post } = await useAsyncData(() =>
  queryCollection('posts').path(postIdStr).first()
);

useHead({
  title: postTitleStr
});
</script>
