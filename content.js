// 'use strict'默认启用
import { createApp } from 'vue'
//-------pinia----打包60k---------
import { createPinia } from 'pinia'


import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// https://github.com/prazdevs/pinia-plugin-persistedstate  //  pinia数据持久化,自动存取localstorage
pinia.use(piniaPluginPersistedstate)
//-----------------------------------

// //---------------引入所有API挂载到全局----------
import{ contentApi as API} from './src/api/contentApi/index'
window.API = API

import './src/api/contentApi/websocket'
// //------------------------------------------------------

//---------全局引入vxe-table----------------
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
//---------开发体积2m----打包体积550k-----
//-------------结合babel-loader配置按需加载后----打包体积只有100k
//-------所以可以全局引入------jq(打包90k)+vue+ele+pinia---------


//ElementPlus组件与样式分离,config里importStyle设为false,然后单独引入带变量的css与之合并
// import ElementPlus from 'element-plus'

//引入自定义的所有css入口文件
import './src/css/style'
//----------------------



// Vue.directive('disClick', {
  //   inserted:  function (el, binding) {
    //     el.addEventListener("click", function(){
      //       el.setAttribute("disabled", "disabled")
      //       setTimeout(() => {
        //         el.removeAttribute("disabled")
        //       }, binding.value);
        //     })
        //   }
        // })

//-------------------各平台实例引入----------------
import app1688 from './src/pages/alibaba/app.vue'
import apptmall from './src/pages/tmall/app.vue'
import apptb from './src/pages/tb/app.vue'
import appjd from './src/pages/jd/app.vue'

//---------------------------------------------------------

//------------vue实例-----挂载入口---------------------
function createEntry(myapp,id){
  const el = document.querySelector('body');
  if (el) {
    //  afterbegin 插入body内部最前面------afterend插入body外部后面
    // 必须嵌入body内部,不然面板无法固定
      el.insertAdjacentHTML('afterbegin',`<div id="${id}"></div>`)
      createApp(myapp).use(pinia).use(VXETable).mount(`#${id}`)
    }
}



//-----popup页面----------
import popup from './src/popup/app.vue'
// document.getElementById('pop') ? createApp(popup).use(pinia).mount('#pop'): ''
// $('#pop')[0] ? createApp(popup).use(pinia).mount('#pop'): ''
//-------------------------------------------------
//-------------------版本1.0----------------------
// let devUrl = (url == 'lemakflpnefnpaegkhgpmjknjkafpnif' || url == 'localhost:8888')
// let loginUrl = url.match(/login|mms|passport/)  == null
// let checkedUrl = url.match(/tmall|taobao|1688|yangkeduo|pinduoduo|alibaba|jd/) 
// checkedUrl =  devUrl && 'iamdev' || (loginUrl && checkedUrl  ? checkedUrl[0] : '')
//----------------------------------------------------------------------------------

//-------------------版本2.0----------------------
let loginUrl = location.host.match(/login|mms|passport/) != null
let checkedUrl = location.host.match(/tmall|taobao|1688|yangkeduo|pinduoduo|alibaba|jd|lemak/)
loginUrl? checkedUrl = '': checkedUrl = checkedUrl ? checkedUrl[0] : ''
//------------------------------------------------


switch (checkedUrl) {
  case 'jd': createEntry(appjd, 'marketjd')
    break;
  case '1688': createEntry(app1688, 'market1688')
    break;
  case 'tmall': createEntry(apptmall, 'markettmall')
    break;
  case 'taobao': createEntry(apptb, 'markettb')
  break;
  case 'lemak': createApp(popup).mount('#pop')
    break;
  // case 'localhost': createApp(popup).mount('#pop')
  //   break;
  default: ''
    break;
}


//-----------------注入js到任意页面------------------

//----参考------https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879
const s = document.createElement('script')
s.src = chrome.runtime.getURL('inject.js')
s.onload = function() {
    this.remove()
};//--<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------此处分号不可去掉--------应该是立即执行函数必须以分号分隔------
(document.head || document.documentElement).appendChild(s) // ------document.documentElement----指向html标签

//-----脚本动态参数注入仅限于bgc----------如果动态注入可能需要配置mainfest.json----------
  /* "content_security_policy": {
    "script-src": "unsafe-inline"
  }, */

  

  //---------------------导入调试的全局变量,生产模式会自动false-----------------------
// import {getShow} from'./show'
// let aa = getShow(DEBUG)
// console.log('aa: ', aa);







//class 的引入

/* class app {
  constructor(name){
      this.name = name
  }
  speak(){
      return 'my name is ' + this.name
  }
}

export default app */

// import app from './class'
// let a = new app('xzz66666')
// let ccc = a.speak()
// console.log('ccc: ', ccc)

