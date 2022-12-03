<template>
<div class="commentDownload"></div>

 	<!--excel下载及数据格式 let column = [{title: '名称',key: 'name',type: 'text'},{title: '视频链接',key: 'videourl',type: 'text'},{title: '图片',key: 'imgurl',type: 'image'}]
   let data = [{name:'试试111',videourl: 'http://weh.wefw.com60buyimg.com/n2/jfs/t1/193336/10/26161/112918/6/wefew.mp4', imgurl: 'https://img13.360buyimg.com/n2/jfs/t1/193336/10/26161/112918/62c55835Ec20d50ad/7ab207e4ed7547d8.jpg'},
               {name:'试试222', videourl: '', imgurl: ['https://img14.360buyimg.com/n2/jfs/t1/122295/27/18626/340950/6165b043Ed9f958ec/7a4fc3035bca0094.jpg', 'https://img13.360buyimg.com/n2/jfs/t1/193336/10/26161/112918/62c55835Ec20d50ad/7ab207e4ed7547d8.jpg']}]
 let a = await API.tableToExcel(column,data, '哈哈哈') -->
</template>
<script>
export default {
data() {
    return {
        skuId: ''

}},
methods: {
    async startDownload(cnum,type){
        this.$message.success("有图评价下载开始!") 
        let skuUrl = window.location.href
        let regs = skuUrl.match(/item.jd.com.*?(\d+)/)
        regs != null && (this.skuId = regs[1])
        type == '有图'? await this.downLoadJDcommentPic(cnum) : await this.downLoadJDcommentNoPic(cnum)
    },
    async getCommentsData(cnum, pic_flag){
        let commentUrl = "https://club.jd.com/comment/skuProductPageComments.action?callback=fetchJSON_comment98&productId=" + this.skuId + "&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1"

    // 创建需要抓取的评价JSON链接数组 和 总页数
    let json_url_list = new Array();
    let total_page = 0;
    let tpage1 = parseInt(cnum * 10 / 100); 
    let tpage2 = cnum % 10;
    if(cnum < 10){
        total_page = 1;
    }else{
        if(tpage2 != 0){
            total_page = tpage1 + 1;
        }else{
            total_page = tpage1;
        }
    }
    for(var i = 0; i < total_page; i++){
        let jsonUrl = "https://club.jd.com/comment/skuProductPageComments.action?productId=" + this.skuId + "&score=0&sortType=5&page=" + i + "&pageSize=10&isShadowSku=0&fold=1"
        json_url_list.push(jsonUrl)
    }

    // 获取数据
    let sumData = new Array();
    for(var i = 0; i< total_page; i++){
        /* let msg = {
            type: 'myfetch',
             
            config: { 
                method: 'GET',
                responseType: 'GBKJSON', 
                headers: {
                    'Content-Type': 'application/json'
                },
                url: json_url_list[i]
            }
        }
    
        let jsondata = await API.sendMessage(msg) */

        let config = {
            method: 'GET',
            url: json_url_list[i]
        }
        let msgdata = '正在获取第' + (i+1) + '页评论'
        Message.success(msgdata);
        let htmlres1 = await 浏览器_跨域axios(config);
        let jsondata = htmlres1.data;
        //jsondata = parseJSON(jsondata)
        let nowPage = 0;
        if (jsondata.csv != undefined && jsondata.csv.indexOf('pageSize=') > -1 ){
            let regs = jsondata.csv.match(/pageSize=.*?(\d+)/);
            nowPage = regs != null ? regs[1] : 0;
        }
        // 获取最大页码
        let maxPage = jsondata.maxPage;
        // 初始化评价时间，默认获取当前时间
        // let nowTime = getMyDateTime();
        let nowTime = dayjs().format('YYYY-MM-DD HH:MM:SS')

        let cmt_list = jsondata.comments
        for(var j = 0; j < cmt_list.length; j++){
            // 初始化序号
            let order = j + (nowPage-1) * 10 + 1;
            if (order <= cnum && nowPage <= maxPage){
                // 初始化每条评价的图片链接
                let imgUrls = new Array();
                // 初始化每条评价的视频链接
                let videoUrls = new Array();
                // 评价内容
                let content = cmt_list[j].content != undefined ? cmt_list[j].content : undefined;
                // 追加评价
                let after_content = cmt_list[j].afterUserComment != undefined ? cmt_list[j].afterUserComment : undefined;
                // 所有评价
                let all_content = "";
                if(content != undefined){
                    all_content = content.replace(/\n/g, ';')
                }
                if(after_content != undefined){
                    if (after_content.content != undefined){
                        all_content = all_content + ' ' + after_content.content.replace(/\n/g, ';')
                    }
                }
                
                // 评价时间
                let ctime = cmt_list[j].creationTime != undefined ? cmt_list[j].creationTime : nowTime;
                // 判断是否是无图
                let isNoPic = cmt_list[j].images != undefined ? false : true;

                if (cmt_list[j].images != undefined) {
                    for(var imgs = 0; imgs < cmt_list[j].images.length; imgs++){
                        let img_obj = cmt_list[j].images[imgs]
                        let imgObjUrl = undefined
                        if (cmt_list[j].images[imgs].imgUrl != undefined){
                            imgObjUrl = cmt_list[j].images[imgs].imgUrl
                            imgObjUrl = imgObjUrl.replace('.avif', '')
                            //imgObjUrl = imgObjUrl.replace('shaidan/s', '_jfs/')
                            imgObjUrl = "https:" + imgObjUrl
                            let regsi = imgObjUrl.match(/shaidan\/s.*?(\d+)_jfs/)
                            if(regsi != null){
                                imgObjUrl = imgObjUrl.replace(regsi[0], 'shaidan/jfs')
                            }
                            imgUrls.push(imgObjUrl)
                        }
                    }
                }
                if (cmt_list[j].videos != undefined) {
                    for(var vis = 0; vis < cmt_list[j].videos.length; vis++){
                        let video_obj = cmt_list[j].videos[vis]
                        let videoObjUrl = undefined
                        if (cmt_list[j].videos[vis].remark != undefined){
                            videoObjUrl = cmt_list[j].videos[vis].remark
                            videoUrls.push(videoObjUrl)
                        }

                    }
                }
            
                if (isNoPic == false && pic_flag == 'pic'){
                    let c_obj = {"order":order, "time":ctime, "content":all_content, "imgs":imgUrls, "videos":videoUrls}
                   sumData.push(c_obj)
                }
                if (isNoPic == true && pic_flag == 'nopic'){
                    let c_obj = {"order":order, "time":ctime, "content":all_content, "imgs":imgUrls, "videos":videoUrls}
                    sumData.push(c_obj)
                }
            }
        }
        await sleep(1.5)
    }
    return sumData
    },
    // 有图评价下载  
    async downLoadJDcommentPic(commentsNum) {
    if (this.skuId != undefined){
        //ElMessage.success({ message: '商品有图评价开始下载！'});
        let dataall = await this.getCommentsData(commentsNum, "pic")

        let excelDatas = new Array();
        for(let di = 1; di <= dataall.length ; di+= 50){
            excelDatas.push(dataall.slice(di, di+50))
        }
        
        for(let ki = 0; ki < excelDatas.length; ki++){
            let datas = excelDatas[ki];
            
            let column = [
                {
                  title: '序号', 
                  key: 'order',
                  type: 'text'
                },
                {
                  title: '评价内容', 
                  key: 'content',
                  type: 'text',
                  width: 150,
                  height: 150
                }
            ]
            
            //datas = changePicData(column, datas)
    
            //获取图片数组、视频数组最大值
            let img_max = 0;
            let video_max = 0;
            for(var i =0; i< datas.length; i++){
                let img_i_max = datas[i].imgs.length;
                let video_i_max = datas[i].videos.length;
                if(img_i_max > img_max){
                    img_max = img_i_max
                }
                if(video_i_max > video_max){
                  video_max = video_i_max
                }
            }
            // 表格模板视频个数补充
            for(var i = 0; i< video_max; i++){
                let vtitle = "视频链接"
                let vkey = 'video'
                let vtitlei = i + 1;
                if(video_max > 1){
                    vtitle = vtitle + vtitlei;
                }
                vkey = vkey + vtitlei
                let vobj = {
                  title: vtitle, 
                  key: vkey,
                  type: 'text'
                }
                column.push(vobj)
            }
            for(var i = 0; i< img_max; i++){
                let vtitle = "图片"
                let vkey = 'img'
                let vtitlei = i + 1;
                if(img_max > 1){
                    vtitle = vtitle + vtitlei;
                }
                vkey = vkey + vtitlei
                let vobj = {
                  title: vtitle, 
                  key: vkey,
                  type: 'image',
                  width: 150,
                  height: 150
                }
                column.push(vobj)
            }
    
    
            // 数组赋值，补充不足的地方
            for(var i =0; i< datas.length; i++){
                
                let img_i_max = datas[i].imgs.length;
                let video_i_max = datas[i].videos.length;
                if(img_i_max < img_max){
                    let cha = img_max - img_i_max;
                    for(var chai = 0; chai < cha; chai++){
                        datas[i].imgs.push("")
                    }
                }
                if(video_i_max < video_max){
                  let cha = video_max - video_i_max;
                    for(var chai = 0; chai < cha; chai++){
                        datas[i].videos.push("")
                    }
                }
            }
            // 数组改变值
            for(var i =0; i< datas.length; i++){
                //改变图片值
                for(var j1 = 0; j1 < img_max; j1++){
                    let imgkey = "img";
                    let imgkeyj = j1 + 1;
                    imgkey = imgkey + imgkeyj
                    datas[i][imgkey] = datas[i].imgs[j1]
                }
                for(var j2 = 0; j2 < video_max; j2++){
                    let videokey = "video";
                    let videokeyj = j2 + 1;
                    videokey = videokey + videokeyj
                    datas[i][videokey] = datas[i].videos[j2]
                }
                
            } 
    
            let timenum = ztime.ymd2()
            let excelName = timenum + '_' + this.skuId + '_有图评价_' + ki
    
            /* excelName = '有图评价.xlsx'    
            if(xlsxtitle != undefined){
                excelName = "有图评价_" + xlsxtitle + ".xlsx"
            }      */       //文件名称
    
            // console.log('datas: ', datas);
            //table2excel(column, datas, excelName)    //生成Excel表格，自动下载
            // 函数_excel下载_得带文件信息(column, datas, excelName)
            let size =  await 函数_excel下载_得带文件信息(column, datas, excelName)
            this.$myBus.$emit('addTask',{filetype: 'doc',taskname: `京东${excelName}.xls`,size, timeStamp: Date.now(), progress: 100})
        }
    
    } else {
        //ElMessage.error({ message: '下载商品有图评价失败！'});
        console.log("------- comments download error start -------")
        console.log("commentsNum : ", commentsNum)
        console.log("this.skuId : ", this.skuId)
        console.log("------- comments download error end -------")
    }
    },
    // 无图评价下载  start
    async downLoadJDcommentNoPic(commentsNum) {
    if (this.skuId != undefined){
        //ElMessage.success({ message: '商品无图评价开始下载！'});
        let datas = await this.getCommentsData(commentsNum, "nopic")
        let column = [
            {
              title: '序号', 
              key: 'order',
              type: 'text'
            },
            {
              title: '评价内容', 
              key: 'content',
              type: 'text',
              width: 150,
              height: 150
            }
        ]

        let timenum = ztime.ymd2()
        let excelName = timenum + '_' + this.skuId + '_无图评价'

        /* let excelName = '无图评价.xlsx'    
        if(xlsxtitle != undefined){
            excelName = "无图评价_" + xlsxtitle + ".xlsx"
        }         */    
        //文件名称
        //table2excel(column, datas, excelName)    //生成Excel表格，自动下载
        // 函数_excel下载_得带文件信息(column, datas, excelName)
        let size =  await 函数_excel下载_得带文件信息(column, datas, excelName)
        this.$myBus.$emit('addTask',{filetype: 'doc',taskname: `京东${excelName}.xls`,size, timeStamp: Date.now(), progress: 100})
        
    } else {
        //ElMessage.error({ message: '下载商品无图评价失败！'});
        console.log("------- comments download error start -------")
        console.log("commentsNum : ", commentsNum)
        console.log("this.skuId : ", this.skuId)
        console.log("------- comments download error end -------")
    }
}
},
mounted() {},
}
</script>
<style lang='scss' scoped>
</style>