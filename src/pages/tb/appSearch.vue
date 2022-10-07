
<template >
  <div class="cjzz">
  <el-dialog v-model="dialogVisible" title="淘宝自然搜索" width="40%" :modal="false"  draggable >
    
    <el-form :model="form" label-width="110px">
      <el-form-item label="商品ID或链接（淘宝/天猫）">
        <el-input v-model="form.link" />
      </el-form-item>
      <br/>
      <el-form-item label="关键词">
        <el-input v-model="form.desc" type="textarea" rows="10"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog  @close="clearData"  v-model="ischeck" title="查询中" width="40%" :modal="false" :show-close="false" draggable >
    <div class="demo-progress">
      <el-progress type="dashboard" :percentage="percentage" :color="colors" />
    </div>
  </el-dialog>

  <el-dialog  @close="clearData2" v-model="isresult" title="搜索结果" width="40%" :modal="false"  draggable >


<!--     <el-table  :data="userSku" height="250" style="width: 100%">
      <el-table-column prop="img" label="宝贝图片" width="100" >
        <template #default="scope">
          <img :src="scope.row.img" min-width="100" height="100"/>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="宝贝标题链接" width="600" >
        <template #default="scope">
          <el-button link type="primary" size="small"  >{{userSkuTitle}}</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <img :src="userSku.img" width="100" height="100"/>
    <el-link :href="userSku.url" target="_blank" :underline="false">{{userSku.title}}</el-link>
    <br/>
    <br/>
    <hr/>
    <br/>
    <el-table  :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="order" label="序号" width="180" />
      <el-table-column prop="keyword" label="关键词" width="180" />
      <el-table-column prop="location" label="排名位置（手淘）" width="240" />
      <el-table-column prop="operation" label="操作" width="100" >
        <template #default="scope">
          <el-button link type="primary" size="small"  @click.prevent="showResult(scope.$index)">排名结果</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <el-dialog @close="clearData3" v-model="isrowdata" title="排名结果" width="60%" :modal="false"  draggable >
    <el-table  :data="rowtableData" height="600" style="width: 100%">
      <el-table-column prop="order" label="排名" width="60" />
      <el-table-column prop="img" label="宝贝图片" width="100" >
        <template #default="scope">
          <img :src="scope.row.img" min-width="100" height="100"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="宝贝标题" width="150" />
      <el-table-column prop="id" label="宝贝ID" width="120" />
      <el-table-column prop="price" label="宝贝原价" width="120" />
      <el-table-column prop="pricerate" label="宝贝促销价" width="120" />
      <el-table-column prop="shopName" label="店铺" width="120" />
      <el-table-column prop="sold" label="付款人数" width="120" />
    </el-table>
   <!--  <div>{{rowtableData}}</div> -->
  </el-dialog>

  
</div>

</template>

<script setup>

import {getMessage,checkNum} from './js/search.js'
import {ref,reactive} from 'vue'

const userstore = userStore()
const { userid, userToken, version } = storeToRefs(userstore)

const dialogVisible = ref(true)
// do not use same name with ref
const ischeck = ref(false)
const isresult = ref(false)
const isrowdata = ref(false)
const form = reactive({
  link: '',
  desc: ''
})

const percentage = ref(0)
const colors = [
  { color: '#5cb87a', percentage: 20 },
  { color: '#1989fa', percentage: 40 },
  { color: '#6f7ad3', percentage: 60 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#f56c6c', percentage: 100 },
]

let tableData = reactive([]);
let searchResult = reactive([]);
let rowtableData = reactive([]);

const clearData =() => {
  ischeck.value = false;
  percentage.value = 0;
}

const clearData2 =() => {
  isresult.value = false;
  tableData.length = 0;
}

const clearData3 =() => {
  isrowdata.value = false;
  rowtableData.length = 0;
}

let userSku = reactive({
  "img":"https://gw.alicdn.com/imgextra/i3/O1CN01uRz3de23mzWofmPYX_!!6000000007299-2-tps-143-59.png",
  "title":"暂无宝贝数据",
  "url":"#"
})

const showResult = (index) => {
  // rowtableData = []
  for(var i =0; i<searchResult.length;i++ ){
      if(i == index){
        let others = searchResult[i].others;
        for(var j =0;j < others.length; j++){
          let obj = others[j];
          let order = obj.item_order;
          let img = obj.item_img;
          let title = obj.item_title;
          let id = obj.item_id;
          let price = obj.item_price;
          let pricerate = obj.item_price_rate;
          let shop = obj.item_shop;
          let sold = obj.item_month_sold;
          let nowobj = {
            "order":order, 
            "img":img,
            "title":title, 
            "id":id, 
            "price":price, 
            "pricerate":pricerate, 
            "shopName":shop,
            "sold":sold
          }
          rowtableData.push(nowobj)
        }
      }
  }
  //console.log(searchResult)
  //console.log(rowtableData)
  isrowdata.value = true
}

const onSubmit = async () => {
  let user_link = form.link;
  let user_desc = form.desc;
  let user_descs = user_desc.split('\n')
  let data1 = await getMessage(user_link)
  if(data1.img != ""){
    userSku.img = data1.img;
  }
  if(data1.title != ""){
    userSku.title = data1.title;
  }
  userSku.url = data1.url;

  //console.log(data1)
  searchResult = await checkNum(user_link, user_descs)
  //console.log(searchResult)

  ischeck.value = true;

  let intertime = (user_descs.length*10*1000)/100;
  setInterval(() => {
    if(ischeck.value == true){
      percentage.value += 1
      if (percentage.value > 100) {
          percentage.value = 100
      }
    }else{
      percentage.value = 0
    }
    
  }, intertime)

  setTimeout(() => {
    ischeck.value = false
    isresult.value = true
    //form.result = data2[0].location;
    for (var i = 0; i< searchResult.length; i++){
      let row = searchResult[i];
      let order = i+1;
      let keyword = row.key;
      let locstr = row.location;
      let rowobj = {"order":order, "keyword":keyword, "location":locstr}
      tableData.push(rowobj)
    }
    
  }, user_descs.length*10*1000);
  
}


//let url = 'https://detail.tmall.com/item.htm?id=652257992182'
//getMessage(url)

//let data = await checkNum(url,['职业西服'])
//console.log("--- app vue data ---:", data)
//myajs()


//自定义V-指令,避免短时间内重复点击--------------v-disClick="3"----------------
/* const VdisClick={
  mounted: (el, binding) =>{
          el.addEventListener("click", function(){
            el.setAttribute("disabled", "disabled")
            el.setAttribute("style", "pointer-events: none")
            setTimeout(() => {
              el.removeAttribute("disabled")
              el.removeAttribute("style")
            }, binding.value * 1000);
          })
      }
}  */



  const goTOLogin = () => {
      API.emitter.emit('iwantlogin')
    }
    const backToHome = () => {
    }
      const getStorage = () => {
    chrome.storage.local.get(['userid'], (result) =>{
      // console.log('result: ------tmtmtmt-------', result)
      result == {} ? chrome.storage.local.set({userid: ''}) : userstore.userid = result.userid
    })
  }
   onUpdated(() => {
   })
   onBeforeMount(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      message == 'loginEvent'?   getStorage() : ''
      sendResponse({status: true})
      })
    getStorage()

   })
</script>

<style lang="scss" >
// @import "../../css/sass/jclpanel.scss";

.cjzz{
  position: fixed;
  z-index: 999999999;
}
.cjzz2{
  position: fixed;
  z-index: 999999999+3;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
