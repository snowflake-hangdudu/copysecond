<template>
  <div class="dashboard-container">
    <!-- <el-table :data="[{'name': 'hangdudu', 'interest': ['reading', 'swimming']}]" :column-widths="[null, '100px']">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="interest" label="兴趣" />
    </el-table> -->
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      // tableData: [
      //   { firstname: 'hangdudu', hobby: [{ name: 'boobs' }] },
      //   { firstname: 'hangdudu', hobby: [{ name: 'wine' }] },
      //   { firstname: 'shuangshuang', hobby: [{ name: 'boobs' }] }
      // ]
    }
  },
  mounted() {
    this.reconstructionData(this.tableData)
  },
  methods: {
    // 合并单元格数据
    // reconstructionStuCell({ row, column, rowIndex, columnIndex }) {

    // }
    //  // 进行数据处理
    //   reconstructionData(data) {
    //     // 如果为空数组，则返回空数组
    //     if (!Array.isArray(data)) return []

    //     // 定义一个空数组，处理后的数组
    //     const resData = []

  //     data.forEach((item) => {
  //       if (Array.isArray(item.hobby) && item.hobby.length > 0) {
  //         item.hobby.forEach((item2, index2) => {
  //           // 定义一个空对象
  //           let resObj = {}
  //            if (index2 <= item.hobby.length) {
  //             resObj = Object.assign({}, item, item2)
  //             resData.push(resObj)
  //             console.log(resObj)
  //           }
  //         })
  //       }
  //     })
  //     console.log(resData)
  //     this.tableData = resData
  //   }
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
