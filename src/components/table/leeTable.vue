<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    v-loading="loading"
    :border="border"
    :stripe="stripe"
  >
    <el-table-column 
      v-for="item in tableList" 
      :fixed="item.fixed" 
      :prop="item.prop" 
      :label="item.label" 
      :width="item.width || 180" 
      :key="item.prop"
    >
      <template #default="{row}">
        <slot v-if="item.type === 'slot'" :name="item.prop" :row="row">
        </slot>
        <template v-else-if="!row._isEdit || !item.editType">
          <span v-if="item.type !== 'operation'">{{ row[item.prop] }}</span>
          <!-- 操作列 -->
          <span v-else>
            <el-button v-for="(btn, index) in item.buttons" :key="index" :type="btn.type" :size="btn.size" :plain="btn.plain" @click="btn.onClick(row)">
              {{ btn.label }}
            </el-button>
          </span>
        </template>
        <!-- 编辑内容 -->
        <template v-else>
          <slot v-if="item.editType === 'slot'" :name="item.prop" :row="row">
          </slot>
          <component :is="handleComponent(item.editType)" v-model="row[item.prop]" v-bind="item"></component>
        </template>
      </template>
    </el-table-column>
  </el-table>
  
  <!-- 分页 -->
  <el-pagination
    v-if="showPagination"
    class="mt-4"
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    @current-change="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { type TableData, type TableList } from "@/types/types"
import { ElInputNumber, ElInput, ElSelect, ElDatePicker, ElRadioGroup, ElSwitch, ElCheckboxGroup, ElCascader } from 'element-plus';

interface Props {
  tableData: TableData
  tableList: TableList
  loading?: boolean
  border?: boolean
  stripe?: boolean
  showPagination?: boolean
  total?: number
  pageSize?: number
  currentPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  tableData: () => [],
  tableList: () => [],
  loading: false,
  border: true,
  stripe: true,
  showPagination: false,
  total: 0,
  pageSize: 10,
  currentPage: 1
})

const emit = defineEmits(['page-change'])

const handlePageChange = (page: number) => {
  emit('page-change', page)
}

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