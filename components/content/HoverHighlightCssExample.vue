<template>
  <div class="nav-item">控件</div>
</template>

<style scoped>
.nav-item {
  width: 100%;
  height: 2em;
  position: relative;
  border: 1px solid blue;
  user-select: none;
  padding-left: 1em;
}
.nav-item::before {
  z-index: -1;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: blue;
  background-size: contain;

  mask-image: linear-gradient(
    120deg,
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 0.2) 20%,
    rgba(0, 0, 0, 0) 25%
  );
  mask-size: 200% 100%;
  mask-position: right;
  transition: mask-position 0.5s ease;
}
.nav-item:hover::before {
  mask-position: left;
}
</style>
