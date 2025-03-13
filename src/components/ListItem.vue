<template>
  <div style="display: flex;" @click="handleItemClick">
    这是子组件，点击可以触发事件--
    <div>{{ props.item.name }}</div>
    <div>{{ props.item.id }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['itemClick']);
interface Item {
  name: string;
  id: number;
}
const props = withDefaults(defineProps<{item?: Item}>(), {
  item: ()=> ({ name: '1', id: 0 })
});
const handleItemClick = () => {
  emit('itemClick', props.item)
}
const childMethod = ()=>{
  console.log('子组件方法被调用了')
}
defineExpose({
  childMethod
});
</script>

<style scoped>

</style>
