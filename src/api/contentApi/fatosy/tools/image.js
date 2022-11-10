
class zImg{
    constructor(){
        this.img = ''
    }

    // 获取分辨率
    async getWH(url){
        return new Promise(async (reslove, reject) => {
            try {
                let img_url = url
                let img_onload = new Image(); // 创建对象
                img_onload.src = img_url;  // 改变图片的src
                img_onload.onload = await function () {  // 加载完成执行
                    let width = img_onload.width
                    let height = img_onload.height
                    let img_size = { width, height }
                    reslove(img_size)
                };
            }
            catch (error) {
                reject({ "width": 0, 'height': 0 })
            }
        })
    }

    // 重复图检测
    async checkRe(urlList){
        let acmtUrl = 'http://120.25.224.61:9001/main_images_check'
        let msg = {
            type: 'myfetch',
            
            config: { 
                method: 'POST',
                responseType: 'JSON', 
                data: {
                    "urls": urlList,
                },
                url: acmtUrl
            }
        }
        let jsondata = await API.sendMessage(msg)
    }

   
}

let zimg = new zImg()

export default {zimg}