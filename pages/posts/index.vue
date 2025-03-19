<template>
  <div>
    <bread-crumb-with-back :paths="postsIndexPaths" />
    <div style="padding: var(--el-main-padding)">
      <h1 style="padding-bottom: var(--el-main-padding)">文章概览</h1>
      <div class="nav-list-body">
        <div v-for="post of allposts" :key="post.title">
          <post-navigation-item
            :title="post.title"
            :description="post.description"
            :published="post.published"
            :modified="post.modified"
            :to="'/posts' + post.path"
            border="bottom"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: allposts } = await useAsyncData(() =>
  queryCollection('posts').where('published', 'IS NOT NULL').all()
);

const postsIndexPaths: NamedPaths = [
  { name: '主页', to: '/' },
  { name: '文章', to: '/posts' }
];

useHead({
  title: '文章概览'
});
</script>

<style scoped>
@reference 'tailwindcss';

h1 {
  @apply text-4xl;
}

.nav-list-body {
  margin: var(--el-main-padding) 0;
  border-top: 1px var(--el-border-color) var(--el-border-style);
}
</style>
