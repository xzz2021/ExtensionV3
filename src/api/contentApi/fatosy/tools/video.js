/**
 * Fatosy 自定义正则类
*/
class zVideo{

    constructor(){
        this.len = 0
    }

    async getDuration (url) {
        if (url) {
            url.startsWith('http:') ? null : url = url.replace(/.*?\//, 'https:/')
            return new Promise((resolve, reject) => {
                const video = document.createElement('video')
                video.src = url
                video.oncanplay = function () {
                    // console.log("本视频时长是:" + video.duration)
                    resolve(video.duration)
                }
                video.onerror = function() {
                    resolve(0)
                  }
            })
        } else {
            return 0
        }
    }

}

/**
 * Fatosy 自定义正则类
*/
const zvideo = new zVideo()

export default {zvideo}