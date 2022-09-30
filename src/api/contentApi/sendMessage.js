

// 约定传送信息类型,根据类型执行相应函数
/*
option = {
    type?: (myfetch,downloads,tabQuery)
}

*/

/* 
msg = { type: 'tabQuery', requirement: {active: true} }
msg = { type: 'tabOperate', tabId: tab.id,   action: 'remove'}


*/
//查询匹配值示例:{active: true}----key= audible, autoDiscardable,discarded, groupId, height, highlighted,
// -------------id,incognito, index,pinned,selected, status,title,url,width, windowId.

const sendMessage =  (message) => {
    return new Promise((resolve, reject) => {
        // let message = JSON.stringify(message)
        if(message.type == undefined) return reject('发送的请求消息类型不合法')
        // if(message.type == undefined) return reject('发送的请求消息类型不合法')
        chrome.runtime.sendMessage( message, (response) => {
            // console.log('-----------option: -----response-------', response)
            resolve(response)
            // console.log('response: ', response);
            // if (response.state) {
            //     resolve(response.data);
            // } else {
            //     reject(response.data);
            // }
          })
    })
}
export default {sendMessage}





