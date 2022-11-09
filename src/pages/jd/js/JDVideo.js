/* --- PC端-视频下载 start --- */

// 紫鹏自己写的
const videoDownloadczp = async (currentHref, skuId, timenum) =>{
    if (!(currentHref.indexOf('item.jd') > 1)) {
        return alert('请进入商品详情页,再点击开始下载')
      }
        $('.video-icon').click()
        let url = $('video source').attr('src')
        if(url == undefined) return  ElMessage.error({ message: '当前商品没有视频',  duration: 1500,})
        //let name2 = title != undefined ? title : Date.now();
        //let name = '商品视频_' + name2 + '.mp4'
        let name = timenum + '_' + skuId + '_商品视频.mp4'
        let msg = {type: 'downloads', url, name}
      let res = await  API.sendMessage(msg) 
      res && ElMessage.success({ message: `视频${res}`, duration: 2500,})
    }


/* --- PC端-视频下载 end --- */

export {videoDownloadczp}