import { SelectProps } from 'element-plus/es/components/select-v2/src/defaults'

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
const compareSbdUrl = (id1, id2, id3) => {
    //https://mall.jd.com/advance_search-2277560-12030855-11748521-5-0-0-1-1-60.html?other=&isRedisstore=0
    /* API.zcl.printList(
        ['typeId', 'venderId', 'shopId'],
        [id1, id2, id3]
    ) */
    if (id1 != undefined && id2 != undefined && id3 != undefined){
        let url = "https://mall.jd.com/advance_search-" + id1 + "-" + id2 + "-" + id3 + "-5-0-0-1-1-60.html?other=&isRedisstore=0";
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
    let shopSbdUrl = compareSbdUrl(typeId, venderId, shopId)

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

const diagnosisProduct = async(num) =>{
    
    API.zcl.print('店铺诊断数量', num)
    // 店铺信息JSON
    //let shopDataobj = getShopData();
    // 获取搜本店链接
    //let sbdUrl = API.zjn.get(shopDataobj, '搜本店链接')
    //API.zcl.print('搜本店链接', sbdUrl)

    console.log(chrome)

    let msg = {type: 'ztab', funcs:"add", config:{url:'https://mall.jd.com/advance_search-431163-1000004065-1000004065-5-0-0-1-1-60.html?other=&isRedisstore=0', active:false}}
    let t1 = await API.sendMessage(msg)
    let tid = t1['id']
    let msg1 = {type: 'zinject', funcs:'addfuncs', config:{"id":tid}}
    let t2 = await API.sendMessage(msg1)
    API.zcl.print('inject code', t2)

    
}


export {getSkuId, getVideoTitle, diagnosisProduct}
