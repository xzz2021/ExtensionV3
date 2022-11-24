/*
 * @Date: 2022-09-30 16:00:59
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-23 14:22:17
 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const wsAutoReloadPlugin = require('./myPlugin')
const webpack = require('webpack')

const watchconfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
      new wsAutoReloadPlugin(),
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
          "VERSION": JSON.stringify('1123'),
          'DEBUG': true
        })
        
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {  
      rules: [
          {
              oneOf:[
                  {// **目前是style标签分别注入,且未压缩,需优化压缩整合到同一标签下,若整体css大于150K需再调整成link方式按需引入
                      test: /\.css$/i,
                    //   use: [MiniCssExtractPlugin.loader,'css-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
                      use: ["style-loader", 'css-loader'],  
                  },
                  //此处可以引入移动端自适应px2rem-loader
                  {
                      test: /\.s[ac]ss$/i,
                    //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
                      use: ["style-loader", 'css-loader','sass-loader'],
                  }
              ]
          },
      ],
  },
};

module.exports = watchconfig