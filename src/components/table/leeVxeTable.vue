<template>
  <div>
    <vxe-table
      border
      show-overflow
      height="600"
      :scroll-y="{enabled: true, gt: 0}"
      :data="tableData">
      <template v-for="(item, index) in columns" :key="index">
        <template v-if="columns.children">
          <vxe-colgroup :title="item.title">
            <vxe-column v-for="(item2, index2) in columns.children" :type="item2.type" :width="item2.width" :key="index2" :filed="item2.filed" :title="item2.title">
              <template #default="{ row }">
                <slot v-if="item.type === 'slot'" :name="item2.filed" :row="row">
                </slot>
                <template v-else-if="!row._isEdit || !item.editType">
                  <span v-if="item.type !== 'operation'">{{ row[item.filed] }}</span>
                  <!-- 操作列 -->
                  <span v-else>
                    <el-button v-for="(btn, index) in item.buttons" :key="index" :type="btn.type" :size="btn.size" :plain="btn.plain" @click="btn.onClick(row)">
                      {{ btn.label }}
                    </el-button>
                  </span>
                </template>
                <!-- 编辑内容 -->
                <template v-else>
                  <slot v-if="item.editType === 'slot'" :name="item.filed" :row="row">
                  </slot>
                  <component :is="handleComponent(item.editType)" v-model="row[item.filed]" v-bind="item"></component>
                </template>
              </template>
            </vxe-column>
          </vxe-colgroup>
        </template>
        <tempalte v-else>
          <vxe-column :type="item.type" :width="item.width" :key="index" :filed="item.filed" :title="item.title"></vxe-column>
        </tempalte>
      </template>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { type TableData, type TableColumns } from "@/types/types"
import { ElInputNumber, ElInput, ElSelect, ElDatePicker, ElRadioGroup, ElSwitch, ElCheckboxGroup, ElCascader } from 'element-plus';

interface Props {
  tableData: TableData
  columns: TableColumns
}
const props = withDefaults(defineProps<Props>(), {
  tableData: () => [],
  columns: () => [],
})

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

// interface RowVO {
//   id: number
//   name: string
//   role: string
//   sex: string
//   age: number
//   address: string
// }

// const tableData = ref<RowVO[]>([])

// // 模拟行数据
// const loadList = (size = 200) => {
//   const dataList: RowVO[] = []
//   for (let i = 0; i < size; i++) {
//     dataList.push({
//       id: 10000 + i,
//       name: 'Test' + i,
//       role: 'Developer',
//       sex: '男',
//       age: 40,
//       address: 'Address'
//     })
//   }
//   tableData.value = dataList
// }

// loadList(500)
</script>