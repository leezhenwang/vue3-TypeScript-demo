<template>
  <div>
    下拉组件和多选弹窗简单封装
    <div>数据：{{ form }}</div>
    <lee-form :form="form" :formList="formList" @update:form="updateForm">
      <template v-slot:slotTwo>
        <inputSingleSelectTable
          :label="'name'"
          prop="id"
          :formList="formListTwo"
          url="xxxx"
          :columns="[
            { prop: 'id', label: 'id', width: 100 },
            { prop: 'name', label: '姓名', width: 100 },
            { prop: 'age', label: '年龄', width: 100 }
          ]"
          @select="
            (val) => {
              console.log(val)
              form.slotTwo = { label: val.name, value: val.id }
            }
          "
        />
      </template>
      <template v-slot:slotThree>
        <inputMultipleSelectTable
          :label="'name'"
          prop="id"
          url="xxxx"
          :formList="formListThree"
          :columns="[
            { prop: '', label: '', type: 'selection', width: 200 },
            { prop: 'id', label: 'id', width: 200 },
            { prop: 'name', label: '姓名', width: 200 },
            { prop: 'age', label: '年龄', width: 200 }
          ]"
          @select="
            (val) => {
              console.log(val)
              form.slotThree = val
            }
          "
        />
      </template>
    </lee-form>
    测试视频播放
    <VideoPlayer src="https://www.runoob.com/try/demo_source/movie.mp4" />
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue'
import { type FormList, FormInter } from '@/types/types'
import LeeForm from '@/components/form/leeForm.vue'
import inputSingleSelectTable from '@/components/form/inputSingleSelectTable.vue'
import inputMultipleSelectTable from '@/components/form/inputMultipleSelectTable.vue'
const formList = computed<FormList[]>(() => [
  {
    renderType: 'slot',
    label: '单选悬浮窗',
    prop: 'slotTwo',
    span: 12,
    slotName: 'slotTwo',
    rules: [{ required: true, message: '请选择', trigger: 'blur' }]
  },
  {
    renderType: 'slot',
    label: '多选弹窗',
    prop: 'slotThree',
    span: 12,
    slotName: 'slotThree',
    rules: [{ required: true, message: '请选择', trigger: 'blur' }]
  }
])
const formListTwo = computed<FormList[]>(() => [
  {
    renderType: 'ElInput',
    label: '姓名',
    prop: 'name',
    span: 12
  },
  {
    renderType: 'ElInputNumber',
    label: '年龄',
    prop: 'age',
    span: 12
  }
])
const formListThree = computed<FormList[]>(() => [
  {
    renderType: 'ElInput',
    label: '姓名',
    prop: 'name',
    span: 12
  },
  {
    renderType: 'ElInputNumber',
    label: '年龄',
    prop: 'age',
    span: 12
  }
])
const form = reactive<FormInter>({
  name: '',
  elCascader: []
})
/**
 * 更新表单数据
 * @param {Record<string, any>} val - 需要更新的表单数据对象
 * @description 通过 Object.assign 方法将传入的数据对象合并到现有表单对象中
 */
const updateForm = (val: Record<string, any>) => {
  console.log(val)
  Object.assign(form, val)
}
</script>

<style scoped></style>
