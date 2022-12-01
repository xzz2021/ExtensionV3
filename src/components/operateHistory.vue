<!--
 * @Date: 2022-10-31 14:36:13
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-01 11:33:31
-->
<template>

  <div class="operateHistory">
    <vxe-modal v-model="Visible" width="600px" @close="closeHistory" height="560px" :position="{ top: 45 }" maskClosable
      marginSize="-600" >
      <template #title>
        <!-- <div class="mytitle" @click="$myBus.$emit('summary', $event)">操作记录</div> -->
        <div class="mytitle">操作记录</div>
      </template>
      <div class="containerBox">

        <div class="navbar">
          <div style="width: 100px">账号</div>
          <div style="width: 60px">平台</div>
          <div style="width: 230px">操作</div>
          <div style="width: 130px">时间</div>
          <div style="width: 50px"></div>
        </div>
        <div v-if="historyTable.self.length != 0" class="historyList">
          <div class="listBox" v-for="(item, index) in historyTable.self" :key="index">
            <div style="width: 100px" class="phone">{{ item.userPhone }}</div>
            <div style="width: 60px" class="platform">{{ item.platform }}</div>
            <div style="width: 230px" class="operate">{{ item.desc }}</div>
            <div style="width: 130px" class="time">{{ item.time }}</div>
            <div  class="guanbibtn" @click="deleteData(item.id)">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
            </div>
          </div>
        </div>
        <div v-else>
          <img class="emptyImg" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/emptyData.png"
            alt="当前没有浏览记录" />
        </div>
      </div>
      <div class="paginationBox">

        <el-pagination style="justify-content: center;" @current-change="getPageData" :page-size="10" :pager-count="9" :hide-on-single-page="true"
          layout="prev, pager, next" :total="totalCount"></el-pagination>
      </div>

    </vxe-modal>
  </div>
</template>
<script setup>
//平台状态store
// const busStore = piniaStore()
// //storeToRefs增加响应性,使用了proxy,所以需要用.value拿到值
// const { userInfo } = storeToRefs(busStore) 

      const Visible = ref(false)
      const totalCount =  ref(100)
      const historyTable = reactive({self: []})
      const userInfoStore = reactive({self: []})
      // historyTable: [
      // {id: 3,userPhone: 13467677683, platform: '京东', function: '店铺诊断', operate: '店铺诊断-销售前10商品', time: '2022-10-31 17:56' },
      // {id: 6,userPhone: 13467676873, platform: '京东', function: '店铺诊断', operate: '店铺诊断-销售前10商品', time: '2022-10-31 17:56' }]

    const closeHistory = () =>{
      // this.historyTable = []
    }
    const  deleteData = async (id) => {
      await API.operateHistory.delete({user_id: userInfoStore.self.userid , token: userInfoStore.self.userToken, act_id: id})
      historyTable.self =  historyTable.self.filter(item => item.id != id)
    }
    const getPageData = async (e) =>{
      //获取指定页数数据
      await getDatabase(e)
    }
    const  getDatabase = async (e) => {
      let {list, count} = await API.operateHistory.get({user_id: userInfoStore.self.userid , token: userInfoStore.self.userToken,page: e, limit: 10})
      historyTable.self = list
      if (e == 1) { totalCount.value = count }
    }
    // const  operationSummary = async (type, operation, platform) => {
    //   let 下载工具 = ['图片下载', '有图评价下载', '无图评价下载']
    //   if (下载工具.includes(type)) {
    //     var desc = `下载工具-${type}-${operation}`
    //     type = '下载工具'
    //   } else if (type == "" || type.indexOf('****') > -1) {
    //     type = operation
    //     var desc = operation
    //   } else {
    //     var desc = type + '-' + operation
    //   }

    //   let obj = {
    //     user_id: this.userid,
    //     token: this.userToken,
    //     platform,
    //     type,
    //     desc
    //   }
    //   // console.log(obj);
    //   await API.operateHistory.add(obj)
    // }

    // const  bindEvent = async() => {
    //   var si = setInterval(() => {
    //     if (this.userid == '') {
    //       jq('.drop-menu,.titletwo,main .title').css('pointer-events', 'none')
    //     }

    //     jq('.el-dropdown-menu.el-popper,.jclBox .el-dropdown').click(() => {
    //       jq('.operateHistory .mytitle').click()
    //     })

    //     jq('.drop-menu,.titletwo,main .title').on('click', function (e) {
    //       let ulId = jq(e.target).parents('ul').attr('id')
    //       let parentText = jq('span[aria-controls=' + ulId + '] .title,span[aria-controls=' + ulId + '] .titletwo').text()
    //       let originText = jq('.operateHistory .mytitle').text()
    //       let platform = jq('.jclBox').attr('class').match(/ ?(.*?)_诊断/)[1]
    //       jq('.operateHistory .mytitle').text(parentText + ',' + e.target.innerText + ',' + platform)
    //       jq('.operateHistory .mytitle').click()
    //       jq('.operateHistory .mytitle').text(originText)
    //     })
    //     clearInterval(si)
    //   }, 1000);
    // }

    const getUserinfo = async () =>{
      userInfoStore.self  =  await  API.getUserinfo()
    }

  
   onMounted(async() =>{
    // this.bindEvent()

    API.emitter.on('openOperateHistory', async () => {
      await getUserinfo()
      await getDatabase(1)
      Visible.value = true
    });

    // this.$myBus.$on('summary', async (event, params) => {

    //   if (this.userid == '') return this.$myBus.$emit('iwantlogin2');
    //   // console.log('summary', event, params, event.target.innerText);
    //   // console.log('path', event.path);
    //   if (event.target.innerText.indexOf(',') == -1) { return }
    //   let [type, name, platform] = event.target.innerText.split(',')
    //   console.log(type, name, platform);
    //   this.operationSummary(type, name, platform)
    // })
    // await getUserinfo()
    // await getDatabase(1)
    //
    $(document).ready(() => {  //页面文档加载完再执行查询
      let node = $('.addOperateRecord')  //拿到所有标的项
      node.each(function(){
        //监听点击事件
        $(this).on('click',function(){
          //得到对应class值
          console.log('$(this)[0].classList[1]: ', $(this)[0].classList[1]);

        })
      })
      // for(let i=0; i<node.length; i++){
      //   // node[i]
      //   console.log('node[i]: ', node[i]);
      // }
      // node.on('click',function(e) {
        // console.log('e: ', e);
      //   // this.classList
      //   console.log('this.classList: ', this);
      // })
    //   console.log('node: ', node);
    //  for(let i=0; i<node.length; i++){
    //     console.log('node[i]: ', node[i].attr('class'));

    //   // node[i].addEventListener('click',()=> {
    //   //   console.log('node[i]: ', node[i]);
    //   // })
    // }
   })
  })

</script>

<style lang='scss' scoped>
@import '../css/sass/operateHistory.scss';
</style>