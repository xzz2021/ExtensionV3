<template>
<div class="jclpanel" >
  

  
    <VueDragResize :isActive="true" :w="180" :h="60" :x="location.lx" :y="location.ly" :z="22" v-if="reloadDrag" :isResizable="false" @dragstop="onDragstop" >
      <!-- https://github.com/kirillmurashov/vue-drag-resize/tree/v2.0.3 -->
    <div class="dragbox">
    <header class="jclheader">
      <div class="section">
        <img
          style="width: 107px; height: 40px"
          src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/logobg.png"
          alt=""
        />
      </div>
    </header>
      <Transition name="fade">
    <!-- <el-collapse-transition> -->
    <main class="jclmain" v-show="showMain">

      <div>
        <el-dropdown  placement="right-start"  @command="OneClickDiagnosis">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-dianpu"></i></div>
            <div class="title">店铺诊断</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in diagnosisOption" :key="item.value" :command="item.value">
                <div class="">销售前{{ item.value }}商品</div>
              </el-dropdown-item>
              <el-dropdown-item>
              <div class="" style="text-align: center;" @click="scanRecord">浏览记录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div>
        <el-dropdown placement="right-start" ref="subDropdown2" >
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-tupian"></i></div>
            <div class="title" >下载工具</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>

          <template #dropdown>
             <el-dropdown-menu class="el-dropdown-menu2">
              <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown  placement="right-start" @command="downLoadJDPicVue">
                      <div class="title2">图片下载</div>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="() => { $refs.subDropdown2.handleOpen() }"
                        @mouseleave.enter="() => { $refs.subDropdown2.handleClose() }">
                    <el-dropdown-item :command="item.arg" v-for="item in pictureOption" :key="item.value">
                      <div class="">
                        {{ item.value }}
                      </div>
                    </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
                <!-- 二级菜单结束 -->

                 <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown placement="right-start" @command="downLoadJDcommentPicVue">
                      <div class="title2">有图评价下载</div>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="() => { $refs.subDropdown2.handleOpen() }"
                        @mouseleave.enter="() => { $refs.subDropdown2.handleClose() }">
                    <el-dropdown-item :command="item.value" v-for="item in commentOptionPic" :key="item.value">
                      <div>{{ item.value }}</div>
                    </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
                <!-- 二级菜单结束 -->

                   <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown placement="right-start" @command="downLoadJDcommentNoPicVue">
                      <div class="title2">无图评价下载</div>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="() => {$refs.subDropdown2.handleOpen() }"
                        @mouseleave.enter="() => { $refs.subDropdown2.handleClose() }">
                    <el-dropdown-item :command="item.value" v-for="item in commentOptionNoPic" :key="item.value">
                      <div class="">
                        {{ item.value }}
                      </div>
                    </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
                <!-- 二级菜单结束 -->

              <el-dropdown-item  class="el-dropdown-item2">
                <!-- <el-dropdown  > -->
                <span class="el-dropdown-link">
                  <div class="title2" @click="downLoadJDVideoVue">视频下载</div>
                </span>
                  <!-- <template #dropdown>
                    <el-dropdown-menu  >
                    <el-dropdown-item >
                    </el-dropdown-item>
                    </el-dropdown-menu>
                  </template> -->

                <!-- </el-dropdown> -->
              </el-dropdown-item>


            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <!-- <div>
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
      </div> -->

      <!-- <div>
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
      </div> -->
      
      <!-- <div>
        <el-dropdown >
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-spxz"></i></div>
            <div class="title" @click="downLoadJDVideoVue">视频下载</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div> -->

      <div>
        <el-dropdown >
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-dingdan"></i></div>
            <div class="title" @click="getOrderTagJDVue">订单备注</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
       <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-gjczhq"></i></div>
            <div class="title" @click="keyWordTool">关键词组合器</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
      <div>
        <!-- <el-dropdown> -->
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-shouye"></i></div>
            <div class="title" @click="backToHome">回到首页</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        <!-- </el-dropdown> -->
      </div>

        <div v-if="userid">
          <el-dropdown placement="right-start">
            <span class="el-dropdown-link">
              <div class="jclicon"><i :class="userid ? 'xzzicon-exchange' : 'xzzicon-login'"></i></div>
              <div  class="title">{{userPhone}}</div>
              <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="aa">
                <div class="drop-menu" @click="goToLogin">切换账号</div>
              </el-dropdown-item>
              <el-dropdown-item command="bb">
                <div class="drop-menu" @click="test">操作记录</div>
              </el-dropdown-item>
              <el-dropdown-item command="cc">
                <div class="drop-menu" >任务进程</div>
              </el-dropdown-item>
            </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div  v-else>
              <!-- <el-dropdown> -->
                <span class="el-dropdown-link">
                  <div class="jclicon"><i class="xzzicon-login"></i>
                  </div>
                  <div  class="title" @click="goToLogin">账号登录</div>
                  <div class="arrow-right-czp"><i class=""></i></div>
                </span>
              <!-- </el-dropdown> -->
            </div>

        <div v-if="userid">
          <!-- <el-dropdown > -->
            <span class="el-dropdown-link">
              <div class="jclicon" ><i class="xzzicon-logout"></i></div>
              <div class="title" @click="logout">退出登录</div>
              <div class="arrow-right-czp"><i class=""></i></div>
            </span>
          <!-- </el-dropdown> -->
        </div>
        <div  class="version">版本:{{ version }} </div>

    </main>
    <!-- </el-collapse-transition> -->
    </Transition>

    <footer @click="showMain = !showMain">
      <div class="shrink"><i :class="!showMain? 'xzzicon-shrink': 'xzzicon-shrink2'"></i></div>
    <!-- <el-button type="primary">Primary</el-button>
    <div class="text-red-400 ">6666</div> -->
    </footer>
    </div>
</VueDragResize>
    </div>
    <LoginPanel ref="loginref" />
    <JdScanRecord />
    <!-- <oneClickDiagnosis /> -->
    <!-- <MyProgress :show="progressVisible" :percentage="percentage" /> -->

    <div class="test">
      <el-button type="primary" @click="test1">test1</el-button>
      <el-button type="primary" @click="test2">test2</el-button>
      <!-- <el-button type="primary" @click="test3">test3</el-button> -->
    </div>
</template>

<script setup>
import {videoDownloadczp} from './js/JDVideo.js'
import {downLoadJDcommentPic, downLoadJDcommentNoPic} from './js/JDcomments.js'
import { getMainImg, getSkuImg, packageImages, packageSkuImages, downloadDtlImg, downloadAllImg, getMainImgPhone, getSkuImgPhone, getDtlImgPhone, getAllImgPhone } from './js/JDPCPicture.js'
import { getOrderList, setOrderList } from './js/JDorderTag.js'
import { getVideoTitle, getSkuId, diagnosisProduct} from './js/JDDetailData.js'


//持久化的store数据
const userstore = userStore()
const { location } = storeToRefs(userstore)


//各自平台的
const store = piniaStore()
const { info_id, scanData, scanShow } = storeToRefs(store)


// const { proxy } = getCurrentInstance()
//---------------单纯字符串变量不可使用reactive---------
//-----ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要

//            console.log('wholeShow.scanShow: ', scanShow.value);

// console.log('scanData.length: ', scanData.value.length)

let currentHref = ref('')
let curCookies  = ref('')
let showMain  = ref(true)
const version = VERSION
const userid = ref('')
const userPhone = ref('')

const test1 = () => {
  console.log('==========test')
  //v3可以直接滚动
  // API.scroll.stepEase(800,4)
  // proxy.xzz('================')
}
const test2 = () => {
  API.scroll.goToBottomEase()
}

// let progressVisible = ref(false)
// let percentage = ref(60)

//实时响应式获得数据需要直接绑定state的值,解构无法实时获得最新值,虽然可以用来操作,但最好使用$patch方式
// let {lx, ly} = location.value

let reloadDrag = ref(true)
const loginref = ref(null)

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




//店铺诊断
const OneClickDiagnosis = async(num) =>{
  diagnosisProduct(num)

}

// 图片下载 start
const downLoadJDPicVue = async (type) => {
    if (type == "pc_all") {
        ElMessage.success({ message:"PC端-图片全部下载开始"});
        let skd = getSkuId(currentHref)
        downloadAllImg(skd);

    }
    if ( type == "pc_main"){
        ElMessage.success({ message:"PC端-主图下载开始"});
        let mains = getMainImg();
        let skd = getSkuId(currentHref)
        let timenum = API.ztime.ymd2()
        let filename = timenum + '电脑端-' + skd + '图片主图下载'
        packageImages(mains, "主图", filename);
    }
    if ( type == "pc_sku") {
        ElMessage.success({ message:"PC端-SKU图下载开始"});
        let skus = getSkuImg();
        let timenum = API.ztime.ymd2()
        let skd = getSkuId(currentHref)
        let filename = timenum + '电脑端-' + skd + '图片SKU图下载'
        packageSkuImages(skus, filename);
    }
    if ( type == "pc_detail"){
        ElMessage.success({ message:"PC端-详情图下载开始"});
        let skd = getSkuId(currentHref)
        downloadDtlImg(skd);
    }

    if (type == "phone_main"){
        ElMessage.success({ message:"移动端-主图下载开始"});
        let skd = getSkuId(currentHref)
        let phonemains = await getMainImgPhone(skd);
        let timenum = API.ztime.ymd2()
        let filename = timenum + '移动端-' + skd + '图片主图下载'
        packageImages(phonemains, "主图", filename);
    }


    if (type == "phone_sku"){
        ElMessage.success({ message:"移动端-SKU图下载开始"});
        let skd = getSkuId(currentHref)
        let phoneskus = await getSkuImgPhone(skd);
        let timenum = API.ztime.ymd2()
        let filename = timenum + '移动端-' + skd + '图片SKU图下载'
        packageSkuImages(phoneskus, filename);
    }

    if(type == "phone_detail"){
        ElMessage.success({ message:"移动端-详情图下载开始"});
        let skd = getSkuId(currentHref)
        let phonedtls = await getDtlImgPhone(skd);
        let timenum = API.ztime.ymd2()
        let filename = timenum + '移动端-' + skd + '图片详情图下载'
        packageImages(phonedtls, "详情图", filename);
    }

    if(type == 'phone_all'){
        ElMessage.success({ message:"移动端-图片全部下载开始"});
        let skd = getSkuId(currentHref)
        let picAll = await getAllImgPhone(skd);
        let timenum = API.ztime.ymd2()
        let filename = timenum + '移动端-' + skd + '图片全部下载'
        packageSkuImages(picAll, filename);
    }
}
// 图片下载 end


// 视频下载 start
const downLoadJDVideoVue = async () => {
  let timenum = API.ztime.ymd2()
  let skd = getSkuId(currentHref)
  videoDownloadczp(currentHref, skd, timenum)

}
// 视频下载 end


// 评价下载 start
// --- 有图评价下载 ---
const downLoadJDcommentPicVue = (num) => {
  let skd = getSkuId(currentHref);
  let videoTitle = getVideoTitle();
  downLoadJDcommentPic(skd, num, videoTitle);
}

// --- 无图评价下载 ---
const downLoadJDcommentNoPicVue = (num) => {
  let skd = getSkuId(currentHref)
  let videoTitle = getVideoTitle();
  downLoadJDcommentNoPic(skd, num, videoTitle);
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



const onDragstop = (e) => {
  let winHeight = window.innerHeight - 60
  let winWidth = window.innerWidth - 200
  if(e.top < 0 || e.left < 0 || e.top > winHeight || e.left > winWidth){
    reloadDrag.value = false
    setTimeout(() => {
    reloadDrag.value = true
    }, 100)
  }else{
    userstore.$patch((state)=>{
      state.location.lx = e.left
      state.location.ly =  e.top
    })
  }
}

const  backToHome =  () => {
  if (userid.value == '') return ElMessage.error({ message: '请登录账号', duration: 1500 })
  window.open('https://www.jd.com/')
}

const goToLogin = () => {
  loginref.value.loginShow = true
}

const logout = () => {
  API.Storage.remove('userInfo')
  loginref.value.checkPhone = false
  ElMessage.success('账号退出成功!')
}

const getUserInfo = async () => {
let userInfoStore  =  await  API.Storage.get('userInfo')
  if(userInfoStore == '') return 
  store.$patch((state)=>{
      state.userInfo = userInfoStore
    })
    userid.value = userInfoStore.userid
    let a  = userInfoStore.userPhone + ''
  let b = a.substring(3,7)
  userPhone.value = a.replace(b, '****')
}

onMounted(() => {
currentHref = window.location.href
curCookies.value = document.cookie
//curCookies.value = "{'" + document.cookie + "'}"
})

onBeforeMount(async () => {
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  message == 'loginEvent'? getUserInfo() : ''
  sendResponse({status: true})
  })
getUserInfo()
})

</script>

<style lang="scss" scoped>
@import "../../css/sass/jclpanel.scss";

.test{
  position: fixed;
  top: 30%;
  left: 20%;
  background-color: #fff;
}

</style>