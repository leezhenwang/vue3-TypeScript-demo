<template>
  <div>
    表单组件封装
    <div>数据：{{ form }}</div>
    <lee-form :form="form" :formList="formList" @update:form="updateForm" />
  </div>
</template>
<script setup lang="ts">
import { reactive,computed } from 'vue'
import { type FormList, FormInter } from '@/types/types'
import LeeForm from '@/components/form/leeForm.vue'

const formList = computed<FormList[]>(()=>[
  {
    renderType: 'ElInput',
    label: '姓名',
    prop: 'name',
    rules: [
      { required: true, message: '请输入姓名', trigger: 'blur' }
    ]
  },
  {
    renderType: 'ElInputNumber',
    label: '年龄',
    prop: 'age',
    rules: [ // 动态校验
      { required:form.name, message: '请输入姓名', trigger: 'blur' }
    ]
  },
  {
    renderType: 'ElSelect',
    label: '性别',
    prop: 'sex',
    options: [
      { label: '男', value: '男' },
      { label: '女', value: '女' }
    ]
  },
  {
    renderType: 'ElDatePicker',
    label: '生日',
    prop: 'birthday'
  },
  {
    renderType: 'ElRadioGroup',
    label: '婚姻状况',
    prop: 'marriage',
    options: [
      { label: '未婚', value: '未婚' },
      { label: '已婚', value: '已婚' }
    ]
  },
  {
    renderType: 'ElSwitch',
    label: '开关',
    prop: 'switch'
  },
  {
    renderType: 'ElCheckboxGroup',
    label: '多选框',
    prop: 'checkboxGroup',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' }
    ]
  },
  {
    renderType: 'ElCascader',
    label: '级联选择器',
    prop: 'elCascader',
    options: [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    renderType: 'ElInput',
    label: '备注',
    prop: 'note',
    rows: 2,
    type: 'textarea'
  },
])
const form = reactive<FormInter>({
  name: '',
  elCascader:[]
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
