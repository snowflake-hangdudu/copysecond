<template>
  <div class="dashboard-container">
    <div class="dashboard-text"> {{ name }}</div>
    <div class="dashboard-text"> {{ nickName }}</div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      name: 'hangdudu',
      nickName: '如果云知道'
    }
  },
  computed: {

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
