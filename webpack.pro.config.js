// Generated using webpack-cli https://github.com/webpack/webpack-cli

const webpack = require('webpack')
// const RemoveConsolePlugin = require('./RemoveConsolePlugin');  //自己自定义去除所有console.log的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')  //实现PWA渐进式网络开发


//实现elementplus自动按需加载
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// const isProduction = process.env.NODE_ENV == 'development';
// const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = MiniCssExtractPlugin.loader;  //作用是将js中的css提取处理成单独的css文件




const proconfig = {
    
    optimization: {  // 优化配置项  实现前提是 ES Modules
        // usedExports: true,  //开启 Tree Shaking 功能  过滤未引用的模块  标记未引用的块
    //     concatenateModules: true,    // 尽可能合并每一个模块到一个函数中  减少体积和运行效率
        // minimize: true,
    //     minimizer: [   //  把未引用的块剔除掉     压缩
    //     // new TerserWebpackPlugin({
    //     //     extractComments: false,    //不将注释提取到单独的文件中    //  不生成LICENSE
    //     // }),  ///3333所以要再次引用一次内置的JS压缩插件
    //     // new OptimizeCssAssetsWebpackPlugin(),    //实现压缩css 代码  
    //         /// //    111不能直接放在plugins里,因为会把非css文件都压缩
    //         //   //2222而放在此处minimize又会覆盖官方内置的JS压缩插件
    //     ]     
    },
    mode: 'production',
    devtool: 'none',
    // plugins: [
    //     new HtmlWebpackPlugin({    // 可以实现自动生成新的html并自动导入js
    //         template: './src/popup/index.html',  // 指定元html文件的位置
    //         filename: 'popup.html',   // 指定输出的名称
    //         chunks: ['content'],          //指定自定义需要注入的js
    //         inject: 'body',
    //         // scriptLoading: 'defer'
    //     }), 
    //     // new MiniCssExtractPlugin(),    // 实现css文件打包
        
    //     new CleanWebpackPlugin(),   // 自动清除之前的打包目录  插件
    //     new VueLoaderPlugin(),   // 引入vue解析插件
    //     new CopyWebpackPlugin({  //实现静态文件的直接复制
    //         patterns: [             // 需要拷贝的目录或者路径
    //         {from: 'public', to: './'}
    //     ]}),
    //     //实现elementplus自动按需加载
    //     AutoImport({
    //         resolvers: [ElementPlusResolver()],
    //       }),
    //     Components({ 
    //         dirs:['src'],
    //         directoryAsNamespace: true,
    //         resolvers: [ElementPlusResolver() ],
    //     }),
    //     new webpack.ProvidePlugin({  // 在全局环境中注入jquery
    //     $: 'jquery',
	// 	// jQuery: 'jquery',
	// 	// 'window.jQuery': 'jquery',
	// 	// 'window.$': 'jquery'
    //     }),
    //     // 此处解决vue未定义extension大量报错问题
    //     // new webpack.DefinePlugin({
    //     //     __VUE_OPTIONS_API__: true,
    //     //     __VUE_PROD_DEVTOOLS__: false,
    //     //   }),
        
    //     // new RemoveConsolePlugin()
    // ]
}

module.exports = proconfig
