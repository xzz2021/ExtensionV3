<!--
 * @Date: 2022-11-25 17:32:00
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-25 17:53:33
-->
<template>


</template>
<script setup>
//平台状态store
const busStore = piniaStore()
const { info_id, scanData, scanShow, currentHref2 } = storeToRefs(busStore)
setInterval(() => {
    // console.log('info_id: ', info_id.value);
    // console.log('currentHref2:child--------- ', currentHref2.value);
    
}, 1000);

</script>
<style  lang='scss' scoped>


</style>