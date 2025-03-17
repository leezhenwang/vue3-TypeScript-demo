<template>
  这里是表格示例
  <LeeTable
    :table-data="tableData"
    :table-columns="columns"
    :show-action="true"
    :show-pagination="true"
    :total="100"
    @page-change="handlePageChange"
  >
    <!-- 自定义列内容 -->
    <template #status="{ row }">
      <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
        {{ row.status }}
      </el-tag>
    </template>
    <!-- 自定义操作列内容 -->
    <template #address="{ row }">
      <el-input v-if="row._isEdit" v-model="row.address"></el-input>
      <div v-else>{{ row.address }}</div>
    </template>
  </LeeTable>
</template>
<script lang="ts" setup>
import { reactive } from "vue";

const tableData = reactive([{
    id: 1,
    name: '张三',
    age: 20,
    status: 'success',
    address: '北京'
  },{
    id: 2,
    name: '李四',
    age: 20,
    status: 'danger',
    address: '上海'
  },{
    id: 3,
    name: '王五',
    age: 20,
    status: 'success',
    address: '广州'
  },{
    id: 4,
    name: '赵六',
    age: 20,
    status: 'danger',
    address: '深圳'
  }])

const columns = reactive([{
    prop: 'id',
    label: 'ID',
    width: 100  
},{
    prop: 'name',
    label: '姓名',
    width: 100
},{
    prop: 'age',
    editType: 'ElInputNumber',
    label: '年龄',
    editProps: { min: 0, max: 100 },
    width: 180
},{
    prop: 'status',
    label: '状态',
    renderType: 'slot',
    width: 100
},{
    prop: 'address',
    label: '地址插槽',
    renderType: 'slot',
    editType: 'slot',
    width: 100
},{
    prop: '',
    renderType: 'operation',
    buttons: [{
      label: '编辑',
      type: 'primary',
      onClick: (row: any) => {
        console.log(row)
        row._isEdit = true
      }
    },{
      label: '删除',
      type: 'danger'
    }],
    label: '操作',
    width: 200
}])
const handlePageChange = (page: number) => {
  console.log(page)
}
</script>
