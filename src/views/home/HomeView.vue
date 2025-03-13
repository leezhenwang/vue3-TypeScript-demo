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
    子组件
    <div v-for="(item,index) in list" :key="index">
      <ListItem :item="item" @itemClick="handleItemClick" :ref="(el)=>handleRef(el,item)"/>
    </div>
    <div @click="handleClick">点击测试路由跳转</div>
    <div>使用pinia {{ counterStore.count  }}</div>
    <div @click="onParentClick">点击测试父组件调用子组件方法</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { request } from '@/utils/axiosInstance'
import ListItem from '@/components/ListItem.vue';
// 测试路由
import { useRouter } from 'vue-router'
const router = useRouter()
// 测试pinia
//1.导入useCounterStore函数
import { useCounterStore } from '@/stores/counter'
//2.调用 useCounterStore() 时，会返回一个 store 实例。
const counterStore = useCounterStore()
//3.在模板中用仓库的state、action、getter时，直接和调用对象的属性或方法一样即可使用

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
// 拓展htmldiv
interface CustomDivElement extends HTMLDivElement {
  childMethod(): void;
}
let refList: (CustomDivElement | null)[] = []
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

const handleClick = () => {
  console.log('handleClick');
  // 路由跳转
  router.push('/test')
}

const handleItemClick = (item: {name: string, id: number}) => {
  console.log(item)
}
const handleRef = (el: CustomDivElement | null, item: {name: string, id: number}) => {
  console.log(el, item)
  refList.push(el);
}

const onParentClick = () => {
  refList[0] && refList[0]?.childMethod()
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
  // 测试增加数量
  counterStore.increment()
})
</script>
<style>

</style>