<template>
  <div>
    审核状态：<el-select v-model="searchInfo.searchState" placeholder="全部" clearable @input="getData">
      <el-option
        v-for="item in stateList"
        :key="item.index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    创建时间:
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
    <el-table :data="tableData" header-align="center" align="center">
      <el-table-column label="ID" prop="id" align="center" width="100" />
      <el-table-column label="发起人" prop="purchaseUserName" align="center" width="90" />
      <el-table-column label="商品名称" prop="goodsName" align="center" width="120" />
      <el-table-column label="备货申请时当前库存" prop="readyApplyGoodsStock" align="center" width="150" />
      <el-table-column label="建议备货数量" prop="readyApplyNum" align="center" width="120" />
      <el-table-column label="实时库存" prop="goodsStock" align="center" width="120" />
      <el-table-column label="采购数量" prop="purchaseNum" align="center" width="100" />
      <el-table-column label="采购单价" prop="purchasePrice" align="center" width="100" />
      <el-table-column label="采购总价" prop="purchaseTotalAmount" align="center" width="100" />
      <el-table-column label="状态" prop="purchaseState" align="center" width="100" />
      <el-table-column label="创建时间" prop="createdAt" align="center" width="150" />
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

</template>

<script>
import axios from 'axios'
export default {
  name: 'PurchaseOrderCheck',
  data() {
    return {
      searchInfo: {
        searchState: ''
      },
      time: [],
      tableData: [],
      pagination: {
        pageSize: 5,
        currentPage: 1,
        total: 0
      },
      stateList: [
        { label: '备货审批中', value: '1' },
        { label: '备货审核失败', value: '2' },
        { label: '采购待执行', value: '3' },
        { label: '采购审批中', value: '4' },
        { label: '采购审核失败', value: '5' },
        { label: '待支付', value: '6' },
        { label: '交付中', value: '7' },
        { label: '采购已完成', value: '8' }
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
            purchaseState: this.searchInfo.searchState,
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
