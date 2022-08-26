<template>

<div class="box">
    <el-button type="primary" size="default" @click="sendMessage">seage</el-button>
    

</div>
</template>


<script setup>
import { reactive } from 'vue'
const msg = reactive({type: '666', msg:'sss'})
const sendMessage = async () => {
    console.log('--------------msg: ', msg) 
    let res = await API.sendMessage(msg)
    console.log('--------res: ', res)
}

</script>
<style>
.box{
    width: 200px;
    height: 200px;
    position: fixed;
    z-index: 100001;
    left: 200px;
    top: 100px;
    z-index: 333;
}

</style>