<template>
  <div class="dashboard-container">
    <el-table
      :data="tableData"
      border
      header-align="center"
    >
      <el-table-column
        label="名称"
        prop="name"
        align="center"
        width="180"
      />
      <el-table-column
        label="性别"
        prop="sex"
        align="center"
        width="180"
      />
      <el-table-column
        label="年龄"
        prop="age"
        align="center"
        width="180"
      />
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      tableData: [
        { name: 'hangdudu', gender: [{ age: 22, sex: 'man' }] },
        { name: 'hangdudu1', gender: [{ age: 32, sex: 'woman' }] }
      ]
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
