<template>
  <div>
    <div class="container">
      <el-input v-model="searchInfo.searchName" placeholder="搜索客户" @input="getData">
        <template slot="prepend">客户名称</template>
      </el-input>
      审核状态：<el-select v-model="searchInfo.searchState" placeholder="全部" clearable @input="getData">
        <el-option
          v-for="item in stateList"
          :key="item.index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      创建时间：
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        clearable
        value-format="timestamp"
        :default-time="['00:00:00', '23:59:59']"
        @change="getData"
      />
    </div>
  </div></template>

<script>
import axios from 'axios'
export default {
  name: 'CentralizedOrderCheck',
  data() {
    return {
      searchInfo: {
        searchState: '',
        searchName: ''
      },
      time: [],
      tableData: [],
      pagination: {
        pageSize: 5,
        currentPage: 1,
        total: 0
      },
      stateList: [
        { label: '待审核', value: '1' },
        { label: '未通过', value: '2' },
        { label: '已通过', value: '3' }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get('/api/admin/review/purchase/list', {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            orderCentralizeState: this.searchInfo.searchState,
            customerName: this.searchInfo.searchName,
            startTime: this.time ? this.time[0] : '',
            endTime: this.time ? this.time[1] : ''
          },
          headers: {
            Authorization: this.$globalToken.value
          }
        })
        console.log()
        this.tableData = res.data.data.rows
        this.pagination.total = res.data.data.count
      } catch (error) {
        console.error(error)
      }
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.getData()
    },
    // 改变页码数调用的方法
    handlePageChange(val) {
      this.pagination.currentPage = val
      this.getData()
    }
  }

}
</script>

<style>

</style>
