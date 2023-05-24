<template>
  <div>
    <div class="container">
      <el-input v-model="searchInfo.searchName" placeholder="搜索供应商名称" clearable @input="getData">
        <template slot="prepend">供应商</template>
      </el-input>
      状态:
      <el-select v-model="searchInfo.searchState" placeholder="全部" clearable @input="getData">
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
      <el-table :data="tableData" header-align="center" style="width:100%">
        <el-table-column label="ID" prop="id" align="center" width="180" />
        <el-table-column label="供应商" prop="accountName" align="center" width="180" />
        <el-table-column label="申请充值金额" prop="rechargeAmount" align="center" width="180" />
        <el-table-column label="采购备注" prop="rechargeRemark" align="center" width="180" />
        <el-table-column label="状态" prop="rechargeState" align="center" width="180" />
        <el-table-column label="付款凭证" prop="financeRemark" align="center" width="180" />
        <el-table-column label="联系方式" prop="tel" align="center" width="180" />
        <el-table-column label="创建时间" prop="createdAt" align="center" width="180" />
      </el-table>
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
  name: 'SupplierPayCheck',
  data() {
    return {
      searchInfo: {
        searchName: '',
        searchState: ''
      },
      pagination: {
        pageSize: 5,
        currentPage: 1,
        total: 0
      },
      time: [],
      stateList: [
        { label: '待审核', value: '1' },
        { label: '待付款', value: '2' },
        { label: '已完成', value: '3' },
        { label: '已拒绝', value: '4' }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get('/api/admin/supplier/recharge/list', {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            rechargeState: this.searchInfo.searchState,
            supplierName: this.searchInfo.searchName,
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
