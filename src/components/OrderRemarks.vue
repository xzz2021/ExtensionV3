<template>
   <vxe-modal  className="ordermodal" v-model="isopen" width="1340" height="860"
      :position="{top: 100}"  maskClosable   marginSize="-500" ref="myOrder">
      <template #title>
        <div class="headerSec">
          <div class="myorder" >订单备注</div>
        </div>
        <div class="mytitle">
        </div>
      </template>

    </vxe-modal>
</template>
<script setup>
const isopen = ref(false)
onMounted(() => {
  // console.log('myOrder')
})
</script>
<style lang='scss' scoped>
@import '../css/sass/orderpanel.scss';
// @import '../../css/sass/orderpanel.scss';

</style>