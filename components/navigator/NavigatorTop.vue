<template>
  <!-- TODO: responsive width -->
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    router
    :default-active="decodeURI(route.path).replace(/\/$/, '')"
  >
    <!-- Left side: home page button -->
    <!-- People usually place a logo here, though I don't have one so we put whatever stuff. -->
    <!-- This icon (or whatever) shall navigate to the home page. So using the home icon ought to be a nice choice... -->
    <el-menu-item index="/">
      <el-icon><house /></el-icon>
      Blog主体施工中
    </el-menu-item>

    <!-- Right side: misc stuff -->
    <!-- TODO: search bar, about (author, powered by etc.), github, dark mode switch -->
    <el-menu-item index="/about"> 关于 </el-menu-item>
    <div class="nav-bar-btn" @click="searchDialogVisible = true">
      <el-icon><search /></el-icon>
    </div>
    <div class="nav-bar-non-btn">
      <el-switch
        v-model="isDark"
        :inactive-action-icon="Sunrise"
        :active-action-icon="MoonNight"
        style="--el-switch-on-color: var(--el-switch-off-color)"
        title="深色模式"
      />
    </div>
    <div class="nav-bar-non-btn">
      <nuxt-link
        href="https://github.com/bszxsf/bszxsf.github.io"
        target="_blank"
      >
        <Icon name="carbon:logo-github" />
      </nuxt-link>
    </div>
    <navigator-search-dialog v-model="searchDialogVisible" />
  </el-menu>
</template>

<script setup lang="ts">
import { Sunrise, MoonNight } from '@element-plus/icons-vue';

// The following code fixes a hydration issue.
// With the simple version as many tutorials show:
//   const isDark = useDark()
// Things go wrong when you switch to dark mode and then refresh.
// Dark mode is actually turned on, yet useDark() requires client work.
// Nuxt enables server side rendering, which means, server side renders the
// switch WITHOUT knowing the correct value of useDark(). Thus, we have to
// defer the initialization of isDark.
let isDark = ref(false);
onMounted(() => {
  isDark = useDark({ disableTransition: false });
});

const searchDialogVisible = ref(false);

const route = useRoute();
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.nav-bar-non-btn {
  height: 100%;
  justify-content: center;
  align-content: center;
  display: flex;
  align-items: center;
  padding: 0 var(--el-menu-base-level-padding);
}

.nav-bar-btn {
  height: 100%;
  justify-content: center;
  align-content: center;
  display: flex;
  align-items: center;
  padding: 0 var(--el-menu-base-level-padding);
  transition:
    color var(--el-transition-duration),
    background-color var(--el-transition-duration),
    border-color var(--el-transition-duration);
}
.nav-bar-btn:hover {
  background-color: var(--el-menu-hover-bg-color);
  color: var(--el-menu-hover-text-color);
  outline: none;
  cursor: pointer;
}
</style>
