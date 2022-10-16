


//---------------引入分文件的所有自定义api-----------
import{ bgcApi as API } from './src/api/bgcApi/index'
//----------------------------------------------------------


//-------------1111挂载好之后监听网页更新------此网页为webdevserver监听的网页-------
//-------------2222--网页更新后拿到更新的页面--即111的页面----因为如果是其他页面则不采取任何行动-----
// ------------33333每次dev页面刷新-----同时----查询当前聚焦的tab页或者说活动的当前tab页-----------
//------------4444如果不是dev页面----且不是浏览器的newtab页----------(???是否需要判断--扩展程序---页面)-------则执行刷新-------------------
//---------最优策略其实是自建HotReloadPlugin----------借助devserver内部的websocket执行自定义函数-----------------------
//-------------------或者摒弃devserver曲线----------直接自己建立一个websocket执行自定义函数-------后期学习改进-----
//--------------开发阶段---------编译后-------自动刷新runtime------然后自动刷新当前聚焦的tab页---------
//--------------------此处为借助devserver的方案一-----------------------------------------
  // chrome.tabs.onUpdated.addListener(
  //   (tabId, changeInfo, tab) => {
  //    if(tab.title == "xzz2022" && tab.status == "complete") {
  //      chrome.tabs.query({active: true},([tab]) => {
  //        if(tab.url.match(/tmall|taobao|1688|yangkeduo|pinduoduo|alibaba|jd/)){
  //         chrome.runtime.reload()
  //         chrome.tabs.reload()
  //       }else{
  //         chrome.runtime.reload()
  //       }})}})
//-------------------------------------------------------------------


//-------------------------此处为自建websocket的方案二-----------------------------------------
let time = 0
function wsInit(){
  let ws = new WebSocket('ws://localhost:7777');
          ws.onopen = (e) => {
            console.log('-------bg--------已连接------:', new Date())
            ws.send(JSON.stringify("bg"))
          }
          ws.onclose = (e) => {
            console.log('--------bg--------断开------:', new Date())
            setTimeout(() => {
              time++
              time < 10 && wsInit()
            }, 3000);
          }
          ws.onmessage = (e) => {
            if(JSON.parse(e.data) == 'done'){
            chrome.tabs.query({active: true},([tab]) => {
              if(tab.url.match(/tmall|taobao|1688|yangkeduo|pinduoduo|alibaba|jd/)){
               chrome.runtime.reload()
               chrome.tabs.reload()
             }else{
               chrome.runtime.reload()
             }})
            }
          }
        }
wsInit()


//-------------------------------------------------------------------------------


//------------通过监听storage的变化----------监听登录状态的改变----------------如果改变发送事件----------
let matches = ["https://*.1688.com/*", "https://*.tmall.com/*", "https://*.jd.com/*", 
"https://*.taobao.com/*", "https://*.alibaba.com/*", "https://*.yangkeduo.com/*",
"https://*.pingduoduo.com/*"]
//let matches = '<all_urls>'
      chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          if(key == 'userid') {
            chrome.tabs.query({url:matches},(tabs)=>{
              let l = tabs.length
              for(let i = 0; i < l; i++){
                chrome.tabs.sendMessage(tabs[i].id, 'loginEvent', ()=> {})
              }})}
              //如果userid变化为空,也就是用户退出了登录,则清空userPhone和userToken
              if(key == 'userid' && newValue == '') {
                chrome.storage.local.set({userPhone: ''})
                chrome.storage.local.set({userToken: ''})
              }
            }})
//-----------------------------------------------------------------------


// --------------------约定传送信息类型,根据类型执行相应函数-----------------------

//----------------监听所有发送的信息-----根据信息类别调用引入的函数---------------
      chrome.runtime.onMessage.addListener(
        (message, sender, sendResponse) => {
          // console.log('----------------message: ----------------', message)
          switch(message.type){
          case 'myfetch':   {
                             (async ()=> {
                                let res = await API.myfetch(message.config.url,message.config)
                                sendResponse(res)
                              })()
                              return true
                            }
            break;            
            case 'mycookies': {//--------------需调用谷歌cookie api才能设定-------------
                               // let currentStamp = Date.parse(new Date())
                               // API.Cookies.set('loginStamp','登录有效期',{maxAge:10*24*3600})
                               //       sendResponse('cookies set success')
                              }
            break;
            case 'downloads': {chrome.downloads.download({url: message.url},()=>{})
                               sendResponse('下载完成')}
           break;
            case 'tabQuery': { 
                              (async ()=> {
                                let tab = await API.tabQuery(message.requirement)
                                sendResponse(tab)
                                })()
                                   return true
                              }
            break; 
            case 'tabOperate': { 
              chrome.tabs.remove(message.tabId, ()=>{})
              sendResponse('tab关闭成功')
              }
                break; 
          default : ''    
            break;                       
        }
      }
      )
//-----------------------------------------------------------------------------------------


