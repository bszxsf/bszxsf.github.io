<template>
  <content-renderer v-if="post" :value="post" />
  <error-display404 v-else />
</template>

<script setup lang="ts">
const route = useRoute();

const postIdArr: string[] = ([] as string[]).concat(route.params.postid);
if (postIdArr[postIdArr.length - 1] == '') {
  postIdArr.pop();
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
