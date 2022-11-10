# 全新的框架
技术栈：vue3.2+scss+element-plus+vxe-table+chromeV3+webpack5

部分依赖：jquery,lodash,pinia,websocket,

### 文件结构说明
public/manifest.json开发模式；public/manifestPro.json生产模式；因为使用了不同的css注入方式

api存放自定义封装的函数，bgcApi目录下会自动引入background.js；contentApi目录下会自动全局引入content.js；请建立自己的文件夹编写，避免合并冲突，公共区域会存放提取大家优化完善的方法函数
##### components存放公共共性组件，然后会由各平台app.vue作为子组件引入，由于tab隔离，不再建立全局兄弟组件
##### css为样式集合

### 编译配置
##### 为了代码精简，所有模块都会自动按需引入并treeshaking，包括子组件，pinia状态管理，jQuery等，一般不需要手动import，尽量不要引入不必要的外部依赖，实验性开发请尽量在本地新分支进行

### 开发模式
##### 脚手架有3种模式
watch：会启用自定义的websocket监听编译并自动刷新；

server：会启动webpack官方的dev-server，借由服务中转也能实现自动刷新；

build：打包生产上线时使用，有特别针对优化配置，每次使用前要特别注意下修改manifestPro.json和webpack.pro.config.js配置文件
