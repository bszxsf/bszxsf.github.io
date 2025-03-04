<template>
  <content-renderer v-if="post" :value="post" />
  <error-display404 v-else />
</template>

<script setup lang="ts">
const route = useRoute();

const { data: post } = await useAsyncData(() =>
  queryCollection('posts')
    .path('/posts/' + route.params.postid)
    .first()
);

useHead({
  title: route.params.postid as string
});
</script>
