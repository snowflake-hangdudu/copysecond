<template>
  <div class="container1">
    <el-input v-model="searchInfo.searchName" placeholder="请输入客户名称" @input="getData">
      <template slot="prepend">客户名称</template>
    </el-input>
    所属销售:
    <el-select v-model="searchInfo.saleUserId" placeholder="全部" clearable @input="getData">
      <el-option
        v-for="item in saleUserList"
        :key="item.userName"
        :label="item.userName"
        :value="item.id"
      />
    </el-select>
    审核状态:
    <el-select v-model="searchInfo.searchState" placeholder="全部" clearable @input="getData">
      <el-option
        v-for="item in stateList"
        :key="item.index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        header-align="center"
        align="center"
        label="ID"
        width="180"
        value="id"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="客户名称"
        width="180"
        prop="customerName"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="历史授信额度"
        width="180"
        prop="historyCreditAmount"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="历史对账周期"
        width="180"
        prop="historyReconcileDay"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="申请授信额度"
        width="180"
        prop="applyCreditAmount"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="申请对账周期"
        width="180"
        prop="applyReconcileDay"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="所属销售"
        width="180"
        prop="saleUserName"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="授信状态"
        width="180"
        prop="hstate"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="审核时间"
        width="180"
        prop="updatedAt"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
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
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'CustomerCheck',
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
        searchName: '',
        saleUserId: '',
        searchState: ''

      },
      saleUserList: [],
      stateList: [
        { label: '审核中', value: '1' },
        { label: '已通过', value: '2' },
        { label: '已拒绝', value: '3' }
      ]
    }
  },
  computed: {

  },
  mounted() {
    this.getData()
    this.getData2()
  },
  methods: {
    refresh() {
      this.pagination.currentPage = 1
      this.pagination.pageSize = 5
      this.getData()
    },
    async getData() {
      try {
        const res = await axios.get('/api/admin/review/customer/list', {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            customerName: this.searchInfo.searchName,
            saleUserId: this.searchInfo.saleUserId,
            state: this.searchInfo.searchState
          },
          headers: {
            Authorization: this.$globalToken.value
          }
        })
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
        console.log(this.saleUserList)
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
   .container1{
    margin:15px ;
   }
</style>
