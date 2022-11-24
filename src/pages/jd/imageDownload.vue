<template>
<div class="imageDownload">
    <MeProgress :show="ProgressShow" :percentage="percentage"></MeProgress>
</div>
</template>
<script>
export default {
data() {
    return {
        mainImage: [],
        detailImg: [],
        SkuImg: [],
        selectData: [],
        ProgressShow: false,
        percentage: 0

}},
methods: {
    async startDownload(arg,platform){
        this.ProgressShow = true
        this.myProgress(30)
        let url = location.href
        let plattitle = platform == 'pc' ? '电脑端': '移动端'
        let type = arg == 'main' ? '主图' : arg == 'detail' ? '详情图': arg == 'sku'? 'sku图': arg == 'all'  ? '全部图片' : '全部图片(带目录)'
        let zipname = '京东' + dayjs().format('YYYYMMDD') + plattitle + url.match(/com\/(\d*)/g)[0].slice(4) + type
        platform == 'pc' ? await this.getData() : await this.getDataMobile()
        // return
        this.myProgress(60)
        await this.zipData(arg,zipname)
        this.ProgressShow = false
        this.clearData()
    },
    async clearData(){
        this.mainImage = [],
        this.detailImg = [],
        this.SkuImg = [],
        this.selectData = []
        this.percentage = 0
    },
    async getData(){
        await this.getMainImg()
        console.log('mainImage: ', this.mainImage)
        await this.getDetailImg()
        console.log('detailImg: ', this.detailImg)
        await this.getSkulImg()
        console.log('SkuImg: ', this.SkuImg)
    },
    async getDataMobile(){
        await this.getMainImgm()
        console.log('mainImagemmm: ', this.mainImage)
        await this.getDetailImgm()
        console.log('detailImgmmmm: ', this.detailImg)
        await this.getSkulImgm()
        console.log('SkuImgmmm: ', this.SkuImg)
    },
    // 获取PC端主图链接
    async getMainImg(){
    if(document.getElementById('spec-list') != null){
        let mainImgEles = document.getElementById('spec-list').getElementsByTagName('img');
        let mainl = mainImgEles.length
        if( mainl > 0){
            for(let i = 0; i < mainl; i++){
                let mainImgUrl = mainImgEles[i].currentSrc;
                let urlregs = mainImgUrl.match(/.com\/.*?jfs/)
                if(urlregs != null){
                    mainImgUrl = mainImgUrl.replace(urlregs[0], '.com/n1/jfs').replace('.avif', '')
                }
                let name = '主图' + (i + 1) + '.jpg';
                let url = mainImgUrl;
                this.mainImage.push({name,url})
            }}}
    },
    //获取PC详情图-zz
    async getDetailImg(){
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
    let config = {
        method: 'GET',
        url: dtlUrl
    }
    let htmlres1 = await 浏览器_跨域axios(config);
    let htmlres = htmlres1.data.content;
  
    var img = htmlres.match(/(http:\/\/.*?avif)/ig);
    if(img == null){
        img = htmlres.match(/(https:\/\/.*?avif)/ig);

    }
    if(img == null){
        img = htmlres.match(/(image:url\(\/\/.*?avif)/ig);
    }
    if(img == null){
        img = htmlres.match(/\/\/.*?.avif/ig);
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
    img_list.forEach((item,index)=>{
        this.detailImg.push({url: item, name: '详情图' + (index + 1) + '.jpg'})
        })
    },//获取PC详情图-cc
    async getDetailImgcc(){
        let id = window.location.href.match(/(\d+)/)[1]
            let url = `https://cd.jd.com/description/channel?skuId=${id}&mainSkuId=${id}&charset=utf-8&cdn=2&callback=showdesc`
            let config = { method: 'get', url: url }
            let res = await 浏览器_跨域axios(config)
            let detailImages = res.data.match(/\/img.*?com.*?\.[a-z]{3,5}/g) ?
                res.data.match(/\/img.*?com.*?\.[a-z]{3,5}/g).map(n => n.replace(/.*?\//, 'https://')) : ""
            for (let index = 0; index < detailImages.length; index++) {
                const url = detailImages[index];
                this.detailImg.push({ name: `详情图${index + 1}.jpg`, url })
            }
    },
    // 获取PC端SKU图
    async getSkulImg() {
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
                // result.push({"url" : skuUrl, "name" : skuName})
                // this.SkuImg.push({name:`${skuName.toString()}.jpg`,url:skuUrl})
                this.SkuImg.push({name:`SKU图${i+ 1}.jpg`,url:skuUrl})
            }
        }
    }
    },
    async zipData(arg, zipname){
    //   if(arg == 'allwith'){
    //     let zipWithFolder = new JSZip()
    //     this.mainImage.forEach((item, index) => {
    //       zipWithFolder.folder('主图').file(item.name, 图片_url转base64_去除格式(item.url), {base64: true})
    //     })
    //     // this.myProgress(30)
    //     this.detailImg.forEach((item, index) => {
    //       zipWithFolder.folder('详情图').file(item.name, 图片_url转base64_去除格式(item.url), {base64: true})
    //     })
    //     this.SkuImg.forEach((item, index) => {
    //       zipWithFolder.folder('sku图').file(item.name, 图片_url转base64_去除格式(item.url), {base64: true})
    //     })
    //     // this.myProgress(60)
    //     let dataAllWithFolder = await zipWithFolder.generateAsync({type: 'blob', compression: 'DEFLATE', compressionOptions: {level: 1}})
    //     // this.myProgress(100)
    //       saveAs(dataAllWithFolder, zipname)
    //       let size = this.caculateFilesize(dataAllWithFolder.size)
    //       this.$myBus.$emit('addTask',{filetype: 'zip',taskname: `${zipname}.zip`,size, timeStamp: Date.now(), progress: 100})
    //     return
    //   }
      function addFolder(a,b,c){
        a.forEach((item)=>{item.name = `主图/${item.name}`})
        b.forEach((item)=>{item.name = `详情图/${item.name}`})
        c.forEach((item)=>{item.name = `sku图/${item.name}`})
      }

      this.selectData = []
      let selectZip = new JSZip()
      switch(arg){
        case 'main':      this.selectData = this.mainImage
          break;
        case 'detail':    this.selectData = this.detailImg
          break;
        case 'sku':       this.selectData = this.SkuImg
          break;
        case 'all':       this.selectData = [...this.mainImage, ...this.detailImg, ...this.SkuImg]
          break;
        case 'allwith':   addFolder(this.mainImage,this.detailImg,this.SkuImg); this.selectData = [...this.mainImage, ...this.detailImg, ...this.SkuImg]
          break;
        default: ''
          break
      }
        console.log('this.selectData: ', this.selectData);
    //   this.myProgress(30)
      //保存每一张图片
      this.selectData.forEach((item, index) => {
        selectZip.file(item.name, 图片_url转base64_去除格式(item.url), {base64: true})
      })
      //生成压缩包并下载
      this.myProgress(80)
       let dataSave = await selectZip.generateAsync({type: 'blob', compression: 'DEFLATE', compressionOptions: {level: 1}})
       this.myProgress(100)
        saveAs(dataSave, zipname)
        let size = this.caculateFilesize(dataSave.size)
        this.$myBus.$emit('addTask',{filetype: 'zip',taskname: `${zipname}.zip`,size, timeStamp: Date.now(),  progress: 100})
    },
    async getMainImgm(){
        // 获取skuID
    let skuId = undefined;
    let skuUrl = window.location.href;
    let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
    if(skuUrlregs != null){
        skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
    }

    // 获取移动端主图链接
    let url = "https://item.m.jd.com/product/" + skuId + ".html"
    let config = {
        method: 'GET',
        url
    }
    let htmlres1 = await 浏览器_跨域axios(config);
    let htmlres = htmlres1.data;
    let regs = htmlres.match(/\"image\":\[.*?(\S+)\],\"shopInfo\"/)
    if(regs!=null){
        let imgstrall = regs[1].replace(/"/g,'').split(',');
        //https://m.360buyimg.com/mobilecms/jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg
        if(imgstrall instanceof Array){
            for(var i = 0; i<imgstrall.length; i++){
                let name = '主图' + (i + 1) + '.jpg';
                let url = "https://m.360buyimg.com/mobilecms/" + imgstrall[i];
                this.mainImage.push({name,url})
            }
        }
    }
    },
    async getDetailImgm(){
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
        let regs = res2.match(/http.*?jpg/gi)
        if(regs != null){
            for(var i=0;i<regs.length; i++){
                let imgstr = regs[i].replace('.avif',"").replace('http', 'https')
                this.detailImg.push({ name: `详情图${i + 1}.jpg`, url:imgstr })
            }
        }
        let regs2 = res2.match(/http.*?png/gi)
        if(regs2 != null){
            for(var i=0;i<regs2.length; i++){
                let imgstr = regs2[i].replace('.avif',"").replace('http', 'https')
                this.detailImg.push({ name: `详情图${i + 1}.jpg`, url:imgstr })
            }
        }
        let regs3 = res2.match(/http.*?gif/gi)
        if(regs3 != null){
            for(var i=0;i<regs3.length; i++){
                let imgstr = regs3[i].replace('.avif',"").replace('http', 'https')
                this.detailImg.push({ name: `详情图${i + 1}.jpg`, url:imgstr })
            }
        }

        let regs4 = res1.match(/sku\/jfs(.*?)jpg/g) 
        if(regs4 != null){
            for(let k =0; k< regs4.length; k++){
                let url = 'https://m.360buyimg.com/' + regs4[k]
                this.detailImg.push({ name: `详情图${k + 1}.jpg`, url })
            } 
        }
        let regs5 = res1.match(/sku\/jfs(.*?)png/g) 
        if(regs5 != null){
            for(let k =0; k< regs5.length; k++){
                let url = 'https://m.360buyimg.com/' + regs5[k]
                this.detailImg.push({ name: `详情图${k + 1}.jpg`, url })
            } 
        }
        let regs6 = res1.match(/sku\/jfs(.*?)gif/g) 
        if(regs6 != null){
            for(let k =0; k< regs6.length; k++){
                let url = 'https://m.360buyimg.com/' + regs6[k]
                this.detailImg.push({ name: `详情图${k + 1}.jpg`, url })
            } 
        }
    })
    },
    async getSkulImgm(){
        // 获取skuID
    let skuId = undefined;
    let skuUrl = window.location.href;
    let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
    if(skuUrlregs != null){
        skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
    }

    let url = "https://item.m.jd.com/product/" + skuId + ".html"
    let config = {
        method: 'GET',
        url
    }
    let htmlres1 = await 浏览器_跨域axios(config);
    let htmlres = htmlres1.data;
    // console.log('htmlres: ==============', htmlres);
    let regs = htmlres.match(/\"newColorSize\":\[(.*?)\],\"errCode\"/)
    if(regs!=null){
        let imgobjall = regs[1].split('},');
        if(imgobjall instanceof Array){
            for(var i=0; i< imgobjall.length; i++){
                let objstr = imgobjall[i];
                if(objstr.indexOf('}') == -1){
                    objstr = objstr + '}';
                    let objjson = jq.parseJSON(objstr);
                    //console.log(objjson)
                    if(objjson.imagePath != undefined){
                        let imgUrl = "https://m.360buyimg.com/mobilecms/" + objjson.imagePath;
                        // let skuname = objjson['1'];
                        // let type = objjson['2'];
                        // let type2 = objjson['3'].replace(/[^\u4e00-\u9fa5^a-zA-Z^\d\[\]]\【\】]/gi, "_");
                        // let skuNameAll = "SKU图_" + skuname + '_' + type + '_' + type2;
                        //https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg!q80.dpg
                        // let img_obj = {
                        //     "url": imgUrl,
                        //     "name": skuNameAll
                        // }
                        // skuImgList.push(img_obj);
                        let name = `SKU图${(i + 1)}.jpg`
                        this.SkuImg.push({name,url:imgUrl})
                    }
                }
            }
        }
    }
    },
    caculateFilesize(size){
	    return size<0? "未知大小": size<1024? size+"B": size<1024*1024?(size/1024).toFixed(1)+"KB" : (size/(1024*1024)).toFixed(2)+"MB"
    },
    myProgress(val){   
      let myInterval =  setInterval(() => {
            this.percentage += 1
          }, 200);
          if(this.percentage = val) clearInterval(myInterval)
        }
},
mounted() {},
}
</script>
<style lang='scss' scoped>
</style>