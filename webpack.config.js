// Generated using webpack-cli https://github.com/webpack/webpack-cli
const proconfig = require('./webpack.pro.config.js')
const devconfig = require('./webpack.dev.config.js')
const watchconfig = require('./webpack.watch.config.js')
const { merge } = require('webpack-merge')
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin


const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


const comconfig = {
    // target: 'node',
    // entry: ['./main.js','./content.js','./inject.js'],    //数组形式会被整合打包到一个输出文件//单独导出需要使用对象
    entry: {
        background: './background.js',
        content: './content.js',
        inject: './inject.js'
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
            template: './src/popup/pop.html',  // 指定元html文件的位置
            filename: 'popup.html',   // 指定输出的名称
            chunks: ['content'],          //指定自定义需要注入的js
            inject: 'body',
            // scriptLoading: 'defer'
            // minify: {
            //     // 移除空格
            //     collapseWhitespace: true,
            //     // 移除注释
            //     removeComments: true,
            //   },
        }), 
        // new MiniCssExtractPlugin({
        //     filename: '[name].css'
        // }),

        new VueLoaderPlugin(),   // 引入vue解析插件
        
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
                // /\.md$/, // .md
              ],
              imports: [
                'vue',
                'pinia',
                {
                    './piniaStore': ['piniaStore', 'userStore']
                }
                
              ],
              // 这里自动引入组件,不可去除
            resolvers: [ElementPlusResolver({importStyle: false})],
          }),
        Components({ 
            dirs:['src'],
            directoryAsNamespace: true,
            globalNamespaces: ['components', 'pages'],
            // resolvers: [ElementPlusResolver() ],
            resolvers: [ElementPlusResolver({importStyle: false}) ],
            // allowOverrides: true,
            // include: [/src/],
            exclude: [/[\/]app.vue[\/]/],
            // exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
        }),
        new webpack.ProvidePlugin({  // 在函数上下文环境中注入第三方库---缺点:无法全局window引用---使用expose-loader解决
        $: 'jquery',
        jq: 'jquery',
        _: 'lodash'
        }),
        // css: {
        //     preprocessorOptions: {
        //       scss: {
        //         additionalData: `@use "@/style/element/index.scss" as *;` //关键
        //       }
        //     }
        //   }
        // new InstallPlugin({
        //     dependencies: {
        //       peer: true,
        //     },
        //     packageManager: {
        //       type: 'npm',
        //       options: {
        //         dev: true,
        //         quiet: false,
        //       },
        //     },
        //     prompt: true,
        //   })
        
        //   new webpack.HotModuleReplacementPlugin()
    ],
    module: {  
        rules: [
            {
                oneOf:[
                    // {  //将库(函数)挂载暴露到外部window-------------对插件开发无效------因为顶层对象不同----------
                    //     test: require.resolve("jquery"),
                    //     loader: "expose-loader",
                    //     options: {
                    //       exposes:  {
                    //         globalName: "jquery",
                    //         },
                    //     },
                    // },
                    // {  //将库(函数)挂载暴露到外部window-----------对插件开发无效------因为顶层对象不同----------
                    //     test: require.resolve("lodash"),
                    //     loader: "expose-loader",
                    //     options: {
                    //       exposes:"lada666",
                    //     },
                    // },
                    {
                        test: /\.(js|jsx)$/i,
                        loader: 'babel-loader', //调用babelcore把源代码转换成抽象语法树,解析遍历生成,
                        exclude: /node_modules/,  ////打包时间神奇的少了2秒
                        options: {
                            //低版本IE无法读取新的API方法对象,如new Promise--------需要适配则需要使用polyfill------可以直接<script>调用官方自动化包------https://polyfill.io/v3/polyfill.min.js----
                            // presenrts: ['@babel/preset-env'],//@babel/preset-env----指示把ES6转换成ES5语法--------
                            // 开启babel缓存,第二次构建时,只构建改动的文件,其余直接读取缓存
                            cacheDirectory: true,
                            //此处自定义按需treeShaking引入----体积减少300k--UI组件和相应css--------
                            // plugins: [["import", {
                            //     "libraryName": "vxe-table",
                            //     "style": true,   // or 'css'
                            //   }]]
                        }
                    },
                    // {// **目前是style标签分别注入,且未压缩,需优化压缩整合到同一标签下,若整体css大于150K需再调整成link方式按需引入
                    //     test: /\.css$/i,
                    //     use: [MiniCssExtractPlugin.loader,'css-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
                    //     // use: ["style-loader", 'css-loader'],  
                    // },
                    // //此处可以引入移动端自适应px2rem-loader
                    // {
                    //     test: /\.s[ac]ss$/i,
                    //     use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
                    //     // use: ["style-loader", 'css-loader','sass-loader'], 
                    // },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,   //实现其他文件类型整合在js里而不是带hash输出独立文件
                        // type: 'asset',  //-------估计因为后期项目体积过大-----导致会自动改成输出文件形式输出图标------但是独立文件可能要另外配置索引---不然会失效--------
                        type: 'asset/inline',
                        // use: 'url-loader?limit=16941'
                    }
                    
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


module.exports = (env,args) => {
    if (env.WEBPACK_WATCH) {
        // console.log('env: ', env)
        return merge(comconfig, watchconfig)
    }else if(env.WEBPACK_SERVE){
        return merge(comconfig, devconfig)
    }else{
        return merge(comconfig, proconfig)
    }
    //------此处定义可以结合merge整合,避免相同键覆写-------
        // return config;
}

//TXT 文件或其他文件可以使用------raw-loader-------解析原始数据
//----------原始数据转换成对应的es6Module--------
//-------css-loader----处理css路径问题----
//-------style-loader----将css通过<style>标签注入head----
//-------file-loader-----处理文件引入--------url-loader--比file多一个文件大小限制----限制内的转为base64---
//-------html-loader---可以把引入路径自动改成相应的绝对路径----------------------------------------------------------------------------------------- 
//-------HtmlWebpackExternalsPlugin-----自动插入script标签---引入cdn-或本地模块文件路径------------------------------------------------------------------------- 
//--------------mode不定义时默认为production------------------------------------------------------------------------------------- 
//-----polyfill自定义引入避免变量污染--体积较大----babel-runtime-----------------插件自动引入API-----babel/plugin-transform-runtime------------------
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------------- 