<template>
  <div class="dashboard-container">
    <el-table :data="tableData" :span-method="reconstructionStuCell" style="width: 100%">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="name" label="姓名" width="80" />
      <el-table-column label="科目信息">
        <el-table-column prop="courseName" label="科目" width="80" />
        <el-table-column prop="date" label="日期" width="80" />
        <el-table-column prop="timeStr" label="考试时间" width="100" />
      </el-table-column>
      <el-table-column label="成绩信息">
        <el-table-column prop="score" label="成绩" width="60" />
        <el-table-column prop="scoreTotal" label="总分" width="60" />
        <el-table-column prop="total" label="满分" width="60" />
        <el-table-column prop="totalAll" label="满分总分" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.totalAll">{{ scope.row.totalAll }} （及格率：{{ parseInt(scope.row.scoreTotal/scope.row.totalAll*100) }}%）</span>
          </template>
        </el-table-column>
      </el-table-column>

    </el-table></div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    this.reconstructionStuData(this.tableStudentData)
  },
  methods: {
    reconstructionStuCell({ row, column, rowIndex, columnIndex }) {

    },
    reconstructionStuData(data) {
      if (!Array.isArray(data)) return []

      const resData = []

      data.forEach((item, i) => {
        if (Array.isArray(item.subject) && item.subject.length > 0) {
          item.subject.forEach((sub, j) => {
            let subData = {}
            if (j === 0) {
              subData = Object.assign({}, item, sub)
            } else {
              subData = Object.assign({ }, sub)
            }
            resData.push(subData)
            console.log(resData)
          })
        } else {
          resData.push(
            Object.assign({ }, item)
          )
        }
      })
      this.tableData = resData
      console.log(resData)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
