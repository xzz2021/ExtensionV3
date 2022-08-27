





import{ bgcApi as API } from './api/index'
// console.log('bgcApi: ', API);






//-------------1111挂载好之后监听网页更新------此网页为webdevserver监听的网页-------
//-------------2222--网页跟新后拿到更新的页面--即111的页面----因为如果是其他页面则不采取任何行动-----
// ------------33333每次dev页面刷新-----同时----查询当前聚焦的tab页或者说活动的当前tab页-----------
//-----------------4444如果不是dev页面--(???是否需要判断--扩展程序---页面)-------则执行刷新-------------------


// chrome.runtime.onInstalled.addListener(() => {   //-----不能等待加载---否则首次启动浏览器必须手动点击chrome.runtime.reload()才能执行
  chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
     if(tab.title == "xzz2022" && tab.status == "complete") {
      // console.log('---------tab.title: ------判定成功------')
    chrome.tabs.query({active: true},
    ([tab]) => {
      // console.log('---------------------tab: ', tab);
    if(tab.title != "xzz2022" && tab.url != "chrome://newtab/"){
          chrome.runtime.reload()
          chrome.tabs.reload()
      // console.log('---------tab.title: ------不应该刷新!!!!!!!!!!!------')
        }})}})
      // })

//----------------监听登录状态的改变----------------------如果改变发送事件----------
      chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          // console.log('----------key-------changed-------: ', key);
          // key == 'userid' ? chrome.runtime.sendMessage('loginEvent') : console.log('----------key-------changed-----执行shibai--: ');
          if(key == 'userid') {
            chrome.tabs.query({url:'<all_urls>'},(tabs)=>{
              console.log('------tab---------res: ', tabs)
              let l = tabs.length
              for(let i = 0; i < l; i++){
                chrome.tabs.sendMessage(
                  tabs[i].id, 'loginEvent', ()=> {
                    console.log(i + '----------key-------changed-----发送----成功-: ')
                  }
                )
              }
             })
            }
        }
      })


// 约定传送信息类型,根据类型执行相应函数

//----------------监听所有发送的信息-----根据信息类别调用引入的函数---------------
      chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
          console.log('----------------message: ----------------', message)
          switch(message.type){
                case 'myfetch': let res = await API.myfetch(message.url,message.config)
                                console.log('res: ', res)
                                sendResponse({status: true})
                    break;
                case 'download': console.log('----------------download: ---------downloaddownload-------')
                    break;  
                case '666': console.log('----------------message: ---------666666666666666-------')
                    break;    
                default: sendResponse({status: false})  
            }
            sendResponse({status: true})
        }
      )

