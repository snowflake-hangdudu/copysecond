<template>
  <div>
    <h1>{{ name }}</h1>
    <button @click="get">点我</button>
    <input type="text" placeholder="按下按键提示输入" @keyup.enter="showInfo">
  </div>
</template>

<script>
export default {
  name: 'Vue',
  data() {
    return {
      name: 'hangdudu'
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    get() {
      alert('hello')
    },
    showInfo(e) {
      console.log(e.target.value)
    }
  }
}

</script>

  <style>

  </style>
