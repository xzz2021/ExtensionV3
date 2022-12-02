import JSZip from 'jszip';
import {saveAs} from 'file-saver';

// 图片文件流转码
const getBase64 = (img, callback) => {
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

/**
 * Fatosy 自定义zip类
*/
class zZip{
    constructor(){
        this.filename = ''
    }

    /**
     * 压缩包内不含文件夹
     * @param {*} 文件链接 
     * @param {*} 压缩包名字 
     */
    zipImage(imgSrc, zipName){
        /* img_list = [
            {
                "url":"https://img12.360buyimg.com/n5/s54x54_jfs/t1/218351/12/5758/322455/619f5f9eE18ffdc33/d9c303291f7ee888.jpg",
                "name":"SKU图1"
            }
        ] */
        var imgBase64 = [] //base64图片
        var imageSuffix = [] //图片后缀
        var zip = new JSZip()
        //var img = zip.folder(zipName)
    
        for (var i = 0; i < imgSrc.length; i++) {
            var suffix = imgSrc[i]['url'].substring(imgSrc[i]['url'].lastIndexOf('.'))
            imageSuffix.push(suffix)
    
            getBase64(imgSrc[i]['url'], function (base64) {
                imgBase64.push(base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
                if (imgSrc.length == imgBase64.length) {
                    for (var i2 = 0; i2 < imgSrc.length; i2++) {
                        // 文件名  数据
                        let imgNames = imgSrc[i2]['name']
                        //let imgNames =  imgName + "_" + i
                        //img.file(imgNames + imageSuffix[i], imgBase64[i], {
                        /* zip.folder("详情图").file(imgNames + imageSuffix[i], imgBase64[i], {
                            base64: true,
                        }) */
                        zip.file(imgNames + imageSuffix[i2], imgBase64[i2], {
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

    /**
     * 压缩包内含文件夹
     * @param {*} 文件资源对象 
     * @param {*} 压缩包名字 
     */
    zipImageDir(imgSrc, zipName){
        /* img_list = [
            {
                "url":"https://img12.360buyimg.com/n5/s54x54_jfs/t1/218351/12/5758/322455/619f5f9eE18ffdc33/d9c303291f7ee888.jpg",
                "name":"SKU图1",
                "folder": "SKU图"
            }
        ] */
        var imgBase64 = [] //base64图片
        var imageSuffix = [] //图片后缀
        var zip = new JSZip()
        //var img = zip.folder(zipName)
    
        for (var i = 0; i < imgSrc.length; i++) {
            var suffix = imgSrc[i]['url'].substring(imgSrc[i]['url'].lastIndexOf('.'))
            imageSuffix.push(suffix)
            
            getBase64(imgSrc[i]['url'], function (base64) {
                imgBase64.push(base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
                if (imgSrc.length == imgBase64.length) {
                    for (var i2 = 0; i2 < imgSrc.length; i2++) {
                        // 文件名  数据
                        let imgNames = imgSrc[i2]['name']
                        let folderNames = imgSrc[i2]['folder']
                        zip.folder(folderNames).file(imgNames + imageSuffix[i2], imgBase64[i2], {
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

}

/**
 * Fatosy 自定义zip类（压缩文件）
*/
const zzip = new zZip()

export default {zzip}