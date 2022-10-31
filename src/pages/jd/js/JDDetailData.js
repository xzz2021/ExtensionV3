

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
    if (id1 != undefined && id2 != undefined && id3 != undefined){
        let url = "https://mall.jd.com/advance_search-" + id1 + "-" + id2 + "-" + id3 + "-5-0-0-1-1-60.html?other=&isRedisstore=0";
        return url;
    }else{
        return undefined;
    }
}

/* --- 搜本店链接构造 end --- */

/* let typeId = getTypeId()
let venderId = getVenderId()
let shopId = getShopId()
let shopSbdUrl = compareSbdUrl(typeId, venderId, shopId) */

export {getSkuId, getVideoTitle}
