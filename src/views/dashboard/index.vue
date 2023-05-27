<template>
  <div class="dashboard-container" /></div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      tableData: []
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
