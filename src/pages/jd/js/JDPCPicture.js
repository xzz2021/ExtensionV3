import JSZip from 'jszip';
import {saveAs} from 'file-saver';
import { parseJSON } from 'jquery';

/* --- 移动端图片下载 start */
// 移动端主图下载
const getMainImgPhone = async (skuId) => {
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
    let mainImgList = new Array()
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

// 移动端SKu图下载
const getSkuImgPhone = async (skuId) => {
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
    let skuImgList = new Array()
    let regs = contents.match(/\"newColorSize\":\[(\S+)\],\"errCode\"/)
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
                            "text": skuNameAll
                        }
                        skuImgList.push(img_obj);
                    }
                }
            }
        }
    }
    return skuImgList;
}

// 移动端详情图下载
const getDtlImgPhone = async (skuId) => {
    let url = 'https://api.m.jd.com/ware/detail/getIntroduceInfo?appid=m_core&functionId=item_intruduce_info&body={"par":"' + skuId + '_d' + skuId + '_normal"}'
    let dtlImgList = new Array()
    await fetch(url).then((res) => {
        return res.text()
    }).then((res1) => {
        //console.log(res1)
        let res2 = res1.replace(/\\"/g,'')
        //console.log(res2)
        let regs = res2.match(/<img src=.*?(\S+) alt=>/gi)
        //console.log(regs)
        if(regs !=null){
            
            if(regs instanceof Array){
                for(var i=0;i<regs.length; i++){
                    let imgstr = regs[i].replace('<img src=',"");
                    let imgUrl = imgstr.replace(' alt=>',"");
                    dtlImgList.push(imgUrl);
                }
            }
        }else{
            let regs = res2.match(/<img src=.*?(\S+)>/gi)
            if(regs instanceof Array){
                for(var i=0;i<regs.length; i++){
                    let imgstr = regs[i].replace('<img src=',"");
                    let imgUrl = imgstr.replace('/>',"");
                    imgUrl = imgUrl.split(' ')[0]
                    //console.log(imgUrl)
                    dtlImgList.push(imgUrl);
                }
            }
        }
        
    });
    return dtlImgList;
}



// 移动端全部下载
const getAllImgPhone = async (skuId) => {
    // 主图
    let mains = await getMainImgPhone(skuId);
    // sku图
    let skus = await getSkuImgPhone(skuId);
    // 详情图
    let dtls = await getDtlImgPhone(skuId);

    // 全部
    let pic_all = new Array()

    for (var i = 0; i < mains.length; i++){
        let ts = "主图_" + i
        let pic_obj = {
            "url": mains[i],
            "text": ts
        }
        pic_all.push(pic_obj)
    }

    for (var i = 0; i < skus.length; i++){
        pic_all.push(skus[i])
    }

    for (var i = 0; i < dtls.length; i++){
        let ts = "详情图_" + i
        let pic_obj = {
            "url": dtls[i],
            "text": ts
        }
        pic_all.push(pic_obj)
    }
    return pic_all;

}

/* --- 移动端图片下载 end */



/* --- PC端图片下载 start ---- */


// 获取主图链接-PC
const getMainImg = () => {
    let main_img_list = new Array();
    let main_tag_list = $('#spec-list ul li img');
    for (var i = 0; i < main_tag_list.length; i++){
        let img_url = main_tag_list[i].src;
        img_url = img_url.replace('n5/s54x54_jfs', 'n1/jfs');
        img_url = img_url.match('.+\\.(jpg|png)')[0]
        img_url = img_url.replace('http:', 'https:')
        if(img_url.indexOf('png') > -1 || img_url.indexOf('jpg') > -1){
            main_img_list.push(img_url);
        }
    }
    return main_img_list.length > 0 ? main_img_list : undefined;
}

// 获取SKU图链接-PC
const getSkuImg = () => {
    let sku_list = new Array();
    let sku_tag_img_list = $('#choose-attrs div div div a img');
    let sku_tag_text_list = $('#choose-attrs div div div a i');
    for (var i = 0; i < sku_tag_img_list.length; i++){
        let img_url = sku_tag_img_list[i].src;
        let img_text = sku_tag_img_list[i].alt;
        img_url = img_url.replace('n9/s40x40_jfs', 'n1/jfs');
        img_url = img_url.match('.+\\.(jpg|png)')[0]
        img_url = img_url.replace('http:', 'https:')
        if(img_url.indexOf('png') > -1 || img_url.indexOf('jpg') > -1){
            let img_obj = {
                "url": img_url,
                "text": img_text
            }
            sku_list.push(img_obj);
        }
    }
    return sku_list.length > 0 ? sku_list : undefined;
}

// 获取详情图-PC 

// 获取mainSkuId
const getmainSkuId = () => {
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('mainSkuId:') > -1){
            let regs = script_text.match(/mainSkuId:.*?(\d+)/);
            let id = regs.length >= 2 ? regs[1] : undefined; 
            return id;
        }
    }
};

// 构造详情图JSON链接
const compareDtlImgUrl = (id1, id2) => {
    //id1 是skuId， id2是mainskuId
    //https://cd.jd.com/description/channel?skuId=10042581919640&mainSkuId=10021908239582&charset=utf-8
    if (id1 != undefined && id2 != undefined){
        let url = "https://cd.jd.com/description/channel?skuId=" + id1 + "&mainSkuId=" + id2 + "&charset=utf-8"
        return url;
    }else{
        return undefined;
    }
}

// skuId获取
const getSkuId = (url) => {
    let regs = url.match(/item.jd.com.*?(\d+)/);
    let id = regs.length >= 2 ? regs[1] : undefined;
    return id;
};

// 下载PC端详情图
const downloadDtlImg = async (skuIdt) => {
    let skuUrl = window.location.href;
    let mainSkuId = getmainSkuId();
    let skuId = getSkuId(skuUrl);
    let dtl_url = compareDtlImgUrl(skuId, mainSkuId);
    let msg = {
        type: 'myfetch',
         
        config: { 
            method: 'GET',
            responseType: 'GBKJSON', 
            headers: {
                'Content-Type': 'application/json'
            },
            url: dtl_url
        }
    }

    let contents = await API.sendMessage(msg)
    //let contents = response.body.content;
    var img = contents.match(/(http:\/\/\S+.avif)/ig);
    if(img == null){
        img = contents.match(/(https:\/\/\S+.avif)/ig);

    }
    if(img == null){
        img = contents.match(/(image:url\(\/\/\S+.avif)/ig);
    }
    let img_list = new Array()
    for(var i = 0; i < img.length; i++){
        if(img[i].indexOf('.jpg') > -1 || img[i].indexOf('png') > -1){
            let img_url = img[i].match('.+\\.(jpg|png)')[0]
            img_url = img_url.replace('image:url(', 'https:');
            img_url = img_url.replace('http:', 'https:');
            img_list.push(img_url);
        }
    }
    img_list.length > 0 ? img_list : undefined;
    if(img_list != undefined && img_list.length > 0){
        let timenum = API.ztime.ymd2()
        let filename = timenum + '电脑端-' + skuIdt + '图片详情图下载'
        packageImages(img_list, "详情图", filename);
    }
}

// 下载全部图片-PC

const downloadAllImg1 = async () => {

    // 主图
    let mains = getMainImg()
    // sku图
    let skus = getSkuImg()

    // 全部
    let pic_all = new Array()
    for (var i = 0; i < mains.length; i++){
        let ts = "主图_" + i
        let pic_obj = {
            "url": mains[i],
            "text": ts
        }
        pic_all.push(pic_obj)
    }
    for (var i = 0; i < skus.length; i++){
        pic_all.push(skus[i])
    }


    // 详情图
    let skuUrl = window.location.href;
    let mainSkuId = getmainSkuId();
    let skuId = getSkuId(skuUrl);
    let dtl_url = compareDtlImgUrl(skuId, mainSkuId);
    let msg = {
        type: 'myfetch',
         
        config: { 
            method: 'GET',
            responseType: 'GBKJSON', 
            headers: {
                'Content-Type': 'application/json'
            },
            url: dtl_url
        }
    }
    let contents = await API.sendMessage(msg)
    //let contents = response.body.content;
    var img = contents.match(/(http:\/\/\S+.avif)/ig);
    if(img == null){
        img = contents.match(/(https:\/\/\S+.avif)/ig);
    }
    if(img == null){
        img = contents.match(/(image:url\(\/\/\S+.avif)/ig);
    }
    let img_list = new Array()
    for(var i = 0; i < img.length; i++){
        if(img[i].indexOf('.jpg') > -1 || img[i].indexOf('png') > -1){
            let img_url = img[i].match('.+\\.(jpg|png)')[0]
            img_url = img_url.replace('image:url(', 'https:');
            img_url = img_url.replace('http:', 'https:');
            img_list.push(img_url);
        }
    }
    img_list.length > 0 ? img_list : undefined;
    if(img_list != undefined && img_list.length > 0){
        for (var i = 0; i < img_list.length; i++){
            let ts = "详情图_" + i
            let pic_obj = {
                "url": img_list[i],
                "text": ts
            }
            pic_all.push(pic_obj)
        }
    }
    return pic_all
}

const downloadAllImg = async (skuId) => {
    let picAll = await downloadAllImg1()
    let timenum = API.ztime.ymd2()
    let filename = timenum + '电脑端-' + skuId + '图片全部下载'
    packageSkuImages(picAll, filename);
}

/* --- PC端图片下载 end ---- */


/* --- 图片打包下载，传入图片链接数组, 图片名称， 打包名称 start --- */

// 单张图片下载功能
function downloadIamge(imgsrc, name) {//下载图片地址和图片名
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var a = document.createElement("a"); // 生成一个a元素
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        a.download = name + '.png' || "photo.png"; // 设置图片名称
        if(imgsrc.indexOf('png') > -1){
            url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
            a.download = name + '.png' || "photo.png"; // 设置图片名称
        }
        if(imgsrc.indexOf('jpg') > -1){
            url = canvas.toDataURL("image/jpeg"); //得到图片的base64编码数据
            a.download = name + '.jpg' || "photo.jpg"; // 设置图片名称
        }
        var event = new MouseEvent("click"); // 创建一个单击事件
        
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
}

function packageImages(imgsSrc, imgName, zipName) {

    var imgBase64 = [] //base64图片
    var imageSuffix = [] //图片后缀
    var zip = new JSZip()
    //var img = zip.folder(zipName)
 
    for (var i = 0; i < imgsSrc.length; i++) {
        var suffix = imgsSrc[i].substring(imgsSrc[i].lastIndexOf('.'))
        imageSuffix.push(suffix)
 
        getBase64(imgsSrc[i], function (base64) {
            imgBase64.push(base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
            if (imgsSrc.length == imgBase64.length) {
                for (var i = 0; i < imgsSrc.length; i++) {
                    // 文件名  数据

                    let imgNames =  imgName + "_" + i
                    //img.file(imgNames + imageSuffix[i], imgBase64[i], {
                    /* zip.folder("详情图").file(imgNames + imageSuffix[i], imgBase64[i], {
                        base64: true,
                    }) */

                    zip.file(imgNames + imageSuffix[i], imgBase64[i], {
                        base64: true,
                    })

                }
                zip.generateAsync({
                    type: 'blob'
                }).then(function (content) {
                    // see FileSaver.js
                    let zipNames = zipName + '.zip'
                    saveAs(content, zipNames)
                })
            }
        })
    }
}

function packageSkuImages(imgsSrc, zipName) {

    var imgBase64 = [] //base64图片
    var imageSuffix = [] //图片后缀
    var zip = new JSZip()
    //var img = zip.folder(zipName)
 
    for (var i = 0; i < imgsSrc.length; i++) {
        var suffix = imgsSrc[i]['url'].substring(imgsSrc[i]['url'].lastIndexOf('.'))
        imageSuffix.push(suffix)
        
        getBase64(imgsSrc[i]['url'], function (base64) {
            imgBase64.push(base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
            if (imgsSrc.length == imgBase64.length) {
                for (var i = 0; i < imgsSrc.length; i++) {
                    // 文件名  数据
                    let imgNames = imgsSrc[i]['text']
                    //console.log(imgsSrc[i]['text'], imgsSrc[i]['url'])
                    //img.file(imgNames + imageSuffix[i], imgBase64[i], {
                    zip.file(imgNames + imageSuffix[i], imgBase64[i], {
                        base64: true,
                    })
                }
                zip.generateAsync({
                    type: 'blob'
                }).then(function (content) {
                    // see FileSaver.js
                    let zipNames = zipName + '.zip'
                    saveAs(content, zipNames)
                })
            }
        })
    }
}

function getBase64(img, callback) {
    fetch(img).then(
        res => res.blob())
        .then(res => {
            let fr = new FileReader();//https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
            fr.onload = function (e) {
                callback(e.target.result)
            };
            fr.onerror = function () {
                console.log('读取错误！')
            };
            fr.readAsDataURL(res);//如果是转文字，第二个参数可以使用编码
        })
}

/* --- 图片打包下载，传入图片链接数组, 图片名称， 打包名称 end--- */


export { getMainImg, getSkuImg, packageImages, packageSkuImages, downloadDtlImg, downloadAllImg, getMainImgPhone, getSkuImgPhone, getDtlImgPhone, getAllImgPhone }