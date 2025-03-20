<template>
  <div :class="itemCss" class="nav-item">
    <nuxt-link style="padding: 0 var(--el-main-padding)" :to="to">
      <div class="additional-info" v-if="published">
        <p>
          发布于&nbsp;{{
            DateTime.fromISO(published).toLocaleString(DateTime.DATETIME_FULL)
          }}
        </p>
        <p v-if="modified">
          最后修改于&nbsp;{{
            DateTime.fromISO(modified).toLocaleString(DateTime.DATETIME_FULL)
          }}
        </p>
      </div>
      <p class="item-title">{{ title }}</p>
      <div v-if="description.length > 1" class="abstract">
        {{ description }}
      </div>
      <div v-else class="abstract italic">&lt;本文没有摘要&gt;</div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

const {
  title,
  description,
  published,
  modified,
  border = 'none'
} = defineProps<{
  title: string;
  description: string;
  to: string;
  published?: string;
  modified?: string;
  border?: 'both' | 'none' | 'top' | 'bottom';
}>();

let itemCss = '';
switch (border) {
  case 'none':
    break;
  case 'bottom':
    itemCss = 'nav-item-border-bottom';
    break;
  case 'top':
    itemCss = 'nav-item-border-top';
    break;
  // It can be tricky simply fallthrough here, but in current way it's clearer.
  case 'both':
    itemCss = 'nav-item-border-top nav-item-border-bottom';
    break;
}
</script>

<style scoped>
@reference 'tailwindcss';

.nav-item {
  position: relative;
}
.nav-item::before {
  z-index: -1;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--el-color-primary-light-9);
  background-size: contain;

  mask-image: linear-gradient(
    120deg,
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 0.2) 20%,
    rgba(0, 0, 0, 0) 25%
  );
  /* Trick: linear-gradient cannot have a transition, */
  /* but we still can move it via `mask-position`, */
  /* which can trigger a transition. */
  mask-size: 200% 100%;
  mask-position: right;
  transition: mask-position 0.5s ease;
  /* mix-blend-mode: difference; */
}
.nav-item:hover::before {
  mask-position: left;
  /* mix-blend-mode: difference; */
}

.nav-item-border-top {
  border-top: 1px var(--el-border-color) var(--el-border-style);
}
.nav-item-border-bottom {
  border-bottom: 1px var(--el-border-color) var(--el-border-style);
}

.item-title {
  @apply text-2xl;
  padding: 0 var(--el-main-padding) var(--el-main-padding);
}
.additional-info {
  @apply float-right text-gray-500 italic text-[0.8rem];
  padding: var(--el-main-padding) var(--el-main-padding) 0;
  text-align: right;
}
.abstract {
  @apply text-base text-gray-600;
  padding: 0 var(--el-main-padding);
}
.dark .abstract {
  @apply text-gray-400;
}
</style>
