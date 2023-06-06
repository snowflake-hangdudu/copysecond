<template>
  <div class="container">
    <div class="con">
      <div class="inner">a</div>
      <div class="inner">a</div>
      <div class="inner">a</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Html'
}
</script>

<style >
.inner{
  width: 200px;
  height: 200px;
  background-color: aqua;
  border: 1px solid;
  flex-shrink: 1;
}
  .con{
    height: 400px;
    width:1000px;
    background-color:pink ;
    display: flex;
    flex-flow: row wrap;
    justify-content:flex-start;
    margin: 0 auto;
  }
  /* .container{
    width:100%;
    height: 100%;
    background-color: aquamarine;
    display: flex;
    flex-flow:row wrap;
  } */
</style>
