// Generated using webpack-cli https://github.com/webpack/webpack-cli
const proconfig = require('./webpack.pro.config.js')
const devconfig = require('./webpack.dev.config.js')
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
    // entry: ['./main.js','./content.js','./inject.js'],    //数组形式会被整合打包到一个输出文件//单独导出需要使用对象
    entry: {
        // popup: './src/popup/pop.js',
        background: './src/bgc/background.js',
        content: './src/content/content.js'
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
            chunks: ['content'],          //指定自定义需要注入的js
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
            dirs:['src'],
            directoryAsNamespace: true,
            resolvers: [ElementPlusResolver() ],
        }),
        new webpack.ProvidePlugin({  // 在全局环境中注入jquery
        $: 'jquery',
		// jQuery: 'jquery',
		// 'window.jQuery': 'jquery',
		// 'window.$': 'jquery'
        }),
        // 此处解决vue未定义extension大量报错问题
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
          }),
        //   new webpack.HotModuleReplacementPlugin()
    ],
    // globals: {'$': true},
    // devtool: 'eval-source-map',
    devtool: 'cheap-source-map',
    // externals: {}, 忽略指定的模块不进行打包
    module: {  
        rules: [
            {
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
                    {
                        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,   //实现其他文件类型整合在js里而不是带hash输出独立文件
                        type: 'asset',
                    },
                    
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
};


module.exports = () => {
    
    if (true) {
        let config = {...comconfig, ...devconfig }
        return config;
    
    }else{
        let config = Object.assign(comconfig, proconfig, {plugins:[...comconfig.plugins,...proconfig.plugins]})
        return config;
    }
};
