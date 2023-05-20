<template>
  <div class="container1">
    <!-- <el-input v-model="serachName" placeholder="请输入客户名称">
      <template slot="prepend">客户名称</template>
    </el-input> -->
    <!-- 所属销售:
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    审核状态:
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select> -->
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
      layout="total, sizes, prev, pager, next"
      :page-sizes="[5, 20, 30, 50]"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="totalCount"
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
      serachName: '',
      pageNum: 1,
      pageSize: 5,
      tableData: [],
      currentPage: 1,
      totalCount: 0
    }
  },
  async mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get('/api/admin/review/customer/list', {
          params: {
            pageNum: 1,
            pageSize: 5
          },
          headers: {
            Authorization: this.$globalToken.value
          }
        })
        this.tableData = res.data.data.rows
      } catch (error) {
        console.error(error)
      }
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
