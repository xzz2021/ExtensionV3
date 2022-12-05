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
        <el-dropdown placement="right-start" ref="subDropdown2">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon3-tupian"></i></div>
            <div class="title" >下载工具</div>
            <div class="arrow-right-czp"><i class="xzzicon3-youjt"></i></div>
          </span>

          <template #dropdown>
             <el-dropdown-menu class="el-dropdown-menu2">
              <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown  placement="right-start" @command="imgDownload" >
                      <span class="el-dropdown-link2">
                        <div class="title2">图片下载</div>
                        <i class="xzzicon3-youjt"></i>
                      </span>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="() => { $refs.subDropdown2.handleOpen() }"
                        @mouseleave.enter="() => { $refs.subDropdown2.handleClose() }">
                    <el-dropdown-item :class="`addOperateRecord 图片下载-${item.name}`"
                    :command="item" v-for="item in pictureOption" :key="item.name">
                        {{ item.name }}
                    </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
                <!-- 二级菜单结束 -->

                 <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown placement="right-start" @command="downLoadJDcommentPicVue">
                      <!-- <div class="title2">有图评价下载</div> -->
                      <span class="el-dropdown-link2">
                        <div class="title2">有图评价下载</div>
                        <i class="xzzicon3-youjt"></i>
                      </span>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="() => { $refs.subDropdown2.handleOpen() }"
                        @mouseleave.enter="() => { $refs.subDropdown2.handleClose() }">
                        <!-- <el-dropdown-menu  > -->
                    <el-dropdown-item :command="item.value" v-for="item in commentOptionPic" 
                    :key="item.value">{{ item.value }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
                <!-- 二级菜单结束 -->

                   <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown placement="right-start" @command="downLoadJDcommentNoPicVue">
                      <!-- <div class="title2">无图评价下载</div> -->
                      <span class="el-dropdown-link2">
                        <div class="title2">无图评价下载</div>
                        <i class="xzzicon3-youjt"></i>
                      </span>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="() => {$refs.subDropdown2.handleOpen() }"
                        @mouseleave.enter="() => { $refs.subDropdown2.handleClose() }">
                    <!-- <el-dropdown-menu  > -->
                    <el-dropdown-item :command="item.value" v-for="item in commentOptionNoPic" 
                    :key="item.value">{{ item.value }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
                <!-- 二级菜单结束 -->

              <el-dropdown-item  class="addOperateRecord 下载工具-视频下载 el-dropdown-item2" @click.enter="downLoadJDVideoVue">
                <span class="el-dropdown-link2">
                  <div class="title2" >视频下载</div>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
          <div>
        <el-dropdown>
          <span class="addOperateRecord 商品搬家-商品搬家 el-dropdown-link" @click="try33" >
            <div class="jclicon"><i class="xzzicon3-spbj"></i></div>
            <div class="title">商品搬家</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
        <div v-if="userid">
          <el-dropdown placement="right-start"  @command="accountManagement">
            <span class="el-dropdown-link">
              <div class="jclicon"><i :class="userid ? 'xzzicon3-exchange' : 'xzzicon3-login'"></i></div>
              <div  class="title">{{userPhone}}</div>
              <div class="arrow-right-czp"><i class="xzzicon3-youjt"></i></div>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="addOperateRecord 账号管理-操作记录" command="operate">操作记录</el-dropdown-item>
              <el-dropdown-item class="addOperateRecord 账号管理-任务进程" command="progress">任务进程</el-dropdown-item>
              <el-dropdown-item class="addOperateRecord 账号管理-切换账号" command="exchange">切换账号</el-dropdown-item>
              <el-dropdown-item class="addOperateRecord 账号管理-退出登录" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <div  v-else>
          <el-dropdown>
                <span class="el-dropdown-link" @click="goToLogin">
                  <div class="jclicon"><i class="xzzicon3-login"></i></div>
                  <div  class="title" >账号登录</div>
                  <div class="arrow-right-czp"><i class=""></i></div>
                </span>
          </el-dropdown>
        </div>

        <div  class="version">版本:{{ version }} </div>

    </main>
    <!-- </el-collapse-transition> -->
    </Transition>

    <footer @click="showMain = !showMain">
      <div class="shrink"><i :class="!showMain? 'xzzicon3-shrink': 'xzzicon3-shrink2'"></i></div>
    </footer>
    </div>
    </VueDragResize>
    </div>
    <loginPanel ref="loginRef" />
    <taskProgress ref="taskProgressRef" />
    <operateHistory ref="operateHistoryRef" />
    <jdScanRecord ref="ScanRecordRef"/>
    <!-- <jdShopDiagnosis ref="shopDiagnosisRef" /> -->
    <!-- <MyProgress :show="progressVisible" :percentage="percentage" /> -->
    
      <jdImageDownload ref="imageDownloadRef"/>
    <!-- <commentDownload ref="commentDownloadRef" />
    <keywordRanking ref="zrss" /> -->
    <div class="test">
      <div class="test1" @click="test1">
      <el-button type="primary" >test1</el-button>
      </div>
      <el-button type="primary" @click="test2">test2</el-button>
    </div>
    <!-- <jdChildComponent /> -->
    <!-- 通过将props动态值绑定到pinia上,可以全局实时更改调用,且不需要公共组件的pinia引入 不再需要$ref的定义及调用-->
    <progressBar :visible="proBar.show" :percentage="proBar.percentage"/>
</template>

<script setup>
import {videoDownloadczp} from './js/JDVideo.js'
import {downLoadJDcommentPic, downLoadJDcommentNoPic} from './js/JDcomments.js'
import { getMainImg, getSkuImg, packageImages, packageSkuImages, downloadDtlImg, downloadAllImg, getMainImgPhone, getSkuImgPhone, getDtlImgPhone, getAllImgPhone } from './js/JDPCPicture.js'
import { getOrderList, setOrderList } from './js/JDorderTag.js'
import { getVideoTitle, getSkuId, diagnosisProduct} from './js/JDDetailData.js'
import {dwdJDPCMainPics, dwdJDPCSkuPics, dwdJDPCDtlPics, dwdJDPCallPics, dwdJDPCallPicsDir} from './js/JDImage.js'
import {dwdJDYDMainPics, dwdJDYDskuPics, dwdJDYDdtlPics, dwdJDYDallPics, dwdJDYDallPicsDir} from './js/JDImage.js'

//各平台持久化的store数据
const userstore = userStore()
const { location } = storeToRefs(userstore)


//平台状态store
const busStore = piniaStore()
//storeToRefs增加响应性,使用了proxy,所以需要用.value拿到值
const { proBar,info_id, scanData, scanShow, currentHref } = storeToRefs(busStore) 


// const { proxy } = getCurrentInstance()
//---------------单纯字符串变量不可使用reactive---------
//-----ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要

const test1 = async () => {
  proBar.value.show = true
  setInterval(() => {
    proBar.value.percentage += 6
  }, 1000);

}

let curCookies  = ref('')
let showMain  = ref(true)
const version = VERSION
const userid = ref('')
const userPhone = ref('')

const try33 = async () => {
  await API.wait(2)
  // console.log('--------我执行了-----77777777777------------')
}
const add3 = (e) => {
  console.log('-------我是新增事件--------------')
        //三种方式兼容不同浏览器
        e.stopImmediatePropagation()
        e.cancelBubble = true //IE
        e.stopPropagation()
}
const test2 = () => {
  let dom = $('.test1')[0]
  dom.removeEventListener('click', add3, 'useCapture')
  // API.scroll.goToBottomEase()
}


//实时响应式获得数据需要直接绑定state的值,解构无法实时获得最新值,虽然可以用来操作,但最好使用$patch方式
// let {lx, ly} = location.value




const diagnosisOption = reactive([{value: 2}, {value: 5}, {value: 10}, {value: 20}])
const commentOptionPic = reactive([{value: 20}, {value: 50}, {value: 100}, {value: 200}])
const commentOptionNoPic = reactive([{value: 20}, {value: 50}, {value: 100}, {value: 200}])


//----------------------图片下载------------start----------------------------------
  const pictureOption  = [
                      {name: 'PC端_全部下载(带目录)', arg: 'allwith', platform: 'pc'},
                      {name: 'PC端_全部下载', arg: 'all', platform: 'pc'},
                      {name: 'PC端_主图下载', arg: 'main', platform: 'pc'},
                      {name: 'PC端_详情图下载', arg: 'detail', platform: 'pc'},
                      {name: 'PC端_SKU图下载', arg: 'sku', platform: 'pc'},
                      {name: '移动端_全部下载(带目录)', arg: 'allwith', platform: 'mobile'},
                      {name: '移动端_全部下载', arg: 'all', platform: 'mobile'},
                      {name: '移动端_主图下载', arg: 'main', platform: 'mobile'},
                      {name: '移动端_详情图下载', arg: 'detail', platform: 'mobile'},
                      {name: '移动端_SKU图下载', arg: 'sku', platform: 'mobile'}
                      ]
  const imageDownloadRef = ref(null)
  const imgDownload = (item) => {
    // console.log('item: ', item);
      imageDownloadRef.value.startDownload(item.arg, item.platform);
  }
//-------------------图片下载------------end-------------------------------------------

//---------------店铺诊断及历史记录----start-----------------
const scanRecordRef = ref(null)
const shopDiagnosisRef = ref(null)
const OneClickDiagnosis = async(num) =>{
  if(num =='scanRecord') return scanRecordRef.value.getScanData(num)  //调用历史记录模块
  // shopDiagnosisRef.value.startDiagnosis(num)
}
//---------------店铺诊断及历史记录----end-----------------


// ---------------------视频下载 start--------------
const downLoadJDVideoVue = async () => {
      if (!(currentHref.value.indexOf('item.jd') > 1)) return alert('请进入商品详情页,再点击开始下载')
      let regs = currentHref.value.match(/item.jd.com.*?(\d+)/);
        let skuId = regs.length >= 2 ? regs[1] : undefined;
        $('.video-icon').click()
        let url = $('video source').attr('src')
        if(url == undefined) return  ElMessage.error({ message: '当前商品没有视频',  duration: 1500,})
        let name = new API.dayjs().format('YYYYMMDD') + '_' + skuId + '_商品视频.mp4'
      let res = await  API.sendMessage({type: 'downloads', url, name}) 
      res && ElMessage.success({ message: `视频${res}`, duration: 2500,})
}
// --------------------------视频下载 end-------------------


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

//---------面板拖拽功能------start------------------
let reloadDrag = ref(true)
const onDragstop = (e) => {
  let winHeight = window.innerHeight - 60
  let winWidth = window.innerWidth - 200
  if(e.top < 0 || e.left < 0 || e.top > winHeight || e.left > winWidth){
    reloadDrag.value = false
    setTimeout(() => {
    reloadDrag.value = true
    }, 100)
  }else{
    userstore.$patch((state)=>{ //数据存放于持久化的pinia里
      state.location.lx = e.left
      state.location.ly =  e.top
    })
  }
}
//---------面板拖拽功能------end------------------



const  backToHome =  () => {
  window.open('https://www.jd.com/')
}

//---------登录------start----------------
const loginRef = ref(null)     // 子组件ref要声明才能拿到
const goToLogin = () => { loginRef.value.loginShow = true }
//---------登录------end----------------


//---------退出登录------start----------------
const logout = () => {
  API.Storage.remove('userInfo')
  loginRef.value.checkPhone = false
  ElMessage.success('账号退出成功!')
}
//---------退出登录------end----------------


//-----☆☆☆☆☆☆----------------☆☆☆☆☆☆--------
//监听添加移除的公共事件
 const targetEvent = (e) => {
    //三种方式兼容不同浏览器
    e.stopImmediatePropagation()
    e.cancelBubble = true //IE
    e.stopPropagation()
    loginRef.value.loginShow = true  //因为api里拿不到ref所以无法抽离,只能在此处定义
  }
//-----☆☆☆☆☆☆----------------☆☆☆☆☆☆--------

const getUserInfo = async () => {
let userInfoStore  =  await  API.getUserinfo()
// console.log('userInfoStore: ', userInfoStore);
  if(userInfoStore.userid == undefined) {
    API.checkLogin.addEvent(targetEvent)  //添加全局登录拦截
    return 
    }else{
      API.checkLogin.removeEvent(targetEvent)  //移除全局登录拦截
    }
  busStore.$patch((state)=>{
      state.userInfo = userInfoStore
    })
    userid.value = userInfoStore.userid
    let a  = userInfoStore.userPhone + ''
  let b = a.substring(3,7)
  userPhone.value = a.replace(b, '****')
}
//------账号管理菜单函数-----------
 const accountManagement = async (arg) => {
      switch(arg){
        case 'operate': API.emitter.emit('openOperateHistory')
          break
        case 'progress': API.emitter.emit('openTaskprogress')
          break
        case 'exchange':   loginRef.value.loginShow = true;console.log('---------我执行了---222---------')
          break
        case 'logout': logout()
          break
        // case 'operate': this.$myBus.$emit('openOperateHistory')
        //   break
        default: ''
          break
      }
    }

  const  developing = async () => {
      ElMessage.error({ message: `功能等待开发中`, duration: 3000, showClose: true });
    }

onMounted(async () => {
curCookies.value = document.cookie
//  	let column = [{title: '名称',key: 'name',type: 'text'},{title: '视频链接',key: 'videourl',type: 'text'},{title: '图片',key: 'imgurl',type: 'image'}]
//    let data = [{name:'试试111',videourl: 'http://weh.wefw.com60buyimg.com/n2/jfs/t1/193336/10/26161/112918/6/wefew.mp4', imgurl: 'https://img13.360buyimg.com/n2/jfs/t1/193336/10/26161/112918/62c55835Ec20d50ad/7ab207e4ed7547d8.jpg'},
//                {name:'试试222', videourl: '', imgurl: ['https://img14.360buyimg.com/n2/jfs/t1/122295/27/18626/340950/6165b043Ed9f958ec/7a4fc3035bca0094.jpg', 'https://img13.360buyimg.com/n2/jfs/t1/193336/10/26161/112918/62c55835Ec20d50ad/7ab207e4ed7547d8.jpg']}]
//  let a = await API.tableToExcel(column,data, '哈哈哈')
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
  z-index: 22;
}

</style>