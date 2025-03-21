<template>
  <!-- It seems impossible to directly include an image from nuxt content markdown. -->
  <!-- Inline-block prevents it from always filling up its containing element. -->
  <div style="display: inline-block" class="not-prose">
    <!-- Some prose style sets a margin for this, a big one. Fortunately it also provided with a class to disable it. -->
    <el-image
      loading="lazy"
      :src="img"
      :fit="fit"
      ref="imageContainer"
      :style="imageContainerStyle"
      style="display: block; margin: 0 auto"
    >
      <template #error>
        <div class="img-err" :style="imageContainerStyle">
          <!-- height: 100% does not work. Even official examples have the same issue... Sigh. -->
          <el-icon><el-icon-picture /></el-icon>
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
  img,
  caption,
  imgWidth,
  imgMinWidth = '50px',
  imgMaxWidth = '100%',
  imgHeight,
  imgMinHeight = '50px',
  imgMaxHeight = '100%',
  fit = 'contain'
} = defineProps<{
  img: string;
  caption?: string;
  imgWidth?: CssLength;
  imgMinWidth?: CssLength;
  imgMaxWidth?: CssLength;
  imgHeight?: CssLength;
  imgMinHeight?: CssLength;
  imgMaxHeight?: CssLength;
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}>();

// Things obtained via useTemplateRef() is available after mount, which is too late for SSR.
let imageContainerStyle: string =
  'min-width: ' + imgMinWidth + '; max-width: ' + imgMaxWidth;
let captionStyle: string = imageContainerStyle;
imageContainerStyle +=
  '; min-height: ' + imgMinHeight + '; max-height: ' + imgMaxHeight;
if (imgWidth != undefined) imageContainerStyle += '; width: ' + imgWidth;
if (imgHeight != undefined) imageContainerStyle += '; height: ' + imgHeight;
</script>

<style scoped>
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
