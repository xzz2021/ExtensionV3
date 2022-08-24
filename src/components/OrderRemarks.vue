<template>
   <vxe-modal  className="ordermodal" v-model="isopen" width="1340" height="860"
      :position="{top: 100}"  maskClosable >
      <template #title>
        <div class="headerSec">
          <div class="myorder" >订单备注</div>
        </div>
        <div class="mytitle">
          <a   :href="BUS.店铺链接" target="_blank">店铺名称</a>
        </div>
      </template>

      <!-- <template #header>
          
      </template> -->
      <div class="container">
      </div>
    </vxe-modal>
</template>
<script>
export default {
  data() {
    return {
        isopen: true
    }
  },
  methods: {
  },
  mounted() { },
}
</script>
<style lang='scss' scoped>
@import '../css/sass/orderpanel.scss';
// @import '../../css/sass/orderpanel.scss';

</style>