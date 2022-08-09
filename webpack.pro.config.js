// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const RemoveConsolePlugin = require('./RemoveConsolePlugin');  //自己自定义去除所有console.log的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = MiniCssExtractPlugin.loader;  //作用是将js中的css提取处理成单独的css文件




const proconfig = {
    
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
    // externals: {}, 忽略指定的模块不进行打包
    module: {   //oneOf配置可以优化性能,,,文件只会选择一个loader,,如果没有oneOf则会轮询
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                exclude: /node_modules/,  ////打包时间神奇的少了2秒
                options: {
                    // presenrts: []
                    // 开启babel缓存,第二次构建时,只构建改动的文件,其余直接读取缓存
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/i,
                // use: ["style-loader", stylesHandler,'css-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
                use: ["style-loader", 'css-loader'],  //实现样式代码整合在单独一个文件里
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", 'css-loader','sass-loader'],  //实现样式代码整合在单独一个文件里  //添加sassloader
            },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            //     type: 'asset',
            // },
            {
                test: /.vue$/,
                use: 'vue-loader'
            },
            // 解决引入element-plus打包报错问题
            {
                test: /\.(t|j|mj)s$/,
                include: path.resolve(
                    __dirname,
                    '../node_modules/element-plus'
                ),
                resolve: {
                    fullySpecified: false,
                },
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    devServer: {
        // contentBase: path.join(__dirname, 'xzz2022'),   // 告诉服务器从哪里提供内容(默认当前工作目录)
        static: {
            directory: path.join(__dirname, 'xzz2022'), 
          },  // 告诉服务器从哪里提供内容(默认当前工作目录)
        // contentBase: 'public',   // 指定额外的静态资源目录
        // openPage: 'xzz2022/index.html',  // 指定默认启动浏览器时打开的页面
        host: 'localhost', // 默认localhost,想外部可访问用'0.0.0.0'
        port: 8888, // 默认8080
        inline: false, // 可以监控js变化
        hot: false, // 热启动
        open: false, // 启动时自动打开浏览器（指定打开chrome，open: 'Google Chrome'）
        compress: true, // 一切服务都启用gzip 压缩
         // 将 bundle 写到磁盘而不是内存
         writeToDisk: true,
        //  clientLogLevel: 'none',  // 不显示启动服务日志信息
        //  quite: true,   //控制台只显示基本信息
        //  before(app,server,compiler) {reloadServer(app,compiler)} //监听文件改动
        // stats: { // 设置控制台的提示信息
        //   chunks: false,
        //   children: false,
        //   modules: false,
        //   entrypoints: false, // 是否输出入口信息
        //   warnings: false,
        //   performance: false, // 是否输出webpack建议（如文件体积大小）
        // }
        // proxy: { // 本地地址和上线地址api不一致,则可以设置重写,接口代理（这段配置更推荐：写到package.json，再引入到这里）
        //   "/api-dev": {
        //     "target": "http://api.test.xxx.com",
        //     "secure": false,
        //     "changeOrigin": true,
        //     "pathRewrite": { // 将url上的某段重写（例如此处是将 api-dev 替换成了空）
        //       "^/api-dev": ""
        //     }
        //   }
        // }
      }
};

module.exports = proconfig
