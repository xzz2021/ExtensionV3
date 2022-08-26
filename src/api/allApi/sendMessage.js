

// 约定传送信息类型,根据类型执行相应函数
/*
option = {
    type?: (myfetch,download,getstorage,setstorage) 
}

*/



const sendMessage = async (message) => {
    return new Promise((resolve, reject) => {
        // let message = JSON.stringify(message)
        if(message.type == undefined) return resolve('发送的请求消息类型不合法')
        // if(message.type == undefined) return reject('发送的请求消息类型不合法')
        chrome.runtime.sendMessage( message, function(response) {
            console.log('-----------option: -----message-------', message)
            
            resolve('发送请求成功')
          })
    })
}
export default {sendMessage}





// export const sendMessage = async (option) => {
//     return new Promise((reslove, reject) => {
//         chrome.runtime.sendMessage(option, function(response) {
//             // console.log(response)
//             // switch(option.type){
//             //     case 'myfetch': ''
//             //         break;
//             //     case 'download': ''
//             //         break;    
//             // }
//           });
//     })

// };


