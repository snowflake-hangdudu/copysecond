<template>
  <div>
    <el-input v-model="searchInfo.searchCustomerName" placeholder="搜索商品名称" @input="getData">
      <template slot="prepend">商品名称</template>
    </el-input>
    <el-input v-model="searchInfo.searchCustomerName" placeholder="搜索条形码" @input="getData">
      <template slot="prepend">条形码</template>
    </el-input>
    <el-select v-model="searchInfo.searchUserName" placeholder="筛选是否快销" clearable @input="getData">
      <el-option
        v-for="item in saleUserList"
        :key="item.index"
        :label="item.userName"
        :value="item.id"
      />
      <el-select v-model="searchInfo.searchUserName" placeholder="筛选是否上架" clearable @input="getData">
        <el-option
          v-for="item in saleUserList"
          :key="item.index"
          :label="item.userName"
          :value="item.id"
        />
      </el-select></el-select>
    <el-table :data="tableData">
      <el-table-column prop="id" label="账号ID" align="center" header-align="center" width="180" />
      <el-table-column prop="goodsName" label="商品名称" align="center" header-align="center" width="180" />
      <el-table-column prop="barCode" label="条形码" align="center" header-align="center" width="180" />
      <el-table-column prop="isFastSelling" label="快销模式" align="center" header-align="center" width="180" />
      <el-table-column prop="isOnline" label="上架" align="center" header-align="center" width="180" />
      <el-table-column prop="dropShippingPrice" label="代发单价" align="center" header-align="center" width="180" />
      <el-table-column prop="goodsCentralizedList" label="集采价格" align="center" header-align="center" width="180" />
      <el-table-column prop="updatedAt" label="更新时间" align="center" header-align="center" width="180" />
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
  name: 'CombinedGoodsManage',
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
        searchUserName: '',
        searchCustomerName: '',
        searchGoodsName: '',
        searchState: ''
      },
      time: [],

      saleUserList: [],
      stateList: [
        { label: '审核中', value: '1' },
        { label: '已通过', value: '2' },
        { label: '已拒绝', value: '3' }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get('/api/admin/review/customer/price/list', {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            customerName: this.searchInfo.searchCustomerName,
            userId: this.searchInfo.searchUserName,
            state: this.searchInfo.searchState,
            goodsName: this.searchInfo.searchGoodsName,
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
