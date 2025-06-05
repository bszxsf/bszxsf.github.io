<template>
  <!-- Inline-block prevents it from always filling up its containing element. -->
  <div
    class="prose-img-container"
    :style="containerStyle"
    :class="containerClass"
  >
    <el-image
      loading="lazy"
      v-bind="$attrs"
      ref="imageContainer"
      :style="imageContainerStyle"
      style="display: block; margin: 0 auto"
    >
      <template #error>
        <div class="img-err" :style="imageContainerStyle">
          <el-icon><el-icon-picture /></el-icon>
          <span v-if="$attrs['alt']">{{ $attrs['alt'] }}</span>
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
defineOptions({
  inheritAttrs: false
});
// Pass src, alt, title, fit etc. by fallthrough

const {
  caption,
  width,
  height,
  minWidth = '50px',
  maxWidth = '100%',
  minHeight = '50px',
  maxHeight = '100%',
  containerStyle,
  containerClass
} = defineProps<{
  caption?: string;
  width?: CssLength;
  height?: CssLength;
  minWidth?: CssLength;
  maxWidth?: CssLength;
  minHeight?: CssLength;
  maxHeight?: CssLength;
  containerStyle?: string;
  containerClass?: string;
}>();

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
