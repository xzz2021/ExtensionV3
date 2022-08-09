<template>
    <div  class="ali-panel">
      <div class="dropdown-diagnosis">
        <div class="header">
          <div class="section">
            <img style="width: 40px; height: 40px;" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/JunChenLun_logo.png" alt="" />
            <a target="_blank" href="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs">
              进入官网99999
              <i class="el-icon-arrow-right"></i>
            </a>
          </div>
        </div>
        <div class="main">
          <div>
            <el-dropdown @click="click1" placement="right-start">
              <span class="el-dropdown-link">
                <div class="icon-logo"><i class="iconfont icon-4"></i></div>
                <div class="title">店铺诊断</div>
                <div class="arrow-right">
                  <i class="el-icon-arrow-right  el-icon--right"></i>
                </div>
              </span>
              <el-dropdown-menu >
                <el-dropdown-item command="a">
                  <div class="drop-menu">销售前2商品</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">销售前5商品</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">销售前10商品</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-dropdown placement="right-start">
              <span class="el-dropdown-link">
                <div class="icon-logo">
                  <i class="iconfont icon-tupian "></i>
                </div>
                <div class="title">图片下载</div>
                <div class="arrow-right">
                  <i class="el-icon-arrow-right  el-icon--right"></i>
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">
                  <div class="drop-menu">全部下载</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">主图下载</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">详情图下载</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">SKU图下载</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-dropdown placement="right-start">
              <span class="el-dropdown-link">
                <div class="icon-logo">
                  <i class="iconfont icon-pinglun1"></i>
                </div>
                <div class="title">评论下载</div>
                <div class="arrow-right">
                  <i class="el-icon-arrow-right  el-icon--right"></i>
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">
                  <div class="drop-menu">评价数量前20</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">评价数量前40</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">评价数量前100</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">评价数量前200</div>
                </el-dropdown-item>
                <el-dropdown-item command="a">
                  <div class="drop-menu">评价数量前300</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link padding18">
                <div class="icon-logo">
                  <i class="iconfont icon-liulan"></i>
                </div>
                <div class="title">浏览记录</div>
                <div class="arrow-right"></div>
              </span>
              <!-- <el-dropdown-menu slot="dropdown"></el-dropdown-menu> -->
            </el-dropdown>
          </div>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link padding18">
                <div class="icon-logo">
                  <i class="iconfont icon-zonghezhenduan"></i>
                </div>
                <div class="title">运营诊断</div>
                <div class="arrow-right"></div>
              </span>
              <!-- <el-dropdown-menu slot="dropdown"></el-dropdown-menu> -->
            </el-dropdown>
          </div>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link  padding18">
                <div class="icon-logo">
                  <i class="iconfont icon-24_beizhu"></i>
                </div>
                <div class="title">订单备注</div>
                <div class="arrow-right"></div>
              </span>
              <!-- <el-dropdown-menu slot="dropdown"></el-dropdown-menu> -->
            </el-dropdown>
          </div>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link padding18">
                <div class="icon-logo">
                  <i class="iconfont icon-wuliu2"></i>
                </div>
                <div class="title">疫情物流设置</div>
                <div class="arrow-right"></div>
              </span>
              <!-- <el-dropdown-menu slot="dropdown"></el-dropdown-menu> -->
            </el-dropdown>
          </div>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link padding18">
                <div class="icon-logo"><i class="iconfont icon-qushi"></i></div>
                <div class="title">商品趋势</div>
                <div class="arrow-right"></div>
              </span>
              <!-- <el-dropdown-menu slot="dropdown"></el-dropdown-menu> -->
            </el-dropdown>
          </div>
        </div>
        <div class="footer">
          <div class="version">版本: 3.6.1</div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  // data() {
  //   return {
  //     show_card: 1,
  //     rawmainImage: [],
  //     mainImage: [],
  //     detailImg: [],
  //     SkuImg: [],
  //     shopName: '',
  //     offerName: '',
  //     offerID: '',
  //     isClick: false,
  //     comments: [],
  //   }
  // },
  // methods: {
  //   async getComment() {},

  //   async Run() {
  //     //  避免连续点击重复调用下载
  //     if (!this.isClick) {
  //       this.isClick = true
  //       let that = this
  //       setTimeout(function() {
  //         that.isClick = false
  //       }, 2000)
  //     }
  //     await this.getData()
  //     await this.filterData()
  //     this.zipDownload()
  //   },

  //   async getData() {
  //     // 获取当前页原始数据rawData
  //     jq('html').append(`<script class="getDataFun" >( ${getLocalStorage})()<\/script>`) // 嵌入自定义的获取localStorage函数到目标页面并获得数据

  //     function getLocalStorage() {
  //       localStorage.setItem('rawData', JSON.stringify(window.__INIT_DATA))
  //     } // 定义函数  并获取原始数据 __INIT_DATA 由页面特性获得 不同网站存储的数据名不同

  //     let rawDataObj = JSON.parse(localStorage.getItem('rawData')) // 得到原始数据并转化为对象

  //     // console.log('得到的原始数据obj:', rawDataObj)

  //     this.rawmainImage = rawDataObj.globalData.images //  筛选并提取主图原始数据
  //     let shopData = rawDataObj.globalData.tempModel //  筛选并提取当前页面店铺名,商品名,ID,数据
  //     this.shopName = shopData.companyName //     赋值店铺名
  //     this.offerName = shopData.offerTitle //    赋值商品名
  //     this.offerID = shopData.offerId //   赋值ID

  //     // console.log('得到的店铺数据obj:', shopData)
  //     // Notification.success({
  //     //   title: `正在努力获取数据...请稍候`,
  //     //   duration: 500,
  //     //   offset: 20,
  //     //   position: 'top-right',
  //     // })
  //   },

  //   async filterData() {
  //     //  过滤获取的数据
  //     //  赋值主图图片
  //     this.rawmainImage.forEach((item, index) => {
  //       // 遍历过滤原始主图 数据   // 汇总url 生成新的数组
  //       // 定义函数封装成自己想要的数据
  //       let name = '主图' + (index + 1) + '.jpg'
  //       let url = item.fullPathImageURI
  //       let obj = {name: name, url: url}
  //       this.mainImage.push(obj) // 赋值重构得到完整主图数据
  //     })

  //     //  赋值详情图片
  //     jq('.content-detail img').each((index, item) => {
  //       // 遍历获取到所有详情图片懒加载的src地址
  //       // console.log(jq(item).attr("data-lazyload-src"))
  //       // let name = "详情图" + (index + 1)
  //       let name = '详情图' + (index + 1) + '.jpg'
  //       let url = jq(item).attr('data-lazyload-src')
  //       let obj = {name: name, url: url}
  //       this.detailImg.push(obj) // 赋值重构得到完整详情图数据
  //     })

  //     //  赋值sku图片//////////因为1688商品页不同商品有不同的dom结构,目前发现3种 所以需要进行条件判断

  //     this.filterSku()

  //     console.log()
  //     Notification.success({
  //       title: `正在努力提取数据...请稍候`,
  //       duration: 3000,
  //       offset: 20,
  //       position: 'top-right',
  //     })
  //   },
  //   filterSku() {
  //     /////因为1688商品页不同商品有不同的dom结构,目前发现3种 所以需要进行条件判断
  //     let aa = jq('.prop-img').length
  //     let bb = jq('.sku-item-image').length
  //     let cc = jq('.specification-cell .od-gyp-pc-sku-selection-sku').length // 因为1688页Dom上sku有2个同样的class名,所以加上子选择器
  //     if (aa > 1) {
  //       this.a()
  //       console.log('aaaaa')
  //     } else if (bb > 1) {
  //       this.b()
  //       console.log('bbbbbbbbb')
  //     } else if (cc > 1) {
  //       this.c()
  //       console.log('cccc')
  //     }
  //   },
  //   a() {
  //     jq('.prop-img').each((index, item) => {
  //       // 遍历获取到所有Sku图片懒加载的src地址
  //       // console.log(jq(item).attr("data-lazyload-src"))
  //       let name = 'Sku图' + (index + 1) + '.jpg'
  //       let getStyle = jq(item).attr('style') // 此处需要从标签的样式的background-image中提取到url ①得到style
  //       let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g // 从style提取url       // let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
  //       let url = getStyle.match(reg).toString() //match方法得到单个数组     转换为字符串  形成obj
  //       let obj = {name: name, url: url}
  //       this.SkuImg.push(obj) // 赋值重构得到完整sku图数据
  //     })
  //   },
  //   b() {
  //     jq('.sku-item-image').each((index, item) => {
  //       // 遍历获取到所有Sku图片懒加载的src地址
  //       // console.log(jq(item).attr("data-lazyload-src"))
  //       let name = 'Sku图' + (index + 1) + '.jpg'
  //       let getStyle = jq(item).attr('style') // 此处需要从标签的样式的background-image中提取到url ①得到style
  //       let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g // 从style提取url       // let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
  //       let url = getStyle.match(reg).toString() //match方法得到单个数组     转换为字符串  形成obj
  //       let obj = {name: name, url: url}
  //       this.SkuImg.push(obj) // 赋值重构得到完整sku图数据
  //     })
  //   },
  //   c() {
  //     // od-gyp-pc-sku-selection-sku   single-sku-img-pop
  //     jq('.od-gyp-pc-sku-selection-sku').each((index, item) => {
  //       // 遍历获取到所有Sku图片懒加载的src地址
  //       // console.log(jq(item).attr("data-lazyload-src"))
  //       let name = 'Sku图' + (index + 1) + '.jpg'
  //       let getStyle = jq(item).attr('style') // 此处需要从标签的样式的background-image中提取到url ①得到style
  //       let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g // 从style提取url       // let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
  //       let url = getStyle.match(reg).toString() //match方法得到单个数组     转换为字符串  形成obj
  //       let obj = {name: name, url: url}
  //       this.SkuImg.push(obj) // 赋值重构得到完整sku图数据
  //     })
  //   },

  //   async zipDownload() {
  //     const zip = new JSZip()

  //     // 分别压缩各项数据
  //     // 1主图
  //     this.mainImage.forEach((item, index) => {
  //       zip.folder('主图').file(item.name, 图片_url转base64_去除格式(item.url), {
  //         base64: true,
  //       })
  //     })

  //     // 2详情页图片
  //     this.detailImg.forEach((item, index) => {
  //       zip.folder('详情页图片').file(item.name, 图片_url转base64_去除格式(item.url), {
  //         base64: true,
  //       })
  //     })

  //     // 2sku图片
  //     this.SkuImg.forEach((item, index) => {
  //       zip.folder('sku图片').file(item.name, 图片_url转base64_去除格式(item.url), {
  //         base64: true,
  //       })
  //     })
  //     // console.log(this.mainImage)
  //     // console.log(this.detailImg)
  //     // console.log(this.SkuImg)

  //     // 汇总打包

  //     let zipDoc = await zip.generateAsync({
  //       type: 'blob',
  //       compression: 'DEFLATE',
  //       compressionOptions: {level: 1},
  //     })
  //     console.log('11111111')

  //     saveAs(zipDoc, `1688店铺名_店名_${this.shopName}_商品ID_${this.offerID}_商品标题_${this.offerName}`)
  //     console.log('222222')

  //     Notification.success({
  //       title: `下载完成`,
  //       duration: 1500,
  //       offset: 20,
  //       position: 'top-right',
  //     })
  //   },
  // },
  mounted() {},
}
</script>

<style lang="scss" scoped>


.ali-panel {
  position: fixed;
  z-index: 999+1;
  left: 2px;
  top: 30px;

  .dropdown-diagnosis {
    width: 180px;
    height: 506px;
    background: rgba(255, 255, 255, 0.39);
    border: 1px solid #eeeeee;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 4px;
    .header {
      margin-bottom: 7px;
      .section {
        text-align: center;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        width: 178px;
        height: 60px;
        background: linear-gradient(180deg, #ffad44 0%, #ff9712 100%);
        opacity: 1;
        border-radius: 4px 4px 0 0;
        a {
          text-decoration: none;
          width: 61px;
          height: 16px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 16px;
          color: #ffffff;
          opacity: 1;
        }
      }
    }
    .main {
      display: flex;
      flex-flow: column;
      > div {
        margin: 5px 10px;
        width: 160px;
        height: 38px;
        // padding: 9px 10px;
        opacity: 1;
        border-radius: 4px;
        background: rgba(255, 248, 240, 0.39);
        .el-dropdown {
          width: 160px;
          height: 38px;
          .padding18 {
            padding-right: 18px;
          }
          .el-dropdown-link {
            display: flex;
            justify-content: center;
            margin: 9px 10px;
            text-align: center;
            cursor: pointer;
            line-height: 22px;
            .icon-logo {
              // line-height: 22px;
              margin-right: 4px;
              font-size: 16px;
              // padding: 0 2px;
            }
            .title {
              text-align: left;
              // margin-right: 14px;
              width: 96px;
              height: 20px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 20px;
              opacity: 1;
            }
            .arrow-right {
              font-size: 10px;
              // text-align: center;
              // line-height: 20px;
            }
          }
          .el-dropdown-link:hover {
            color: #ff9712;
          }
        }
      }
    }
    .footer {
      margin-top: 22px;
      .version {
        margin: 0 auto;
        width: 74px;
        height: 32px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 22px;
        color: #999999;
        opacity: 1;
      }
    }
  }
}

//不能加scoped,此处为elementui封装的下拉选项,会渲染在根app节点上
.el-dropdown-menu__item:hover {
  color: #ff9712;
  background: rgba(243, 192, 96, 0.212);
}

.drop-menu2:hover {
  color: #ff9712;
}
</style>
