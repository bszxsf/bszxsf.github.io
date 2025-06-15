<template>
  <div>
    <bread-crumb-with-back :paths="postsIndexPaths" />
    <div style="padding: var(--el-main-padding)">
      <h1 style="padding-bottom: var(--el-main-padding)">文章索引</h1>
      <div style="display: flex">
        <!-- TODO: Responsive width of this -->
        <el-select
          v-model="selectedOrder"
          value-key="name"
          style="width: 120px"
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
        <div v-for="postNav of flattenedNav" :key="postNav.title">
          <post-navigation-item
            :title="postNav.title"
            :description="<string>postNav.description"
            :published="<string>postNav.published"
            :modified="<string>postNav.modified"
            :to="'/posts' + postNav.path"
            border="bottom"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageCollections, ContentNavigationItem } from '@nuxt/content';

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

const selectedOrder: Ref<OrderOptionsPair> = ref(orderOptionsPairs[0]);

const { data: postsNav } = await useAsyncData(() =>
  queryCollectionNavigation('posts', [
    'id',
    'published',
    'modified',
    'description'
  ]).where('published', 'IS NOT NULL')
);

const flattenNavTree = (nodes: ContentNavigationItem[] | null) => {
  if (!nodes || (<ContentNavigationItem[]>nodes).length == 0) {
    return null;
  }
  let result: ContentNavigationItem[] = [];
  let traversalStack: ContentNavigationItem[] = [...nodes];
  traversalStack.reverse();
  let cntNode: ContentNavigationItem | undefined = undefined;

  while ((cntNode = traversalStack.pop())) {
    if (cntNode.children)
      traversalStack.push(...[...cntNode.children].reverse());
    else result.push(cntNode);
  }
  return result;
};

const flattenedNav = flattenNavTree(postsNav.value!);

watch(selectedOrder, () =>
  flattenedNav?.sort((a, b) => {
    if (selectedOrder.value.direction == 'ASC') {
      return <any>a[selectedOrder.value.key] > <any>b[selectedOrder.value.key]
        ? 1
        : -1;
    } else {
      return <any>a[selectedOrder.value.key] < <any>b[selectedOrder.value.key]
        ? 1
        : -1;
    }
  })
);

const postsIndexPaths: NamedPaths = [
  { name: '主页', to: '/' },
  { name: '文章', to: '/posts' }
];

useHead({
  title: '文章索引'
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
