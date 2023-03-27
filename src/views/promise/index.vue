<template>
  <div>promise</div>
</template>

<script setup>
// const async1 = async () => {
//   await new Promise((resolve) => {
//     console.log('start')
//     resolve()
//   })
//   console.log('A')
// }

// const async2 = () => {
//   new Promise((resolve) => {
//     console.log('B')
//     resolve()
//   })
//     .then(() => {
//       console.log('C')
//     })
//     .then(() => {
//       console.log('D')
//     })
// }

// async1()
// async2()

// const async1 = async () => {
//   await async2()
//   console.log('A')
// }

// const async2 = async () => {
//   return new Promise((resolve) => {
//     resolve()
//   })
// }
// async1()
// new Promise((resolve) => {
//   console.log('B')
//   resolve()
// })
//   .then(() => {
//     console.log('C')
//   })
//   .then(() => {
//     console.log('D')
//   })
async function async1() {
  console.log('1')
  await async2()
  console.log('AAA')
}

async function async2() {
  console.log('3')
  return new Promise((resolve, reject) => {
    resolve()
    console.log('4')
  })
}

console.log('5')

setTimeout(() => {
  console.log('6')
}, 0)

async1()

new Promise((resolve) => {
  console.log('7')
  resolve()
})
  .then(() => {
    console.log('8')
  })
  .then(() => {
    console.log('9')
  })
  .then(() => {
    console.log('10')
  })
console.log('11')
</script>

<style lang="scss" scoped></style>
