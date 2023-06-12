<template>
  <div>
    <h1>{{ name }}</h1>
    搜索姓名:<input v-model="keyword" type="text">
    <ul>
      <li v-for="(l,i) in filtList" :key="i">{{ l.name }} - {{ l.age }} - {{ l.gender }}</li>
    </ul>
    <button>年龄升序</button>
    <button>年龄降序</button>
    <button>原顺序</button>

  </div>
</template>

<script>
export default {
  name: 'Vue',
  data() {
    return {
      name: 'hangdudu',
      list: [
        { name: '张三', age: 20, gender: 'male' },
        { name: '李四', age: 25, gender: 'female' },
        { name: '王五', age: 30, gender: 'male' },
        { name: '赵六', age: 35, gender: 'female' }
      ],
      keyword: ''
      // filtList: []

    }
  },
  computed: {
    filtList() {
      const keyword = this.keyword
      if (keyword === '') {
        return this.list
      }
      return this.list.filter(item => {
        return item.name.indexOf(keyword) > -1
      })
    }
  },
  watch: {
    // keyword: {
    //   immediate: true,
    //   handler(val) {
    //     this.filtList = this.list.filter(item => {
    //       return item.name.indexOf(val) > -1
    //     })
    //   }
    // }
  },
  methods: {

  }
}

</script>

  <style>

  </style>
