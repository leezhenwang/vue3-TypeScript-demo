<template>
  <el-table
    ref="tableRef"
    :data="tableData"
    style="width: 100%;margin-top: 10px"
    v-loading="loading"
    :border="border"
    :stripe="stripe"
    :row-key="rowKey"
    highlight-current-row
    v-on="$attrs"
    @row-click="emit('row-click', $event)"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      v-for="item in tableColumns"
      :fixed="item.fixed"
      :prop="item.prop"
      :type="item.type"
      :label="item.label"
      :width="item.width || 180"
      :key="item.prop"
    >
      <template #default="{ row }" v-if="item.type !== 'selection' && item.type !== 'index'">
        <slot v-if="item.renderType === 'slot'" :name="item.prop" :row="row"> </slot>
        <template v-else-if="!row._isEdit || !item.editType">
          <span v-if="item.renderType !== 'operation'">{{ row[item.prop] }}</span>
          <!-- 操作列 -->
          <span v-else>
            <el-button
              v-for="(btn, index) in item.buttons"
              :key="index"
              :type="btn.type"
              :size="btn.size"
              :plain="btn.plain"
              @click="btn.onClick(row)"
            >
              {{ btn.label }}
            </el-button>
          </span>
        </template>
        <!-- 编辑内容 -->
        <template v-else>
          <slot v-if="item.editType === 'slot'" :name="item.prop" :row="row"> </slot>
          <component
            :is="handleComponent(item.editType)"
            v-model="row[item.prop]"
            v-bind="item.editProps"
          ></component>
        </template>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination
    v-if="showPagination"
    style="margin-top: 10px"
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
import { ref, defineProps, defineEmits, withDefaults, nextTick } from 'vue'
import { type TableData, type TableColumns, TableDataInter } from '@/types/types'
import {
  ElInputNumber,
  ElInput,
  ElSelect,
  ElDatePicker,
  ElRadioGroup,
  ElSwitch,
  ElCheckboxGroup,
  ElCascader
} from 'element-plus'

interface Props {
  tableData: TableData
  tableColumns: TableColumns
  loading?: boolean
  border?: boolean
  stripe?: boolean
  showPagination?: boolean
  total?: number
  pageSize?: number
  currentPage?: number
  rowKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  tableData: () => [],
  tableColumns: () => [],
  rowKey: 'id',
  loading: false,
  border: true,
  stripe: true,
  showPagination: false,
  total: 0,
  pageSize: 10,
  currentPage: 1
})
const tableRef = ref()
const emit = defineEmits(['page-change', 'row-click', 'selection-change', 'deselectedRows'])
const isPageChanging = ref(false) // 标记是否正在切换分页
const handlePageChange = (page: number) => {
  isPageChanging.value = true
  emit('page-change', page)
}

const toggleSelection = (row: TableDataInter, select: boolean) => {
  tableRef.value.toggleRowSelection(row, select)
}

const cancelRowSelection = (cancelRow: TableDataInter) => {
  const row = props.tableData.find(
    (item: TableDataInter) => item[props.rowKey] === cancelRow[props.rowKey]
  )
  console.log('cancelRowSelection', cancelRow, row, props.rowKey)
  if (row) {
    tableRef.value.toggleRowSelection(row, false)
  }
}
const setRowsSelection = (rows: TableDataInter[]) => {
  nextTick(() => {
    rows.forEach((row: TableDataInter) => {
      const tableRow = props.tableData.find(
        (item: TableDataInter) => item[props.rowKey] === row[props.rowKey]
      )
      if (tableRow) {
        console.log('tableRow', tableRow, row, props.rowKey)

        toggleSelection(tableRow, true)
      }
    })
  })
}
const previousSelection = ref<TableDataInter[]>([])

const handleSelectionChange = (rows: TableDataInter[]) => {
  // 如果是分页切换，跳过 deselectedRows 逻辑
  if (isPageChanging.value) {
    isPageChanging.value = false
    previousSelection.value = rows
  } else {
    // 找出被取消勾选的数据
    const deselectedRows = previousSelection.value.filter(
      (prevRow: TableDataInter) => !rows.some((row) => row[props.rowKey] === prevRow[props.rowKey])
    )

    // 输出被取消勾选的数据
    if (deselectedRows.length > 0) {
      console.log('取消勾选的数据：', deselectedRows)
    }

    // 更新当前选中数据
    previousSelection.value = rows
    emit('deselectedRows', deselectedRows)
  }
  emit('selection-change', rows)
}

const handleComponent = (renderType: string) => {
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
defineExpose({
  toggleSelection,
  cancelRowSelection,
  setRowsSelection
})
</script>
