
<template>
  <div class="container">
    <el-input v-model="searchInfo.searchCustomerName" placeholder="请输入客户名称" @input="getData">
      <template slot="prepend">客户名称</template>
    </el-input>
    发起人:
    <el-select v-model="searchInfo.searchUserName" placeholder="全部" clearable @input="getData">
      <el-option
        v-for="item in saleUserList"
        :key="item.index"
        :label="item.userName"
        :value="item.id"
      />
    </el-select>
    <el-input v-model="searchInfo.searchGoodsName" placeholder="请输入商品名称" @input="getData">
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

    创建时间：<el-date-picker
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
    <el-table
      :data="tableData"
      border
      header-align="center"
    >
      <el-table-column
        label="ID"
        prop="id"
        align="center"
        width="180"
      />
      <el-table-column
        label="批次号"
        prop="orderBatchId"
        align="center"
        width="180"
      />
      <el-table-column
        label="商品名称"
        prop="goodsName"
        align="center"
        width="180"
      />
      <el-table-column
        label="数量"
        prop="buyNum"
        align="center"
        width="180"
      />
      <el-table-column
        label="收件人信息"
        prop="consignee"
        align="center"
        width="180"
      />
      <el-table-column
        label="收件地址"
        prop="consigneeAddress"
        align="center"
        width="180"
      />
      <el-table-column
        label="额外运费"
        prop="extraExpressFee"
        align="center"
        width="180"
      />
      <el-table-column
        label="仓库"
        prop="warehouseName"
        align="center"
        width="180"
      />
      <el-table-column
        label="备注"
        prop="orderRemark"
        align="center"
        width="180"
      />
      <el-table-column
        label="创建时间"
        prop="createdAt"
        align="center"
        width="180"
      />
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
  </div></template>

<script>
import axios from 'axios'
export default {
  name: 'Alloc',
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
    this.getData2()
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get('/api/admin/order/list', {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            customerName: this.searchInfo.searchCustomerName,
            userId: this.searchInfo.searchUserName,
            state: this.searchInfo.searchState,
            goodsName: this.searchInfo.searchGoodsName,
            startTime: this.time ? this.time[0] : '',
            endTime: this.time ? this.time[1] : '',
            orderStates: 2
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
    async getData2() {
      try {
        const res2 = await axios.get('/api/admin/systemUser/list', {
          params: {
            pageNum: 1,
            pageSize: 0,
            isLite: true
          },
          headers: {
            Authorization: this.$globalToken.value
          }
        })
        this.saleUserList = (res2.data.data.rows)
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
.el-input , .el-select{
    width: 200px;
   }
.container{
    margin:15px ;
   }
</style>
