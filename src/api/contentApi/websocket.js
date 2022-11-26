/*
 * @Date: 2022-10-31 08:21:36
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-26 11:47:20
 */


const ws = new WebSocket('ws://localhost:7777')
function wsInit(){
      let time = 0

          ws.onopen = (e) => {
            console.log('-------bg--------已连接------:', new Date())
            ws.send(JSON.stringify("bg"))
          }
          
          ws.onmessage = (e) => {
          
            if(JSON.parse(e.data) == 'done'){
              console.log('-----bg收到------编译完成-------------')
            API.sendMessage({type: 'complier'})
            }
          }
  ws.onclose =  (e) => {
            console.log('--------bg--------断开------:',e.code,'----------', new Date())
                // await API.rest(3)
              time++
              time < 100 && wsInit()
          }
  ws.onerror =  (e) => {
            console.log('-------bg-----连接出错------:', new Date())
              // await API.rest(3)
              time++
              time < 100 && wsInit()
          }
        
        }
        DEBUG ? wsInit() : ''
