
const CopyWebpackPlugin = require('copy-webpack-plugin');
const wsAutoReloadPlugin = require('./myPlugin')
const webpack = require('webpack')

const watchconfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
            {from: 'public/logo.png', to: './logo.png'},
            {from: 'public/manifest.json', to: './manifest.json'}
        ]}),
        //可以定义全局上下文的变量
        new webpack.DefinePlugin({
          // 此处解决vue未定义extension大量报错问题
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false,
          "AUTHOR": JSON.stringify('xzz2022'),
          "VERSION": JSON.stringify('0928')
        }),
        new wsAutoReloadPlugin()
    ],
    // watch: true,  // 监听源文件的变动,重新编译
    watchOptions: {
      ignored: /node_modules/,
    },
};

module.exports = watchconfig