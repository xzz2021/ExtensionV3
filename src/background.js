
// let myTab = 0
//----------------------------
// 获取当前页面 方法一
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return myTab = tab.id;
  // console.log(tab)
}
getCurrentTab()
//-----------------------------------

//--------------------------------
// 获取当前页面 方法二    废弃 无法使用
// chrome.tabs.getSelected(null, function (tab) { // 先获取当前页面的tabID
//     return myTab = tab.id;
// });
//------------------------------------


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  if (message === 'get-user-data') {
    chrome.runtime.reload();
    sendResponse('--------welcome,reload successful!');
    //当未传参数时,默认刷新当前tab页面
    chrome.tabs.reload(myTab)
  }
});