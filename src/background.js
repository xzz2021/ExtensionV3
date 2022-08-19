



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