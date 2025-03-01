<template>
  <div style="display: flex;">
    <div>{{ props.item.name }}</div>
    <div>{{ props.item.id }}</div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  name: string;
  id: number;
}
const props = withDefaults(defineProps<{item?: Item}>(), {
  item: ()=> ({ name: '1', id: 0 })
});
</script>

<style scoped>

</style>
