<template>
  <div class="container">
    <el-button type="danger" @click="showDialog">+添加</el-button>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      部门名称 <el-input v-model="name" placeholder="请输入内容" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">提交</el-button>
      </span>
    </el-dialog>
    <el-input v-model="searchInfo.searchName" placeholder="搜索部门名称" clearable @input="getData">
      <template slot="prepend">部门名称</template>
    </el-input>
    <el-table :data="tableData" header-align="center">
      <el-table-column label="部门id" prop="id" align="center" width="180" />
      <el-table-column label="部门名称" prop="deptName" align="center" width="180" />
      <el-table-column label="部门成员数" prop="systemUserList" align="center" width="180" />
      <el-table-column label="创建时间" prop="createdAt" align="center" width="180" />
      <el-table-column label="更新时间" prop="updatedAt" align="center" width="180" />
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
      },
      dialogVisible: false,
      name: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get('/api/admin/systemDept/list', {
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
    showDialog() {
      this.dialogVisible = true
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
 .container{
  margin:15px
 }
 .el-input{
  width: 300px;
 }
</style>
