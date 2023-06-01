<template>
  <div class="container">
    <div class="con">
      <div class="a">a</div>
      <div class="b">b</div>
      <div class="c">c</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Html'
}
</script>

<style >
  .a{
    background-color: aqua;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
  }
  .b{
    background-color: yellow;
    width: 100px;
    height: 100px;
    box-sizing: border-box;

  }
  .c{
    background-color: red;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
  }
  .con{
    height: 600px;
    width:600px;
    background-color:pink ;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
  }
</style>
