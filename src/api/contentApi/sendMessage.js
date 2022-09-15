

// 约定传送信息类型,根据类型执行相应函数
/*
option = {
    type?: (myfetch,download,getstorage,setstorage) 
}

*/



const sendMessage = async (message) => {
    return new Promise((resolve, reject) => {
        // let message = JSON.stringify(message)
        if(message.type == undefined) return reject('发送的请求消息类型不合法')
        // if(message.type == undefined) return reject('发送的请求消息类型不合法')
        chrome.runtime.sendMessage( message, (response) => {
            // console.log('-----------option: -----response-------', response)
            // console.log('response: ', response);
            resolve(response)
          })
    })
}
export default {sendMessage}





