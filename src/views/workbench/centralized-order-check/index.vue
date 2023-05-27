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
<<<<<<< HEAD
      <el-table :data="tableData">
        <el-table-column prop="id" label="ID" align="center" header-align="center" width="180" />
        <el-table-column prop="userName" label="发起人" align="center" header-align="center" width="180" />
        <el-table-column prop="customerName" label="客户名称" align="center" header-align="center" width="180" />
        <el-table-column label="商品名称" align="center" header-align="center" width="180">
          <template slot-scope="{ row }">
            <el-table :data="row.orderCentralizedGoodsListRes" show-header="false" :cell-style="{'padding': '0px'}" size="mini">
              <el-table-column prop="goodsName" label="商品名称" />
            </el-table>
=======
      <el-table :data="tableData" header-row-class-name="table-header">
        <el-table-column prop="id" label="ID" align="center" header-align="center" width="180" />
        <el-table-column prop="userName" label="发起人" align="center" header-align="center" width="180" />
        <el-table-column prop="customerName" label="客户名称" align="center" header-align="center" width="180" />
        <el-table-column prop="orderCentralizedGoodsListRes" label="商品名称" align="center" header-align="center" width="180">
          <template slot-scope="{ row }">
            <div v-for="(goods, index) in row.orderCentralizedGoodsListRes" :key="index">
              {{ goods.goodsName }}
            </div>
>>>>>>> f6a4d072417572abd73d3415fc1bcb357c065cf1
          </template>
        </el-table-column>
        <el-table-column prop="buyNum" label="数量" align="center" header-align="center" width="180" />
        <el-table-column prop="centralizedPrice" label="集采单价" align="center" header-align="center" width="180" />
        <el-table-column prop="expressFee" label="运费" align="center" header-align="center" width="180" />
        <el-table-column prop="orderCentralizedRemark" label="备注" align="center" header-align="center" width="180" />
        <el-table-column prop="orderCentralizeState" label="状态" align="center" header-align="center" width="180" />
        <el-table-column prop="createdAt" label="创建时间" align="center" header-align="center" width="180" />
      </el-table>
<<<<<<< HEAD

=======
>>>>>>> f6a4d072417572abd73d3415fc1bcb357c065cf1
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 20, 50]"
        :current-page.sync="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
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
        const res = await axios.get('/api/admin/review/order/centralized/list', {
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
