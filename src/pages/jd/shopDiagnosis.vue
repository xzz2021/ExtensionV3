<template>
<vxe-modal  className="jddiagnosismodal" v-model="diagnosisStore.show" width="1400" height="760"
      @hide="clearAlldata" :position="{ top: 45 }" maskClosable marginSize="-600" resize>
      <template #title>
        <div class="headerSec">
          <div class="func">
              <el-button ><template #icon><svg class="xzzsymbol" aria-hidden="true">
                <use xlink:href="#xzzicon2-download"></use></svg></template>表格下载</el-button>
             
              <div class="myProgress">
                <div class="tiploading">加载中</div>
                <div class="pro"><el-progress :text-inside="true" :stroke-width="20" :percentage="diagnosisStore.percentage"/></div>
              </div>
          </div>
          <div class="mytitle"> 
            <a  :href="diagnosisStore.diagnosisData.shopUrl" target="_blank">{{ diagnosisStore.diagnosisData.shopName }}</a> 
          </div>
        </div>

      </template>

    </vxe-modal>
</template>
<script setup>

const busStore = piniaStore()
const {userInfo, diagnosisStore } = storeToRefs(busStore)

  // let tempdiagnosisData = reactive({self:[]})
  // let DiagnosisNum = ref(null)



// watch(
//   () => diagnosisStore.diagnosisData, 
//   (newValue, oldValue) => {
//     console.log('newValue: ', newValue);
// })
// watch: {
//     tempdiagnosisData:{
//      handler(newV, oldV) {
//       let nvl =  newV.detailData.length
//        this.BUS.diagnosisData.detailData = newV.detailData
//        this.BUS.diagnosisData.shopName = newV.shopName
//     //    console.log('newV: ', newV);
//        if(nvl == 0) return 
//        this.percentage = nvl * 100/this.DiagnosisNum
//        this.BUS.diagnosisData.sumData =  newV.sumData
//        this.BUS.diagnosisData.sumData[0].totalNum =  nvl
//     },
//     deep: true
//     }
//   },

    const  startDiagnosis = async (num) =>{
      // console.log('num: ===========', num);
        await  start(num)
    //     await jdstorediagnosis({
    //               shop_name: diagnosisStore.value.diagnosisData.shopName,
    //               user_id: userInfo.value.userid,
    //               token: userInfo.value.userToken,
    //               data: JSON.stringify(diagnosisStore.value.diagnosisData)})
    }
    const start = async (num) =>{
        const getSkuTitle = () => {
        let title = document.getElementsByClassName('sku-name')[0].innerText;
        if (title != undefined) {
          title = title.trim();
        }
        return title;
      };

      // 获取视频标题
      const getVideoTitle = () => {
        let title = getSkuTitle();
        if (title != undefined) {
          title = title.replace(/[^\u4e00-\u9fa5^a-zA-Z^\d]/gi, '_');
        }
        return title;
      };

      // skuId获取
      const getSkuId = () => {
        let regs = window.location.href.match(/item.jd.com.*?(\d+)/);
        let id = undefined;
        if (regs != null) {
          id = regs.length >= 2 ? regs[1] : undefined;
        }
        return id;
      };

      // 获取搜本店链接第一个ID
      const getTypeId = () => {
        let script_list = document.getElementsByTagName('script');
        for (let i = 0; i < script_list.length; i++) {
          let script_text = script_list[i].innerText;
          if (script_text.indexOf('mall.jd.com/advance_search') > -1) {
            let regs = script_text.match(/advance_search.*?(\d+)/);
            let id = undefined;
            if (regs != null) {
              id = regs.length >= 2 ? regs[1] : undefined;
            }
            return id;
          }
        }
      };

      // 搜本店链接第二个ID
      const getVenderId = () => {
        let script_list = document.getElementsByTagName('script');
        for (let i = 0; i < script_list.length; i++) {
          let script_text = script_list[i].innerText;
          if (script_text.indexOf('venderId:') > -1) {
            let regs = script_text.match(/venderId:.*?(\d+)/);
            let id = undefined;
            if (regs != null) {
              id = regs.length >= 2 ? regs[1] : undefined;
            }

            return id;
          }
        }
      };

      // 搜本店链接第三个ID
      const getShopId = () => {
        let script_list = document.getElementsByTagName('script');
        for (let i = 0; i < script_list.length; i++) {
          let script_text = script_list[i].innerText;
          if (script_text.indexOf('shopId:') > -1) {
            let regs = script_text.match(/shopId:.*?(\d+)/);
            let id = undefined;
            if (regs != null) {
              id = regs.length >= 2 ? regs[1] : undefined;
            }
            return id;
          }
        }
      };

      // 组合成搜本店链接
      const compareSbdUrl = (id1, id2, id3, page) => {
        //https://mall.jd.com/advance_search-2277560-12030855-11748521-5-0-0-1-1-60.html?other=&isRedisstore=0
        /* API.zcl.printList(
        ['typeId', 'venderId', 'shopId'],
        [id1, id2, id3]
    ) */
        if (id1 != undefined && id2 != undefined && id3 != undefined) {
          let url = 'https://mall.jd.com/advance_search-' + id1 + '-' + id2 + '-' + id3 + '-5-0-0-1-' + page + '-60.html?other=&isRedisstore=0';
          return url;
        } else {
          return undefined;
        }
      }

      // 获取店铺信息
      const getShopData = () => {
        let result = {
          店铺名称: '暂无数据',
          店铺链接: '暂无数据',
          京东自营标记: '暂无数据',
          '店铺评分-商品评价-分数': '暂无数据',
          '店铺评分-商品评价-等级': '暂无数据',
          '店铺评分-物流履约-分数': '暂无数据',
          '店铺评分-物流履约-等级': '暂无数据',
          '店铺评分-售后服务-分数': '暂无数据',
          '店铺评分-售后服务-等级': '暂无数据',
          搜本店链接: '暂无数据',
        };

        // 获取店铺名称
        let shopName = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[1]/div/a');
        // 获取店铺连接
        let shopUrl = API.zxp.getElmHref('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[1]/div/a', 'https:');
        // 京东自营标记
        let JDTag = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[1]/em') == undefined ? '非自营' : '自营';

        // 获取店铺评分 - 商品评价
        let shopGoalprt = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[6]/div/div/div[1]/a[1]/div[2]/em');
        if (shopGoalprt == undefined) {
          shopGoalprt = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[5]/div/div/div[1]/a[1]/div[2]/em');
        }
        // 店铺评分 - 商品评价 - 分数
        let shopGoalprtnum = API.zrg.check(API.zrg.numberOne(shopGoalprt, 0));
        // 店铺评分 - 商品评价 - 等级
        let shopGoalprtLevel = API.zrg.check(API.zrg.chineseOne(shopGoalprt, 0));

        // 获取店铺评分 - 物流履约
        let shopGoalcar = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[6]/div/div/div[1]/a[2]/div[2]/em');
        if (shopGoalcar == undefined) {
          shopGoalcar = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[5]/div/div/div[1]/a[2]/div[2]/em');
        }
        // 店铺评分 - 物流履约 - 分数
        let shopGoalcarnum = API.zrg.check(API.zrg.numberOne(shopGoalcar, 0));
        // 店铺评分 - 物流履约 - 等级
        let shopGoalcarLevel = API.zrg.check(API.zrg.chineseOne(shopGoalcar, 0));

        // 获取店铺评分 - 售后服务
        let shopGoalserver = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[6]/div/div/div[1]/a[3]/div[2]/em');
        if (shopGoalserver == undefined) {
          shopGoalserver = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[5]/div/div/div[1]/a[3]/div[2]/em');
        }
        // 店铺评分 - 售后服务 - 分数
        let shopGoalservernum = API.zrg.check(API.zrg.numberOne(shopGoalserver, 0));
        // 店铺评分 - 售后服务 - 等级
        let shopGoalserverLevel = API.zrg.check(API.zrg.chineseOne(shopGoalserver, 0));

        // 获取搜本店连接
        let typeId = getTypeId();
        let venderId = getVenderId();
        let shopId = getShopId();
        let shopSbdUrl = compareSbdUrl(typeId, venderId, shopId, 1);

        /* API.zcl.printList(
        ['店铺名称', '店铺链接', '京东自营店铺', '商品评价分数', '商品评价等级', '物流履约分数', '物流履约等级', '售后服务分数', '售后服务等级', '搜本店链接'],
        [shopName, shopUrl, JDTag, shopGoalprtnum, shopGoalprtLevel, shopGoalcarnum, shopGoalcarLevel, shopGoalservernum, shopGoalserverLevel, shopSbdUrl]
    ) */

        result = API.zjn.set(result, ['店铺名称', '店铺链接', '京东自营标记', '店铺评分-商品评价-分数', '店铺评分-商品评价-等级', '店铺评分-物流履约-分数', '店铺评分-物流履约-等级', '店铺评分-售后服务-分数', '店铺评分-售后服务-等级', '搜本店链接'], [shopName, shopUrl, JDTag, shopGoalprtnum, shopGoalprtLevel, shopGoalcarnum, shopGoalcarLevel, shopGoalservernum, shopGoalserverLevel, shopSbdUrl]);
        //API.zcl.print('当前店铺信息', result)
        return result;
      };

      // 遍历搜本店获取所有商品链接信息
      const getSbdData = async (num) => {
        let result = {
          skuLinkList: [],
          shopAllNum: 0,
        };
        // 计算需要抓取的页面总数
        let allPage = 1;
        if (num > 60) {
          let ys = num % 60;
          allPage = parseInt(num / 60);
          if (ys > 0) {
            allPage = allPage + 1;
          }
        }
        let typeId = getTypeId();
        let venderId = getVenderId();
        let shopId = getShopId();
        for (let i = 1; i <= allPage; i++) {
          // 获取搜本店连接
          let shopSbdUrl = compareSbdUrl(typeId, venderId, shopId, i);

          if (shopSbdUrl != undefined) {
            // 打开搜本店第一页页面
            let sbdpage1 = await API.ztab.newTab(shopSbdUrl, false);
            // 获取页面ID
            let sbdpageid1 = sbdpage1['id'];
            // 等待加载完成
            let tabokflag = true;
            let tabcount = 0;
            while (tabokflag) {
              tabcount = tabcount + 1;
              let getstatus = await API.ztab.getByID(sbdpageid1);
              let tabstatus = getstatus.status;
              if (tabstatus == 'complete') {
                tabokflag = false;
              }
              await sleep(1);
              if (tabcount > 10) {
                tabokflag = false;
              }
            }
            // 注入函数获取当前页面数据
            let injectCode = `(function(){
                let pageUrl = window.location.href;
                let allnum = 0;
                let skuLinkList = new Array();
                let pageNum = 0
        
                let result =  {
                    "pageNum":0,
                    "allnum":0,
                    "skuLinkList": skuLinkList
                }
        
        
                // 获取当前页码
                let regs2 = pageUrl.match(/-5-0-0-1-(.*?)-60.html/)
               
                if(regs2 != null){
                    pageNum = regs2[1]
                }
                
        
                // 获取店铺总商品数量
                if(document.getElementsByClassName('jTotal')[0] != undefined){
                    let allnumt = document.getElementsByClassName('jTotal')[0].innerText
                    let regs = allnumt.match(/共(.*?)件商品/)
                    console.log(allnumt, regs)
                    if(regs != null){
                        allnum = parseInt(regs[1])
                    }
                }
               
                
                // 获取当前页面60个商品链接
                if(document.getElementsByClassName('jSearchList')[0] != undefined){
                    let searchList = document.getElementsByClassName('jSearchList')[0].children[0].children[3].children;
                    for(let i = 0; i < searchList.length; i++){
                        let skuLink = searchList[i].children[0].children[2].children[1].children[0].href
                        skuLinkList.push(skuLink)
                    }
                }
        
                result =  {
                    "pageNum":pageNum,
                    "allnum":allnum,
                    "skuLinkList": skuLinkList
                }
        
                return result
            })()`;
            let injectJS = await API.ztab.injectJS(sbdpageid1, injectCode);
            let skuLinkList = injectJS[0].skuLinkList;
            result['skuLinkList'].push.apply(result['skuLinkList'], skuLinkList);
            // 获取总商品数
            if (injectJS.allnum != 0) {
              result.shopAllNum = injectJS[0].allnum;
              if (injectJS.allnum <= num) {
                break;
              }
            } else {
              break;
            }
            let getstatus = await API.ztab.remove(sbdpageid1);
          }
          await sleep(1);
        }
        return result;
      };

      // 注入SKU页面脚本
      const injectSKUCode = async (pageUrl) => {
        // 打开商品页面
        let newSkuPage = await API.ztab.newTab(pageUrl, false);
        // 获取页面ID
        let newSkuPageid = newSkuPage['id'];
        // 注入函数获取当前页面数据
        // 等待加载完成
        let tabokflag = true;
        let tabcount = 0;
        while (tabokflag) {
          tabcount = tabcount + 1;
          let getstatus = await API.ztab.getByID(newSkuPageid);
          let tabstatus = getstatus.status;
          if (tabstatus == 'complete') {
            tabokflag = false;
          }
          await sleep(1);
          if (tabcount > 10) {
            tabokflag = false;
          }
        }

        // 注入函数
        let injectCode = `(function(){
        let result = {
            "skuTitle" : '暂无数据',
            "skuPrice" : '暂无数据',
            "skuUrl" : window.location.href,
            "skuID" : "暂无数据",
            "activities" : [],
            "mainPicList" : [],
            "mainImgUrl" : "暂无数据",
            "videoUrl" : "暂无数据",
            "videoTime" : 0,
            "skuPicList" : [],
            "dtlPicList" : [],
            "mainskuId" : '暂无数据',
            "shopId" : '暂无数据',
            "goodCommentTagList" : [],
            "goodCommentRate" : '暂无数据',
            "commentNum" : '暂无数据',
            'commentPicNum': '暂无数据',
            'badComment': '暂无数据',
            'goodComment': '暂无数据'
        }
        
        // 获取商品ID
        let regID = result['skuUrl'].match(/item.jd.com(.*?).html/)
        if(regID != null){
            result['skuID'] = regID[1].replace('/','')
        }
        
        // 获取商品标题
        if(document.getElementsByClassName('sku-name')[0] != undefined){
            result['skuTitle'] = document.getElementsByClassName('sku-name')[0].innerText;
        }

        // 获取商品价格
        if(result['skuID'] != '暂无数据'){
            let pcn = 'price J-p-' + result['skuID']
            if(document.getElementsByClassName(pcn)[0] != undefined){
                result['skuPrice'] = parseFloat(document.getElementsByClassName(pcn)[0].innerText)
            }
        }

        // 获取活动详情
        // 1 - 获取优惠券
        if(document.getElementsByClassName('quan-item').length > 0){
            let yhjels = document.getElementsByClassName('quan-item')
            for(let i=0; i< yhjels.length; i++){
                let yhjstr = yhjels[i].innerText;
                result['activities'].push(yhjstr)
            }
        }
        // 2 - 获取促销活动
        if(document.getElementsByClassName('prom-item').length > 0){
            let mjs = document.getElementsByClassName('prom-item');
            for(let i=0; i< mjs.length; i++){
                let mjstr = mjs[i].innerText;
                result['activities'].push(mjstr)
            }
        }

        // 获取主图
        if(document.getElementById('spec-list') != undefined){
            if(document.getElementById('spec-list').getElementsByTagName('img').length > 0){
                let mainimgList = document.getElementById('spec-list').getElementsByTagName('img');
                for(let i =0; i<mainimgList.length; i++ ){
                    let skuimg = mainimgList[i].currentSrc;
                    let skuregs = skuimg.match(/.com(.*?)jfs/)
                    if(skuregs != null){
                        skuimg = skuimg.replace(skuregs[0], '.com/n1/jfs')
                        skuimg = skuimg.replace('.avif','')
                    }
                    result['mainPicList'].push(skuimg)
                }
                result['mainImgUrl'] = result['mainPicList'][0]
            }
        }

        // 判断是否有视频
        if(document.getElementsByClassName('video-icon').length > 0){
            document.getElementsByClassName('video-icon')[0].click()
            if(document.getElementsByTagName('video')[0].getElementsByTagName('source').length > 0){
                result['videoUrl'] = document.getElementsByTagName('video')[0].getElementsByTagName('source')[0].attributes.src.value;
            }
        }

        // 获取SKU图
        if(document.getElementById('choose-attr-1') != undefined){
            if(document.getElementById('choose-attr-1').getElementsByTagName('img').length > 0){
                let skuInfos = document.getElementById('choose-attr-1').getElementsByTagName('img')
                for(let i = 0; i < skuInfos.length; i++){
                    let skuimg = skuInfos[i].currentSrc
                    let skuregs = skuimg.match(/.com(.*?)jfs/)
                    if(skuregs != null){
                        skuimg = skuimg.replace(skuregs[0], '.com/n1/jfs')
                        skuimg = skuimg.replace('.avif','')
                    }
                    result['skuPicList'].push(skuimg)
                }
            }
        }
      
        // 获取详情图
        // document.getElementById('J-detail-content').getElementsByTagName('img')[0].getAttribute('data-lazyload')
        if(document.getElementById('J-detail-content') != undefined){
            if(document.getElementById('J-detail-content').getElementsByTagName('img').length > 0){
                let dtlList = document.getElementById('J-detail-content').getElementsByTagName('img');
                for(let i = 0; i<dtlList.length; i++){
                    let dtlimg = dtlList[i].getAttribute('data-lazyload')
                 
                    //https://img10.360buyimg.com/imgzone/jfs/t1/145497/16/29555/843955/62f1fb8dEfb8c3302/2f0acfedeb9b1848.jpg.avif
                    if(dtlimg == null){
                        dtlimg = dtlList[i].currentSrc;
                
                    }
                    if(dtlimg != null){
      
                        if(dtlimg.indexOf('http') == -1){
                            dtlimg = 'https:' + dtlimg
                        }
                        dtlimg = dtlimg.replace('.avif','')
                        if(dtlimg.indexOf('jfs') > -1){
                            result['dtlPicList'].push(dtlimg)
                        }
                        
                    }
                    
                }
            }
        }

        // 获取mainskuid document.getElementsByTagName('html')[0].innerHTML.match(/mainSkuId:.*?(\d+)/)[1]
        let regsmain = document.getElementsByTagName('html')[0].innerHTML.match(/mainSkuId:'(.*?)',/)
        if(regsmain != null){
            result['mainskuId'] = regsmain[1]
        }

        // 获取shopId
        //let regsshop = document.getElementsByTagName('html')[0].innerHTML.match(/shopId:.*?(\d+)/)
        let regsshop = document.getElementsByTagName('html')[0].innerHTML.match(/shopId:'(.*?)',/)
        if(regsshop != null){
            result['shopId'] = regsshop[1]
        }
       
        return result
    })()`;
        let injectJS = await API.ztab.injectJS(newSkuPageid, injectCode);
        // 删除打开的商品详情页
        if (injectJS[0] != null) {
          let getstatus = await API.ztab.remove(newSkuPageid);
        }

        return injectJS[0];
      };

      // 获取页面数据
      const getSkuPageData = async (pageUrl, num) => {
        let skuPageData = await injectSKUCode(pageUrl);
        if (skuPageData == null) {
          let flag = true;
          let fc = 0;
          while (flag) {
            fc += 1;
            skuPageData = await injectSKUCode(pageUrl);
            if (skuPageData != null) {
              break;
            }
            if (fc >= 4) {
              break;
            }
            await sleep(1);
          }
        }

        if (skuPageData != null) {
          // 判断详情图数组是否为空
          if (skuPageData['dtlPicList'].length == 0 && skuPageData['skuID'] != '暂无数据' && skuPageData['mainskuId'] != '暂无数据') {
            let dtlUrl = 'https://cd.jd.com/description/channel?skuId=' + skuPageData['skuID'] + '&mainSkuId=' + skuPageData['mainskuId'] + '&charset=utf-8';
            let config = {
              method: 'GET',
              url: dtlUrl,
            };
            let htmlres1 = await 浏览器_跨域axios(config);
            let jsondata = htmlres1.data;
            if (jsondata.content != undefined) {
              let regs = jsondata.content.match(/\/\/.*?avif/g);
              if (regs != null) {
                for (let i = 0; i < regs.length; i++) {
                  skuPageData['dtlPicList'].push('https:' + regs[i]);
                }
              }
            }
          }

          // 获取视频时长
          if (skuPageData['videoUrl'] != '暂无数据') {
            let vt = await zvideo.getDuration(skuPageData['videoUrl']);
            skuPageData['videoTime'] = vt;
          }

          // 获取评价情况
          if (skuPageData['skuID'] != '暂无数据') {
            let acmtUrl = 'https://club.jd.com/comment/skuProductPageComments.action?productId=' + skuPageData['skuID'] + '&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1';

            let config = {
              method: 'GET',
              url: acmtUrl,
            };
            let htmlres1 = await 浏览器_跨域axios(config);
            let jdatas = htmlres1.data;

            if (jdatas.hotCommentTagStatistics != undefined) {
              if (jdatas.hotCommentTagStatistics instanceof Array) {
                for (let i = 0; i < jdatas.hotCommentTagStatistics.length; i++) {
                  let name = jdatas.hotCommentTagStatistics[i]['name'];
                  let count = jdatas.hotCommentTagStatistics[i]['count'];
                  let tags = name + '(' + count + ')';
                  skuPageData['goodCommentTagList'].push(tags);
                }
              }
              if (jdatas.productCommentSummary != undefined) {
                // 全部评价
                let allcmtNum = jdatas.productCommentSummary.commentCountStr.toString().replace('+', '');
                if (allcmtNum.indexOf('万') > -1) {
                  let allcmtNum2 = allcmtNum.match(/.*?(\d+)万/);
                  if (allcmtNum2 != null) {
                    let allcmtNum3 = parseInt(allcmtNum2[1]) * 10000;
                    allcmtNum = allcmtNum3.toString() + '+';
                  }
                } else {
                  allcmtNum = parseInt(allcmtNum).toString() + '+';
                }

                //差评
                let badcmtNum = jdatas.productCommentSummary.poorCountStr.toString().replace('+', '');
                if (badcmtNum.indexOf('万') > -1) {
                  let badcmtNum2 = badcmtNum.match(/.*?(\d+)万/);
                  if (badcmtNum2 != null) {
                    let badcmtNum3 = parseInt(badcmtNum2[1]) * 10000;
                    badcmtNum = badcmtNum3;
                  }
                } else {
                  badcmtNum = parseInt(badcmtNum);
                }

                //好评
                let goodcmtNum = jdatas.productCommentSummary.goodCountStr.toString().replace('+', '');
                if (goodcmtNum.indexOf('万') > -1) {
                  let goodcmtNum2 = goodcmtNum.match(/.*?(\d+)万/);
                  if (goodcmtNum2 != null) {
                    let goodcmtNum3 = parseInt(goodcmtNum2[1]) * 10000;
                    goodcmtNum = goodcmtNum3;
                  }
                } else {
                  goodcmtNum = parseInt(goodcmtNum);
                }

                // 好评率
                let goodrate = (parseFloat(jdatas.productCommentSummary.goodRate) * 100).toString() + '%';
                // 晒图数
                let picstr = jdatas.imageListCount.toString().replace('+', '');
                if (picstr.indexOf('万') > -1) {
                  let picstr2 = picstr.match(/.*?(\d+)万/);
                  if (picstr2 != null) {
                    let picst3 = parseInt(picstr2[1]) * 10000;
                    picstr = picst3;
                  }
                } else {
                  picstr = parseInt(picstr);
                }
                // 视频数
                let vidstr = jdatas.productCommentSummary.videoCountStr.toString().replace('+', '');
                if (vidstr.indexOf('万') > -1) {
                  let vidstr2 = vidstr.match(/.*?(\d+)万/);
                  if (vidstr2 != null) {
                    let vidstr3 = parseInt(vidstr2[1]) * 10000;
                    vidstr = vidstr3;
                  }
                } else {
                  vidstr = parseInt(vidstr);
                }
                // 视频晒图数
                let vidpicNum = (picstr + vidstr).toString() + '+';
                skuPageData['goodCommentRate'] = goodrate;
                skuPageData['commentNum'] = allcmtNum;
                skuPageData['commentPicNum'] = vidpicNum;
                skuPageData['badComment'] = badcmtNum;
                skuPageData['goodComment'] = goodcmtNum;
              }
            }
          }
        }

        return skuPageData;
      };

      // 店铺诊断
      const diagnosisProduct = async (num) => {
        let skumsg1 = '开始诊断' + num + '个商品!';
        ElMessage.success(skumsg1);
        diagnosisStore.value.diagnosisData = {
          // time: ztime.ymdhms().toString(),
          time: API.dayjs.format('YYYY-MM-DD').toString(),
          shopName: '',
          shopUrl: '暂无数据',
          detailData: [],
          sumData: [
            {
              totalNum: 0,
              salesRate: '动销率:暂无此字段',
              detailImg: {
                msg: '数量',
                notDesc: '详情图片数量<5',
                notNum: 0,
                okDesc: '详情图片数量≥5',
                okNum: 0,
              },
              sumMainImg: [
                {
                  msg: '1、分辨率',
                  notDesc: '主图分辨率<800*800pdi',
                  notNum: 0,
                  okDesc: '主图分辨率≥800*800pdi',
                  okNum: 0,
                },
                {
                  msg: '2、数量',
                  notDesc: '图片数量<5张',
                  notNum: 0,
                  okDesc: '图片数量≥5张',
                  okNum: 0,
                },
                {
                  msg: '3、小视频',
                  notDesc: '未设置主图小视频',
                  notNum: 0,
                  okDesc: '有设置主图小视频',
                  okNum: 0,
                },
                {
                  msg: '4、小视频时长',
                  notDesc: '小视频时长<10秒',
                  notNum: 0,
                  okDesc: '小视频时长≥10秒',
                  okNum: 0,
                },
                {
                  msg: '5、白底图',
                  notDesc: '主图最后一张不是白底图',
                  notNum: 0,
                  okDesc: '主图最后一张为白底图',
                  okNum: 0,
                },
                {
                  msg: '6、重复图',
                  notDesc: '主图中含有相似度高于99.0%的两张图',
                  notNum: 0,
                  okDesc: '主图中无相似度高于99.0%的两张图',
                  okNum: 0,
                },
              ],
              sumScore: [
                {
                  score: '暂无数据',
                  desc: '比同行业平均水平: 暂无数据',
                  isok: false,
                  msg: '1、商品评分',
                },
                {
                  score: '暂无数据',
                  desc: '比同行业平均水平: 暂无数据',
                  isok: false,
                  msg: '2、物流评分',
                },
                {
                  score: '暂无数据',
                  desc: '比同行业平均水平: 暂无数据',
                  isok: false,
                  msg: '3、售后评分',
                },
              ],
              sumTitle: [
                {
                  msg: '1、标题字符长度',
                  notDesc: '字符数<60个',
                  notNum: 0,
                  okDesc: '字符数≥60个',
                  okNum: 0,
                },
                {
                  msg: '2、标题特殊字符',
                  notDesc: '包含特殊字符【】/。，.？、＞等',
                  notNum: 0,
                  okDesc: '不含特殊字符【】/。，.？、＞等',
                  okNum: 0,
                },
                {
                  msg: '3、标题无空格',
                  notDesc: '标题含有空格',
                  notNum: 0,
                  okDesc: '标题中无空格',
                  okNum: 0,
                },
                {
                  msg: '4、标题无重复词',
                  notDesc: '标题含有重复词',
                  notNum: 0,
                  okDesc: '标题中无重复词',
                  okNum: 0,
                },
              ],
              commentNum: [
                {
                  msg: '1、好评数量',
                  notDesc: '没有好评',
                  notNum: 0,
                  okDesc: '存在好评',
                  okNum: 0,
                },
                {
                  msg: '2、差评数量',
                  notDesc: '没有差评',
                  notNum: 0,
                  okDesc: '存在差评',
                  okNum: 0,
                },
              ],
              sumService: [
                {
                  msg: '品质体验',
                  score: '暂无此字段',
                  isok: false,
                },
                {
                  msg: '物流时效',
                  score: '暂无此字段',
                  isok: false,
                },
                {
                  msg: '纠纷解决',
                  score: '暂无此字段',
                  isok: false,
                },
                {
                  msg: '退货体验',
                  score: '暂无此字段',
                  isok: false,
                },
                {
                  msg: '采购咨询',
                  score: '暂无此字段',
                  isok: false,
                },
              ],
            },
          ],
        };

        // 店铺信息JSON
        let shopDataobj = getShopData();

        // 获取搜本店链接
        //let sbdUrl = API.zjn.get(shopDataobj, '搜本店链接')
        diagnosisStore.value.diagnosisData['shopName'] = API.zjn.get(shopDataobj, '店铺名称');
        diagnosisStore.value.diagnosisData['shopUrl'] = API.zjn.get(shopDataobj, '店铺链接');
        if (API.zjn.get(shopDataobj, '京东自营标记') == '非自营') {
          // 商品评分
          diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][0]['score'] = API.zjn.get(shopDataobj, '店铺评分-商品评价-分数');
          diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][0]['desc'] = '比同行业平均水平: ' + API.zjn.get(shopDataobj, '店铺评分-商品评价-等级');
          if (API.zjn.get(shopDataobj, '店铺评分-商品评价-等级').indexOf('高') > -1) {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][0]['isok'] = true;
          }
          // 物流评分
          diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][1]['score'] = API.zjn.get(shopDataobj, '店铺评分-物流履约-分数');
          diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][1]['desc'] = '比同行业平均水平: ' + API.zjn.get(shopDataobj, '店铺评分-物流履约-等级');
          if (API.zjn.get(shopDataobj, '店铺评分-物流履约-等级').indexOf('高') > -1) {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][1]['isok'] = true;
          }
          // 售后评分
          diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][2]['score'] = API.zjn.get(shopDataobj, '店铺评分-售后服务-分数');
          diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][2]['desc'] = '比同行业平均水平: ' + API.zjn.get(shopDataobj, '店铺评分-售后服务-等级');
          if (API.zjn.get(shopDataobj, '店铺评分-售后服务-等级').indexOf('高') > -1) {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumScore'][2]['isok'] = true;
          }
        }

        // 遍历搜本店页面,获取所有商品链接
        let sbdData = await getSbdData(num);
        for (let i = 0; i < num; i++) {
          let skuMsgs = '开始诊断第' + (i + 1) + '个商品!';
          tElMessage.success(skuMsgs);

          // 默认的商品obj
          let dtlobj = {
            commentTag: [
              {
                desc: '不存在好评标签',
                isok: false,
                msg: '暂无数据',
                tagType: '好评标签: ',
              },
              {
                desc: '不存在差评标签',
                isok: false,
                msg: '暂无此字段',
                tagType: '差评标签: ',
              },
            ],
            commodityInfo: {
              mainImg: '暂无数据',
              title: '暂无数据',
              url: '暂无数据',
              discount: '促销价: 暂无此字段',
              floorPrice: '最低价: 暂无此字段',
              topPrice: '最高价: 暂无此字段',
              productId: '商品ID: 暂无数据',
              createTime: '创建时间:暂无此字段',
              price: '价格: 暂无数据',
            },
            detailImg: {
              desc: '详情图片数量<5',
              isok: false,
              msg: '1、详情图片数量: 暂无数据',
            },
            mainImgDiagnosis: [
              {
                desc: '主图分辨率<800*800',
                isok: false,
                msg: '1、主图分辨率: 暂无数据',
              },
              {
                desc: '图片数量<5张',
                isok: false,
                msg: '2、主图图片数量: 暂无数据',
              },
              {
                desc: '没有设置主图小视频',
                isok: false,
                msg: '3、主图小视频数量: 暂无数据',
                videoUrl: '暂无数据',
              },
              {
                data: '',
                desc: '主图小视频时长<10s',
                isok: false,
                msg: '4、主图小视频时长: 暂无数据',
              },
              {
                desc: '主图最后一张不为白底图',
                imgUrl: '暂无数据',
                isok: false,
                msg: '5、白底图: 暂无数据',
              },
              {
                data: [],
                desc: '主图无相似度高于99.5%的两张图',
                isok: false,
                msg: '6、重复图: 暂无数据',
              },
            ],
            monthSales: '暂无此字段',
            shopId: '暂无数据',
            titleDiagnosis: [
              {
                data: '暂无数据',
                desc: '标题字符数<60个',
                isok: false,
                msg: '1、标题字符数: 暂无数据',
              },
              {
                data: '暂无数据',
                desc: '标题不含特殊字符: 暂无数据',
                isok: false,
                msg: '2、标题特殊符号: 无',
              },
              {
                data: 0,
                desc: '标题含空格：暂无数据',
                isok: false,
                msg: '3、标题含空格',
              },
              {
                data: '暂无数据',
                desc: '标题重复词：暂无数据',
                isok: false,
                msg: '4、重复词: 无',
              },
            ],
            commentDiagnosis: [
              {
                msg: '1.好评标签:无',
                isok: false,
                desc: '好评标签:暂无数据',
              },
              {
                msg: '2.差评标签:暂无此字段',
                isok: false,
                desc: '差评标签:暂无此字段',
              },
              {
                msg: '3.视频图片数:暂无数据',
                isok: false,
                desc: '视频图片数:暂无数据',
              },
              {
                msg: '4.评价占比:暂无此字段',
                isok: false,
                desc: '评价占比:暂无此字段',
              },
              {
                msg: '5.货品评分:暂无此字段',
                isok: false,
                desc: '标准:货品评分 >=4.5 分 合格  否则不合格',
              },
              {
                msg: '6.好评率:暂无数据',
                isok: false,
                desc: '标准:好评率 >=90% 分 合格  否则不合格',
              },
              {
                msg: '7.评价数:暂无数据',
                isok: false,
                desc: '标准:评价数 >=10 个 合格  否则不合格',
              },
            ],
            promotionsDiagnosis: [
              {
                desc: '活动数量:暂无数据',
                isok: false,
                msg: '活动数量:暂无数据',
              },
              {
                desc: '活动详情:暂无数据',
                isok: false,
                msg: '活动详情:暂无数据',
              },
            ],
          };

          let skuUrl = sbdData.skuLinkList[i];
          let pageData = await getSkuPageData(skuUrl, i);
          //console.log(i + 1, '-', pageData)
          // 店铺ID
          dtlobj['shopId'] = pageData['shopId'];
          // 评价标签 -好评
          if (pageData['goodCommentTagList'].length > 0) {
            dtlobj['commentTag'][0]['isok'] = true;
            let gcmtstr = '';
            for (let i1 = 0; i1 < pageData['goodCommentTagList'].length; i1++) {
              let pdg = pageData['goodCommentTagList'][i1];
              gcmtstr = pdg + ';' + gcmtstr;
            }
            dtlobj['commentTag'][0]['msg'] = gcmtstr;
            dtlobj['commentTag'][0]['desc'] = gcmtstr;
            // dtlobj['commentTag'][0]['tagType'] = '好评标签: ' + gcmtstr;
            dtlobj['commentDiagnosis'][0]['msg'] = '1.好评标签:有';
            dtlobj['commentDiagnosis'][0]['isok'] = true;
            dtlobj['commentDiagnosis'][0]['desc'] = '好评标签: ' + gcmtstr;
          }
          // 视频图片数
          dtlobj['commentDiagnosis'][2]['msg'] = '3.视频图片数:' + pageData['commentPicNum'];
          dtlobj['commentDiagnosis'][2]['desc'] = '视频图片数:' + pageData['commentPicNum'];
          if (pageData['commentPicNum'] != '暂无数据') {
            dtlobj['commentDiagnosis'][2]['isok'] = true;
          }
          // 好评率
          if (pageData['goodCommentRate'].indexOf('%') > -1) {
            dtlobj['commentDiagnosis'][5]['msg'] = '6.好评率: ' + pageData['goodCommentRate'];
            let ratenum = parseInt(pageData['goodCommentRate'].replace('%', ''));
            if (ratenum >= 90) {
              dtlobj['commentDiagnosis'][5]['desc'] = '合格';
              dtlobj['commentDiagnosis'][5]['isok'] = true;
            } else {
              dtlobj['commentDiagnosis'][5]['desc'] = '不合格';
            }
          }
          // 评价数
          if (pageData['commentNum'] != '暂无数据') {
            dtlobj['commentDiagnosis'][6]['msg'] = '7.评价数: ' + pageData['commentNum'];
            let ratenum = parseInt(pageData['commentNum'].replace('+', ''));
            if (ratenum >= 10) {
              dtlobj['commentDiagnosis'][6]['desc'] = '合格';
              dtlobj['commentDiagnosis'][6]['isok'] = true;
            } else {
              dtlobj['commentDiagnosis'][6]['desc'] = '不合格';
            }
          }
          // 主图链接
          dtlobj['commodityInfo']['mainImg'] = pageData['mainImgUrl'];
          // 商品标题
          dtlobj['commodityInfo']['title'] = pageData['skuTitle'];
          // 商品链接
          dtlobj['commodityInfo']['url'] = pageData['skuUrl'];
          // 商品ID
          dtlobj['commodityInfo']['productId'] = pageData['skuID'];
          // 商品价格
          dtlobj['commodityInfo']['price'] = pageData['skuPrice'];
          // 详情图
          if (pageData['dtlPicList'].length > 0) {
            if (pageData['dtlPicList'].length >= 5) {
              dtlobj['detailImg']['desc'] = '详情图片数量≥5';
              dtlobj['detailImg']['isok'] = true;
              diagnosisStore.value.diagnosisData['sumData'][0]['detailImg']['okNum'] += 1;
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['detailImg']['notNum'] += 1;
            }
            dtlobj['detailImg']['msg'] = '1、详情图片数量: ' + pageData['dtlPicList'].length;
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['detailImg']['notNum'] += 1;
          }
          // 主图分辨率
          if (pageData['mainImgUrl'] != '暂无数据') {
            let mainwh = await zimg.getWH(pageData['mainImgUrl']);
            let mainwhstr = mainwh.width.toString() + '*' + mainwh.height.toString();
            dtlobj['mainImgDiagnosis'][0]['msg'] = '1、主图分辨率: ' + mainwhstr;
            if (mainwh.width >= 800 && mainwh.height >= 800) {
              dtlobj['mainImgDiagnosis'][0]['desc'] = '主图分辨率≥800*800';
              dtlobj['mainImgDiagnosis'][0]['isok'] = true;
              diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][0]['okNum'] += 1;
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][0]['notNum'] += 1;
            }
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][0]['notNum'] += 1;
          }
          // 主图数量
          if (pageData['mainPicList'].length > 0) {
            dtlobj['mainImgDiagnosis'][1]['msg'] = '2、主图图片数量: ' + pageData['mainPicList'].length;
            if (pageData['mainPicList'].length >= 5) {
              dtlobj['mainImgDiagnosis'][1]['desc'] = '图片数量≥5张';
              dtlobj['mainImgDiagnosis'][1]['isok'] = true;
              diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][1]['okNum'] += 1;
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][1]['notNum'] += 1;
            }
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][1]['notNum'] += 1;
          }
          // 视频数量
          if (pageData['videoUrl'] != '暂无数据') {
            dtlobj['mainImgDiagnosis'][2]['desc'] = '有设置主图小视频';
            dtlobj['mainImgDiagnosis'][2]['isok'] = true;
            dtlobj['mainImgDiagnosis'][2]['msg'] = '3、主图小视频数量: 1';
            dtlobj['mainImgDiagnosis'][2]['videoUrl'] = pageData['videoUrl'];
            diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][2]['okNum'] += 1;
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][2]['notNum'] += 1;
          }
          //视频时长
          if (pageData['videoTime'] != 0) {
            dtlobj['mainImgDiagnosis'][3]['data'] = pageData['videoTime'];
            dtlobj['mainImgDiagnosis'][3]['msg'] = '4、主图小视频时长: ' + pageData['videoTime'];
            let pt = parseFloat(pageData['videoTime']);
            if (pt >= 10) {
              dtlobj['mainImgDiagnosis'][3]['desc'] = '主图小视频时长≥10s';
              dtlobj['mainImgDiagnosis'][3]['isok'] = true;
              diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][3]['okNum'] += 1;
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][3]['notNum'] += 1;
            }
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][3]['notNum'] += 1;
          }
          // 主图白底图检测
          if (pageData['mainImgUrl'] != '暂无数据') {
            let acmtUrl = 'http://120.25.224.61:9001/photo_white?url=' + pageData['mainImgUrl'];

            /*  let msg = {type: 'zfetch', funcs:"JDbdIMG", config:{url:acmtUrl}}
            let jsondata = await API.sendMessage(msg)
            try{
                jsondata = JSON.parse(jsondata)
            }catch(e){
                API.zcl.print('白底图转换JSON失败', e)
            } */

            let config = {
              method: 'GET',
              url: acmtUrl,
            };
            let htmlres1 = await 浏览器_跨域axios(config);
            let jsondata = htmlres1.data;

            if (jsondata.is_white_base_img != undefined) {
              if (jsondata['is_white_base_img'] == 0) {
                // 不是白底图
                dtlobj['mainImgDiagnosis'][4]['desc'] = '主图最后一张不为白底图';
                dtlobj['mainImgDiagnosis'][4]['imgUrl'] = pageData['mainImgUrl'];
                dtlobj['mainImgDiagnosis'][4]['isok'] = false;
                dtlobj['mainImgDiagnosis'][4]['msg'] = '5、白底图: 否';
                diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][4]['notNum'] += 1;
              } else {
                // 是白底图
                dtlobj['mainImgDiagnosis'][4]['desc'] = '主图最后一张为白底图';
                dtlobj['mainImgDiagnosis'][4]['imgUrl'] = pageData['mainImgUrl'];
                dtlobj['mainImgDiagnosis'][4]['isok'] = true;
                dtlobj['mainImgDiagnosis'][4]['msg'] = '5、白底图: 是';
                diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][4]['okNum'] += 1;
              }
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][4]['notNum'] += 1;
            }
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][4]['notNum'];
          }
          // 主图重复图检测
          if (pageData['mainPicList'].length > 0) {
            let acmtUrl = 'http://120.25.224.61:9001/main_images_check';
            /* let msg = {type: 'zfetch', funcs:"JDReIMG", config:{url:acmtUrl, datas:pageData['mainPicList']}}
            let jsondata = await API.sendMessage(msg)
            try{
                jsondata = JSON.parse(jsondata)
            }catch(e){
                API.zcl.print('重复图转换JSON失败', e)
            } */

            let config = {
              method: 'post',
              url: acmtUrl,
              data: {
                urls: pageData['mainPicList'],
              },
            };
            let htmlres1 = await 浏览器_跨域axios(config);
            let jsondata = htmlres1.data;

            if (jsondata.img_repeat_check != undefined) {
              dtlobj['mainImgDiagnosis'][5]['data'] = jsondata['img_repeat_check']['data'];
              dtlobj['mainImgDiagnosis'][5]['desc'] = jsondata['img_repeat_check']['desc'];
              dtlobj['mainImgDiagnosis'][5]['isok'] = jsondata['img_repeat_check']['isok'];
              dtlobj['mainImgDiagnosis'][5]['msg'] = '6、' + jsondata['img_repeat_check']['msg'];
              if (dtlobj['mainImgDiagnosis'][5]['isok'] == true) {
                diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][5]['okNum'] += 1;
              } else {
                diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][5]['notNum'] += 1;
              }
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][5]['notNum'] += 1;
            }
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumMainImg'][5]['notNum'] += 1;
          }
          //标题诊断
          if (pageData['skuTitle'] != '暂无数据') {
            let acmtUrl = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=' + pageData['skuTitle'];
            /* let msg = {type: 'zfetch', funcs:"JDTitleck", config:{url:acmtUrl}}
            let jsondata = await API.sendMessage(msg)
            try{
                jsondata = JSON.parse(jsondata)
            }catch(e){
                API.zcl.print('标题诊断转换JSON失败', e)
            } */

            let config = {
              method: 'GET',
              url: acmtUrl,
            };
            let htmlres1 = await 浏览器_跨域axios(config);
            let jsondata = htmlres1.data;
            // 标题字符数
            dtlobj['titleDiagnosis'][0]['data'] = pageData['skuTitle'].length;
            dtlobj['titleDiagnosis'][0]['msg'] = '1、标题字符数: ' + pageData['skuTitle'].length;
            if (pageData['skuTitle'].length >= 60) {
              dtlobj['titleDiagnosis'][0]['desc'] = '标题字符数≥60个';
              dtlobj['titleDiagnosis'][0]['isok'] = true;
              diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][0]['okNum'] += 1;
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][0]['notNum'] += 1;
            }

            // 特殊字符
            let titlecheck = API.zrg.checkTSchar(pageData['skuTitle']);
            dtlobj['titleDiagnosis'][1]['data'] = titlecheck['chars'];
            if (titlecheck['char_count'] > 0) {
              dtlobj['titleDiagnosis'][1]['msg'] = '2、标题特殊符号: 有';
              dtlobj['titleDiagnosis'][1]['isok'] = false;
              dtlobj['titleDiagnosis'][1]['desc'] = '标题含特殊字符: ' + titlecheck['chars'];
              diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][1]['notNum'] += 1;
            } else {
              dtlobj['titleDiagnosis'][1]['msg'] = '2、标题特殊符号: 无';
              dtlobj['titleDiagnosis'][1]['isok'] = true;
              dtlobj['titleDiagnosis'][1]['desc'] = '标题不含特殊字符';
              diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][1]['okNum'] += 1;
            }

            // 空格
            if (jsondata.word_space_check != undefined) {
              dtlobj['titleDiagnosis'][2]['data'] = jsondata['word_space_check']['data'];
              dtlobj['titleDiagnosis'][2]['desc'] = '标题含空格：' + jsondata['word_space_check']['data'];
              if (jsondata['word_space_check']['data'] == 0) {
                dtlobj['titleDiagnosis'][2]['isok'] = true;
                diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][2]['okNum'] += 1;
              } else {
                dtlobj['titleDiagnosis'][2]['isok'] = false;
                diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][2]['notNum'] += 1;
              }
              dtlobj['titleDiagnosis'][2]['msg'] = '3、' + jsondata['word_space_check']['msg'];
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][2]['notNum'] += 1;
            }

            // 重复词
            if (jsondata.word_repeat_check != undefined) {
              dtlobj['titleDiagnosis'][3]['data'] = jsondata['word_repeat_check']['data'];
              dtlobj['titleDiagnosis'][3]['desc'] = '标题重复词：' + jsondata['word_repeat_check']['data'];
              if (jsondata['word_repeat_check']['isok'] == 1) {
                dtlobj['titleDiagnosis'][3]['isok'] = true;
                diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][3]['okNum'] += 1;
              } else {
                dtlobj['titleDiagnosis'][3]['isok'] = false;
                diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][3]['notNum'] += 1;
              }
              dtlobj['titleDiagnosis'][3]['msg'] = '4、' + jsondata['word_repeat_check']['msg'];
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][3]['notNum'] += 1;
            }
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][0]['notNum'] += 1;
            diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][1]['notNum'] += 1;
            diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][2]['notNum'] += 1;
            diagnosisStore.value.diagnosisData['sumData'][0]['sumTitle'][3]['notNum'] += 1;
          }
          // 活动数量
          if (pageData['activities'].length > 0) {
            dtlobj['promotionsDiagnosis'][0]['desc'] = '活动数量: ' + pageData['activities'].length;
            dtlobj['promotionsDiagnosis'][0]['isok'] = true;
            dtlobj['promotionsDiagnosis'][0]['msg'] = '活动数量: ' + pageData['activities'].length;
          } else {
            dtlobj['promotionsDiagnosis'][0]['desc'] = '活动数量: ' + pageData['activities'].length;
            dtlobj['promotionsDiagnosis'][0]['isok'] = false;
            dtlobj['promotionsDiagnosis'][0]['msg'] = '活动数量: ' + pageData['activities'].length;
          }
          // 活动详情
          if (pageData['activities'].length > 0) {
            let astrs = '';
            for (let i = 0; i < pageData['activities'].length; i++) {
              astrs = pageData['activities'][i] + ';' + astrs;
            }
            dtlobj['promotionsDiagnosis'][1]['desc'] = '活动详情: ' + astrs;
            dtlobj['promotionsDiagnosis'][1]['isok'] = true;
            dtlobj['promotionsDiagnosis'][1]['msg'] = '活动详情: ' + astrs;
          } else {
            dtlobj['promotionsDiagnosis'][1]['desc'] = '活动详情: 无';
            dtlobj['promotionsDiagnosis'][1]['isok'] = false;
            dtlobj['promotionsDiagnosis'][1]['msg'] = '活动详情: 无';
          }
          // 好评
          if (pageData['goodComment'] != '暂无数据') {
            if (pageData['goodComment'] > 0) {
              diagnosisStore.value.diagnosisData['sumData'][0]['commentNum'][0]['okNum'] += 1;
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['commentNum'][0]['notNum'] += 1;
            }
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['commentNum'][0]['notNum'] += 1;
          }
          // 差评
          if (pageData['badComment'] != '暂无数据') {
            if (pageData['badComment'] > 0) {
              diagnosisStore.value.diagnosisData['sumData'][0]['commentNum'][1]['okNum'] += 1;
            } else {
              diagnosisStore.value.diagnosisData['sumData'][0]['commentNum'][1]['notNum'] += 1;
            }
          } else {
            diagnosisStore.value.diagnosisData['sumData'][0]['commentNum'][1]['notNum'] += 1;
          }

          diagnosisStore.value.diagnosisData['detailData'].push(dtlobj);
        }

        // 统计的赋值
        diagnosisStore.value.diagnosisData['sumData'][0]['totalNum'] = diagnosisStore.value.diagnosisData['detailData'].length;
        //console.log(diagnosisStore.value.diagnosisData)
      
      };

      await diagnosisProduct(num)

    }
    const  downloadExcel = async () => {
        let url = `http://pddzd.junchenlun.com/?s=Jd.StoreBrowse.export&token=${userInfo.value.userToken}&user_id=${userInfo.value.userid}&info_id=${diagnosisStore.value.info_id}`

      await  API.sendMessage({type: 'downloads', url}) 
    }
    const clearAlldata = () => {
      busStore.$patch((state)=>{
          state.diagnosisStore = {show: false, percentage: 0, diagnosisData:{}}
        })
    }


//setup内部的实例对象默认只在内部,外部调用需要手动暴露出去
    defineExpose({
      startDiagnosis
        })
</script>

<style lang='scss' scoped>
@import '../../css/sass/jddiagnosispanel.scss';
</style>