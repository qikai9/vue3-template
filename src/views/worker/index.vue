<template>
  <div class="flow-layout">
    <div class="flow-editor">
      <!-- <div class="flow-zoom" :data-zoom="canvasDataRoom + '%'">
        <div class="zoom-btn">
          <el-button
            size="mini"
            :class="{ 'el-button--primary': canvasRoomMinusEnable }"
            icon="el-icon-minus"
            circle
            @click="handleMinusCanvas"
          ></el-button>
        </div>
        <div class="zoom-btn">
          <el-button
            size="mini"
            :class="{ 'el-button--primary': canvasRoomPlusEnable }"
            icon="el-icon-plus"
            circle
            @click="handlePlusCanvas"
          ></el-button>
        </div>
      </div> -->

      <div class="canvas-container" :data-zoom="canvasDataRoom">
        <!-- <div class="campaignCanvas"> -->
        <div id="editArea">
          <div class="item1" id="item1" @click="edit('第一个')">123</div>
          <div class="item2" id="item2" @click="edit('第二个')">456</div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { jsPlumb } from 'jsplumb'
import { onMounted, inject } from 'vue'

const instance = jsPlumb.getInstance() // jsplumb实例
const handler = inject('handler', () => {}, false)

const edit = (val) => {
  handler(val)
}

onMounted(() => {
  jsPlumb.draggable('editArea', {})
  importDefaults()
  instanceReady()
  // handler('id是1')
})

const importDefaults = () => {
  instance.importDefaults({
    Container: 'editArea', // 容器id
    PaintStyle: {
      stroke: '#409EFF', // 线的颜色
      strokeWidth: 2, // 线的粗细，值越大线越粗
      outlineStroke: 'transparent', // 设置外边线的颜色，默认设置透明，这样别人就看不见了，点击线的时候可以不用精确点击
      outlineWidth: 10 // 线外边的宽，值越大，线的点击范围越大
    },
    DeleteEndpointsOnDetach: true, //删除连线同时是否删除端点
    HoverPaintStyle: {
      stroke: '#409EFF',
      strokeWidth: 2
    }, // 鼠标滑过线的样式
    Overlays: [
      [
        'Arrow', // 箭头样式
        {
          width: 10, // 箭头尾部的宽度
          length: 8, // 从箭头的尾部到头部的距离
          location: 1, // 位置，建议使用0～1之间
          direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
          foldback: 0.623 // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
        }
      ],
      [
        'Label', //条件样式
        {
          label: '',
          location: 0.4,
          cssClass: 'aLabel'
        }
      ]
    ]
  })
}

const instanceReady = () => {
  instance.ready(() => {
    instance.connect({
      source: 'item1',
      target: 'item2',
      endpoint: 'Blank',
      connector: 'Flowchart',
      anchors: ['Right', 'Left'],
      overlays: [
        // [
        //   'Arrow',
        //   {
        //     width: 10, // 箭头尾部的宽度
        //     length: 20, // 从箭头的尾部到头部的距离
        //     location: 0.6, // 箭头位置，建议使用0～1之间
        //     direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
        //     foldback: 0.623 // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
        //   }
        // ],
        [
          'Label',
          {
            label: '条件1',
            location: 0.6, // label在连线上的位置，取0-1之间
            cssClass: 'aLabel' // 连线的类名，可以用来自定义样式
          }
        ]
      ]
    })
  })
  instance.draggable(['item1', 'item2'], {
    containment: 'editAera', //拖拽元素的父级id
    stop(el) {
      //拖拽结束后的回调
      console.log('拖拽结束: ', el)
    }
  })
}
</script>

<style lang="scss" scoped>
.flow-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.flow-editor {
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
}

.canvas-container {
  flex: 1;
  overflow: auto;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#ccc 1px, transparent 0),
    linear-gradient(90deg, #ddd 1px, transparent 0);
  background-size: 30px 30px;
}
.canvas-container:before {
  content: '';
  // height: 10px;
  height: 10px;
  width: 100%;
  display: block;
  background-repeat-y: no-repeat;
  position: absolute;
  background-image: linear-gradient(90deg, #ccc 1px, transparent 0),
    linear-gradient(90deg, #ddd 1px, transparent 0);
  // background-size: 75px 10px, 5px 5px;
  background-size: 75px 10px, 5px 5px;
}

.canvas-container:after {
  content: '';
  height: 100%;
  width: 10px;
  display: block;
  background-repeat-x: no-repeat;
  position: absolute;
  top: 0;
  background-image: linear-gradient(#ccc 1px, transparent 0),
    linear-gradient(#ddd 1px, transparent 0);
  background-size: 10px 75px, 5px 5px;
}
.canvas-container[data-zoom='100'] {
  background-image: linear-gradient(#eee 1px, transparent 0),
    linear-gradient(90deg, #eee 1px, transparent 0), linear-gradient(#f5f5f5 1px, transparent 0),
    linear-gradient(90deg, #f5f5f5 1px, transparent 0);
  background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
}

.canvas-container[data-zoom='90'] {
  background-image: linear-gradient(#eee 1px, transparent 0),
    linear-gradient(90deg, #eee 1px, transparent 0), linear-gradient(#f5f5f5 1px, transparent 0),
    linear-gradient(90deg, #f5f5f5 1px, transparent 0);
  background-size: 70px 70px, 70px 70px, 14px 14px, 14px 14px;
}

.canvas-container[data-zoom='80'] {
  background-image: linear-gradient(#eee 1px, transparent 0),
    linear-gradient(90deg, #eee 1px, transparent 0), linear-gradient(#f5f5f5 1px, transparent 0),
    linear-gradient(90deg, #f5f5f5 1px, transparent 0);
  background-size: 60px 60px, 60px 60px, 12px 12px, 12px 12px;
}

.canvas-container[data-zoom='70'] {
  background-image: linear-gradient(#eee 1px, transparent 0),
    linear-gradient(90deg, #eee 1px, transparent 0), linear-gradient(#f5f5f5 1px, transparent 0),
    linear-gradient(90deg, #f5f5f5 1px, transparent 0);
  background-size: 55px 55px, 55px 55px, 11px 11px, 11px 11px;
}

.canvas-container[data-zoom='60'] {
  background-image: linear-gradient(#eee 1px, transparent 0),
    linear-gradient(90deg, #eee 1px, transparent 0), linear-gradient(#f5f5f5 1px, transparent 0),
    linear-gradient(90deg, #f5f5f5 1px, transparent 0);
  background-size: 45px 45px, 45px 45px, 9px 9px, 9px 9px;
}

.canvas-container[data-zoom='50'] {
  background-image: linear-gradient(#eee 1px, transparent 0),
    linear-gradient(90deg, #eee 1px, transparent 0), linear-gradient(#f5f5f5 1px, transparent 0),
    linear-gradient(90deg, #f5f5f5 1px, transparent 0);
  background-size: 40px 40px, 40px 40px, 8px 8px, 8px 8px;
}
#editArea {
  width: 100%;
  height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.item1 {
  position: absolute;
  top: 100px;
  left: 50px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border: dashed 1px #333333;
}
.item2 {
  position: absolute;
  top: 100px;
  left: 200px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border: dashed 1px #333333;
}
</style>
