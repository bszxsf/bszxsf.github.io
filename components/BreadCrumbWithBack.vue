<template>
  <!-- ElPageHeader is too heavy for this. -->
  <!-- Note: This component is not designed to be fixed on the top. -->
  <div style="display: flex">
    <div @click="router.back()" class="el-breadcrumb bc-back-btn">
      <!-- ElBreadcrumb style, including font size, seems hardcoded. -->
      <!-- We simply have to directly use the class. -->
      <el-icon><Back /></el-icon>
      <div
        style="
          font-weight: bold;
          padding-left: calc(var(--el-main-padding) * 0.2);
        "
      >
        返回
      </div>
    </div>
    <el-divider direction="vertical" />
    <!-- We don't modify the paths. Path doesn't have an id. No need to use a key. -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="path in paths" :to="path.to">
        {{ path.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';

const router = useRouter();

let { paths } = defineProps<{ paths: NamedPaths }>();
</script>

<style scoped>
.bc-back-btn {
  display: flex;
  cursor: pointer;
  line-height: 1;
  color: var(--el-text-color-primary);
  transition: var(--el-transition-color);
  /* consistency with element plus primary style */
}
</style>
