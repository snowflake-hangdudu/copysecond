<template>
  <div>
    <el-table :data="tableData" header-align="center" style="width:100%">
      <el-table-column label="ID" prop="id" align="center" width="180" />
      <el-table-column label="供应商" prop="accountName" align="center" width="180" />
      <el-table-column label="申请充值金额" prop="rechargeAmount" align="center" width="180" />
      <el-table-column label="采购备注" prop="rechargeRemark" align="center" width="180" />
      <el-table-column label="状态" prop="rechargeState" align="center" width="180" />
      <el-table-column label="付款凭证" prop="financeRemark" align="center" width="180" />
      <el-table-column label="联系方式" prop="tel" align="center" width="180" />
      <el-table-column label="创建时间" prop="createdAt" align="center" width="180" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SysRoles'
}
</script>

<style>

</style>
