import { parseJSON } from 'jquery';
import {getSkuId} from './JDDetailData.js'

// 获取PC端主图链接
const getJDPCMainPics = () => {
    //document.getElementById('spec-list').getElementsByTagName('img')[0].currentSrc
    let result = new Array()
    if(document.getElementById('spec-list') != null){
        let mainImgEles = document.getElementById('spec-list').getElementsByTagName('img');
        if(mainImgEles.length > 0){
            for(let i = 0; i < mainImgEles.length; i++){
                let mainImgUrl = mainImgEles[i].currentSrc;
                let urlregs = mainImgUrl.match(/.com\/.*?jfs/)
                if(urlregs != null){
                    mainImgUrl = mainImgUrl.replace(urlregs[0], '.com/n1/jfs')
                    mainImgUrl = mainImgUrl.replace('.avif', '')
                }
                result.push(mainImgUrl)
            }
        }
    }
    return result
}

// 下载PC端主图
const dwdJDPCMainPics = () => {
    let result = new Array()
    let mainList = getJDPCMainPics();
    for(let i = 0; i < mainList.length; i++){
        let imgUrl = mainList[i];
        let imgName = "主图" + i
        result.push({"url":imgUrl, "name":imgName})
    }
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '电脑端-' + skd + '图片主图下载'
    API.zzip.zipImage(result, filename)
}


// 获取PC端SKU图
const getJDPCSkuPics = () => {
    // sku图 ： document.getElementById('choose-attr-1').getElementsByTagName('a')[0].getElementsByTagName('img')[0].currentSrc
    let result = new Array();
    if(document.getElementById('choose-attr-1') != null){
        if(document.getElementById('choose-attr-1').getElementsByTagName('a').length > 0){
            let skuList = document.getElementById('choose-attr-1').getElementsByTagName('a');
            for(let i = 0; i< skuList.length; i++){
                let skuData = skuList[i];
                // 获取sku图链接
                let skuUrl = undefined;
                if(skuData.getElementsByTagName('img').length > 0){
                    skuUrl = skuData.getElementsByTagName('img')[0].currentSrc;
                    let urlregs = skuUrl.match(/.com\/.*?jfs/)
                    if(urlregs != null){
                        skuUrl = skuUrl.replace(urlregs[0], '.com/n1/jfs')
                        skuUrl = skuUrl.replace('.avif', '')
                    }
                }
                result.push(skuUrl)
            }
        }
    }
    return result
}

// 获取PC端SKU图以及SKU名称
const getJDPCSkuPicNames = () => {
    // sku图 ： document.getElementById('choose-attr-1').getElementsByTagName('a')[0].getElementsByTagName('img')[0].currentSrc
    // sku名称 ： document.getElementById('choose-attr-1').getElementsByTagName('a')[0].getElementsByTagName('i')[0].innerText
    let result = new Array();
    if(document.getElementById('choose-attr-1') != null){
        if(document.getElementById('choose-attr-1').getElementsByTagName('a').length > 0){
            let skuList = document.getElementById('choose-attr-1').getElementsByTagName('a');
            for(let i = 0; i< skuList.length; i++){
                let skuData = skuList[i];
                // 获取sku图链接
                let skuUrl = undefined;
                if(skuData.getElementsByTagName('img').length > 0){
                    skuUrl = skuData.getElementsByTagName('img')[0].currentSrc;
                    let urlregs = skuUrl.match(/.com\/.*?jfs/)
                    if(urlregs != null){
                        skuUrl = skuUrl.replace(urlregs[0], '.com/n1/jfs')
                        skuUrl = skuUrl.replace('.avif', '')
                    }
                }
                // 获取sku名称
                let skuName = "SKU图" + i.toString();
                if(skuData.getElementsByTagName('i').length > 0){
                    skuName = "SKU图-" + skuData.getElementsByTagName('i')[0].innerText;
                }
                result.push({"url" : skuUrl, "name" : skuName})
            }
        }
    }
    return result
}

// 下载PC端SKU图
const dwdJDPCSkuPics = () => {
    let result = getJDPCSkuPicNames();
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '电脑端-' + skd + '图片SKU图下载'
    API.zzip.zipImage(result, filename)
}


// 获取PC端详情图
const getJDPCDtlPics = async() => {

    let result = new Array();

    // 获取skuID
    let skuId = undefined;
    let skuUrl = window.location.href;
    let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
    if(skuUrlregs != null){
        skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
    }

    // 获取mainSkuId
    let mainSkuId = undefined;
    let regsmain = document.getElementsByTagName('html')[0].innerHTML.match(/mainSkuId:.*?(\d+)/);
    if(regsmain != null){
        mainSkuId = regsmain[1];
    }

    // 获取详情图JSON链接 
    let dtlUrl = "https://cd.jd.com/description/channel?skuId=" + skuId + "&mainSkuId=" + mainSkuId + "&charset=utf-8";
    
    let msg = {
        type: 'myfetch',
         
        config: { 
            method: 'GET',
            responseType: 'GBKJSON', 
            headers: {
                'Content-Type': 'application/json'
            },
            url: dtlUrl
        }
    }

    let contents = await API.sendMessage(msg)
    var img = contents.match(/(http:\/\/\S+.avif)/ig);
    if(img == null){
        img = contents.match(/(https:\/\/\S+.avif)/ig);

    }
    if(img == null){
        img = contents.match(/(image:url\(\/\/\S+.avif)/ig);
    }
    let img_list = new Array()
    for(var i = 0; i < img.length; i++){
        if(img[i].indexOf('.jpg') > -1 || img[i].indexOf('png') > -1 || img[i].indexOf('gif') > -1){
            let img_url = img[i].match('.+\\.(jpg|png|gif)')[0]
            img_url = img_url.replace('image:url(', 'https:');
            img_url = img_url.replace('http:', 'https:');
            img_url = img_url.replace('.avif', '');
            img_list.push(img_url);
        }
    }
    result = img_list
    return result
}

// 下载PC端详情图
const dwdJDPCDtlPics = async() => {
    let result = new Array()
    let mainList = await getJDPCDtlPics();
    for(let i = 0; i < mainList.length; i++){
        let imgUrl = mainList[i];
        let imgName = "详情图" + i
        result.push({"url":imgUrl, "name":imgName})
    }
    console.log(result)
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '电脑端-' + skd + '图片详情图下载'
    API.zzip.zipImage(result, filename)
}


// 获取PC端全部下载
const getJDPCallPics = async() => {
    let allPics = new Array();

    // 获取主图
    let mainList = getJDPCMainPics();
    if(mainList.length > 0){
        for(let i = 0; i < mainList.length; i++){
            let mainUrl = mainList[i];
            let mainName = "主图" + i.toString();
            allPics.push({"url":mainUrl, "name":mainName})
        }
    }

    // 获取SKU图
    let skuList = getJDPCSkuPicNames();
    allPics = allPics.concat(skuList);

    // 获取详情图
    let dtlList = await getJDPCDtlPics();
    if(dtlList.length > 0){
        for(let i = 0; i < dtlList.length; i++){
            let dtlUrl = dtlList[i];
            let dtlName = "详情图" + i.toString();
            allPics.push({"url":dtlUrl, "name":dtlName})
        }
    }
    
    return allPics
}

// 获取PC端全部下载带文件夹
const getJDPCallPicsDir = async() => {
    let allPics = new Array();

    // 获取主图
    let mainList = getJDPCMainPics();
    if(mainList.length > 0){
        for(let i = 0; i < mainList.length; i++){
            let mainUrl = mainList[i];
            let mainName = "主图" + i.toString();
            allPics.push({"url":mainUrl, "name":mainName, "folder":"主图"})
        }
    }

    // 获取SKU图
    let skuList = getJDPCSkuPics();
    if(skuList.length > 0){
        for(let i = 0; i < skuList.length; i++){
            let skuUrl = skuList[i];
            let skuName = "SKU图" + i.toString();
            allPics.push({"url":skuUrl, "name":skuName, "folder":"SKU图"})
        }
    }

    // 获取详情图
    let dtlList = await getJDPCDtlPics();
    if(dtlList.length > 0){
        for(let i = 0; i < dtlList.length; i++){
            let dtlUrl = dtlList[i];
            let dtlName = "详情图" + i.toString();
            allPics.push({"url":dtlUrl, "name":dtlName, "folder":"详情图"})
        }
    }
    
    return allPics
}

// 下载PC端全部下载
const dwdJDPCallPics = async() => {
    let result = await getJDPCallPics();
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '电脑端-' + skd + '图片全部图片下载'
    API.zzip.zipImage(result, filename)
}

// 下载PC端全部下载带文件夹
const dwdJDPCallPicsDir = async() => {
    let result = await getJDPCallPicsDir();
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '电脑端-' + skd + '图片全部图片（带文件夹）下载'
    API.zzip.zipImageDir(result, filename)
}



// 获取移动端主图
const getJDYDMainPics = async() => {

    let mainImgList = new Array()

    // 获取skuID
    let skuId = undefined;
    let skuUrl = window.location.href;
    let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
    if(skuUrlregs != null){
        skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
    }

    let url = "https://item.m.jd.com/product/" + skuId + ".html"
    let msg = {
        type: 'myfetch',
        config: { 
            method: 'GET',
            responseType: 'TEXT',
            url: url
        }
    }

    let contents = await API.sendMessage(msg)
    //console.log(contents)
    let regs = contents.match(/\"image\":\[.*?(\S+)\],\"shopInfo\"/)
    if(regs!=null){
        let imgstrall = regs[1].replace(/"/g,'').split(',');
        //https://m.360buyimg.com/mobilecms/jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg
        if(imgstrall instanceof Array){
            for(var i = 0; i<imgstrall.length; i++){
                let imgUrl = "https://m.360buyimg.com/mobilecms/" + imgstrall[i];
                mainImgList.push(imgUrl)
            }
        }
    }
    //console.log("--- js List ---", mainImgList)
    return mainImgList;
}

// 下载移动端主图
const dwdJDYDMainPics = async() => {
    let result = new Array()
    let mainList = await getJDYDMainPics();
    for(let i = 0; i < mainList.length; i++){
        let imgUrl = mainList[i];
        let imgName = "主图" + i
        result.push({"url":imgUrl, "name":imgName})
    }
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '移动端-' + skd + '图片主图下载'
    API.zzip.zipImage(result, filename)
}


// 获取移动端SKU图
const getJDYDskuPics = async() => {

    let skuImgList = new Array()

    // 获取skuID
    let skuId = undefined;
    let skuUrl = window.location.href;
    let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
    if(skuUrlregs != null){
        skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
    }

    let url = "https://item.m.jd.com/product/" + skuId + ".html"

    let msg = {
        type: 'myfetch',
        config: { 
            method: 'GET',
            responseType: 'TEXT',
            url: url
        }
    }

    let contents = await API.sendMessage(msg)
    let regs = contents.match(/\"newColorSize\":\[(.*?)\],\"errCode\"/)
    if(regs!=null){
        let imgobjall = regs[1].split('},');
        if(imgobjall instanceof Array){
            for(var i=0; i< imgobjall.length; i++){
                let objstr = imgobjall[i];
                if(objstr.indexOf('}') == -1){
                    objstr = objstr + '}';
                    let objjson = parseJSON(objstr);
                    //console.log(objjson)
                    if(objjson.imagePath != undefined){
                        let imgUrl = "https://m.360buyimg.com/mobilecms/" + objjson.imagePath;
                        let skuname = objjson['1'];
                        let type = objjson['2'];
                        let type2 = objjson['3'].replace(/[^\u4e00-\u9fa5^a-zA-Z^\d\[\]]\【\】]/gi, "_");
                        let skuNameAll = skuname + '_' + type + '_' + type2;
                        //https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg!q80.dpg
                        let img_obj = {
                            "url": imgUrl,
                            "name": skuNameAll
                        }
                        skuImgList.push(img_obj);
                    }
                }
            }
        }
    }
    return skuImgList;
}

// 下载移动端SKU图
const dwdJDYDskuPics = async() => {
    let result = await getJDYDskuPics();
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '移动端-' + skd + '图片SKU图下载'
    API.zzip.zipImage(result, filename)
}


// 获取移动端详情图
const getJDYDdtlPics = async() => {

    let dtlImgList = new Array()

    // 获取skuID
    let skuId = undefined;
    let skuUrl = window.location.href;
    let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
    if(skuUrlregs != null){
        skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
    }

    let url = 'https://api.m.jd.com/ware/detail/getIntroduceInfo?appid=m_core&functionId=item_intruduce_info&body={"par":"' + skuId + '_d' + skuId + '_normal"}'
    
    await fetch(url).then((res) => {
        return res.text()
    }).then((res1) => {
        
        let res2 = res1.replace(/\\"/g,'')
        //console.log(res2)
        let regs = res2.match(/http.*?jpg/gi)
        if(regs != null){
            for(var i=0;i<regs.length; i++){
                let imgstr = regs[i].replace('.avif',"");
                dtlImgList.push(imgstr);
            }
        }
        let regs2 = res2.match(/http.*?png/gi)
        if(regs2 != null){
            for(var i=0;i<regs2.length; i++){
                let imgstr = regs2[i].replace('.avif',"");
                dtlImgList.push(imgstr);
            }
        }
        let regs3 = res2.match(/http.*?gif/gi)
        if(regs3 != null){
            for(var i=0;i<regs3.length; i++){
                let imgstr = regs3[i].replace('.avif',"");
                dtlImgList.push(imgstr);
            }
        }

        let regs4 = res1.match(/sku\/jfs(.*?)jpg/g) 
        if(regs4 != null){
            for(let k =0; k< regs4.length; k++){
                dtlImgList.push('https://m.360buyimg.com/' + regs4[k])
            } 
        }
        let regs5 = res1.match(/sku\/jfs(.*?)png/g) 
        if(regs5 != null){
            for(let k =0; k< regs5.length; k++){
                dtlImgList.push('https://m.360buyimg.com/' + regs5[k])
            } 
        }
        let regs6 = res1.match(/sku\/jfs(.*?)gif/g) 
        if(regs6 != null){
            for(let k =0; k< regs6.length; k++){
                dtlImgList.push('https://m.360buyimg.com/' + regs6[k])
            } 
        }
        
    });
    return dtlImgList;
}

// 下载移动端详情图
const dwdJDYDdtlPics = async() => {
    let result = new Array()
    let mainList = await getJDYDdtlPics();
    for(let i = 0; i < mainList.length; i++){
        let imgUrl = mainList[i];
        let imgName = "详情图" + i
        result.push({"url":imgUrl, "name":imgName})
    }
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '移动端-' + skd + '图片详情图下载'
    API.zzip.zipImage(result, filename)
}

// 获取移动端全部下载
const getJDYDallPics = async() => {
    let allPics = new Array();

    // 获取主图
    let mainList = await getJDYDMainPics();
    if(mainList.length > 0){
        for(let i = 0; i < mainList.length; i++){
            let mainUrl = mainList[i];
            let mainName = "主图" + i.toString();
            allPics.push({"url":mainUrl, "name":mainName})
        }
    }

    // 获取sku图
    let skuList = await getJDYDskuPics();
    allPics = allPics.concat(skuList);

    // 获取详情图
    let dtlList = await getJDYDdtlPics();
    if(dtlList.length > 0){
        for(let i = 0; i < dtlList.length; i++){
            let dtlUrl = dtlList[i];
            let dtlName = "详情图" + i.toString();
            allPics.push({"url":dtlUrl, "name":dtlName})
        }
    }
    return allPics
}

// 获取移动端全部下载（带文件夹）
const getJDYDallPicsDir = async() => {
    let allPics = new Array();

    // 获取主图
    let mainList = await getJDYDMainPics();
    if(mainList.length > 0){
        for(let i = 0; i < mainList.length; i++){
            let mainUrl = mainList[i];
            let mainName = "主图" + i.toString();
            allPics.push({"url":mainUrl, "name":mainName, "folder":"主图"})
        }
    }

    // 获取sku图
    let skuList = await getJDYDskuPics();
    for(let i = 0; i< skuList.length; i++){
        let skudata = skuList[i];
        skudata['folder'] = 'SKU图'
        allPics.push(skudata)
    }

    // 获取详情图
    let dtlList = await getJDYDdtlPics();
    if(dtlList.length > 0){
        for(let i = 0; i < dtlList.length; i++){
            let dtlUrl = dtlList[i];
            let dtlName = "详情图" + i.toString();
            allPics.push({"url":dtlUrl, "name":dtlName, "folder":"详情图"})
        }
    }
    return allPics
}

// 下载移动端全部图片下载
const dwdJDYDallPics = async() => {
    let result = await getJDYDallPics();
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '移动端-' + skd + '图片全部图片下载'
    API.zzip.zipImage(result, filename)
}

// 下载移动端全部图片下载(带文件夹)
const dwdJDYDallPicsDir = async() => {
    let result = await getJDYDallPicsDir();
    let timenum = API.ztime.ymd2()
    let skd = getSkuId(window.location.href)
    let filename = timenum + '移动端-' + skd + '图片全部图片（带文件夹）下载'
    API.zzip.zipImageDir(result, filename)
}


export {
    dwdJDPCMainPics, dwdJDPCSkuPics, dwdJDPCDtlPics, dwdJDPCallPics, dwdJDPCallPicsDir, dwdJDYDMainPics, dwdJDYDskuPics, dwdJDYDdtlPics, dwdJDYDallPics,dwdJDYDallPicsDir,
    getJDPCMainPics, getJDPCSkuPics, getJDPCSkuPicNames, getJDPCDtlPics, getJDYDMainPics, getJDYDskuPics, getJDYDdtlPics, getJDPCallPics, getJDYDallPics
}