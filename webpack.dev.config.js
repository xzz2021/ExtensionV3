
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack')


const devconfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    plugins: [
    //-------为了避免磁盘重复读写-----仅在首次使用时打开------dev-server会自动读取public目录里的文件---故index.html无需引入---
        new CopyWebpackPlugin({  //实现静态文件的直接复制
            patterns: [             // 需要拷贝的目录或者路径
            {from: 'public/logo.png', to: './logo.png'},
            {from: 'public/manifest.json', to: './manifest.json'}
        ]}),
        //可以定义全局上下文的变量
        new webpack.DefinePlugin({
          // 此处解决vue未定义extension大量报错问题
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false,
          "AUTHOR": JSON.stringify('xzz2022'),
          "VERSION": JSON.stringify('0928'),
          'DEBUG': true
        })
    ],
    // watch: true,  // 监听源文件的变动,重新编译
    // watchOptions: {}, //
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
    devServer: {
        // contentBase: path.join(__dirname, 'xzz2022'),   // 告诉服务器从哪里提供额外的内容(默认当前工作目录),类似web服务器放置图片资源等
        // static: {
        //     directory: path.join(__dirname, 'xzz2022'), 
        //   },  // 告诉服务器从哪里提供额外的静态资源内容(默认当前工作目录)
        host: 'localhost', // 默认localhost,想外部可访问用'0.0.0.0'
        port: 8888, // 默认8080
        // inline: true, // 可以监控js变化
        hot: false, // 热启动,,对注入的content无任何作用,所以关闭
        open: true, // 启动时自动打开浏览器（指定打开chrome，open: 'Google Chrome'）
        // open: {
        //   // app: {
        //   //   name: 'chrome',//启动后打开指定的宿主机应用,,,,---指定软件,浏览器
        //   // },
        //   // target: ['index.html', 'https://tmall.com'],//启动后打开指定页面
        // },
        compress: true, // 一切服务都启用gzip 压缩
        allowedHosts: 'auto', //必须加上此行,不然webpack安全策略在非监听页面会一直报错-----------auto会自动引入所监听的url
        client: {
          reconnect: false,   //不会尝试重新连接///不然非监听页会一直报错
        },
        devMiddleware: {
          writeToDisk: true,
        },
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
        // },
        // 侦听端口链接 执行自定义函数
        onListening: function (devServer) {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined');
            }
            console.log('--------侦听端口链接 执行自定义函数-----')
            // sendSSE()
            // const port = devServer.server.address().port;
            // console.log('Listening on port:', port);
          },
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

module.exports = devconfig

