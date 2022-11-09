const rest = (time) => {
    return new Promise((resolve, reject) => {
        //console.log(`start rest for ${time} seconds now: `, API.ztime.ymdhms())
        setTimeout(() => {
            resolve()
            //console.log(`end rest for ${time} seconds now: `, API.ztime.ymdhms())
        }, time * 1000);
    });
}

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


const injectJDSkuPageData = async() => {
    let skuTitle = '暂无数据'
    let skuPrice = '暂无数据'
    let skuUrl = window.location.href;
    let skuID = '暂无数据'
    let activities = new Array()
    let mainPicList = new Array()
    let mainImgUrl = '暂无数据'
    let videoUrl = '暂无数据'
    let videoTime = 0
    let skuPicList = new Array()
    let dtlPicList = new Array()
    let mainskuId = '暂无数据'
    
    // 获取商品ID
    let regID = skuUrl.match(/item.jd.com\/.*?(\d+).html/)
    if(regID != null){
        skuID = regID[1]
    }

    // 获取商品标题
    if(document.getElementsByClassName('sku-name')[0] != undefined){
        skuTitle = document.getElementsByClassName('sku-name')[0].innerText;
    }
    // 获取商品价格
    if(skuID != '暂无数据'){
        let pcn = 'price J-p-' + skuID
        if(document.getElementsByClassName(pcn)[0] != undefined){
            skuPrice = parseFloat(document.getElementsByClassName(pcn)[0].innerText)
        }
    }

    // 获取活动详情
    // 1 - 获取优惠券
    if(document.getElementsByClassName('quan-item').length > 0){
        let yhjels = document.getElementsByClassName('quan-item')
        for(let i=0; i< yhjels.length; i++){
            let yhjstr = yhjels[i].innerText;
            activities.push(yhjstr)
        }
    }
    // 2 - 获取促销活动
    if(document.getElementsByClassName('prom-item').length > 0){
        let mjs = document.getElementsByClassName('prom-item');
        for(let i=0; i< mjs.length; i++){
            let mjstr = mjs[i].innerText;
            activities.push(mjstr)
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
                mainPicList.push(skuimg)
            }
            mainImgUrl = mainPicList[0]
        }
    }

    // 判断是否有视频
    if(document.getElementsByClassName('video-icon').length > 0){
        document.getElementsByClassName('video-icon')[0].click()
        if(document.getElementsByTagName('video')[0].getElementsByTagName('source').length > 0){
            videoUrl = document.getElementsByTagName('video')[0].getElementsByTagName('source')[0].attributes.src.value;
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
                skuPicList.push(skuimg)
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
                dtlPicList.push(dtlimg)
            }
        }
    }

    // 获取mainskuid document.getElementsByTagName('html')[0].innerHTML.match(/mainSkuId:.*?(\d+)/)[1]
    let regsmain = document.getElementsByTagName('html')[0].innerHTML.match(/mainSkuId:.*?(\d+)/)
    if(regsmain != null){
        mainskuId = regsmain[1]
    }


    return dtlPicList
}

export default {getJDSKULink, injectJDSkuPageData}
