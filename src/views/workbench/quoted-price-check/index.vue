<template>
  <div>
    <el-input placeholder="请输入客户名称">
      <template slot="prepend">客户名称</template>
    </el-input>
    发起人:
    <el-select placeholder="全部">
      <el-option
        v-for="item in saleUserList"
        :key="item.userName"
        :label="item.userName"
        :value="item.id"
      />
    </el-select>
    <el-input placeholder="请输入商品名称">
      <template slot="prepend">商品名称</template>
    </el-input>
    审核状态:
    <el-select placeholder="全部">
      <el-option
        v-for="item in saleUserList"
        :key="item.userName"
        :label="item.userName"
        :value="item.id"
      />
    </el-select>
    创建时间：<el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" width="180" align="center" header-align="center" />
      <el-table-column label="发起人" prop="userName" width="180" align="center" header-align="center" />
      <el-table-column label="客户名称" prop="customerName" width="180" align="center" header-align="center" />
      <el-table-column label="商品名称" prop="goodsName" width="180" align="center" header-align="center" />
      <el-table-column label="商品系统价" prop="dropShippingPrice" width="180" align="center" header-align="center" />
      <el-table-column label="商品报价" prop="priceSheet" width="180" align="center" header-align="center" />
      <el-table-column label="备注" prop="state" width="180" align="center" header-align="center" />
      <el-table-column label="状态" prop="updatedAt" width="180" align="center" header-align="center" />
      <el-table-column label="报价时间" prop="state" width="180" align="center" header-align="center" />
    </el-table>
    <!-- <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20, 50]"
      :current-page.sync="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    /> -->
  </div></template>

<script>
export default {
  name: 'QuotedPriceCheck'
}
</script>

<style>

</style>
