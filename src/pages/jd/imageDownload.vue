<template>
<div>
<progressBar :visible="proBar.show" :percentage="proBar.percentage"/>
</div>

</template>
<script setup>
        const skuId = ref(null)
        const mainSkuId = ref(null)
        const mainImg = reactive({self:[]})
        const detailImg = reactive({self:[]})
        const skuImg = reactive({self:[]})
        const selectData = reactive({self:[]})

//平台状态store
const busStore = piniaStore()
//storeToRefs增加响应性,使用了proxy,所以需要用.value拿到值
const { proBar, currentHref } = storeToRefs(busStore) 

    const  startDownload = async (arg,platform) => {
        // return
        proBar.value.show = true
        proBar.value.percentage = 0
        myProgress(20)
        // return
        let plattitle = platform == 'pc' ? '电脑端': '移动端'
        let type = arg == 'main' ? '主图' : arg == 'detail' ? '详情图': arg == 'sku'? 'sku图': arg == 'all'  ? '全部图片' : '全部图片(带目录)'
        // let now = new API.dayjs()
        let zipname = '京东' + new API.dayjs().format('YYYYMMDD') + plattitle + currentHref.value.match(/com\/(\d*)/g)[0].slice(4) + type
        // console.log('zipname: ', zipname);
        // return
        await getIds()
        platform == 'pc' ? await getData() : await getDataMobile()
        myProgress(60)
        await zipData(arg,zipname)
        proBar.value.show = false
        clearData()
    }
    //全局获取商品id
    const getIds = async () =>{
                // 获取skuID
    let regs = currentHref.value.match(/item.jd.com.*?(\d+)/);
    skuId.value = regs.length >= 2 ? regs[1] : undefined;

    // 获取mainSkuId
    // let mainSkuId = null
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('mainSkuId:') > -1){
            let regs = script_text.match(/mainSkuId:.*?(\d+)/);
            mainSkuId.value = regs.length >= 2 ? regs[1] : undefined; 
        }
    }
    }
    const getData = async () => {
        await getMainImg()
        await getDetailImg()
        await getSkulImg()
    }
    const getDataMobile = async () => {
        await getMainImgm()
        await getDetailImgm()
        await getSkulImgm()
    }
    // 获取PC端主图链接
    const getMainImg = async () => {
    let main_tag_list = $('#spec-list ul li img');
    for (var i = 0; i < main_tag_list.length; i++){
        let img_url = main_tag_list[i].src;
        img_url = img_url.replace('n5/s54x54_jfs', 'n1/jfs');
        img_url = img_url.match('.+\\.(jpg|png)')[0]
        img_url = img_url.replace('http:', 'https:')
        if(img_url.indexOf('png') > -1 || img_url.indexOf('jpg') > -1){
            // main_img_list.push(img_url);
            let name = '主图' + (i + 1) + '.jpg';
            let url = img_url;
            mainImg.self.push({name,url})
        }
    }
    }
    //获取PC详情图
    const getDetailImg = async () => {


    // 获取详情图JSON链接 
    let dtl_url 
    if (skuId.value != undefined && mainSkuId.value != undefined){
         dtl_url = "https://cd.jd.com/description/channel?skuId=" + skuId.value + "&mainSkuId=" + mainSkuId.value + "&charset=utf-8"
    }

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

    img_list.forEach((item,index)=>{
        detailImg.self.push({url: item, name: '详情图' + (index + 1) + '.jpg'})
        })
    }
    // 获取PC端SKU图
    const getSkulImg = async () => {

    let sku_tag_img_list = $('#choose-attrs div div div a img');
    // let sku_tag_text_list = $('#choose-attrs div div div a i');
    for (var i = 0; i < sku_tag_img_list.length; i++){
        let img_url = sku_tag_img_list[i].src;
        let img_text = sku_tag_img_list[i].alt.replace('/', '')
        img_url = img_url.replace('n9/s40x40_jfs', 'n1/jfs').match('.+\\.(jpg|png)')[0].replace('http:', 'https:')
        // img_url = img_url.match('.+\\.(jpg|png)')[0]
        // img_url = img_url.replace('http:', 'https:')
        if(img_url.indexOf('png') > -1 || img_url.indexOf('jpg') > -1){
            // let img_obj = {
            //     "url": img_url,
            //     "text": img_text
            // }
            // sku_list.push(img_obj);
            skuImg.self.push({name:`SKU图${i+ 1}-${img_text}.jpg`,url:img_url})
            // console.log('skuImg.self: ', skuImg.self);
        }
    }
    }
    //----------移动端---------------
    const getMainImgm = async () => {
     let url = "https://item.m.jd.com/product/" + skuId.value + ".html"
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
    // let mainImgList = new Array()
    let regs = contents.match(/\"image\":\[.*?(\S+)\],\"shopInfo\"/)
    if(regs!=null){
        let imgstrall = regs[1].replace(/"/g,'').split(',');
        //https://m.360buyimg.com/mobilecms/jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg
        if(imgstrall instanceof Array){
            for(var i = 0; i<imgstrall.length; i++){
                let name = '主图' + (i + 1) + '.jpg';
                let url = "https://m.360buyimg.com/mobilecms/" + imgstrall[i];
                mainImg.self.push({name,url})
    }}}
    }
    const getDetailImgm = async () => {
        let url = 'https://api.m.jd.com/ware/detail/getIntroduceInfo?appid=m_core&functionId=item_intruduce_info&body={"par":"' + skuId.value + '_d' + skuId.value + '_normal"}'
    // let dtlImgList = new Array()
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
                    // dtlImgList.push(imgUrl);
                    detailImg.self.push({ name: `详情图${i + 1}.jpg`, url:imgUrl })
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
                    // dtlImgList.push(imgUrl);
                    detailImg.self.push({ name: `详情图${i + 1}.jpg`, url:imgUrl })
                }
            }
        }
    })
    }
    const getSkulImgm = async () => {
        let url = "https://item.m.jd.com/product/" + skuId.value + ".html"
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
    // let skuImgList = new Array()
    let regs = contents.match(/\"newColorSize\":\[(\S+)\],\"errCode\"/)
    if(regs!=null){
        let imgobjall = regs[1].split('},');
        if(imgobjall instanceof Array){
            for(var i=0; i< imgobjall.length; i++){
                let objstr = imgobjall[i];
                if(objstr.indexOf('}') == -1){
                    objstr = objstr + '}';
                    let objjson = JSON.parse(objstr);
                    //console.log(objjson)
                    if(objjson.imagePath != undefined){
                        let imgUrl = "https://m.360buyimg.com/mobilecms/" + objjson.imagePath;
                        let skuname = objjson['1'];
                        let type = objjson['2'];
                        let type2 = objjson['3'].replace(/[^\u4e00-\u9fa5^a-zA-Z^\d\[\]]\【\】]/gi, "_");
                        let skuNameAll = skuname + '_' + type + '_' + type2;
                        //https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg!q80.dpg
                        // let img_obj = {
                        //     "url": imgUrl,
                        //     "text": skuNameAll
                        // }
                        // skuImgList.push(img_obj);
                        let name = `SKU图${(i + 1)}${skuNameAll.replace('/','')}.jpg`
                        skuImg.self.push({name,url:imgUrl})
                    }
                }
            }
        }
    }
    }
    //压缩并下载所有文件
    const zipData = async (arg, zipname) =>  {

    //   selectData.self = []
      let selectZip = new API.jszip()  
      //每次运行都会new一个新对象,之所以需要new一个对象,在于新赋的值都是新的new对象,没有原型链数据残留,
      //如果在API里先new,因为是全局对象,始终存在,所以会导致数据在全局累加
      switch(arg){
        case 'main':      selectData.self = mainImg.self
          break;
        case 'detail':    selectData.self = detailImg.self
          break;
        case 'sku':       selectData.self = skuImg.self
          break;
        case 'all':       selectData.self = [...mainImg.self, ...detailImg.self, ...skuImg.self]
          break;
        case 'allwith':   await addFolder(mainImg.self,detailImg.self,skuImg.self); selectData.self = [...mainImg.self, ...detailImg.self, ...skuImg.self]
          break;
        default: ''
          break
      }
      //保存每一张图片
       selectData.self.forEach( (item, index) => {
        let base64URL =  API.imgToBase64(item.url)
        // console.log('base64URL: ', base64URL)
        // return
        selectZip.file(item.name, base64URL, {base64: true})
      })
      //生成压缩包并下载
    //   return
      myProgress(100)
       let dataSave = await selectZip.generateAsync({type: 'blob', compression: 'DEFLATE', compressionOptions: {level: 1}})
        // console.log('dataSave: ', dataSave); //blob对象
        saveAs(dataSave, zipname)
        // API.emitter.emit('addTask',{filetype: 'zip',taskname: `${zipname}.zip`,size: dataSave.size,  progress: 100})
    }
    const myProgress = async (val) => {   
       setTimeout(() => {
            proBar.value.percentage = val
          }, 600);
    }
    const clearData = async () => {
        mainImg.self = []
        detailImg.self = []
        skuImg.self = []
        selectData.self = []
        proBar.value.percentage = 0
    }
    const  addFolder = async (a,b,c) => {
        a.forEach((item)=>{item.name = `主图/${item.name}`})
        b.forEach((item)=>{item.name = `详情图/${item.name}`})
        c.forEach((item)=>{item.name = `sku图/${item.name}`})
    }
    onMounted(() => {
        // API.dayjs.format('YYYYMMDD')
        // console.log('API.dayjs.format', API.dayjs.format('YYYYMMDD'))
    })
//setup内部的实例对象默认只在内部,外部调用需要手动暴露出去
    defineExpose({ startDownload })
</script>
<style lang='scss' scoped>
</style>