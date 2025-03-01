<template>
  <div class="about">
    <div>这里是ts的常见示例</div>
    <div>字符串：{{ str }}</div>
    <div>数字：{{ num }}</div>
    <div>布尔型：{{ bool }}</div>
    <div>数组：{{ arr }}</div>
    <div>对象：{{ obj.name }}</div>
    <div>可选： {{ input }}</div>
    <div>使用接口：{{ interfa }}</div>
    <div>使用泛型：{{ fanxing }}</div>
    <div v-for="(item,index) in list" :key="index">
      <ListItem :item="item"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { request } from '@/utils/axiosInstance'
import ListItem from '@/components/ListItem.vue';
// 可选
const input = ref< HTMLInputElement | null >(null)
const str = ref<string>('这里是首页')
const num = ref<number>(1)
const bool = ref<boolean>(true)
const arr = ref<string[]>(['1', '2', '3'])
const list = ref([{name: '1', id: 1},{name: '2', id: 2}])
const obj = reactive<{name: '123'}>({
  name: '123'
})
const interfa = ref<string>('')
const fanxing = ref<string>('')
interface User {
  name: string,
  age: number
}
function getUser(user: User): string {
  return `Name: ${user.name}, Age: ${user.age}`
}

function getUser2<T extends User>(user: T): string {
  return `Name: ${user.name}, Age: ${user.age}`
}

onMounted(() => {
  console.log('mounted');
  // 使用 request 发送请求
  request.get<string>('/default/getTypeInfo').then(response => {
    console.log(response.data)
  })
  interfa.value = getUser({
    name: 'lzw',
    age: 18
  })
  fanxing.value = getUser2({
    name: 'lzw',
    age: 18,
    height: 666
  })
})
</script>
<style>

</style>