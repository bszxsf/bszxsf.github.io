<template>
  <nuxt-layout name="default">
    <template v-if="post" #bar>
      <div style="padding: var(--el-menu-base-level-padding)">
        <navigator-post-toc
          :post-item="post"
          :flattened-links
          :active-anchor-index
        />
      </div>
    </template>
    <div v-if="post" style="width: 100%; display: flex">
      <div id="post-content">
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
            overflow-x: visible;
          "
          prose
          class="prose"
        />
      </div>
    </div>
    <error-display404 v-else />
  </nuxt-layout>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content';
import { DateTime } from 'luxon';

// Analyze route
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

// Get post content
const { data: post } = await useAsyncData(postIdStr, () =>
  queryCollection('posts').path(postIdStr).first()
);

// TOC processing
let flattenedLinks: TocLink[] = [];
const flattenLinks = (src: TocLink[], dst: TocLink[]) => {
  for (const link of src) {
    dst.push(link);
    if (link.children) {
      flattenLinks(link.children, dst);
    }
  }
};
if (post.value) {
  flattenLinks(post.value!.body!.toc!.links, flattenedLinks);
}

// TOC follow doc scrolling
const observer = ref<IntersectionObserver | null>(null);
const anchors2idx = new Map<Element, number>();
let allAnchors: Element[] = [];

const visibleElements = new Set<Element>();
const activeAnchor = ref<Element | null>(null);

onMounted(() => {
  // Get elements
  flattenedLinks.forEach(({ id }, index) =>
    anchors2idx.set(document.getElementById(id)!, index)
  );
  allAnchors = Array.from(anchors2idx.keys());

  // Setup intersection observer if post exists
  if (post.value) {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Important things to remember:
      // 1. With `rootMargin: '0px 0px -50% 0px'`, only the upper half of viewport is observed.
      //    Thus, the callback is triggered only when elements enter or leave the upper half.
      // 2. We set `thresholds: [0 1]` to observe both entering and leaving. Without 0
      //    leaving would not be observed.
      // 3. `entries` contains only changed (entered/left) elements, except the first time.
      //    At the first time the callback is called, we can use `getBoundingClientRect().top`
      //    to determine whether the first (it definitely has the least `top`) element is in
      //    the upper half.
      // 4. We may test whether `entry.target` entered or left by testing `entry.isIntersecting`.
      // 5. The callback is called when `entry.intersectionRatio` across some threshold. This may
      //    cause some bouncing: when an element leaves, the callback fires twice: the former with
      //    `intersectionRatio` in (0, 1), the latter with 0. It acts similarly when an element
      //    enters.
      //    Consider such a case:
      //    We have element `a` and element `b`. One scroll makes `a` leave partially, and `b`
      //    enters entirely; this fires callback with `a.intersectionRatio` > 0 and
      //    `b.intersectionRatio` == 1. (This might be possible when they have different heights.)
      //    Immediately, in the same scroll event, `a` leaves entirely, firing callback with
      //    `a.intersectionRatio` == 0.
      //    Our solution is setting the upmost element as active, which means, in this case, `a`
      //    is selected, and `b` will NEVER become active unless another callback is triggered,
      //    even if we test whether `intersectionRatio` is either 0 or 1.
      //    This behavior is quite unexpected. Thus, we have to maintain a list containing all
      //    elements currently displayed in the upper half of the viewport. In each callback
      //    execution, we change the list by testing `entries`, and then iterate over the list to
      //    determine which should be the active one.
      // 6. We set `activeAnchor.value` at most once in each callback execution. Before the
      //    assignment, it stores the last active anchor.
      // Logic:
      // 1. Iterate over `entries` (`entry` as key), if `entry.isIntersection` is true, add it to
      //    `visibleElements`. Otherwise, remove it from `visibleElements`.
      // 2. Iterate over `visibleElements` (`elem` as key). `elem.getBoundingClientRect().top`
      //    should always be non-negative. Pick the `elem` with least `top`, assign it to
      //    `activeAnchor.value`.
      //    We don't directly set `activeAnchor` to avoid bouncing. Instead, we use `candidate` to
      //    temporarily store the result.
      // 3. Depends on `candidate.value`:
      //    1. It is not null. User scrolled to some section. Assign it to `activeAnchor.value`.
      //    2. Otherwise, user scrolled from some anchor to somewhere none of the anchors is in
      //       the viewport. Yet we can't tell whether it is right in the middle of some long
      //       section, or above all anchors, with above information.
      //       There's one thing we can assure: user scrolled from some anchor, so `activeAnchor`
      //       can't be null.
      //       1. User scrolled down. Currently we assume that there's nowhere below all anchors.
      //          Even if this happens, we say the last anchor is active.
      //          In this case, `activeAnchor.value.getBoundingClientRect().top` should be
      //          negative. It's still current section, leave `activeAnchor.value` untouched.
      //       2. User scrolled up.
      //          In this case, `activeAnchor.value.getBoundingClientRect().top` should be
      //          non-negative.
      //          1. User scrolled up to somewhere above all anchors.
      //             `activeAnchor.value` should be the first anchor in this case. Assign null to
      //             `activeAnchor.value`.
      //          2. User scrolled up to another section.
      //             `activeAnchor.value` should be some anchor except the first one. Assign the
      //             previous anchor to `activeAnchor.value`.
      //       3. (Possible initial state) The current position is above all anchors and no scroll
      //          has happened. `activeAnchor.value` is null.
      //          We just left it null in this case.

      // Step 1.
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleElements.add(entry.target);
        } else {
          visibleElements.delete(entry.target);
        }
      });

      // Step 2.
      let minTop = Infinity;
      const candidate = ref<Element | null>(null);
      for (const elem of visibleElements) {
        const elemTop = elem.getBoundingClientRect().top;
        if (elemTop < minTop) {
          minTop = elemTop;
          candidate.value = elem;
        }
      }

      // Step 3.1.
      if (candidate.value) activeAnchor.value = candidate.value;
      else {
        // Step 3.2.
        if (activeAnchor.value == null) {
          // Step 3.2.3.
          return;
        }
        if (activeAnchor.value!.getBoundingClientRect().top < 0) {
          // Step 3.2.1.
          return;
        } else {
          // Step 3.2.2.
          if (anchors2idx.get(activeAnchor.value!) == 0) {
            // Step 3.2.2.1.
            activeAnchor.value = null;
          } else {
            // Step 3.2.2.2.
            activeAnchor.value =
              allAnchors[anchors2idx.get(activeAnchor.value!)! - 1];
          }
        }
      }
    };

    observer.value = new IntersectionObserver(observerCallback, {
      root: null, // Viewport
      rootMargin: '0px 0px -50% 0px',
      threshold: [0, 1]
    });
    for (const elem of allAnchors) {
      observer.value.observe(elem); // `element` should not be null, guaranteed by nuxt content
    }
  }
});
onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
const activeAnchorIndex = computed(() =>
  activeAnchor.value ? anchors2idx.get(activeAnchor.value)! : -1
);

// Page meta
useHead({
  title: postTitleStr
});

definePageMeta({
  // TODO: Nuxt does not support layout with named slots currently, this is an ugly workaround.
  layout: false
});
</script>

<style scoped>
#post-content {
  width: 100%;
}
</style>
