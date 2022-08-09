// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')  //实现PWA渐进式网络开发


//实现elementplus自动按需加载
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


// const stylesHandler = MiniCssExtractPlugin.loader;  //作用是将js中的css提取处理成单独的css文件




const devconfig = {
    // mode: 'development',
    // entry: ['./main.js','./content.js','./inject.js'],    //数组形式会被整合打包到一个输出文件//单独导出需要使用对象
    entry: {
        background: './src/background/bgc.js',
        // pop: './src/popup/pop.js',
        // main: './main.js',
        content: './src/content.js'
        // inject: './src/inject.js'
    },
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'xzz2022'),
    },
    optimization: {  // 优化配置项  实现前提是 ES Modules
        usedExports: true,  //开启 Tree Shaking 功能  过滤未引用的模块  标记未引用的块
        concatenateModules: false,    // 尽可能合并每一个模块到一个函数中  减少体积和运行效率
        minimize: false,
        minimizer: [   //  把未引用的块剔除掉     压缩
        // new TerserWebpackPlugin({
        //     extractComments: false,    //不将注释提取到单独的文件中    //  不生成LICENSE
        // }),  ///3333所以要再次引用一次内置的JS压缩插件
        // new OptimizeCssAssetsWebpackPlugin(),    //实现压缩css 代码  
            /// //    111不能直接放在plugins里,因为会把非css文件都压缩
            //   //2222而放在此处minimize又会覆盖官方内置的JS压缩插件
        ]     
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    // devtool: 'cheap-module-eval-source-map',  // 定义source-map  调试类型
    // devtool: 'none',  // 定义source-map  调试类型
    // devServer: {
    //     open: true,
    //     host: 'localhost',
    // },
    stats: {
        orphanModules: true,
      },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        // new HtmlWebpackPlugin({    // 可以实现自动生成新的html并自动导入js
        //     template: './src/popup/pop.html',  // 指定元html文件的位置
        //     filename: 'popup.html',   // 指定输出的名称
        //     chunks: ['content'],          //指定自定义需要注入的js
        //     inject: 'body',
        //     // scriptLoading: 'defer'
        // }),             // 如果需要输出多个html  可以再多次 new  HtmlWebpackPlugin()  即可

        // new HtmlWebpackPlugin({    // 可以实现自动生成新的html并自动导入js
        //     template: './src/background/bgc.html',  // 指定元html文件的位置
        //     filename: 'background.html',   // 指定输出的名称
        //     chunks: ['bgc']          //指定自定义需要注入的js
        // }), 

        new MiniCssExtractPlugin(),    // 实现css文件打包
        
        // new CleanWebpackPlugin(),   // 自动清除之前的打包目录  插件

        new VueLoaderPlugin(),   // 引入vue解析插件
        // new RemoveConsolePlugin()
        // new CopyWebpackPlugin({  //实现静态文件的直接复制
        //     patterns: [        
        //     // {from: 'public', to: './' },       // 需要拷贝的目录或者路径
        //     {from: 'public', to: './'}
        // ]}),
        // new ChromeconstExtensionReloader(),
        // new webpack.DefinePlugin({    // 可以内部注入全局任意变量
        //     //    值要求是一个代码片段
        //     API: '"字符串"'   
        //     // API: JSON.stringify("字符串")   //或者使用转换
        // }),
        //实现elementplus自动按需加载
        AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        // new webpack.ProvidePlugin({  // 在全局环境中注入jquery
        // $: 'jquery',
		// // jQuery: 'jquery',
		// // 'window.jQuery': 'jquery',
		// // 'window.$': 'jquery'
        // })
        
    ],

};

