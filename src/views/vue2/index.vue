<template>
  <el-form
    :model="searchParams"
    ref="refForm"
    label-width="120px"
    :class="activeFlag ? 'down' : 'up'"
    class="default-search scanSearch clearfix"
  >
    <div class="search_left b-dib">
      <el-form-item label="任务名称:" prop="name" class="b-dib search-item" v-if="tabsType === '1'">
        <el-autocomplete
          v-model.trim="searchParams.name"
          :fetch-suggestions="taskSearch"
          placeholder="请输入任务名称"
          value-key="value"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item
        label="检测状态:"
        prop="status"
        class="b-dib search-item"
        v-if="tabsType === '1'"
      >
        <el-select clearable v-model="searchParams.status" placeholder="检测状态">
          <el-option
            v-for="item in scanStatusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="API名称:" prop="name" class="b-dib search-item" v-if="tabsType === '2'">
        <el-autocomplete
          v-model.trim="searchParams.name"
          :fetch-suggestions="apiSearch"
          placeholder="请输入API名称"
          value-key="value"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="创建人:" prop="creator" class="b-dib search-item">
        <el-autocomplete
          v-model.trim="searchParams.creator"
          :fetch-suggestions="userSearch"
          placeholder="请输入创建人"
          value-key="value"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="创建时间:" prop="time" class="b-dib search-item">
        <el-date-picker
          @change="dateChange"
          v-model="searchParams.time"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          type="daterange"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
    </div>
    <div class="search_right">
      <el-button type="primary" size="small" @click="onSearch"> 搜索 </el-button>
      <el-button type="default" size="small" @click="resetSearch"> 重置 </el-button>
    </div>
    <span class="search-flag" v-if="activeFlag" @click="activeFlag = !activeFlag"
      >收起 <i class="el-icon-arrow-up"></i
    ></span>
    <span class="search-flag" v-else @click="activeFlag = !activeFlag"
      >展开 <i class="el-icon-arrow-right"></i
    ></span>
  </el-form>
</template>

<script>
// import { querySearchAsync } from '@/utils/validate'
// import { searchApi, searchTask } from '@/apis/modules/projectTask'
// import { startWithByName } from '@/apis/userManagement/userManagementServe'
export default {
  name: 'searchForm',
  components: {},
  props: {
    tabsType: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      time: '',
      activeFlag: false,
      scanStatusArr: [
        {
          value: 'PENDING',
          label: '未开始'
        },
        {
          value: 'RUNNING',
          label: '进行中'
        },
        {
          value: 'SUCCESS',
          label: '检测成功'
        },
        {
          value: 'FAILED',
          label: '检测失败'
        }
      ],
      searchParams: {
        name: '', //项目名称
        creator: '', // 创建人
        status: '', // 状态
        begin: '', // 开始时间
        end: '', //结束时间
        time: ''
      },
      searchParams1: {
        name: '', //项目名称
        status: '', // 状态
        creator: '', // 创建人
        begin: '', // 开始时间
        end: '' //结束时间
      },
      searchParams2: {
        name: '', //API名称
        creator: '', // 创建人
        begin: '', // 开始时间
        end: '' //结束时间
      },
      // 设置选择今天以及今天以前的日期
      pickerOptions: {
        disabledDate(time) {
          let now = new Date()
          let year = now.getFullYear()
          let month = now.getMonth() + 1
          let day = now.getDate() + 1
          let times = year + '/' + month + '/' + day + ' 00:00:00'
          let limitTime = new Date(times).getTime()
          return time.getTime() > limitTime || time.getTime() === limitTime
        }
      }
    }
  },
  watch: {
    tabsType(newVal) {
      this.$refs.refForm.resetFields()
      this.searchParams.begin = ''
      this.searchParams.end = ''
    }
  },
  computed: {
    chooseParams() {
      return this.tabsType === '1' ? this.searchParams1 : this.searchParams2
    }
  },
  methods: {
    // 时间选择
    dateChange(value) {
      if (value && value.length === 2) {
        this.searchParams.begin = value[0]
        this.searchParams.end = value[1]
      } else {
        this.searchParams.begin = ''
        this.searchParams.end = ''
      }
    },
    // API名称 模糊搜索
    apiSearch(queryString, callback) {
      // querySearchAsync(queryString, searchApi, callback)
    },
    //任务名称 模糊搜索
    taskSearch(queryString, callback) {
      // querySearchAsync(queryString, searchTask, callback)
    },
    //创建人 模糊搜索
    userSearch(queryString, callback) {
      // querySearchAsync(queryString, startWithByName, callback)
    },
    // 根据tab状态组合参数
    initParams() {
      if (this.tabsType === '1') {
        for (let k in this.searchParams1) {
          this.searchParams1[k] = this.searchParams[k]
        }
      } else {
        for (let k in this.searchParams2) {
          this.searchParams2[k] = this.searchParams[k]
        }
      }
    },
    resetSearch() {
      this.$refs.refForm.resetFields()
      this.searchParams.begin = ''
      this.searchParams.end = ''
      this.onSearch()
    },
    onSearch() {
      this.initParams()
      this.$emit('handleSearch', this.tabsType === '1' ? this.searchParams1 : this.searchParams2)
    }
  },
  mounted() {
    console.log('vue2')
    console.log('route================', this.$route)
    console.log('vue================', this)
    console.log('next============', this.$nextTick)
  }
}
</script>

<style lang="scss" scoped>
.default-search::after {
  content: '';
  display: block;
  clear: both;
}
.search-item {
  padding: 10px 0;
}
.search_left {
  width: calc(100% - 260px);
  .el-form-item {
    width: 40%;
    margin-right: 3%;
    margin-bottom: 0;
    .el-select {
      width: 100%;
    }
  }
}
.down {
  height: auto;
}
.up {
  height: 75px !important;
  overflow: hidden;
}
.scanSearch {
  height: 126px;
  position: relative;
  transition: all 0.2s;
  .search-flag {
    position: absolute;
    right: 0;
    top: 31px;
    cursor: pointer;
    color: #409eff;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
.search_right {
  min-width: 200px;
  float: right;
  padding-top: 10px;
  margin-right: 36px;
}
</style>
