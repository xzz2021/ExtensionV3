import { createApp } from 'vue'

//-------pinia----打包60k---------
import { createPinia } from 'pinia'
const pinia = createPinia()
//-----------------------------------

//引入自定义的所有css入口文件
import '../css/style'
//------------------------

import mitt from "mitt"
const emitter = mitt()
export default emitter

//---------全局引入vxe-table----------------
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
//-------------开发体积2m------打包体积550k-----------
//--------------按需引入----开发体积1.3m----------打包体积500k----
//-------所以干脆全局--(初始cli才400k)--jq(打包90k)+vue+ele+pinia-----------------


//-----------------全局登录组件----------------------
import LoginPanel from '../components/LoginPanel.vue'
createEntry(LoginPanel,'jclogin')
// createApp(LoginPanel).component('login-panel', LoginPanel);
//--------------------------------------------------
//-------------------各平台实例引入-----------------------
import app1688 from '../pages/1688/app.vue'
import apptmall from '../pages/tmall/app.vue'
// import popup from '../popup/app.vue'
// createApp(popup).mount('#pop')



function createEntry(myapp,id){
    const el = document.querySelector('body');
    if (el) {
        el.insertAdjacentHTML('afterend',`<div id="${id}"></div>`)
        createApp(myapp).use(pinia).use(VXETable).mount(`#${id}`)
      }
}



let url = window.location.href
switch (true) {
    case url.indexOf('1688.com/')>1: createEntry(app1688, 'market1688')
      break;
    case url.indexOf('tmall.com/')>1: createEntry(apptmall, 'markettmall')
      break;
    // case valueN: ''
    //   break;
    default: ''
      break;
  }

// import{ allApi as API} from '../api/index'
// console.log('--------------------import: ', API);

// // API.aa()

// API.bbb('传值成功')





