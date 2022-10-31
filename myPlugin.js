/*
 * @Date: 2022-09-27 09:33:17
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-10-29 15:54:23
 */


const pluginName = 'wsAutoReloadPlugin';
const  { WebSocketServer } = require ('ws')
const wss = new WebSocketServer({ port: 7777 })


wss.on('connection', (ws) => {
  // console.log('----ws--------连接成功-----------')
  ws.on('message', function message(data) {
  console.log('----bg消息--------监听成功-----------')
    if(JSON.parse(data) == "bg"){
      ws.id = 'bg'
    }
  })

})

function sendMsg (){
  console.log('aa: ', wss.clients.size);
  wss.clients.forEach(ws => {
    if(ws.id == 'bg'){
      console.log('------------编译完成----发送消息------:', new Date())
      ws.send(JSON.stringify('done'))
    }
  })
}



class wsAutoReloadPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      console.log('------触发------编译--------:', new Date())
      sendMsg()
    })}}


module.exports = wsAutoReloadPlugin;