<template>
  <div>
    <bread-crumb-with-back :paths="postsIndexPaths" />
    <div style="padding: var(--el-main-padding)">
      <h1 style="padding-bottom: var(--el-main-padding)">文章概览</h1>
      <div style="display: flex">
        <!-- TODO: Responsive width of this -->
        <el-select
          v-model="selectedOrder"
          value-key="name"
          style="width: 120px"
          @change="queryNavItems()"
        >
          <el-option
            v-for="orderOptionPair in orderOptionsPairs"
            :key="orderOptionPair.name"
            :label="orderOptionPair.name"
            :value="orderOptionPair"
          />
        </el-select>
      </div>
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
import type { PageCollections } from '@nuxt/content';

type OrderOptionsPair = {
  name: string;
  key: keyof PageCollections['posts'];
  direction: 'ASC' | 'DESC';
};
const orderOptionsPairs: OrderOptionsPair[] = [
  {
    name: '默认排序',
    key: 'id',
    direction: 'ASC'
  },
  {
    name: '最新发布',
    key: 'published',
    direction: 'DESC'
  },
  {
    name: '最新修改',
    key: 'modified',
    direction: 'DESC'
  },
  {
    name: '最早发布',
    key: 'published',
    direction: 'ASC'
  }
];

// Note: Actually this thing is never changed. We only need a one-way bind.
const selectedOrder: Ref<OrderOptionsPair> = ref(orderOptionsPairs[0]);

const { data: allposts, refresh } = await useAsyncData(
  () =>
    queryCollection('posts')
      .where('published', 'IS NOT NULL')
      .order(selectedOrder.value.key, selectedOrder.value.direction)
      .all(),
  {
    dedupe: 'cancel'
  }
);

const queryNavItems = () => {
  refresh();
};

const postsIndexPaths: NamedPaths = [
  { name: '主页', to: '/' },
  { name: '文章', to: '/posts' }
];

useHead({
  title: '文章概览'
});
</script>

<style scoped>
@reference '~/assets/styles/main.css';

h1 {
  @apply text-4xl;
}

.nav-list-body {
  margin: var(--el-main-padding) 0;
  border-top: 1px var(--el-border-color) var(--el-border-style);
}
</style>
