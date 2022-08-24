import { createApp } from 'vue'

//-------pinia----打包60k---------
import { createPinia } from 'pinia'
const pinia = createPinia()
//-----------------------------------

//引入自定义的所有css入口文件
import '../css/style'

//-----------------全局创建登录组件----------------------
import LoginPanel from '../components/LoginPanel.vue'
// createApp(LoginPanel).component('login-panel', LoginPanel);
function createLoginPanel(){
    const el = document.querySelector('body');
    if (el) {
        el.insertAdjacentHTML('afterend','<div id="jclLogin"></div>')
        createApp(LoginPanel).mount('#jclLogin')
      }
}
// createLoginPanel()
//--------------------------------------------------




import app1688 from '../pages/1688/app.vue'
import apptmall from '../pages/tmall/app.vue'
import popup from '../popup/app.vue'
createApp(popup).mount('#pop')

function create1688(){
    const el = document.querySelector('body');
    if (el) {
        el.insertAdjacentHTML('afterend','<div id="market1688"></div>')
        createApp(app1688).mount('#market1688')
      }
}

function createtmall(){
    // 原生写法 获取网站的id class等元素节点  document.getElementById
        // let targetElement = document.getElementsByTagName("body")
        let myDiv = document.createElement("div")  // 创建自己的元素标签
        let myId = document.createAttribute("id") //创建id属性
           myId.value = "markettmall"  //设定id名称
           myDiv.setAttributeNode(myId)  // 给div挂载上属性
        // 把元素嵌入
        // targetElement.appendChild(myDiv)
        document.body.appendChild(myDiv)

        // createApp(app1688).use(ElementPlus).mount('#market1688')
        createApp(apptmall).mount('#markettmall')
}


// createApp(Pop).use(pinia).use(VXETable).mount('#app')





let url = window.location.href
if(url.indexOf('1688.com/')>1){
	create1688()
}

if(url.indexOf('tmall.com/')>1){
	createtmall()
}

import{ allApi as API} from '../api/index'
console.log('--------------------import: ', API);

// API.aa()

API.bbb('传值成功')





//---------全局引入vxe-table----------------
// import 'xe-utils'
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/style.css'
//-------------开发体积2m------打包体积550k-----------
//--------------按需引入----开发体积1.3m----------打包体积500k----
//-------所以干脆全局--(初始cli才400k)--jq(打包90k)+vue+ele+pinia-----------------