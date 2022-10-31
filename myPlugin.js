/*
 * @Date: 2022-09-27 09:33:17
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-10-27 08:41:08
 */


const pluginName = 'wsAutoReloadPlugin';
const  { WebSocketServer } = require ('ws')
const wss = new WebSocketServer({ port: 7777 })


wss.on('connection', (ws) => {
  console.log('----ws--------连接成功-----------')
  ws.on('message', function message(data) {
  console.log('----bg消息--------监听成功-----------')
    if(JSON.parse(data) == "bg"){
      ws.id = 'bg'
    }
  })
  console.log('---------- ', wss.clients.size);

})

  // wss.clients.forEach(ws => {
  //     console.log('------------编译完成--------:', new Date())
  //     ws.send(JSON.stringify('done'))
  //   // }
  // })

function sendMsg (){
  wss.clients.forEach(ws => {
    if(ws.id == 'bg'){
      console.log('------------编译完成----发送消息------:', new Date())
      ws.send(JSON.stringify('done'))
    }
  })
}



class wsAutoReloadPlugin {
  apply(compiler) {

    // compiler.hooks.initialize.tap(pluginName, (compilation) => {
    //   console.log('------初始化编译------:', new Date())
    //   wss.on('connection', (ws) => {
    //     ws.on('message', function message(data) {
    //       if(JSON.parse(data) == "bg"){
    //         ws.id = 'bg'
    //       }
    //     })
    //   })

    // })
    
    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      console.log('------触发------编译--------:', new Date())
      console.log('aa: ', wss.clients.size);
      sendMsg()
    })}}


module.exports = wsAutoReloadPlugin;