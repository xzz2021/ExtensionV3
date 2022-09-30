<template>
  <el-dialog  v-model="show" width="400px" :show-close="false"  :close-on-click-modal="false" top="40vh">

    <div class="pro-container" >
      <div class="myimg" >
        <img src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/coffe_loading.gif" alt="">
      </div>

      <div class="mypro">
        <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" status="warning"></el-progress>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
const props = defineProps(['show', 'percentage'])
// <script setup lang="ts">
// const props = defineProps({show: Boolean, percentage: Number})
// const props = defineProps<{show: Boolean, percentage: Number}>()
</script>
<style lang='scss' scoped>
:deep(.el-dialog__body) {
  padding-top: 12px;
}

:deep(.el-dialog) {
  border-radius: 6px;
}

.pro-container{
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .myimg{
    width: 94px; 
    height: 64px;
    margin-bottom: 12px;
  }
  .mypro{
  width: 360px;
  }
}
</style>