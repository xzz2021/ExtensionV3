import { createApp } from 'vue'

//-------pinia----打包60k---------
import { createPinia } from 'pinia'
const pinia = createPinia()
//-----------------------------------

// //---------------引入所有API挂载到全局----------<<<<<<<<<<<<<<<<<<<<<---此处引入有问题
import{ contentApi as API} from './src/api/contentApi/index'
window.API = API
// //------------------------------------------------------

//引入自定义的所有css入口文件
import './src/css/style'
//------------------------

//---------全局引入vxe-table----------------
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
//---------开发体积2m----打包体积550k-----
//-------------结合babel-loader配置按需加载后----打包体积只有100k
//-------所以可以全局引入------jq(打包90k)+vue+ele+pinia---------


//-----------------全局登录组件----------------------
// import LoginPanel from '../components/LoginPanel.vue'
// createEntry(LoginPanel,'jclogin')
// createApp(LoginPanel).component('login-panel', LoginPanel)
//--------------------------------------------------

//-----popup页面----------调试popup及打包上线时需要挂载此处-----------<<---<<---<<----<<-----<<----<<----<<---<<<-----------
// import popup from './src/popup/app.vue'
// createApp(popup).mount('#pop')
//-------------------------------------------------

//-------------------各平台实例引入----------------
import app1688 from './src/pages/alibaba/app.vue'
import apptmall from './src/pages/tmall/app.vue'
import appjd from './src/pages/jd/app.vue'

//---------------------------------------------------------


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



let url = window.location.href
switch (true) {
  case url.indexOf('jd.com/')>1: createEntry(appjd, 'marketjd')
    break;
  case url.indexOf('1688.com/')>1: createEntry(app1688, 'market1688')
    break;
  case url.indexOf('tmall.com/')>1: createEntry(apptmall, 'markettmall')
    break;
  // case valueN: ''
  //   break;
  default: ''
    break;
}




