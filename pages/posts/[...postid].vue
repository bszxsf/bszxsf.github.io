<template>
  <div v-if="post">
    <bread-crumb-with-back :paths="postPaths" />
    <content-renderer v-if="post" :value="post" />
  </div>
  <error-display404 v-else />
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
