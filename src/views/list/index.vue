<template>
  <div class="container">
    <!-- <div v-for="item of list">
      {{ item }}
    </div> -->
    <iframe :src="src"> IE：你们都看我干吗，我现在也是支持的 </iframe>
  </div>
  <div>
    <el-button @click="go">跳转go</el-button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const src =
  'http://39.99.151.225:20001/icbc/#/dataCenter/loopDataCenter?params=%7B%22condition%22%3A%7B%22key%22%3A%22drama_id%22,%22label%22%3A%22%E5%85%B3%E8%81%94%E4%BF%A1%E6%81%AF%22,%22op%22%3A%22equals%22,%22value%22%3A%22%E5%87%AD%E8%AF%81%E6%9C%89%E9%97%A8%E7%A6%81%22,%22valueText%22%3A%22%E5%87%AD%E8%AF%81%E6%9C%89%E9%97%A8%E7%A6%81%22%7D,%22startTime%22%3A%222023-03-17%2011%3A44%3A42%22,%22endTime%22%3A%222023-03-17%2011%3A41%3A38%22%7D'
const list = []
const num = 100
const initList = () => {
  for (let i = 0; i < num; i++) {
    list.push(i)
  }
}
initList()
const myScroll = () => {
  const container = document.querySelectorAll('.container')
  console.log('container', container)
  container.addEventListener('scroll', () => {
    const offset = container.scrollHeight - container.scrollTop
    const delta = 50

    console.log('offset', offset)

    if (offset <= 500 + delta) {
      // 可以设置滚动锁，锁定滚动监听

      const newDom = document.createElement('div')
      newDom.setAttribute('class', 'item')
      newDom.innerText = '我是新加的'
      container.appendChild(newDom)
    }
  })
}
const go = () => {
  window.open('about:bank', '_top').close()
}
onMounted(() => {
  // myScroll()
})
</script>
<style lang="scss" scoped>
.container {
  height: 500px;
  overflow: auto;
}
</style>
