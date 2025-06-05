<template>
  <!-- It seems impossible to directly include an image from nuxt content markdown. -->
  <!-- Inline-block prevents it from always filling up its containing element. -->
  <div class="prose-img-container">
    <!-- Some prose style sets a margin for this, a big one. Fortunately it also provided with a class to disable it. -->
    <el-image
      loading="lazy"
      :src
      :fit
      ref="imageContainer"
      :style="imageContainerStyle"
      style="display: block; margin: 0 auto"
      :title
    >
      <template #error>
        <div class="img-err" :style="imageContainerStyle">
          <!-- height: 100% does not work. Even official examples have the same issue... Sigh. -->
          <el-icon><el-icon-picture /></el-icon>
          <span v-if="alt">{{ alt }}</span>
        </div>
      </template>
    </el-image>
    <div
      v-if="caption"
      class="text-gray-300 text-sm"
      style="
        margin: 0 auto;
        text-align: center;
        position: relative;
        padding-top: 0.5em;
      "
      :style="captionStyle"
    >
      {{ caption }}
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  src,
  alt,
  title,
  caption,
  width,
  height,
  minWidth = '50px',
  maxWidth = '100%',
  minHeight = '50px',
  maxHeight = '100%',
  fit = 'contain'
} = defineProps<{
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  width?: CssLength;
  height?: CssLength;
  minWidth?: CssLength;
  maxWidth?: CssLength;
  minHeight?: CssLength;
  maxHeight?: CssLength;
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}>();

// Things obtained via useTemplateRef() is available after mount, which is too late for SSR.
let imageContainerStyle: string =
  'min-width: ' + minWidth + '; max-width: ' + maxWidth;
let captionStyle: string = imageContainerStyle;
imageContainerStyle +=
  '; min-height: ' + minHeight + '; max-height: ' + maxHeight;
if (width != undefined) imageContainerStyle += '; width: ' + width;
if (height != undefined) imageContainerStyle += '; height: ' + height;
</script>

<style scoped>
.img-prose-container {
  display: inline-block;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.img-err {
  width: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>
