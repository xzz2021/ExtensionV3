

const pluginName = 'wsAutoReloadPlugin';
const  { WebSocketServer } = require ('ws')
const wss = new WebSocketServer({ port: 7777 })


wss.on('connection', (ws) => {
  ws.on('message', function message(data) {
    if(JSON.parse(data) == "bgc"){
      ws.id = 'bgc'
    }
  })
})



class wsAutoReloadPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, (compilation) => {
      wss.clients.forEach(ws => {
        if(ws.id == 'bgc'){
          ws.send(JSON.stringify('done'))
        }
      })})}}


module.exports = wsAutoReloadPlugin;