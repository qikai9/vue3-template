<template>
  <div class="content">
    <!-- <el-button type="primary" @click="goWorker">流程图</el-button> -->
    <!-- <el-empty description="这是个空项目" /> -->
    <!-- {{ val }}
    <worker></worker> -->
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import Worker from '@/views/worker/index.vue'

const router = useRouter()
const val = ref()
const test = (id) => {
  val.value = id
}

provide('handler', test)

const goWorker = () => {
  router.push({
    name: 'worker'
  })
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  color: $test-color;
}
</style>
