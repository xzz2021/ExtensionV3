<template>
<div class="导航栏 jclpanel box">
    <header>
      <div class="section">
        <img
          style="width: 107px; height: 40px"
          src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/logobg.png"
          alt=""
        />
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
        <el-dropdown placement="right-start">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-tupian"></i></div>
            <div class="title" @click="imageDownload">图片下载</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown placement="right-start" @command="commentDownload">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-pinglun"></i></div>
            <div class="title">评论下载</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in commentOption" :key="item.value" :command="item.value">
                <div class="drop-menu"> 评价数量前{{ item.value }} </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown placement="right-start">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-tupian"></i></div>
            <div class="title" @click="videoDownload">视频下载</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown> </template>
        </el-dropdown>
      </div>
      <!-- <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-liulan"></i></div>
            <div class="title">浏览记录</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown>
          </template>
        </el-dropdown>
      </div> -->
      <!-- <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-biaoti"></i></div>
            <div class="title">标题工具</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu></el-dropdown-menu>
          </template>
        </el-dropdown>
      </div> -->
       <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-biaoti"></i></div>
            <div class="title" @click="keyWordTool">关键词组合器</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu></el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-shouye"></i></div>
            <div class="title" @click="backToHome">回到首页</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu></el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
          <el-dropdown >
            <span class="el-dropdown-link">
              <div class="jclicon" style="margin: 0 4px 2px 10px;"><i :class="userid ? 'xzzicon-exchange' : 'xzzicon-login'"></i></div>
              <div v-if="userid" class="title" @click="changeAccount">切换账号</div>
              <div v-else class="title" @click="goTOLogin">账号登录</div>
              <div class="arrow-right-czp"><i class=""></i></div>
            </span>
    <template #dropdown>
            <el-dropdown-menu  ></el-dropdown-menu>
    </template>
          </el-dropdown>
        </div>
        <div v-if="userid">
          <el-dropdown >
            <span class="el-dropdown-link">
              <div class="jclicon" style="margin: 0 4px 2px 10px;"><i class="xzzicon-logout"></i></div>
              <div class="title" @click="logout">退出登录</div>
              <div class="arrow-right-czp"><i class=""></i></div>
            </span>
    <template #dropdown>
            <el-dropdown-menu  ></el-dropdown-menu>
    </template>
          </el-dropdown>
        </div>
    </main>
    <footer>
      <div class="version">0818</div>
    </footer>
    <el-button type="primary" @click="con">下载</el-button>
    <el-button type="primary" @click="con2">退出</el-button>
      <!-- <PagesTmallMyDoc /> -->
<div >
</div>
    </div>
</template>


<script setup>
//-------------已配置自动引入vue相关依赖-----------------
// import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { userStore } from '../../stores/userStore'

const userstore = userStore();
const { userid } = storeToRefs(userstore)

const msg = reactive({type: '666', msg:'sss'})
let currentHref = reactive('')
const diagnosisOption = reactive([{value: 2}, {value: 5}, {value: 10}, {value: 20}])
const commentOption = reactive([{value: 20}, {value: 50}, {value: 100}, {value: 200}])
    const con =async () => {
      // chrome.storage.local.set({userid: '66666666666'})
      // $('#logo a').attr('href','http://note.xzz2022.top')
      //--------------------------------
      // let msg = {type: 'downloads', url: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/dist.7z'}
      // let res = await API.sendMessage(msg)
      // console.log('res:----------下载------ ', res);
      //--------------------------------------
    }
    const con2 = () => {
      chrome.storage.local.set({userid: ''})
      
    }
    const videoDownload = async () =>{
    if (userid == '') return API.emitter.emit('iwantlogin')
    if (!(currentHref.indexOf('item.jd') > 1)) {
        return alert('请进入商品详情页,再点击开始下载')
      }
      
        jq('.video-icon').click()
        let url = jq('video source').attr('src')
        // if(src == undefined) return  this.$message({ message: '当前商品没有视频', type: 'error', duration: 1500,})
        let msg = {type: 'download', url}
      let res = await  API.sendMessage(msg) 
      console.log('res: ', res)
    }
  const getStorage = () => {
    chrome.storage.local.get(['userid'], (result) =>{
      result == {} ? chrome.storage.local.set({userid: ''}) : userstore.userid = result.userid
    })
  }
  onMounted(() => {
    currentHref = window.location.href
    // console.log('window.location.href: ', window.location.href)
  })
   onBeforeMount(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      message == 'loginEvent'? getStorage() : ''
      sendResponse({status: true})
      })
    getStorage()

   })
  

</script>
<style lang="scss" scoped>
@import "../../css/sass/jclpanel.scss";
// .box{
//     width: 200px;
//     height: 200px;
//     position: fixed;
//     z-index: 100001;
//     left: 200px;
//     top: 100px;
//     z-index: 333;
//     // background-color: rgba(77, 255, 201, 0.788);
// }

</style>