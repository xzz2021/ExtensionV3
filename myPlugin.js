const fs = require('fs')
const path = require('path');




compiler.hooks.environment.tap('MyPlugin', (context, entry) => {
    fs.readFile(path.resolve(__dirname, 'xzz2022/logo.png'), (err, dataStr) => {
        if(dataStr == undefined){
            devconfig.plugins.push(new CopyWebpackPlugin({patterns: [{from: 'public/logo.png', to: './logo.png'},{from: 'public/manifest.json', to: './manifest.json'}]}))
            // process.env.copy = true
        }
    })
  });