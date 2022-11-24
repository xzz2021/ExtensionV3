<template>
  <vxe-modal v-model="scanShow.value" width="500" :position="{ top: 100 }">
    <template #title>
      <div class="mytitle">
        浏览记录
      </div>
    </template>
    <div v-if="scanData.value.length != 0" style=" height:560px">
      <div class="myScanBox" v-for="(itemAll, index) in scanData.value" :key="index">
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
//各自平台的
const store = piniaStore()
const { info_id, scanData, scanShow, diagnosisData } = storeToRefs(store)

      const userToken = ref('')
      const userId = ref('')
    const getScanData = async () => {
      scanShow.value = true;
      if (userId) {
        let config = {
        method: 'post',
        url: 'http://pddzd.junchenlun.com//?s=Jd.StoreBrowse.recordList',
        data: {
          user_id: userId,
          token: userToken,
          page: 1,
          limit: 30
        }   //qs将对象 序列化成URL的形式，以&进行拼接
      }
      let res = await 浏览器_跨域axios(config)
      let rowScanData = res.data.data.list
      // console.log('--------------scanData:------------ ', scanData);
      scanData.value = await filterDate(rowScanData)
        //---------------------------------------
      }
    }
    const getSingleData = async (info_id) => {
      if (userId) {
        scanShow.value = false;
        let config = {
        method: 'post',
        url: 'http://pddzd.junchenlun.com//?s=Jd.StoreBrowse.recordInfo',
        data: {
          user_id: userId.value,
          token: userToken.value,
          info_id: info_id.value
        }   //qs将对象 序列化成URL的形式，以&进行拼接
      }
      let res = await 浏览器_跨域axios(config)
      diagnosisData.value = res.data.data.info.json_data
      // console.log('------storage----------res: ', res.data.data.info.json_data);
        if (res.data.ret == 400) {
          alert('数据获取失败' + res.data.msg);
        }
        dialogShow.value = true;
      }
    }
    const  deleteData = async (info_id) => {
      if (this.userId) {
        let config = {
        method: 'post',
        url: 'http://pddzd.junchenlun.com//?s=Jd.StoreBrowse.delRecord',
        data: {
          user_id: this.userId,
          token: this.userToken,
          info_id: info_id.value
        }   //qs将对象 序列化成URL的形式，以&进行拼接
      }
      let res = await 浏览器_跨域axios(config)
      // console.log('-----delete-------res: ', res);
        Message.success({ message: `成功:删除记录`, duration: 1000, showClose: true });
        await this.getScanData();
      }
    }
    const filterDate = async (dataArr) => {
        // 提取所需基础数据     //解构新对象
            let newArr = [];
            //通过forEach循环数组
            dataArr.forEach((item, i) => {
              let index = -1;
              //然后在跑到这里筛选 根据不同的时间放置不同的数组    some（）用来查找数组中是否存在某个值  如果存在 就return true
              let isExists = newArr.some((newItem, j) => {
                if (item.date == newItem.date) {

                  index = j;
                  return true;
                }
              })
              if (!isExists) {
                newArr.push({
                  date: item.date,
                  scanInfo: [item],
                });
              } else {
                newArr[index].scanInfo.push(item);
              }
            })
            return newArr
    }
  
  onMounted(() =>{ 
    // userToken.value =  await 浏览器_get_storage('userToken')
    // userId.value = await 浏览器_get_storage('user_id')
    
  })
</script>

<style lang="scss" scoped>
@import '../../css/sass/scanpanel.scss';
</style>
