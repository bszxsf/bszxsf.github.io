<template>
  <el-menu mode="vertical" router>
    <el-menu-item-group title="文章">
      <el-menu-item :disabled="true">
        空空如也
        <!-- TODO: 将这个替换为根据实际内容来判断是否显示空 -->
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="其他">
      <el-menu-item index="/">
        <template #title>
          <el-icon><HomeFilled /></el-icon>
          <span>主页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/about">
        <template #title>
          <el-icon><InfoFilled /></el-icon>
          <span>关于</span>
        </template>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>
