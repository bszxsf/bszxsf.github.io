<template>
  <content-renderer v-if="post" :value="post" />
  <error-display404 v-else />
</template>

<script setup lang="ts">
const route = useRoute();

const postIdStr: string =
  '/' +
  (Array.isArray(route.params.postid)
    ? route.params.postid.join('/')
    : route.params.postid);
const postTitleStr: string = Array.isArray(route.params.postid)
  ? route.params.postid.reverse().join(' | ')
  : route.params.postid;

const { data: post } = await useAsyncData(() =>
  queryCollection('posts').path(postIdStr).first()
);

useHead({
  title: postTitleStr
});
</script>
