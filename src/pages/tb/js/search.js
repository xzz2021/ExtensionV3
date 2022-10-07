
import md5 from 'blueimp-md5'

// API  'https://cdn-watchcat.s.taobao.com/watchcat-z-66/bd31abbcae62c3147d673b2ef09e1583.json'

//天猫  https://detail.tmall.com/item.htm?id=654587687359
//天猫  https://detail.tmall.com/item.htm?id=654587687359&ali_refid=a3_430585_1006:1224510174:N:nrFY4XWUtZ5nELwjyJKUOQ==:1ce0c0e8d729aaa5b037c612217823b6&ali_trackid=1_1ce0c0e8d729aaa5b037c612217823b6&spm=a230r.1.14.11&sku_properties=149128818:12217299

//淘宝  https://item.taobao.com/item.htm?id=625102654918
//淘宝  https://item.taobao.com/item.htm?id=625102654918&ali_refid=a3_430673_1006:1121267516:N:emtiAWsF8%2Bzhhxaiwzc0Aw%3D%3D:3ccd3187faafe67158d5031d2db2315e&ali_trackid=1_3ccd3187faafe67158d5031d2db2315e&spm=a2e0b.20350158.31919782.1


// 关键词
let search_Key = ""
// 加密词
let search_SecKey = "66_15.0"
// 页码
let search_Page = "1"

// 获取传入的宝贝ID或者链接情况
function changeInputData(data){
    let data1 = data.toString()
    let typeFlag = 'ID';
    // 判断是ID或者链接
    if(data1.indexOf('.com') > -1){
        // 是链接
        typeFlag = 'Link';
    }else{
        // 是ID
        typeFlag = 'ID';
    }
    
    let data_id = '';
    let data_url = '';
    if(typeFlag == 'ID'){
        data_id = data1;
        data_url = 'https://item.taobao.com/item.htm?id=' + data1;
    }else{
        data_url = data1;
        let regs = data1.match(/id=.*?(\d+)/)
        if(regs != null){
            data_id = regs[1]
        }
    }
    let result = {
        'id':data_id,
        'url':data_url
    }
    return result
}


// 访问页面获取宝贝信息
const getMessage = async (data) => {

    let data_message = changeInputData(data);

    let url = data_message['url']
    let id = data_message['id']
    //console.log("------ url -----" + url)
    //console.log("------ id  -----" + id)

    let msg = {
        type: 'myfetch', 
        config: { 
            method: 'GET',
            headers: { 
                'Content-Type':'text/plain; charset=utf-8' 
            },
            responseType: 'GBKHTML', 
            url: url
        }
    }

    let htmlres = await API.sendMessage(msg)
    //console.log('----- my fetch data ---- ', htmlres)

    let title = '';
    let reg1 = htmlres.match(/<h3 class=\"tb-main-title\" data-title=\"(\S*)\">/);
    if(reg1 != null){
        title = reg1[1];
    }
    //console.log("----reg1 ---- " + title)

    let img_url = '';
    let reg2 = htmlres.match(/<img id=\"J_ImgBooth\" src=\"(\S*).jpg_/);
    if(reg2 != null){
        img_url = reg2[1];
        img_url = 'http:' + img_url + '.jpg'
    }

    //console.log("----reg2 ---- " + img_url)

    let user_data = {
        "url": url,
        "title": title,
        "img":img_url
    }

    //console.log("wsasd",user_data)
    return user_data



    /*<h3 class="tb-main-title" data-title="炸街御姐西装套装女秋季新款2022高端女神范休闲气质时尚职业西服">
            炸街御姐西装套装女秋季新款2022高端女神范休闲气质时尚职业西服
        </h3>
    
        <div class="tb-booth tb-pic tb-main-pic">
            <a href="//www.taobao.com/view_image.php?pic=HEYVDl9CEghRV1dcWwocCUQFGxVdQUZBVRdaW11bXFlBVg4AAgpERjxVKCJGQ1NDe1VEaAIOGR0xKwMTV3MLbVRIQlNeXkREDAgKAhpSQw4=&title=1ai91tP5vePO99ewzNfXsMWux%2B%2B8vtDCv%2B4yMDIyuN%2B2y8WuyfG3ttDdz9DG%2BNbKyrHJ0Naw0rXO97f%2B&version=2&c=MTc1MjI2NDE4MQ%3D%3D&sellerRate=68831&itemId=625102654918&fv=9&shopId=108174476" rel="nofollow" target="_blank">
                <img id="J_ImgBooth" src="//gd4.alicdn.com/imgextra/i2/1752264181/O1CN01kzIfpP1gkwZGpwoG8_!!1752264181.jpg_400x400.jpg" data-hasZoom="700" data-size="400x400"/>
            </a>
            <div class="zoom-icon hidden tb-iconfont" id="J_ZoomIcon">&#337;</div>
        </div>
        http://gd4.alicdn.com/imgextra/i2/1752264181/O1CN01kzIfpP1gkwZGpwoG8_!!1752264181.jpg_400x400.jpg
    */


}


// 设置关键词并构造手淘接口链接
const getPhoneUrl = (keyList) => {

    let jsonList = new Array()

    for(var i=0; i<keyList.length; i++){
        let keyword = keyList[i];
        search_Key = keyword;
        let urlobj = {"keyword":search_Key, "urlList":[]}
        for(var j = 0; j< 10; j++){
            search_Page = j + 1
            let secstr = search_SecKey + search_Key + search_Page;
            let hash = md5(secstr)
            // API  'https://cdn-watchcat.s.taobao.com/watchcat-z-66/bd31abbcae62c3147d673b2ef09e1583.json'
            let jsonUrl = 'https://cdn-watchcat.s.taobao.com/watchcat-z-66/' + hash + '.json';
            urlobj.urlList.push({"page":j + 1, "url":jsonUrl})
        }
        jsonList.push(urlobj)
    }
    return jsonList
}

// 查询用户商品是否在前10页关键词排名中
const checkNum = async (data, keyList) => {

    // 规范用户输入的商品信息
    let data_message = changeInputData(data);
    let url = data_message['url'];
    let id = data_message['id'];
    let result = new Array()
    
    // 获取用户输入关键词在手淘的接口
    let phoneUrlResult = getPhoneUrl(keyList);
    //console.log(phoneUrlResult)

    for(let i = 0; i< phoneUrlResult.length; i++){
        let keyword = phoneUrlResult[i].keyword;
        let locStr = "前10页未找到该宝贝";
        let jdata = {'key': keyword, "location":locStr, "others":[]}
        for(let j = 0; j< phoneUrlResult[i].urlList.length; j++){
            setTimeout(async() => {
                let jsonUrl = phoneUrlResult[i].urlList[j].url;
                let page = phoneUrlResult[i].urlList[j].page;
                let msg = {
                    type: 'myfetch', 
                    config: { 
                        method: 'GET',
                        headers: { 
                            'user-agent':'Dalvik/2.1.0 (Linux; U; Android 7.1.2; SM-G977N Build/LMY48Z)'
                        },
                        responseType: 'JSON', 
                        url: jsonUrl
                    }
                }
            
                let jsonres = await API.sendMessage(msg)
                //console.log('---time--- :', Date(), ' ---fetch data---:', jsonres)
                if(jsonres.page != undefined){
                    let itemArray = jsonres.itemsArray;
                    let jpage = jsonres.page;
                    if(jpage == page){
                        let loc = 0;
                        for(var k=0; k< itemArray.length; k++){
                            loc = loc + 1;
                            let items = itemArray[k];
                            let jid = items.item_id;
                            let otitle = items.title;
                            let price = items.price;
                            let priceRate = items.priceWithRate;
                            let shopName = items.structuredShopInfo.infoList[1].text;
                            for(var e=0; e<items.structuredShopInfo.infoList.length; e++){
                                let ht = items.structuredShopInfo.infoList[e].hiddenType;
                                if(ht=="suffix"){
                                    shopName = items.structuredShopInfo.infoList[e].text;
                                }
                            }
                            let sold = items.sold;
                            let mainImg = items.pic_path;
                            let onum = (jpage - 1)*10 + k + 1;
                            let o_obj = {"item_order":onum, "item_id":jid, "item_shop":shopName, "item_img":mainImg, "item_title":otitle, "item_price":price, "item_price_rate":priceRate,"item_month_sold":sold};
                            jdata.others.push(o_obj)
                            if(jid == id){
                                if(locStr.indexOf('位') == -1){
                                    locStr = "第" + jpage + '页 第' + loc +'位';
                                    jdata.location = locStr;
                                }
                            }
                        }
                    }
                }
            }, j*2000);
            
            
        }
        result.push(jdata)
    }
    return result
}



export {getMessage,  checkNum}