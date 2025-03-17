<template>
  这里是表格示例
  <leeVxeTable
    :table-data="tableData"
    :table-columns="columns"
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
  </leeVxeTable>
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
    field: 'id',
    title: 'ID',
    width: 100  
},{
    field: 'name',
    title: '姓名',
    width: 100
},{
    field: 'age',
    editType: 'ElInputNumber',
    title: '年龄',
    editProps: { min: 0, max: 100 },
    width: 180
},{
    field: 'status',
    title: '状态',
    type: 'slot',
    width: 100
},{
    field: 'address',
    title: '地址插槽',
    type: 'slot',
    editType: 'slot',
    width: 100
},{
    field: '',
    type: 'operation',
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
