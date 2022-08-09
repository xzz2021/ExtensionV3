<template>
    <div class="mytmall" @click="haha">
66666tmalltmalltmalltt9999999999
</div>
</template>

<script>

export default{
  // 继承后可以以完全按原有写法
  methods: {
    haha() {
      console.log("666666666")
    }
  }
}

</script>

<style lang="scss" scoped>
.mytmall {
   background-color: rgb(30, 255, 0); 
   position: fixed;
  z-index: 999;
  left: 2px;
  top: 30px;
  width:200px; 
  height: 200px
}
</style>