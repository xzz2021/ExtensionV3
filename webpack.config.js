// Generated using webpack-cli https://github.com/webpack/webpack-cli
// const proconfig = require('./webpack.pro.config.js')
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

//实现elementplus自动按需加载
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// const isProduction = process.env.NODE_ENV == 'development';



const comconfig = {
    mode: 'development',
    // mode: 'production',
    // entry: ['./main.js','./content.js','./inject.js'],    //数组形式会被整合打包到一个输出文件//单独导出需要使用对象
    entry: {
        popup: './src/popup/pop.js',
        background: './src/background.js',
        content: './src/content.js'
    },
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'xzz2022'),
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    stats: {
        orphanModules: true,
      },
    plugins: [
        new HtmlWebpackPlugin({    // 可以实现自动生成新的html并自动导入js
            template: './src/popup/index.html',  // 指定元html文件的位置
            filename: 'popup.html',   // 指定输出的名称
            chunks: ['popup'],          //指定自定义需要注入的js
            inject: 'body',
            // scriptLoading: 'defer'
        }), 

        new MiniCssExtractPlugin(),    // 实现css文件打包
        
        new CleanWebpackPlugin(),   // 自动清除之前的打包目录  插件

        new VueLoaderPlugin(),   // 引入vue解析插件
        new CopyWebpackPlugin({  //实现静态文件的直接复制
            patterns: [             // 需要拷贝的目录或者路径
            {from: 'public', to: './'}
        ]}),
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
    // devtool: 'eval-source-map',
    devtool: 'cheap-source-map',
    // externals: {}, 忽略指定的模块不进行打包
    module: {   //oneOf配置可以优化性能,,,文件只会选择一个loader,,如果没有oneOf则会轮询
        rules: [
            {
                // oneOf不同文件只加载一个对应loader,而不是轮询
                oneOf:[
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
                    
                ]
            },
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
        ],
    },
    // devServer: {
    //     // contentBase: path.join(__dirname, 'xzz2022'),   // 告诉服务器从哪里提供内容(默认当前工作目录)
    //     static: {
    //         directory: path.join(__dirname, 'xzz2022'), 
    //       },  // 告诉服务器从哪里提供内容(默认当前工作目录)
    //     // contentBase: 'public',   // 指定额外的静态资源目录
    //     // openPage: 'xzz2022/index.html',  // 指定默认启动浏览器时打开的页面
    //     host: 'localhost', // 默认localhost,想外部可访问用'0.0.0.0'
    //     port: 8888, // 默认8080
    //     inline: false, // 可以监控js变化
    //     hot: false, // 热启动
    //     open: false, // 启动时自动打开浏览器（指定打开chrome，open: 'Google Chrome'）
    //     compress: true, // 一切服务都启用gzip 压缩
    //      // 将 bundle 写到磁盘而不是内存
    //      writeToDisk: true,
    //     //  clientLogLevel: 'none',  // 不显示启动服务日志信息
    //     //  quite: true,   //控制台只显示基本信息
    //     //  before(app,server,compiler) {reloadServer(app,compiler)} //监听文件改动
    //     // stats: { // 设置控制台的提示信息
    //     //   chunks: false,
    //     //   children: false,
    //     //   modules: false,
    //     //   entrypoints: false, // 是否输出入口信息
    //     //   warnings: false,
    //     //   performance: false, // 是否输出webpack建议（如文件体积大小）
    //     // }
    //     // proxy: { // 本地地址和上线地址api不一致,则可以设置重写,接口代理（这段配置更推荐：写到package.json，再引入到这里）
    //     //   "/api-dev": {
    //     //     "target": "http://api.test.xxx.com",
    //     //     "secure": false,
    //     //     "changeOrigin": true,
    //     //     "pathRewrite": { // 将url上的某段重写（例如此处是将 api-dev 替换成了空）
    //     //       "^/api-dev": ""
    //     //     }
    //     //   }
    //     // }
    //   }
};

module.exports = () => {
    
    if (true) {
        let config = {...comconfig }
        return config;
      
    }else{
        let config = {...comconfig, ...proconfig}
        return config;
    }
};
