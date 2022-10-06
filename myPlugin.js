

const pluginName = 'wsAutoReloadPlugin';
const  { WebSocketServer } = require ('ws')
const wss = new WebSocketServer({ port: 7777 })


wss.on('connection', (ws) => {
  ws.on('message', function message(data) {
    if(JSON.parse(data) == "bg"){
      ws.id = 'bg'
    }
  })
})

console.log('--------------plugin----------loading-----')

class wsAutoReloadPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(pluginName, (compilation) => {
      wss.clients.forEach(ws => {
        if(ws.id == 'bg'){
          console.log('------------编译完成--------:', new Date())
          // console.log('------------编译完成--------:', new Date())
          ws.send(JSON.stringify('done'))
        }
      })})}}


module.exports = wsAutoReloadPlugin;