<template>
  <!-- Workaround an absurd design defect: -->
  <!-- https://github.com/nuxt/content/issues/1537 -->
  <!-- This defect causes tons of hydration warnings. -->
  <div v-if="isImg"><slot /></div>
  <p v-else><slot /></p>
</template>

<script setup lang="ts">
const slots = useSlots();
const isImg = computed(() => {
  // `slots.default` can't be undefined since this is generated wrapped content.
  // I'm not pretty sure about `slots.default!()[0]`, this thing seems poorly documented, or hides too deep in the documents. The only thing I'm sure is, the Vue VNode type has something to do with this. Though, I guess Nuxt extended VNode and I found no evidence, no document about this.
  // I found nothing about the `tag` property.
  // To investigate more about this line of code, we need to go deeper to Vue and Nuxt source code and documents. We may do this later.
  return (slots.default!()[0].type as any).tag == 'img';
});
</script>
