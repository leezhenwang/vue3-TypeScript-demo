<template>
  <el-form ref="form" :model="props.form" :label-width="labelWidth" style="max-width: 1000px">
    <el-row>
        <!--不循环row，直接循环col，放不下会自动往下换行。-->
        <el-col
          v-for="(item,index) in props.formList"
          :span="item.span || 6"
          :key="index"
        >
          <el-form-item :rules="item.rules" :label="item.label" :key="index" :prop="item.prop">
            <template v-if="item.renderType === 'slot'">
              <slot :name="item.slotName"></slot>
            </template>
            <div v-if="item.renderType !== 'slot'">
              <el-cascader v-if="item.renderType === 'ElCascader'" v-model="localForm[item.prop]" :options="item.options" />
              <component v-else :is="handleComponent(item.renderType)" v-model="localForm[item.prop]" v-bind="item">
                <template v-if="item.renderType === 'ElSelect'">
                  <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
                </template>
                <template v-if="item.renderType === 'ElRadioGroup'">
                  <el-radio v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"></el-radio>
                </template>
                <template v-if="item.renderType === 'ElCheckboxGroup'">
                  <el-checkbox v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"></el-checkbox>
                </template>
              </component>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
  </el-form>
  <div style="text-align: right;">
    <el-button v-for="item in buttonList" :key="item.label" @click="emit('button-click',item.btnType)">{{item.text}}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const emit = defineEmits(['update:form', 'button-click']);
import { ElInputNumber, ElInput, ElSelect, ElDatePicker, ElRadioGroup, ElSwitch, ElCheckboxGroup, ElCascader } from 'element-plus';
import {type FormList, FormInter} from "@/types/types"
let props = withDefaults(defineProps<{formList?:FormList, form?:FormInter, labelWidth?:string, buttonList?:{text:string, btnType:string}[]}>(),{
  formList:()=>[],
  form: ()=>({}),
  labelWidth: ()=> '120px',
  buttonList:()=>[],
})

// 使用 computed 属性来创建本地响应式数据
const localForm = computed({
  get: () => props.form,
  set: (value) => {
    // 使用 $emit 向父组件发送事件来更新 form
    emit('update:form', value);
  }
});

const handleComponent = (renderType:string) => {
  switch (renderType) {
    case 'ElInput':
    return ElInput
    case 'ElInputNumber':
    return ElInputNumber
    case 'ElSelect':
    return ElSelect
    case 'ElDatePicker':
    return ElDatePicker
    case 'ElRadioGroup':
    return ElRadioGroup
    case 'ElSwitch':
    return ElSwitch
    case 'ElCheckboxGroup':
    return ElCheckboxGroup
    case 'ElCascader':
    return ElCascader
    default:
      return renderType
  }
}

</script>
