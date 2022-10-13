<template>
<div class="导航栏 jclpanel" >
    <VueDragResize :isActive="true" :w="180" :h="60" :x="jdx" :y="jdy" :z="22" v-if="reloadDrag" :isResizable="false" @dragstop="onDragstop" >
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
      <transition name="fade">
    <!-- <el-collapse-transition> -->
    <main class="jclmain" v-show="showMain">
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
        <el-dropdown placement="right-start" @command="imgDownload">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-tupian"></i></div>
            <div class="title" >图片下载</div>
            <div class="arrow-right-czp"><i class=""></i></div>
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
        <el-dropdown placement="right-start" @command="commentDownload">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-pingjia"></i></div>
            <div class="title">有图评价下载</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in commentOption" :key="item.value" :command="item.value">
                <div class="drop-menu"> 评价前{{ item.value }} </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown placement="right-start" @command="commentDownload1">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-pinglun"></i></div>
            <div class="title">无图评价下载</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in commentOption1" :key="item.value" :command="item.value">
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
            <div class="title" @click="videoDownload">视频下载</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-dingdan"></i></div>
            <div class="title">订单备注</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-liulan"></i></div>
            <div class="title">浏览记录</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
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
            <div class="jclicon"><i class="xzzicon-gjczhq"></i></div>
            <div class="title" @click="keyWordTool">关键词组合器</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-shouye"></i></div>
            <div class="title" @click="backToHome">回到首页</div>
            <div class="arrow-right-czp"><i class=""></i></div>
          </span>
        </el-dropdown>
      </div>
      <div>
          <el-dropdown >
            <span class="el-dropdown-link">
              <div class="jclicon"><i :class="userid ? 'xzzicon-exchange' : 'xzzicon-login'"></i></div>
              <div v-if="userid" class="title" @click="changeAccount">切换账号</div>
              <div v-else class="title" @click="goTOLogin">账号登录</div>
              <div class="arrow-right-czp"><i class=""></i></div>
            </span>
          </el-dropdown>
        </div>
        <div v-if="userid">
          <el-dropdown >
            <span class="el-dropdown-link">
              <div class="jclicon" ><i class="xzzicon-logout"></i></div>
              <div class="title" @click="logout">退出登录</div>
              <div class="arrow-right-czp"><i class=""></i></div>
            </span>
          </el-dropdown>
        </div>
        <div  class="version"> {{ version }} </div>
    </main>
    <!-- </el-collapse-transition> -->
    </transition>

    <footer @click="showMain = !showMain">
      <div class="shrink"><i :class="!showMain? 'xzzicon-shrink': 'xzzicon-shrink2'"></i></div>
    <el-button type="primary">Primary</el-button>
    <div class="text-red-400 ">6666666888</div>
    </footer>
    </div>
</VueDragResize>
    </div>
    <LoginPanel />
    <MyProgress :show="progressVisible" :percentage="percentage" />
    <!-- <WordsTool />
    <OrderRemarks /> -->
</template>


<script setup>

const userstore = userStore()
const { userid, userToken, version } = storeToRefs(userstore)

//---------------单纯字符串变量不可使用reactive---------
//-----ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要
let currentHref = ref('')
let curCookies  = ref('')
let showMain  = ref(true)
let progressVisible = ref(false)
let percentage = ref(60)
let jdx = ref(60)
let jdy = ref(120)
let reloadDrag = ref(true)
const diagnosisOption = reactive([{value: 2}, {value: 5}, {value: 10}, {value: 20}])
const commentOption = reactive([{value: 20}, {value: 50}, {value: 100}, {value: 200}])
const commentOption1 = reactive([{value: 20}, {value: 50}, {value: 100}, {value: 200}])
const pictureOption  = reactive([
        {value: '全部下载(带目录)', arg: 'allwith'},
        {value: '全部下载', arg: 'all'},
        {value: '主图下载', arg: 'main'},
        {value: 'sku图下载', arg: 'sku'},
        {value: '详情图下载', arg: 'detail'},
      ])
const onDragstop = (e) => {
      let winHeight = window.innerHeight - 60
      let winWidth = window.innerWidth - 200
      if(e.top < 0 || e.left < 0 || e.top > winHeight || e.left > winWidth){
        reloadDrag.value = false
        setTimeout(() => {
        reloadDrag.value = true
        }, 100);
      }else{
      jdx.value = e.left
      jdy.value = e.top
      API.Storage.set({jdx: e.left, jdy: e.top})
      }
    }
    const  OneClickDiagnosis = async (DiagnosisNum) => {
      if (this.userId == '') return this.$myBus.$emit('iwantlogin');
      if (!(currentHref.value.indexOf('item.jd') > 1)) {
        return this.$message.error('请进入商品详情页,再点击开始诊断');
      }
      this.BUS.info_id = 0
      this.BUS.progressPanel = true;
      let config = {
        method: 'post',
        url: 'http://119.23.254.170:5000/api/jd/startCrawl',
        data: {
          url: currentHref.value,
          account: this.userId,
          cookies: this.cookies,
          num: DiagnosisNum,
        }, //qs将对象 序列化成URL的形式，以&进行拼接
      };
      let res = await 浏览器_跨域axios(config);
      // console.log('------------调用返回KEY成功--', res);
      if (res.data.taskId != undefined) {
        // console.log('res.data.taskId: ', res.data.taskId);
        let config2 = {
          method: 'post',
          url: 'http://119.23.254.170:5000/api/jd/getCrawl',
          data: {taskId: res.data.taskId},
          // data: qs.stringify( {taskId: res.data.taskId})
        };
        // let time1 = DiagnosisNum < 11? 70000 : 70000
        // let time2 = DiagnosisNum < 11? 3000 : 5000
        // setTimeout(() => {
        //   this.countdown = 0
        // }, 180*1000)
        //------11111----------------获取到完整数据才展示的方法-----------------------
        //   let myInterval =  setInterval(async () => {
        //    this.percentage >= 93 ? this.percentage = 100: this.percentage += Math.floor(30/DiagnosisNum)
        //    let res2 = await 浏览器_跨域axios(config2)
        //   // console.log('res2------------1111111: ', res2)
        // if ( res2.data.detailData.length == DiagnosisNum ){
        //   this.BUS.diagnosisData = res2.data
        //   this.BUS.progressPanel = false
        //   this.BUS.dialogShow = true
        //   this.percentage = 0
        //   clearInterval(myInterval)
        //   // this.countdown = 30
        // }
        // if (this.countdown == 0){
        //   //后端数据出现异常
        //   clearInterval(myInterval)
        //   this.BUS.progressPanel = false
        //   this.countdown = 30
        //   this.percentage = 0
        // }
        //   }, time2)
        //---1111111----------------------------------------------------------------

        //-------222222----------push累加方法-----------------------------------

        const myInterval = setInterval(async () => {
          this.percentage >= 90 ? '' : (this.percentage += Math.floor(20 / DiagnosisNum));
          let res2 = await 浏览器_跨域axios(config2);
          console.log('res2------------2222222: ', res2);
          if (res2.data.detailData.length != 0) {
            this.BUS.diagnosisData = res2.data;
            this.BUS.progressPanel = false;
            this.BUS.dialogShow = true;
            this.percentage = 0;
          }
          if (res2.data.detailData.length == DiagnosisNum || res2.data.status != '爬虫未结束') {
            clearInterval(myInterval);
            this.BUS.diagnosisData = res2.data;
            //--------------存储数据------------------
            let config3 = {
              method: 'post',
              url: 'http://pddzd.junchenlun.com//?s=Jd.StoreBrowse.addRecord',
              data: {
                shop_name: this.BUS.diagnosisData.shopName,
                user_id: this.userId,
                token: this.userToken,
                data: JSON.stringify(this.BUS.diagnosisData),
              }, //qs将对象 序列化成URL的形式，以&进行拼接
            };
            if (res2.data.status != '爬虫未结束') {
              let res3 = await 浏览器_跨域axios(config3);
              console.log('-----------res3: --------------', res3);
              if (res3.data.data.code == 0) {
                console.log('数据存储成功');
              } else {
                console.log('数据存储失败');
              }
            }
          }
          // if ( this.countdown == 0){
          //   clearInterval(myInterval)
          //   this.BUS.progressPanel = false
          //   this.countdown = 90
          //   this.percentage = 0
          //   alert("数据获取超时,请重新诊断")
          // }
        }, 8000);
        //-------22222---------------------------------------------
      }
    }
    const imgDownload = async (arg) =>{
          if (userid == '') return API.emitter.emit('iwantlogin')
      if (!(currentHref.indexOf('item.jd') > 1)) {
        return this.ElMessage.error('请进入商品详情页,再点击开始下载');
      }
      let config = {
        method: 'post',
        url: '',
        data: {
          url: currentHref,
          account: userid,
          cookies: curCookies.value,
          num: 66,
        }, 
      }
      switch(arg){
        case 'allwith': config.url = 'http://119.23.254.170:5000/api/jd/startPicture'
          break
        case 'all': config.url = 'http://119.23.254.170:5000/api/jd/startPictureNoDir'
          break
        case 'main': config.url = 'http://119.23.254.170:5000/api/jd/startPictureMain'
          break
        case 'sku': config.url = 'http://119.23.254.170:5000/api/jd/startPictureSku'
          break
        case 'detail': config.url = 'http://119.23.254.170:5000/api/jd/startPictureDetail'
          break
      }
      // 'http://119.23.254.170:5000/api/jd/startCommentsLetter'
      // this.BUS.progressPanel = true;
      console.log('------开始请求key----------');
      // console.log('config: ', config);
      let msg = {type: 'myfetch', config}
      let res = await  API.sendMessage(msg) //---------------------
      console.log('------myfetchmyfetch--------res: ', res)
      console.log('-------------taskId----有返回------------', res);
      if (res.data.status == 'success') {
        let config2 = {
          method: 'post',
          url: 'http://119.23.254.170:5000/api/jd/getPicture',
          data: {
            taskId: res.data.taskId,
          }, //qs将对象 序列化成URL的形式，以&进行拼接
        };
        const myInterval = setInterval(async () => {
          this.percentage >= 90 ? '' : (this.percentage += 9);
          let res2 = await 浏览器_跨域axios(config2);
          console.log('---------开始爬取------有返回------------', res2);
          if (res2.data.status == 'stop' && res2.data.link != '') {
            clearInterval(myInterval);
            console.log('开始下载--------------');
            浏览器_url表格链接下载(res2.data.link);
            this.BUS.progressPanel = false;
            this.percentage = 0;
          }
          if (res2.data.status == 'stop' && res2.data.link == '') {
            clearInterval(myInterval)
          this.percentage = 0
          this.BUS.progressPanel = false
            console.log("获取文件出错,请重新下载")}
        }, 6000);
      } else {
        clearInterval(myInterval);
        this.percentage = 0;
        this.BUS.progressPanel = false;
        console.log('获取task出错,请重新下载');
      }
    }
    const commentDownload = async (num) =>{
      if (this.userId == '') return this.$myBus.$emit('iwantlogin');
      if (!(currentHref.value.indexOf('item.jd') > 1)) {
        return this.$message.error('请进入商品详情页,再点击开始下载');
      }
      let config = {
        method: 'post',
        url: 'http://119.23.254.170:5000/api/jd/startComments',
        data: {
          url: currentHref.value,
          account: this.userId,
          cookies: this.cookies,
          num,
        }, //qs将对象 序列化成URL的形式，以&进行拼接
      }
      // 'http://119.23.254.170:5000/api/jd/startCommentsLetter'
      this.BUS.progressPanel = true;
      console.log('------开始请求key----------')
      console.log('config: ', config);
      let res = await 浏览器_跨域axios(config);
      console.log('-----------res: ---------有返回------------', res)
      if (res.data.status == 'success') {
        let config2 = {
          method: 'post',
          url: 'http://119.23.254.170:5000/api/jd/getComments',
          data: {
            taskId: res.data.taskId,
          }, //qs将对象 序列化成URL的形式，以&进行拼接
        };
        const myInterval = setInterval(async () => {
          this.percentage >= 90 ? '' : (this.percentage += 9);
          let res2 = await 浏览器_跨域axios(config2);
          console.log('-----------res: ---111------有返回------------', res2)
          if (res2.data.status == 'stop' && res2.data.link != '') {
            clearInterval(myInterval);
            console.log('开始下载--------------');
            浏览器_url表格链接下载(res2.data.link);
            this.BUS.progressPanel = false;
            this.percentage = 0;
          }
          if (res2.data.status == 'stop' && res2.data.link == '') {
            clearInterval(myInterval)
          this.percentage = 0
          this.BUS.progressPanel = false
            console.log("获取文件出错,请重新下载")  }
        }, 3000);
      } else {
        clearInterval(myInterval);
        this.percentage = 0;
        this.BUS.progressPanel = false;
        console.log('获取task出错,请重新下载');
      }
    }
    const commentDownload1 = async (num) =>{

    }
    const videoDownload = async () =>{
    if (userid == '') return API.emitter.emit('iwantlogin')
    if (!(currentHref.indexOf('item.jd') > 1)) {
        return alert('请进入商品详情页,再点击开始下载')
      }
        $('.video-icon').click()
        let url = $('video source').attr('src')
        if(url == undefined) return  ElMessage.error({ message: '当前商品没有视频',  duration: 1500,})
        let msg = {type: 'downloads', url}
      let res = await  API.sendMessage(msg) 
      // console.log('res:-------- ', res);
      res && ElMessage.success({ message: `视频${res}`, duration: 2500,})
    }

    const keyWordTool = () =>{
      API.emitter.emit('iwantkey')
    }
    const  backToHome =  () => {
      window.open('https://www.jd.com/')
    }
    const changeAccount = () => {
      API.emitter.emit('iwantlogin')
    }
    const goTOLogin = () => {
      API.emitter.emit('iwantlogin')
    }
    const logout = () => {
      chrome.storage.local.set({userid: ''})
      ElMessage.success('账号退出成功!')
    }
  const getStorage = () => {
    chrome.storage.local.get(['userid'], (result) =>{
      result == {} ? chrome.storage.local.set({userid: ''}) : userstore.userid = result.userid
    })
    chrome.storage.local.get(['userPhone'], (result) =>{
      result != {} && (userstore.userPhone = result.userPhone)
    })
    chrome.storage.local.get(['userToken'], (result) =>{
      result != {} && (userstore.userToken = result.userToken)
    })
  }
  onMounted(() => {
    currentHref = window.location.href
    curCookies.value = "{'" + document.cookie + "'}"
    // console.log('window.location.href: ', window.location.href)

  })
   onBeforeMount(async () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      message == 'loginEvent'? getStorage() : ''
      sendResponse({status: true})
      })
    getStorage()
    let aaa = API.Storage.get(['jdx', 'jdy'])
    console.log('aaa: ', aaa);
     let { jdx, jdy } = API.Storage.get(['jdx', 'jdy']) || {}
     console.log('jdy: ', jdy);
     console.log('jdx: ', jdx);
    // let res = await API.sendMessage({type: 'tabQuery', requirement:{title: "xzz2022"}})
    // console.log('tab-----------------res: ', res);
    // let res2 = await API.sendMessage({ type: 'tabOperate', tabId: res.id,   action: 'remove'})
    // console.log('tab-----------------res: ', res2);
   })

</script>
<style lang="scss" scoped>
@import "../../css/sass/jclpanel.scss";

</style>