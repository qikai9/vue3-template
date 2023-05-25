<template>
  <div class="container">
    <el-checkbox v-model="oppositeCheck" @change="changeOpposite"> 反选</el-checkbox>
    <el-table :data="tableData"  @selection-change="handleSelectionChange" ref="tableRef" row-key="id">
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column type="index" :index="$index" label="序号" min-width="80"></el-table-column>
      <el-table-column prop="id" label="id" v-if="showProps('id')" min-width="80"></el-table-column>
      <el-table-column prop="name" label="名称" v-if="showProps('name')" min-width="80">
        <template #header>
          <div>
            <span>名称</span>
            <el-icon><Search /></el-icon>
          </div>
        </template>
        <template #default="scope">
          <div @click="canEdit(scope.row)" @mouseleave="notEdit(scope.row)">
            <el-input v-model="scope.row.name" v-if="scope.row.isEdit"></el-input>
            <span v-else>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="like" label="喜欢" v-if="showProps('like')"></el-table-column>
      <el-table-column fixed="right" :width="100">
        <template #header>
          <div>
            <el-tooltip effect="light">
              <template #content>
                <el-checkbox-group v-model="tableCheckedProps">
                  <el-checkbox
                    v-for="item of tableProps"
                    :key="item.value"
                    :label="item.value"
                    style="display: block; margin-top: 10px"
                    >{{ item.text }}</el-checkbox
                  >
                </el-checkbox-group>
              </template>
              <el-icon><CaretBottom /></el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="save">保存</el-button>
    <el-table :data="newtableData">
      <el-table-column type="index" :index="$index" label="序号" width="80"></el-table-column>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="like" label="喜欢"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { Search, CaretBottom } from '@element-plus/icons-vue'
import { ref, onBeforeMount, onMounted } from 'vue'
const tableProps = ref([
  { text: 'id', value: 'id' },
  { text: '名称', value: 'name' },
  { text: '喜欢', value: 'like' }
])

const tableCheckedProps = ref(['id', 'name', 'like'])
const tableData = ref([
  {
    id: 1,
    name: '邓皓月',
    like: '运动'
  },
  {
    id: 2,
    name: '邺琳玲',
    like: '吃'
  },
  {
    id: 1,
    name: '邓皓月',
    like: '运动'
  },
  {
    id: 2,
    name: '邺琳玲',
    like: '吃'
  },
  {
    id: 1,
    name: '邓皓月',
    like: '运动'
  },
  {
    id: 2,
    name: '邺琳玲',
    like: '吃'
  },
  {
    id: 3,
    name: '邓皓月',
    like: '运动'
  },
  {
    id: 4,
    name: '邺琳玲',
    like: '吃'
  },
  {
    id: 5,
    name: '邓皓月',
    like: '运动'
  },
  {
    id: 6,
    name: '邺琳玲',
    like: '吃'
  },
  {
    id: 7,
    name: '邓皓月',
    like: '运动'
  },
  {
    id: 8,
    name: '邺琳玲',
    like: '吃'
  },
  {
    id: 9,
    name: '邓皓月',
    like: '运动'
  },
  {
    id: 10,
    name: '邺琳玲',
    like: '吃'
  },
  {
    id: 11,
    name: '邓皓月',
    like: '运动'
  },
  {
    id: 12,
    name: '邺琳玲',
    like: '吃'
  }
])

const oppositeTableData = ref([])
const newtableData = ref([])
const canEdit = (row) => {
  row.isEdit = true
}

const notEdit = (row) => {
  row.isEdit = false
}

const save = () => {
  console.log('new', tableData.value)
  newtableData.value = tableData.value
}

const filterHandler = (value, row, column) => {
  console.log('filter', value, row, column)
}

const showProps = (prop) => {
  return tableCheckedProps.value.includes(prop)
}
// 勾选的数据
const selectionIds = ref([])
const allIds = ref([])
const handleSelectionChange = (row) => {
  let ids= []
  for(let item of row) {
    ids.push(item.id)
  }
  selectionIds.value = ids
}

const oppositeCheck = ref(false)
const changeOpposite = (val) => {
  // 未勾选的数据
  oppositeTableData.value = tableData.value.filter(item => {
    return !selectionIds.value.includes(item.id)
  })
  // 取消所有勾选
  tableRef.value.clearSelection()
  // 勾选之前未勾选的数据
  for(let item of oppositeTableData.value) {
    tableRef.value.toggleRowSelection(item)
  }
}

const initAllIds = () => {
  let ids = []
  for(let item of tableData.value) {
    ids.push(item.name)
  }
  allIds.value = ids
}

const tableRef = ref()
onBeforeMount(() => {
  initAllIds()
})

onMounted(() => {
  // tableRef.value.toggleRowSelection(tableData.value[0])
})
</script>
<style lang="scss" scoped>
.container {
  overflow: auto;
}
:deep(.el-checkbox) {
  height: auto;
}
</style>
