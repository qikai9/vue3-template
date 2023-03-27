<template>
  <div>
    <h1>ref:</h1>
    <div>{{ arrRef }}</div>
    <h1>reactive:</h1>
    <div>{{ arrReactive }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, isRef, unref, toRef } from 'vue'
const arrRef = ref({
  name: 'vue',
  version: ['2.0', '3.0']
})
const arrReactive = reactive({
  name: 'vue',
  version: ['2.0', '3.0']
})
// console.log('arrRef', arrRef)
// console.log('arrREactive', arrReactive)
// console.log('isRef', isRef(arrReactive), isRef(arrRef))
// console.log('unref', unref(arrRef), unref(arrReactive))

const fooRef = toRef(arrRef, 'name')
console.log('fooRef', fooRef.value)
console.log('arrRef', arrRef)
const reactiveFoo = toRef(arrReactive, 'name')
console.log('reactiveFoo', reactiveFoo)
</script>

<style lang="scss" scoped></style>
