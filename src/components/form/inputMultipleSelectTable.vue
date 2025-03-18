<template>
  <div class="input-multiple-select-table">
    <el-input v-model="selectedLabels" readonly placeholder="请选择" @click="showTable = true" />
    <el-dialog v-model="showTable" width="80%" title="选择表格数据">
      <lee-form :form="form" :formList="formList" @update:form="updateForm" :buttonList="[{ btnType: 'primary', text: '查询'}]"></lee-form>
      <LeeTable
        ref="tableRef"
        :table-data="tableData"
        :table-columns="columns"
        :show-pagination="true"
        :total="total"
        :rowKey="prop"
        :currentPage="currentPage"
        @page-change="handlePageChange"
        @selection-change="handleSelectionChange"
        @deselected-rows="handelDeselectedRows"
      />
      <!-- 显示已选内容 -->
      <div class="selected-tags" style="height: 200px;border: 1px solid #ccc">
        <el-tag
          v-for="(item, index) in selectedValues"
          :key="index"
          closable
          @close="removeTag(index)"
        >
          {{ item[props.label] }}
        </el-tag>
      </div>
      <template #footer>
        <div>
          <el-button @click="showTable = false">取消</el-button>
          <el-button type="primary" @click="showTable = false">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 显示已选内容 -->
    <div class="selected-tags">
      <el-tag
        v-for="(item, index) in selectedValues"
        :key="index"
        closable
        @close="removeTag(index)"
      >
        {{ item[props.label] }}
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LeeTable from '@/components/table/leeTable.vue'

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  columns: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  prop: {
    type: String,
    default: ''
  },
  formList: {
    type: Array,
    default: () => []
  }
})

interface TableRow {
  [key: string]: any
}

const emit = defineEmits(['update:modelValue', 'pageChange', 'select'])

const showTable = ref(false)
const selectedLabels = ref('')
const selectedValues = ref<TableRow[]>([])
const tableData = ref<TableRow[]>([])
const total = ref(0)
const tableRef = ref()
let currentPage = ref(1)
const form = ref({})

const handlePageChange = (page: number) => {
  emit('pageChange', page)
  currentPage.value = page
  getData(page)
}

const handleSelectionChange = (rows: TableRow[]) => {
  rows.forEach((row) => {
    const index = selectedValues.value.findIndex((item) => item[props.prop] === row[props.prop])
    if (index === -1) {
      selectedValues.value.push(row)
    }
  })
  selectedLabels.value = rows.map((row) => row[props.label]).join(', ')
  emit('select', rows)
}

const handelDeselectedRows = (rows: TableRow[]) => {
  rows.forEach((row) => {
    const index = selectedValues.value.findIndex((item) => item[props.prop] === row[props.prop])
    if (index !== -1) {
      selectedValues.value.splice(index, 1)
    }
  })
  selectedLabels.value = rows.map((row) => row[props.label]).join(', ')
}

const removeTag = (index: number) => {
  const [row] = selectedValues.value.splice(index, 1)
  selectedLabels.value = selectedValues.value.map((row) => row[props.label]).join(', ')
  tableRef.value.cancelRowSelection(row)
}

const getData = (page: number) => {
  console.log(page)
  // 获取数据
  setTimeout(() => {
    tableData.value = [
      { id: currentPage.value * 10 + 1, name: currentPage.value + '张三', age: 20 },
      { id: currentPage.value * 10 + 2, name: currentPage.value + '李四', age: 20 },
      { id: currentPage.value * 10 + 3, name: currentPage.value + '王五', age: 20 }, 
    ] 
    total.value = 100
    if(tableRef.value){
      tableRef.value.setRowsSelection(selectedValues.value)
    }
  },1000) 
}

const updateForm = (val: Record<string, any>) => {
  console.log(val)
  Object.assign(form, val)
}

onMounted(() => {
  if (props.url) {
    // 获取数据
    getData(1)
  }
})
</script>

<style scoped>
.input-multiple-select-table {
  position: relative;
}

.selected-tags {
  margin-top: 8px;
}

.selected-tags .el-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
