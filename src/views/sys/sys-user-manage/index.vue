<template>
  <div>
    <el-input v-model="searchInfo.searchName" placeholder="搜索账号ID" clearable @input="getData">
      <template slot="prepend">账号ID</template>
    </el-input>
    <el-input v-model="searchInfo.searchName" placeholder="账号名称" clearable @input="getData">
      <template slot="prepend">账号名称</template>
    </el-input>
    所属部门:
    <el-select v-model="searchInfo.saleUserId" placeholder="全部" clearable @input="getData">
      <el-option
        v-for="item in saleUserList"
        :key="item.userName"
        :label="item.userName"
        :value="item.id"
      />
      启用状态:
      <el-select v-model="searchInfo.searchState" placeholder="全部" clearable @input="getData">
        <el-option
          v-for="item in stateList"
          :key="item.index"
          :label="item.label"
          :value="item.value"
        />
        角色权限:
        <el-select v-model="searchInfo.searchState" placeholder="全部" clearable @input="getData">
          <el-option
            v-for="item in stateList"
            :key="item.index"
            :label="item.label"
            :value="item.value"
          />
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
          <el-table :data="tableData">
            <el-table-column prop="id" label="账号ID" align="center" header-align="center" width="180" />
            <el-table-column prop="account" label="账号" align="center" header-align="center" width="180" />
            <el-table-column prop="userName" label="姓名" align="center" header-align="center" width="180" />
            <el-table-column prop="deptName" label="部门" align="center" header-align="center" width="180" />
            <el-table-column prop="job" label="职位" align="center" header-align="center" width="180" />
            <el-table-column prop="isForbid" label="禁用" align="center" header-align="center" width="180" />
            <el-table-column prop="roleList" label="角色权限" align="center" header-align="center" width="180" />
            <el-table-column prop="dataAuthority" label="数据权限" align="center" header-align="center" width="180" />
            <el-table-column prop="createdAt" label="创建时间" align="center" header-align="center" width="180" />
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
        </el-select></el-select></el-select></div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SysUserManage',
  data() {
    return {
      searchInfo: {
        searchId: '',
        searchName: ''
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
        const res = await axios.get('/api/admin/systemUser/list', {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
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
