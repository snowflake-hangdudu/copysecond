<template>
  <div>
    审核状态：<el-select v-model="searchInfo.searchState" placeholder="全部" clearable @input="getData">
      <el-option
        v-for="item in stateList"
        :key="item.index"
        :label="item.label"
        :value="item.value"
      />
      <!-- // 还没想到怎么筛选 -->
    <!-- 创建时间：<el-date-picker
      v-model="time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      clearable
      @input="getData"
      @clear="handleClear"
    /> -->
    </el-select></div>
</template>

<script>
export default {
  name: 'PurchaseOrderCheck'
}
</script>

<style>

</style>
