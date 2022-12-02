<!--
 * @Date: 2022-11-14 17:12:12
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-26 16:30:25
-->
<template>
  <vxe-modal v-model="scanShow.value" width="500" :position="{ top: 100 }">
    <template #title>
      <div class="mytitle">
        浏览记录
      </div>
    </template>
    <div v-if="scanData.self.length != 0" style=" height:560px">
      <div class="myScanBox" v-for="(itemAll, index) in scanData.self" :key="index">
        <div class="scanDateTitle">{{ itemAll.date }}</div>
        <div class="scanList" v-for="(item, index) in itemAll.scanInfo" :key="index">
          <div class="scanTime">{{ item.time }}</div>
          <div class="scanShop">
            <div class="shopTitle" @click="getSingleData(item.id)">{{ item.shop_name }}</div>
            <div class="guanbibtn" @click="deleteData(item.id)"><i class="funicon-guanbi "></i></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <img class="emptyImg" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/emptyData.png"
        alt="当前没有浏览记录" />
    </div>
  </vxe-modal>


</template>

<script setup>

const busStore = piniaStore()
const { userInfo, diagnosisStore } = storeToRefs(busStore)

let scanData = reactive({self:[]})
let scanShow = ref(false)

    const getScanData = async (num) => {
      scanShow.value = true
      let obj = {
             user_id: userInfo.value.userid,
             token: userInfo.value.userToken,
             page: 1,
             limit: 30
           }
      let rowScanData = await API.getScanrecord(obj)
      scanData.self = await API.filterDate(rowScanData)
    }
    const getSingleData = async (info_id) => {
     scanShow.value = false;
     let obj = {
      user_id: userInfo.value.userid,
      token: userInfo.value.userToken,
      info_id,
    } 
    let diagnosisRecordData = await API.getSingleData(obj)
        busStore.$patch((state)=>{
          state.diagnosisStore= {show:true,percentage: 100,diagnosisData: diagnosisRecordData}
        })

    }
    const  deleteData = async (info_id) => {
       let obj = {
            user_id: userInfo.value.userid,
            token: userInfo.value.userToken,
            info_id,
          } 
       await API.deleteData(obj)
        
        await this.getScanData();
    }
  
  onMounted(() =>{ 
    
  })
  defineExpose({
  getScanData
})
</script>

<style lang="scss" scoped>
@import '../../css/sass/scanpanel.scss';
</style>
