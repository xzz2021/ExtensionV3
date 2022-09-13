// Generated using webpack-cli https://github.com/webpack/webpack-cli

const webpack = require('webpack')
// const RemoveConsolePlugin = require('./RemoveConsolePlugin');  //自己自定义去除所有console.log的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//----------此插件可以清除注释,console,debugger以及指定不需要的内容--------
const TerserWebpackPlugin = require('terser-webpack-plugin')
//----------------后期优化------引入pro文件时使用--------

//---------借助插件DIY设定devtool的详细配置-----------
// webpack.sourceMapDevToolPlugin 可以配合 FileManagerPlugin管理生成后的map文件


// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')  //实现PWA渐进式网络开发


// const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = MiniCssExtractPlugin.loader;  //作用是将js中的css提取处理成单独的css文件




const proconfig = {
    
    optimization: {  // 优化配置项  实现前提是 ES Modules-------------需修改babel-loader---------
        // usedExports: true,  //开启 Tree Shaking 功能  过滤未引用的模块  标记未引用的块
    //     concatenateModules: true,    // 尽可能合并每一个模块到一个函数中  减少体积和运行效率
        minimize: true,
        minimizer: [   //  把未引用的块剔除掉     压缩
        new TerserWebpackPlugin({
            extractComments: false,      //  不生成LICENSE文件
        }),  ///3333所以要再次引用一次内置的JS压缩插件
        // new OptimizeCssAssetsWebpackPlugin(),    //实现压缩css 代码  
            /// //    111不能直接放在plugins里,因为会把非css文件都压缩
            //   //2222而放在此处minimize又会覆盖官方内置的JS压缩插件
        ]     
    },
    // devtool: 'none',//无需定义,默认值就是none
    //------此处定义可以结合merge整合,避免相同键覆写-------
    plugins: [
        new CleanWebpackPlugin(),   // 自动清除之前的打包目录  插件

        new CopyWebpackPlugin({  //实现静态文件的直接复制
            patterns: [             // 需要拷贝的目录或者路径
            {from: 'public/logo.png', to: './logo.png'},
            {from: 'public/manifest.json', to: './manifest.json'}
        ]}),
        // new MiniCssExtractPlugin(),    // 实现css文件打包

        // new RemoveConsolePlugin()
    ]
}

module.exports = proconfig
