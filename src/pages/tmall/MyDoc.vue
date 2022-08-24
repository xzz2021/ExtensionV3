<template>
    <div class="">
<div v-html="rawHtml"></div>
    </div>
    <vxe-button status="primary" content="主要颜色"></vxe-button>
</template>

<script>

export default {
  data() {
    return{
      rawHtml: '<span style="color: red;">试试6666666</span>'
    }
  },
  methods: {
      doc(){
        console.log('mydoc')
      }
  },
  
  mounted() {},
}
</script>

<style lang="scss" scoped>
</style>
