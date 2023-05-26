<template>
  <div>
    <el-input v-model="searchInfo.searchCustomerName" placeholder="搜索商品名称" @input="getData">
      <template slot="prepend">商品名称</template>
    </el-input>
    审核状态:
    <el-select v-model="searchInfo.searchState" placeholder="全部" clearable @input="getData">
      <el-option
        v-for="item in stateList"
        :key="item.index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-table :data="tableData">
      <el-table-column prop="id" label="账号ID" align="center" header-align="center" width="180" />
      <el-table-column prop="readyUserName" label="操作人" align="center" header-align="center" width="180" />
      <el-table-column prop="goodsName" label="商品名称" align="center" header-align="center" width="180" />
      <el-table-column prop="barCode" label="条形码" align="center" header-align="center" width="180" />
      <el-table-column prop="readyApplyGoodsStock" label="当前库存" align="center" header-align="center" width="180" />
      <el-table-column prop="readyApplyNum" label="建议备货数量" align="center" header-align="center" width="180" />
      <el-table-column prop="readyApplyRemark" label="备货原因" align="center" header-align="center" width="180" />
      <el-table-column prop="readyApproveStatus" label="审批状态" align="center" header-align="center" width="180" />
      <el-table-column prop="readyApplyTime" label="创建时间" align="center" header-align="center" width="180" />
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
  name: 'GoodsStockApply',
  data() {
    return {
      // 获取的列表数组
      tableData: [],
      // 分页配置
      pagination: {
        pageSize: 5,
        currentPage: 1,
        total: 0
      },
      searchInfo: {
        searchGoodsName: '',
        searchState: ''
      },
      time: [],

      saleUserList: [],
      stateList: [
        { label: '备货审核中', value: '1' },
        { label: '备货审批失败', value: '2' },
        { label: '采购待执行', value: '3' },
        { label: '采购审批中', value: '4' },
        { label: '采购审批失败', value: '5' },
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
        const res = await axios.get('/api/admin/purchase/ready/list', {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            state: this.searchInfo.searchState,
            goodsName: this.searchInfo.searchGoodsName
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

    // 改变页面粒度调用的方法
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
