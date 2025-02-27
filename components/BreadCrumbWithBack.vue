<template>
  <div style="display: flex">
    <div @click="router.back()">返回</div>
    <div class=""el-divider el-divider--vertical></div>
    <!-- We don't modify the paths. Path doesn't have an id. No need to use a key. -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="path in paths" :to="path.to">
        {{ path.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
  import { ArrowRight } from '@element-plus/icons-vue'

  const router = useRouter()

  let { paths } = defineProps<{paths:NamedPaths}>()
</script>
