<template>
  <div class="container">
    <div class="header">
      <div class="section">
        <img style="width: 165px; height: 66px;" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/JunChenLun_logo_desc.png" alt="" />
        <a target="_blank" href="http://pddzd.junchenlun.com/plugs/">
          进入官网 >
        </a>
      </div>
    </div>
    <div class="main">
      <div class="box" v-for="(item, index) in popData" :key="index" @click="isJump(index,$event)">
        <a target="_blank" :href="item.href">
          <img :src="item.imgsrc" />
          <span>{{ item.title }}</span>
        </a>
      </div>
    </div>
    <div class="footer">
      <div class="version">{{version}}</div>
    </div>
    <!-- <el-input v-model="myin"></el-input> -->
  </div>
</template>

<script setup>

const version = VERSION
      const popData =  reactive(
        [
        {
          title: '拼多多商城',
          href: 'https://mobile.yangkeduo.com',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/pdd_shop.png',
        },
        {
          title: '拼多多商家',
          href: 'https://mms.pinduoduo.com/home',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/pdd_business.png',
        },
        {
          title: '天猫',
          href: 'https://list.tmall.com/search_product.htm?q=男鞋',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/tmall.png',
        },
        {
          title: '淘宝',
          href: 'https://s.taobao.com/search?q=男鞋',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/taobao.png',
        },
        {
          title: '阿里巴巴国内',
          href: 'https://p4psearch.1688.com/p4p114/p4psearch/offer.htm?keywords=男鞋',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/1688.png',
        },
        {
          title: '阿里国际站',
          href: 'https://www.alibaba.com',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/1688.png',
        },
        {
          title: '京东',
          href: 'https://www.jd.com/',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/jd.png',
        },
        {
          title: '亚马逊',
          href: 'amazon',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/amazon.png',
        },
        
        {
          title: '苏宁',
          href: 'suning',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/suning.png',
        },
        {
          title: '飞猪',
          href: 'feizhu',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/feizhu.png',
        },
        {
          title: '跨境电商',
          href: 'kuajing',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/kuajing.png',
        },
        {
          title: '小红书',
          href: 'xiaohs',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/xiaohs.png',
        },
        {
          title: '速卖通',
          href: 'sumaitong',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/sumaitong.png',
        },
        {
          title: '虾皮',
          href: 'shopee',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/shopee.png',
        },
        {
          title: '快手',
          href: 'kuaishou',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/kuaishou.png',
        },
        {
          title: '抖音',
          href: 'douyin',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/douyin.png',
        },
        {
          title: '微商城',
          href: 'weishangcheng',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/weishangcheng.png',
        },
        {
          title: '公众号',
          href: 'gzh',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/gzh.png',
        },
        {
          title: '有赞商城',
          href: 'youzan',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/youzan.png',
        },
        {
          title: '微店',
          href: 'weidian',
          imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/weidian.png',
        },
        // {
        //   title: '来赞达',
        //   href: 'lazada',
        //   imgsrc: 'https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/lazada.png'
        // }
      ])


    const  isJump = (index,event) => {
      if (index > 6) {
        ElMessage.success({message: `功能正在开发...`, duration: 1500, offset: 450, position: 'top-right',center: true, grouping: true,})
       return event.preventDefault()  //阻止跳转
      }
    }
</script>

<style lang="scss" scoped>
body {
  background: url('https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/mask.png') no-repeat;
}
.container {
  width: 368px;
  // height: 445px;
  // opacity: 1;
  // chrome原生body界面无法覆写边框样式
  // background-clip: padding-box;
  // border: 1px solid #DDDDDD;
  // border-radius: 4px;

  // background: url("/img/mask.png") no-repeat;
  .header {
    margin: 5px 0 20px 0;

    .section {
      box-sizing: content-box;
      text-align: center;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px;
      width: 328px;
      height: 94px;
      background: linear-gradient(180deg, #ffad44 0%, #ff9712 100%);
      border-radius: 4px;

      a {
        text-decoration: none;
        font-size: 14px;
        font-family: Microsoft YaHei;
        color: #ffffff;
      }
    }
  }

  .main {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 25%;
      margin-bottom: 20px;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-decoration: none;

        img {
          width: 38px;
        }

        span {
          margin-top: 8px;
          height: 19px;
          line-height: 22px;
          font-size: 14px;
          color: #000;
        }
      }
    }
  }

  .footer {
    margin: -10px;
    padding-bottom: 10px;

    .version {
      text-align: center;
      margin: 0 auto;
      width: 74px;
      height: 20px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      line-height: 22px;
      color: #999999;
    }
  }
}

</style>
