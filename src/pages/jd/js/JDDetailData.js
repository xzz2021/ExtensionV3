import { parseJSON } from 'jquery';

let JD_API_TEMP = {
    "time": "2022-08-25 09:09:04",
    "shopName": "暂无数据",
    "shopUrl": "暂无数据",
    "detailData": [
        {
            "commentTag": [
                {
                    "desc": "不存在好评标签",
                    "isok": false,
                    "msg": "暂无数据",
                    "tagType": "好评标签: "
                },
                {
                    "desc": "不存在差评标签",
                    "isok": false,
                    "msg": "暂无此字段",
                    "tagType": "差评标签: "
                }
            ],
            "commodityInfo": {
                "mainImg": "暂无数据",
                "title": "暂无数据",
                "url": "暂无数据",
                "discount": "促销价: 暂无此字段",
                "floorPrice": "最低价: 暂无此字段",
                "topPrice": "最高价: 暂无此字段",
                "productId": "商品ID: 暂无数据",
                "createTime": "创建时间:暂无此字段",
                "price": "价格: 暂无数据"
            },
            "detailImg": {
                "desc": "详情图片数量<5",
                "isok": false,
                "msg": "1、详情图片数量: 暂无数据"
            },
            "mainImgDiagnosis": [
                {
                    "desc": "主图分辨率<800*800",
                    "isok": false,
                    "msg": "1、主图分辨率: 暂无数据"
                },
                {
                    "desc": "图片数量<5张",
                    "isok": false,
                    "msg": "2、主图图片数量: 暂无数据"
                },
                {
                    "desc": "没有设置主图小视频",
                    "isok": false,
                    "msg": "3、主图小视频数量: 暂无数据",
                    "videoUrl": "暂无数据"
                },
                {
                    "data": "",
                    "desc": "主图小视频时长<10s",
                    "isok": false,
                    "msg": "4、主图小视频时长: 暂无数据"
                },
                {
                    "desc": "主图最后一张不为白底图",
                    "imgUrl": "暂无数据",
                    "isok": false,
                    "msg": "5、白底图: 暂无数据"
                },
                {
                    "data":[],
                    "desc": "主图无相似度高于99.5%的两张图",
                    "isok": false,
                    "msg": "6、重复图: 暂无数据"
                }
            ],
            "monthSales": "暂无此字段",
            "shopId": "暂无数据",
            "titleDiagnosis": [
                {
                    "data": "暂无数据",
                    "desc": "标题字符数<60个",
                    "isok": false,
                    "msg": "1、标题字符数: 暂无数据"
                },
                {
                    "data": "暂无数据",
                    "desc": "标题不含特殊字符: 暂无数据",
                    "isok": false,
                    "msg": "2、标题特殊符号: 无"
                },
                {
                    "data": 0,
                    "desc": "标题含空格：暂无数据",
                    "isok": false,
                    "msg": "3、标题含空格"
                },
                {
                    "data": "暂无数据",
                    "desc": "标题重复词：暂无数据",
                    "isok": false,
                    "msg": "4、重复词: 无"
                }
            ],
            "commentDiagnosis": [
                {
                    "msg": "1.好评标签:暂无数据",
                    "isok": false,
                    "desc": "好评标签:暂无数据"
                },
                {
                    "msg": "2.差评标签:暂无此字段",
                    "isok": false,
                    "desc": "差评标签:暂无此字段"
                },
                {
                    "msg": "3.视频图片数:暂无数据",
                    "isok": false,
                    "desc": "视频图片数:暂无数据"
                },
                {
                    "msg": "4.评价占比:暂无此字段",
                    "isok": false,
                    "desc": "评价占比:暂无此字段"
                },
                {
                    "msg": "5.货品评分:暂无此字段",
                    "isok": false,
                    "desc": "标准:货品评分 >=4.5 分 合格  否则不合格"
                },
                {
                    "msg": "6.好评率:暂无数据",
                    "isok": false,
                    "desc": "标准:好评率 >=90% 分 合格  否则不合格"
                },
                {
                    "msg": "7.评价数:暂无数据",
                    "isok": false,
                    "desc": "标准:评价数 >=10 个 合格  否则不合格"
                }
            ],
            "promotionsDiagnosis": [
                {
                    "desc": "活动数量:暂无数据",
                    "isok": false,
                    "msg": "活动数量:暂无数据"
                },
                {
                    "desc": "活动详情:暂无数据",
                    "isok": false,
                    "msg": "活动详情:暂无数据"
                }
            ]
        }
    ],
    "sumData": [
        {
            "totalNum": "诊断数量: 0",
            "salesRate": "动销率:暂无此字段",
            "detailImg": {
                "msg": "数量",
                "notDesc": "详情图片数量<5",
                "notNum": 0,
                "okDesc": "详情图片数量≥5",
                "okNum": 0
            },
            "sumMainImg": [
                {
                    "msg": "1、分辨率",
                    "notDesc": "主图分辨率<800*800pdi",
                    "notNum": 0,
                    "okDesc": "主图分辨率≥800*800pdi",
                    "okNum": 0
                },
                {
                    "msg": "2、数量",
                    "notDesc": "图片数量<5张",
                    "notNum": 0,
                    "okDesc": "图片数量≥5张",
                    "okNum": 0
                },
                {
                    "msg": "3、小视频",
                    "notDesc": "未设置主图小视频",
                    "notNum": 0,
                    "okDesc": "有设置主图小视频",
                    "okNum": 0
                },
                {
                    "msg": "4、小视频时长",
                    "notDesc": "小视频时长<10秒",
                    "notNum": 0,
                    "okDesc": "小视频时长≥10秒",
                    "okNum": 0
                },
                {
                    "msg": "5、白底图",
                    "notDesc": "主图最后一张不是白底图",
                    "notNum": 0,
                    "okDesc": "主图最后一张为白底图",
                    "okNum": 0
                },
                {
                    "msg": "6、重复图",
                    "notDesc": "主图中含有相似度高于99.0%的两张图",
                    "notNum": 0,
                    "okDesc": "主图中无相似度高于99.0%的两张图",
                    "okNum": 0
                }
            ],
            "sumScore": [
                {
                    "score": "暂无数据",
                    "desc": "比同行业平均水平: 暂无数据",
                    "isok": false,
                    "msg": "1、商品评分"
                },
                {
                    "score": "暂无数据",
                    "desc": "比同行业平均水平: 暂无数据",
                    "isok": false,
                    "msg": "2、物流评分"
                },
                {
                    "score": "暂无数据",
                    "desc": "比同行业平均水平: 暂无数据",
                    "isok": false,
                    "msg": "3、售后评分"
                }
            ],
            "sumTitle": [
                {
                    "msg": "1、标题字符长度",
                    "notDesc": "字符数<60个",
                    "notNum": 0,
                    "okDesc": "字符数≥60个",
                    "okNum": 0
                },
                {
                    "msg": "2、标题特殊字符",
                    "notDesc": "包含特殊字符【】/。，.？、＞等",
                    "notNum": 0,
                    "okDesc": "不含特殊字符【】/。，.？、＞等",
                    "okNum": 0
                },
                {
                    "msg": "3、标题无空格",
                    "notDesc": "标题含有空格",
                    "notNum": 0,
                    "okDesc": "标题中无空格",
                    "okNum": 0
                },
                {
                    "msg": "4、标题无重复词",
                    "notDesc": "标题含有重复词",
                    "notNum": 0,
                    "okDesc": "标题中无重复词",
                    "okNum": 0
                }
            ],
            "commentNum": [
                {
                    "msg": "1、好评数量",
                    "notDesc": "没有好评",
                    "notNum": 0,
                    "okDesc": "存在好评",
                    "okNum": 0
                },
                {
                    "msg": "2、差评数量",
                    "notDesc": "没有差评",
                    "notNum": 0,
                    "okDesc": "存在差评",
                    "okNum": 0
                }
            ],
            "sumService": [
                {
                    "msg": "品质体验",
                    "score": "暂无此字段",
                    "isok": false
                },
                {
                    "msg": "物流时效",
                    "score": "暂无此字段",
                    "isok": false
                },
                {
                    "msg": "纠纷解决",
                    "score": "暂无此字段",
                    "isok": false
                },
                {
                    "msg": "退货体验",
                    "score": "暂无此字段",
                    "isok": false
                },
                {
                    "msg": "采购咨询",
                    "score": "暂无此字段",
                    "isok": false
                }
            ]
        }
    ]
}


// 获取商品标题
const getSkuTitle = () => {
    let title = $('.sku-name').text()
    if(title != undefined){
        title = title.trim()
    }
    return title
}

// 获取视频标题
const getVideoTitle = () => {
    let title = getSkuTitle()
    if(title != undefined){
        title = title.replace(/[^\u4e00-\u9fa5^a-zA-Z^\d]/gi, "_")
    }
    return title
}

// skuId获取
const getSkuId = (url) => {
    let regs = url.match(/item.jd.com.*?(\d+)/);
    let id = undefined
    if(regs != null){
         id = regs.length >= 2 ? regs[1] : undefined;
    }
    return id;
};

/* --- 搜本店链接构造 start --- */
// 获取搜本店链接第一个ID
const getTypeId = () => {
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('mall.jd.com/advance_search') > -1){
            let regs = script_text.match(/advance_search.*?(\d+)/);
            let id = undefined;
            if(regs != null){
                id = regs.length >= 2 ? regs[1] : undefined; 
            }
            return id;
        }
    }
};

// 搜本店链接第二个ID
const getVenderId = () => {
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('venderId:') > -1){
            let regs = script_text.match(/venderId:.*?(\d+)/);
            let id = undefined;
            if(regs != null){
                id = regs.length >= 2 ? regs[1] : undefined;
            }
             
            return id;
        }
    }
};

// 搜本店链接第三个ID
const getShopId = () => {
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('shopId:') > -1){
            let regs = script_text.match(/shopId:.*?(\d+)/);
            let id = undefined;
            if(regs != null){
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
    if (id1 != undefined && id2 != undefined && id3 != undefined){
        let url = "https://mall.jd.com/advance_search-" + id1 + "-" + id2 + "-" + id3 + "-5-0-0-1-" + page +"-60.html?other=&isRedisstore=0";
        return url;
    }else{
        return undefined;
    }
}

// 获取店铺信息
const getShopData = () => {
    let result = {
        '店铺名称' : '暂无数据',
        '店铺链接' : '暂无数据',
        '京东自营标记' : '暂无数据',
        '店铺评分-商品评价-分数' : '暂无数据',
        '店铺评分-商品评价-等级' : '暂无数据',
        '店铺评分-物流履约-分数' : '暂无数据',
        '店铺评分-物流履约-等级' : '暂无数据',
        '店铺评分-售后服务-分数' : '暂无数据',
        '店铺评分-售后服务-等级' : '暂无数据',
        '搜本店链接' : '暂无数据'
    }

    // 获取店铺名称
    let shopName = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[1]/div/a')
    // 获取店铺连接
    let shopUrl = API.zxp.getElmHref('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[1]/div/a', 'https:')
    // 京东自营标记
    let JDTag = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[1]/em') == undefined ? '非自营' : '自营';

    // 获取店铺评分 - 商品评价
    let shopGoalprt = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[6]/div/div/div[1]/a[1]/div[2]/em')
    // 店铺评分 - 商品评价 - 分数
    let shopGoalprtnum = API.zrg.numberOne(shopGoalprt, 0);
    // 店铺评分 - 商品评价 - 等级
    let shopGoalprtLevel = API.zrg.chineseOne(shopGoalprt, 0); 

    // 获取店铺评分 - 物流履约
    let shopGoalcar = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[6]/div/div/div[1]/a[2]/div[2]/em')
    // 店铺评分 - 物流履约 - 分数
    let shopGoalcarnum = API.zrg.numberOne(shopGoalcar, 0);
    // 店铺评分 - 物流履约 - 等级
    let shopGoalcarLevel = API.zrg.chineseOne(shopGoalcar, 0);

    // 获取店铺评分 - 售后服务
    let shopGoalserver = API.zxp.getElmText('//*[@id="crumb-wrap"]/div/div[2]/div[2]/div[6]/div/div/div[1]/a[3]/div[2]/em')
    // 店铺评分 - 售后服务 - 分数
    let shopGoalservernum = API.zrg.numberOne(shopGoalserver, 0);
    // 店铺评分 - 售后服务 - 等级
    let shopGoalserverLevel = API.zrg.chineseOne(shopGoalserver, 0);

    // 获取搜本店连接
    let typeId = getTypeId()
    let venderId = getVenderId()
    let shopId = getShopId()
    let shopSbdUrl = compareSbdUrl(typeId, venderId, shopId, 1)

    /* API.zcl.printList(
        ['店铺名称', '店铺链接', '京东自营店铺', '商品评价分数', '商品评价等级', '物流履约分数', '物流履约等级', '售后服务分数', '售后服务等级', '搜本店链接'],
        [shopName, shopUrl, JDTag, shopGoalprtnum, shopGoalprtLevel, shopGoalcarnum, shopGoalcarLevel, shopGoalservernum, shopGoalserverLevel, shopSbdUrl]
    ) */

    result = API.zjn.set(
        result,
        [
            '店铺名称', 
            '店铺链接',
            '京东自营标记',
            '店铺评分-商品评价-分数',
            '店铺评分-商品评价-等级',
            '店铺评分-物流履约-分数',
            '店铺评分-物流履约-等级',
            '店铺评分-售后服务-分数',
            '店铺评分-售后服务-等级',
            '搜本店链接'
        ],
        [
            shopName, 
            shopUrl, 
            JDTag, 
            shopGoalprtnum, 
            shopGoalprtLevel, 
            shopGoalcarnum, 
            shopGoalcarLevel, 
            shopGoalservernum, 
            shopGoalserverLevel, 
            shopSbdUrl
        ]
    )
    API.zcl.print('当前店铺信息', result)
    return result
}

// 遍历搜本店获取所有商品链接信息
const getSbdData = async(num) => {
    let result = {
        "skuLinkList":[],
        "shopAllNum": 0
    }
    // 计算需要抓取的页面总数
    let allPage = 1
    if(num > 60){
        let ys = num % 60
        allPage = parseInt(num / 60)
        if(ys > 0){
            allPage = allPage + 1
        }
    }
    let typeId = getTypeId()
    let venderId = getVenderId()
    let shopId = getShopId()
    for(let i = 1; i <= allPage; i++){
        // 获取搜本店连接
        let shopSbdUrl = compareSbdUrl(typeId, venderId, shopId, i)
        if(shopSbdUrl != undefined){
            // 打开搜本店第一页页面
            let sbdmsg1 = {type: 'ztab', funcs:"add", config:{url:shopSbdUrl, active:false}}
            let sbdpage1 = await API.sendMessage(sbdmsg1)
            // 获取页面ID
            let sbdpageid1 = sbdpage1['id']
            // 注入函数获取当前页面数据
            let sbdjsmsg1 = {type: 'zinject', funcs:'JDsbd', config:{"id":sbdpageid1, skuNum:[num]}}
            let sbdpageJS = await API.sendMessage(sbdjsmsg1)
            let skuLinkList = sbdpageJS.skuLinkList;
            result['skuLinkList'].push.apply(result['skuLinkList'], skuLinkList)
            // 获取总商品数
            if(sbdpageJS.allnum != 0){
                result.shopAllNum = sbdpageJS.allnum
                if(sbdpageJS.allnum <= num){
                    break;
                }
            }else{
                break;
            }
            let sbdmsg2 = {type: 'ztab', funcs:"remove", config:{id:sbdpageid1}}
            let sbdpage2 = await API.sendMessage(sbdmsg2)
        }
        
        API.wait(1)
    }
    return result
}

// 获取页面数据
const getSkuPageData = async(pageUrl, num) => {
    // 打开商品页面
    let skumsg1 = {type: 'ztab', funcs:"add", config:{url:pageUrl, active:false}}
    let skupage1 = await API.sendMessage(skumsg1)
    // 获取页面ID
    let skupageid1 = skupage1['id']
    // 注入函数获取当前页面数据
    let skujsmsg1 = {type: 'zinject', funcs:'JDskuPage', config:{"id":skupageid1, skuNum:[num]}}
    let skupageJS = await API.sendMessage(skujsmsg1)
    // 删除页面
    let skumsg2 = {type: 'ztab', funcs:"remove", config:{id:skupageid1}}
    let skupage2 = await API.sendMessage(skumsg2)




    return skupageJS
}

const diagnosisProduct = async(num) =>{
    
    API.zcl.print('店铺诊断数量', num)
    // 店铺信息JSON
    //let shopDataobj = getShopData();
    // 获取搜本店链接
    //let sbdUrl = API.zjn.get(shopDataobj, '搜本店链接')

    console.log(chrome)
    // 遍历搜本店页面,获取所有商品链接
    /* let sbdData = await getSbdData(num)
    
    for(let i =0; i < num; i++){
        let skuUrl = sbdData.skuLinkList[i];
        let pageData = await getSkuPageData(skuUrl, i)
        API.zcl.print("pageData", pageData)
    } */

    // 有的详情图在页面解析不出来
    //detail_picture_json_url = "https://cd.jd.com/description/channel?skuId=" + str(skuId) + "&mainSkuId=" + str(main_skuId) + "&charset=utf-8"

    let durl = "https://cd.jd.com/description/channel?skuId=100022199561&mainSkuId=100022199561&charset=utf-8"
    
    let msg = {
        type: 'myfetch',
         
        config: { 
            method: 'GET',
            responseType: 'GBKJSON', 
            headers: {
                'Content-Type': 'application/json'
            },
            url: durl
        }
    }

    let jsondata = await API.sendMessage(msg)
    jsondata = parseJSON(jsondata)
    if(jsondata.content != undefined){
        let regs = jsondata.content.match(/\/\/.*?avif/g)
        
    }
    //API.zcl.print("jsondata", jsondata.content)
    let regs = jsondata.content.match(/\/\/.*?avif/g)
    API.zcl.print("regs", regs)
    //image:url(//img30.360buyimg.com/sku/jfs/t1/179809/2/24201/457118/628f5da4E9bfed653/d0b654a6dab9d2ca.jpg.avif);

    
}


export {getSkuId, getVideoTitle, diagnosisProduct}
