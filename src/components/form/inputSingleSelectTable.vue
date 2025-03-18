<!-- input框选择组件 -->
<template>
  <div class="input-select-table">
    <el-popover placement="bottom" :width="400" trigger="click">
      <template #reference>
        <el-input v-model="selectedValue" readonly placeholder="请选择" @click="showTable = true" />
      </template>
      <lee-form :form="form" :formList="formList" labelWidth="auto" @update:form="updateForm" 
      :buttonList="[{ btnType: 'primary', text: '查询'}]"></lee-form>
      <LeeTable
        :table-data="tableData"
        :table-columns="columns"
        :show-pagination="true"
        :total="total"
        :current-page="currentPage"
        rowKey="prop"
        @page-change="handlePageChange"
        @row-click="handleRowClick"
      />
    </el-popover>
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
const selectedValue = ref('')
const tableData = ref<TableRow[]>([])
let total = ref(0)
let currentPage = ref(1)
const form = ref({})

const handlePageChange = (page: number) => {
  emit('pageChange', page)
  currentPage.value = page
  getData(page)
}

const handleRowClick = (row: any) => {
  console.log('handleRowClick', row)
  selectedValue.value = row[props.label]
  showTable.value = false
  emit('select', row)
}
const getData = (page: number = 1) => {
  console.log(page, form.value)
  if (props.url) {
    // 获取数据
    setTimeout(() => {
      tableData.value = [
        {
          id: currentPage.value *10 + 1,
          name: '张三',
          age: 20
        },
        {
          id: currentPage.value *10 + 2,
          name: '李四',
          age: 20
        },
        {
          id: currentPage.value *10 + 3,
          name: '王五',
          age: 20
        },
        {
          id: currentPage.value *10 + 4,
          name: '赵六',
          age: 20
        }
      ] 
      total.value = 100 
    }) 
  } 
}
const updateForm = (val: Record<string, any>) => {
  console.log(val)
  Object.assign(form, val)
}
onMounted(() => {
  if (props.url) {
    getData()
  }
})
</script>

<style scoped>
.input-select-table {
  position: relative;
}
</style>
