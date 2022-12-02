
// 注入京东搜本店页面获取商品链接,页码,商品总数
const getJDSKULink = (skunum) => {
    let pageUrl = window.location.href;
    let allnum = 0;
    let skuLinkList = new Array();
    let pageNum = 0

    let result =  {
        "pageNum":0,
        "skunum":skunum,
        "allnum":0,
        "skuLinkList": skuLinkList
    }

    // 获取当前页码
    let regs2 = pageUrl.match(/-5-0-0-1-.*?(\d+)-60.html/)
    if(regs2 != null){
        pageNum = regs2[1]
    }

    // 获取当前页面页码
/*     if(document.getElementsByClassName('jPage')[0] != undefined){
        let jpage = document.getElementsByClassName('jPage')[0].children
        for(let i = 0; i< jpage.length; i++){
            let jpaget = jpage[i]
            if(jpaget != undefined){
                let jpagetclass = jpaget.classList[0]
                if(jpagetclass == 'current'){
                    pageNum = parseInt(jpaget.innerText)
                }
            }
        }
    } */

    // 获取店铺总商品数量
    if(document.getElementsByClassName('jTotal')[0] != undefined){
        let allnumt = document.getElementsByClassName('jTotal')[0].innerText
        let regs = allnumt.match(/\d+.*?/g)
        if(regs != null){
            allnum = parseInt(regs[0])
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
        "skunum":skunum,
        "allnum":allnum,
        "skuLinkList": skuLinkList
    }

    return result
}

// 注入京东商品页获取页面数据 
const injectJDSkuPageData = async() => {
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
    let regID = result['skuUrl'].match(/item.jd.com\/.*?(\d+).html/)
    if(regID != null){
        result['skuID'] = regID[1]
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

    // 获取sku图
    if(document.getElementById('spec-list') != undefined){
        if(document.getElementById('spec-list').getElementsByTagName('img').length > 0){
            let mainimgList = document.getElementById('spec-list').getElementsByTagName('img');
            for(let i =0; i<mainimgList.length; i++ ){
                let skuimg = mainimgList[i].currentSrc;
                let skuregs = skuimg.match(/.com\/.*?jfs/)
                if(skuregs != null){
                    skuimg = skuimg.replace(skuregs[0], '.com/n1/jfs')
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
                let skuregs = skuimg.match(/.com\/.*?jfs/)
                if(skuregs != null){
                    skuimg = skuimg.replace(skuregs[0], '.com/n1/jfs')
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
                dtlimg = 'https:' + dtlimg
                result['dtlPicList'].push(dtlimg)
            }
        }
    }

    // 获取mainskuid document.getElementsByTagName('html')[0].innerHTML.match(/mainSkuId:.*?(\d+)/)[1]
    let regsmain = document.getElementsByTagName('html')[0].innerHTML.match(/mainSkuId:.*?(\d+)/)
    if(regsmain != null){
        result['mainskuId'] = regsmain[1]
    }

    // 获取shopId
    let regsshop = document.getElementsByTagName('html')[0].innerHTML.match(/shopId:.*?(\d+)/)
    if(regsshop != null){
        result['shopId'] = regsshop[1]
    }

    
    /* // 获取评价数据
    // 商品评价点击
    if(document.getElementsByClassName('tab-main large').length != 0){
        let pjbtn = null
        for(let j = 0; j< document.getElementsByClassName('tab-main large').length; j++ ){
            let comentbtns1 = document.getElementsByClassName('tab-main large')[j].getElementsByTagName('li')
            for(let i = 0 ; i< comentbtns1.length; i++){
                if(comentbtns1[i].innerText.indexOf('商品评价') > -1){
                    comentbtns1[i].click()
                    pjbtn = comentbtns1[i]
                }
            }
        }


        // 只看当前商品点击
        if(document.getElementById('comm-curr-sku') != null){
            console.log('2')
            document.getElementById('comm-curr-sku').click()
            // 好评标签获取
            if(document.getElementsByClassName('tag-1').length != 0){
                let commentTagList = document.getElementsByClassName('tag-1')
                for(let i =0; i< commentTagList.length; i++){
                    let ctags = commentTagList[i].innerText
                    result['goodCommentTagList'].push(ctags)
                }
            }
            // 好评率获取
            if(document.getElementsByClassName('percent-con').length != 0){
                result['goodCommentRate'] = document.getElementsByClassName('percent-con')[0].innerText
            }
            // 评价总数获取
            if(document.getElementsByClassName('tab-main small').length != 0){
                if(document.getElementsByClassName('tab-main small')[0].getElementsByTagName('li').length != 0){
                    let cmtbtns = document.getElementsByClassName('tab-main small')[0].getElementsByTagName('li')
                    for(let i = 0; i < cmtbtns.length; i++){
                        let cmtbtnstr = cmtbtns[i].innerText;
                        if(cmtbtnstr.indexOf('全部评价') > -1){
                            let cmtregs = cmtbtnstr.match(/全部评价\((.*?)\)/)
                            if(cmtregs != null){
                                result['commentNum'] = cmtregs[1]
                            }
                        }
                        if(cmtbtnstr.indexOf('晒图') > -1){
                            let cmtregs = cmtbtnstr.match(/晒图\((.*?)\)/)
                            if(cmtregs != null){
                                let cmtregstr = cmtregs[1].replace('+', '')
                                if(cmtregstr.indexOf('万') > -1){
                                    let cmtregs2 = cmtregstr.match(/.*?(\d+)万/)
                                    if(cmtregs2 != null){
                                        let cmtregstr2 = parseInt(cmtregs2[1]) * 10000;
                                        cmtregstr = cmtregstr2
                                    }
                                }else{
                                    cmtregstr = parseInt(cmtregstr)
                                }
                                result['commentPicNum'] = cmtregstr
                            }
                        }
                        if(cmtbtnstr.indexOf('视频') > -1){
                            let cmtregs = cmtbtnstr.match(/视频晒单\((.*?)\)/)
                            if(cmtregs != null){
                                let cmtregstr = cmtregs[1].replace('+', '')
                                if(cmtregstr.indexOf('万') > -1){
                                    let cmtregs2 = cmtregstr.match(/.*?(\d+)万/)
                                    if(cmtregs2 != null){
                                        let cmtregstr2 = parseInt(cmtregs2[1]) * 10000;
                                        cmtregstr = cmtregstr2
                                    }
                                }else{
                                    cmtregstr = parseInt(cmtregstr)
                                }
                                result['commentPicNum'] = (result['commentPicNum'] + cmtregstr).toString() + '+'
                            }
                        }
                    }
                }
            }
        }
    } */

    return result
}

export default {getJDSKULink, injectJDSkuPageData}
