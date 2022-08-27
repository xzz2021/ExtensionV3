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
        <el-dropdown placement="right-start">
          <span class="el-dropdown-link">
            <div class="meicon-logo"><i class="xzzicon-dianpu"></i></div>
            <div class="title">店铺诊断</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown placement="right-start">
          <span class="el-dropdown-link">
            <div class="meicon-logo"><i class="xzzicon-tupian"></i></div>
            <div class="title">图片下载</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>全部下载</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown placement="right-end">
          <span class="el-dropdown-link">
            <div class="meicon-logo"><i class="xzzicon-pinglun"></i></div>
            <div class="title">无图评论下载</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu> </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown placement="right-start">
          <span class="el-dropdown-link">
            <div class="meicon-logo"><i class="xzzicon-pingjia"></i></div>
            <div class="title">有图评论下载</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu> </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="meicon-logo"><i class="xzzicon-liulan"></i></div>
            <div class="title">浏览记录</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
          <template #dropdown>
            <!-- <el-dropdown-menu  ></el-dropdown-menu> -->
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="meicon-logo"><i class="xzzicon-biaoti"></i></div>
            <div class="title">标题工具</div>
            <div class="arrow-right-czp"><i class="meIconfont"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu></el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="meicon-logo"><i class="xzzicon-shouye"></i></div>
            <div class="title" @click="backToHome">回到首页</div>
            <div class="arrow-right-czp"><i class="meIconfont"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu></el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
          <el-dropdown >
            <span class="el-dropdown-link">
              <div class="meicon-logo" style="margin: 0 4px 2px 10px;"><i class="el-icon-user-solid"></i></div>
              <div v-if="userid" class="title" @click="changeAccount">切换账号</div>
              <div v-else class="title" @click="goTOLogin">账号登录</div>
              <div class="arrow-right-czp"><i class="meIconfont"></i></div>
            </span>
    <template #dropdown>
            <el-dropdown-menu  ></el-dropdown-menu>
    </template>
          </el-dropdown>
        </div>
        <div v-if="userid">
          <el-dropdown >
            <span class="el-dropdown-link">
              <div class="meicon-logo" style="margin: 0 4px 2px 10px;"><i class="el-icon-s-promotion"></i></div>
              <div class="title" @click="logout">退出登录</div>
              <div class="arrow-right-czp"><i class="meIconfont"></i></div>
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
    <el-button type="primary" @click="con">登录</el-button>
    <el-button type="primary" @click="con2">退出</el-button>
      <!-- <PagesTmallMyDoc /> -->
<div >
    <el-button type="primary" size="default" @click="sendMessage">seage</el-button>
    

</div>
    </div>
</template>


<script setup>
import { reactive, onMounted, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { userStore } from '../../stores/userStore'

const userstore = userStore();
const { userid } = storeToRefs(userstore)
const msg = reactive({type: '666', msg:'sss'})
const sendMessage = async () => {
    // console.log('--------------msg: ', msg) 
    // let res = await API.sendMessage(msg)
    // console.log('--------res: ', res)
}
    const con = () => {
      // console.log('userstore: ', userstore);
      
      userstore.userid = '666'
    }
    const con2 = () => {
      // console.log('userstore: ', userstore);
      
      userstore.userid = ''
    }
  const getStorage = () => {
    chrome.storage.local.get(['userid'], (result) =>{
      console.log('result: -jdjdjdj---111111111111', result.userid)
      result == {} ? chrome.storage.local.set({userid: ''}) : userstore.userid = result.userid
      console.log('result: -jdjdjdj---22222222', userstore.userid)

    })
  }
   onBeforeMount(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // console.log('djdjdjdjdj--------message: ', message);
      message == 'loginEvent'? getStorage() : ''
      sendResponse({status: true})
      })
    getStorage()
    //  console.log('-------API------------', API);
    //  API.aa()

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