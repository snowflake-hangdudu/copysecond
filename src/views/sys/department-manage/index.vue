<template>
  <div>
    <el-input v-model="searchInfo.searchName" placeholder="搜索部门名称" clearable @input="getData">
      <template slot="prepend">部门名称</template>
    </el-input>
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
  name: 'DepartmentManage',
  data() {
    return {
      searchInfo: {
        searchName: ''
      },
      pagination: {
        pageSize: 5,
        currentPage: 1,
        total: 0
      }
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
            depName: this.searchInfo.searchName
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
