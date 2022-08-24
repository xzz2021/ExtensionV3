import { createApp } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

//引入自定义的所有css入口文件
import '../css/style'

//-----------------挂载公共组件----------------------
import LoginPanel from '../components/LoginPanel.vue'
// createApp(LoginPanel).component('login-panel', LoginPanel);
//--------------------------------------------------


import app1688 from '../pages/1688/app.vue'
import apptmall from '../pages/tmall/app.vue'
// import store from './store'
import popup from '../popup/app.vue'
createApp(popup).mount('#pop')

function create1688(){
    const el = document.querySelector('body');
    if (el) {
        el.insertAdjacentHTML('afterend','<div id="market1688"></div>')
        createApp(app1688).use(pinia).mount('#market1688')
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
        createApp(apptmall).use(pinia).mount('#markettmall')
}


// createApp(Pop).use(store).mount('#app')




// 创建登录组件
function createLoginPanel() {
    const el = document.querySelector('body');
    if (el) {
        el.insertAdjacentHTML('afterend','<div class="myLoginPanel"></div>')
        createApp(LoginPanel).use(pinia).mount('.myLoginPanel')
      }
}

// createLoginPanel()

let url = window.location.href
if(url.indexOf('1688.com/')>1){
	create1688()
}

if(url.indexOf('tmall.com/')>1){
	createtmall()
}

// import './api/index'
// allApi.aa()
import{ allApi as API} from '../api/index'
console.log('--------------------import: ', API);

// API.aa()

API.bbb('传值成功')