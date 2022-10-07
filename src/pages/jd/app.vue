<template>
<div class="导航栏 jclpanel box">
    <header>
        <div class="section">
          <img
            style="width: 107px; height: 40px"
            src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/logobg.png"
            alt=""/>
        </div>
    </header>
    <main>
        <div>
            <el-dropdown placement="right-start"  @command="OneClickDiagnosis">
              <span class="el-dropdown-link">
                <div class="jclicon"><i class="xzzicon-dianpu"></i></div>
                <div class="title">店铺诊断</div>
                <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in diagnosisOption" :key="item.value" :command="item.value">
                    <div class="drop-menu">销售前{{ item.value }}商品</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
        </div>
        <div>
        <el-dropdown placement="right-start" @command="downLoadJDPicVue">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-tupian"></i></div>
            <div class="title" >图片下载</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
             <el-dropdown-menu >
              <el-dropdown-item :command="item.arg" v-for="item in pictureOption" :key="item.value">
                <div class="drop-menu">
                  {{ item.value }}
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown placement="right-start" @command="downLoadJDcommentPicVue">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-pinglun"></i></div>
            <div class="title">有图评价下载</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in commentOptionPic" :key="item.value" :command="item.value">
                <div class="drop-menu"> 评价前{{ item.value }} </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown placement="right-start" @command="downLoadJDcommentNoPicVue">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-pinglun"></i></div>
            <div class="title">无图评价下载</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in commentOptionNoPic" :key="item.value" :command="item.value">
                <div class="drop-menu"> 评价前{{ item.value }} </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown >
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-tupian"></i></div>
            <div class="title" @click="downLoadJDVideoVue">视频下载</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown >
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-tupian"></i></div>
            <div class="title" @click="getOrderTagJDVue">订单备注</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>

    </main>
    <footer>
        <div class="version">{{version}}</div>
    </footer>
</div>

</template>

<script setup>

import {videoDownloadczp} from './js/JDVideo.js'
import {downLoadJDcommentPic, downLoadJDcommentNoPic} from './js/JDcomments.js'
import { getMainImg, getSkuImg, packageImages, packageSkuImages, downloadDtlImg, downloadAllImg, getMainImgPhone, getSkuImgPhone, getDtlImgPhone, getAllImgPhone } from './js/JDPCPicture.js'
import { getOrderList, setOrderList } from './js/JDorderTag.js'
import { videoTitle, skuId} from './js/JDDetailData.js'

const userstore = userStore();
const { userid, userToken, version } = storeToRefs(userstore)
let currentHref = ref('')
let curCookies  = ref('')

const diagnosisOption = reactive([{value: 2}, {value: 5}, {value: 10}, {value: 20}])
const pictureOption  = reactive([
    {value: 'PC端-全部下载', arg: 'pc_all'},
    {value: 'PC端-主图下载', arg: 'pc_main'},
    {value: 'PC端-SKU图下载', arg: 'pc_sku'},
    {value: 'PC端-详情图下载', arg: 'pc_detail'},
    {value: '移动端-全部下载', arg: 'phone_all'},
    {value: '移动端-主图下载', arg: 'phone_main'},
    {value: '移动端-SKU图下载', arg: 'phone_sku'},
    {value: '移动端-详情图下载', arg: 'phone_detail'}
])
const commentOptionPic = reactive([{value: 20}, {value: 50}, {value: 100}, {value: 200}])
const commentOptionNoPic = reactive([{value: 20}, {value: 50}, {value: 100}, {value: 200}])

// 图片下载 start
const downLoadJDPicVue = async (type) => {
    if (type == "pc_all") {
        ElMessage.success({ message:"PC端-图片全部下载开始"});
        downloadAllImg();
    }
    if ( type == "pc_main"){
        ElMessage.success({ message:"PC端-主图下载开始"});
        let mains = getMainImg();
        packageImages(mains, "主图", "PC端-主图下载");
    }
    if ( type == "pc_sku") {
        ElMessage.success({ message:"PC端-SKU图下载开始"});
        let skus = getSkuImg();
        packageSkuImages(skus, "PC端-SKU图下载");
    }
    if ( type == "pc_detail"){
        ElMessage.success({ message:"PC端-详情图下载开始"});
        downloadDtlImg();
    }

    if (type == "phone_main"){
        ElMessage.success({ message:"移动端-主图下载开始"});
        let phonemains = await getMainImgPhone(skuId);
        packageImages(phonemains, "主图", "移动端-主图下载");
    }

    if (type == "phone_sku"){
        ElMessage.success({ message:"移动端-SKU图下载开始"});
        let phoneskus = await getSkuImgPhone(skuId);
        packageSkuImages(phoneskus, "移动端-SKU图下载");
    }

    if(type == "phone_detail"){
        ElMessage.success({ message:"移动端-详情图下载开始"});
        let phonedtls = await getDtlImgPhone(skuId);
        packageImages(phonedtls, "详情图", "移动端-详情图下载");
    }

    if(type == 'phone_all'){
        ElMessage.success({ message:"移动端-图片全部下载开始"});
        let picAll = await getAllImgPhone(skuId);
        packageSkuImages(picAll, "移动端-图片全部下载");
    }
}
// 图片下载 end


// 视频下载 start
const downLoadJDVideoVue = async () => {

  videoDownloadczp(currentHref.value)

}
// 视频下载 end


// 评价下载 start
// --- 有图评价下载 ---
const downLoadJDcommentPicVue = (num) => {
  downLoadJDcommentPic(skuId, num, videoTitle);
}

// --- 无图评价下载 ---
const downLoadJDcommentNoPicVue = (num) => {
  downLoadJDcommentNoPic(skuId, num, videoTitle);
}
// 评价下载 end


// 订单备注 start
// 获取订单备注信息
const getOrderTagJDVue = async () => {
    ElMessage.success({ message:"开始获取订单备注信息"});
    let odList = [251720707226, "jd_75b39cc757d30"]
    let ua = navigator.userAgent;
    let data = await getOrderList(curCookies.value, ua, odList)
    console.log("data" , data)
}

// 设置订单备注信息
const setOrderTagJDVue = async () =>{
    ElMessage.success({ message:"开始设置订单备注信息"});
    const odList = [251720707226,251506941780]
    let ua = navigator.userAgent;
    //let data = await setOrderList(curCookies.value, ua, odList, "js_test", 4, 2);
    let data = await setOrderList(curCookies.value, ua, odList, "", 0, 2);
    console.log("data" , data)
}
// 订单备注 end


// 浏览器存储获取
const getStorage = () => {
    chrome.storage.local.get(['userid'], (result) => {
        result == {} ? chrome.storage.local.set({userid: ''}) : userstore.userid = result.userid
        //console.log(userstore.userid, ' - ', result.userid)
    })
    chrome.storage.local.get(['userPhone'], (result) => {
        result != {} && (userstore.userPhone = result.userPhone)
        //console.log(userstore.userPhone, ' - ', result.userPhone)
    })
    chrome.storage.local.get(['userToken'], (result) => {
        result != {} && (userstore.userToken = result.userToken)
        //console.log(userstore.userToken, ' - ', result.userToken)
    })
}


// Vue挂载时获取用户cookies 和链接地址
onMounted(() => {
  currentHref.value = window.location.href
  curCookies.value = document.cookie
  //console.log('window.location.href: ', window.location.href)
  //console.log('window.location.cookies: ', curCookies.value)
})


</script>

<style lang="scss" scoped>
@import "../../css/sass/jclpanel.scss";

</style>