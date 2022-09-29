// 'use strict'默认启用
import { createApp } from 'vue'

//-------pinia----打包60k---------
import { createPinia } from 'pinia'
const pinia = createPinia()
//-----------------------------------

// //---------------引入所有API挂载到全局----------<<<<<<<<<<<<<<<<<<<<<---此处引入有问题
import{ contentApi as API} from './src/api/contentApi/index'
window.API = API
// //------------------------------------------------------


//---------全局引入vxe-table----------------
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
//---------开发体积2m----打包体积550k-----
//-------------结合babel-loader配置按需加载后----打包体积只有100k
//-------所以可以全局引入------jq(打包90k)+vue+ele+pinia---------


//引入自定义的所有css入口文件
import './src/css/style'
//------------------------


//-----popup页面----------调试popup及打包上线时需要挂载此处-----------<<---<<---<<----<<-----<<----<<----<<---<<<-----------
import popup from './src/popup/app.vue'
createApp(popup).mount('#pop')
//-------------------------------------------------

//-------------------各平台实例引入----------------
import app1688 from './src/pages/alibaba/app.vue'
import apptmall from './src/pages/tmall/app.vue'
import appjd from './src/pages/jd/app.vue'

//---------------------------------------------------------


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

//------------vue实例-----挂载入口---------------------
function createEntry(myapp,id){
  const el = document.querySelector('body');
  if (el) {
    //  afterbegin 插入body内部最前面------afterend插入body外部后面
      el.insertAdjacentHTML('afterend',`<div id="${id}"></div>`)
      // createApp(myapp).use(pinia).mount(`#${id}`)
      createApp(myapp).use(pinia).use(VXETable).mount(`#${id}`)
    }
}



let url = location.host
switch (true) {
  case url.indexOf('jd.com')>1: createEntry(appjd, 'marketjd')
    break;
  case url.indexOf('1688.com')>1: createEntry(app1688, 'market1688')
    break;
  case url.indexOf('tmall.com')>1: createEntry(apptmall, 'markettmall')
    break;
  // case valueN: ''
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

