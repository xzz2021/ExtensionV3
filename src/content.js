import { createApp } from 'vue'

//   已实现自动按需引入  不需要再全局引入

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import $ from 'jquery'
import app1688 from './pages/1688/app.vue'
import apptmall from './pages/tmall/app.vue'
// import store from './store'

// import Pop from '../src/popup/pop.vue'
// import store from './store'

// createApp(Pop).use(store).mount('#app')
// createApp(Pop).mount('#pop')
// function create1688(){
//     // 原生写法 获取网站的id class等元素节点  document.getElementById
//         // let targetElement = document.getElementsByTagName("body")
//         let myDiv = document.createElement("div")  // 创建自己的元素标签
//         let myId = document.createAttribute("id") //创建id属性
//            myId.value = "market1688"  //设定id名称
//            myDiv.setAttributeNode(myId)  // 给div挂载上属性
//         // 把元素嵌入
//         // targetElement.appendChild(myDiv)
//         document.body.appendChild(myDiv)

//         // createApp(app1688).use(ElementPlus).mount('#market1688')
//         createApp(app1688).mount('#market1688')
//         //    console.log($("#market1688"))

// }

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


// createApp(Pop).use(store).mount('#app')



let url = window.location.href
if(url.indexOf('1688.com/')>1){

	create1688()

}

if(url.indexOf('tmall.com/')>1){

	createtmall()

}




    console.log('--------content-------自动执行!---------')
    
    // 发送信息给background.js
    chrome.runtime.sendMessage('get-user-data', (response) => {
          console.log('received user data', response);
        });