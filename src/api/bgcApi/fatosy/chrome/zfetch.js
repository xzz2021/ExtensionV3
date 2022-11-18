
class zFetch{
    constructor(){
    }
    
    async getReimg(url,datas){
        //let URLList = [
        //    'https://img13.360buyimg.com/n1/s450x450_jfs/t1/199162/36/26401/30450/63191e30E283ebb8c/80759c310e6247cb.jpg.avif',
        //    'https://img30.360buyimg.com/sku/jfs/t1/110075/5/32692/75992/6359f92cEc87aee0c/cb14e8fdc54edeb8.jpg'
        //]
        //let acmtUrl = 'http://120.25.224.61:9001/main_images_check'
        //let msg = {type: 'zfetch', funcs:"JDReIMG", config:{url:acmtUrl, datas:URLList}}
        return new Promise( async(resolve, reject) => {
            fetch(url,{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"urls":datas}),
            }).then(( response) => {
                return response.text();
            }).then((res) => {
                resolve(res)
            });
        })
    }

    async getBdimg(url){
        //let acmtUrl = 'http://120.25.224.61:9001/photo_white?url=https://img30.360buyimg.com/sku/jfs/t1/110075/5/32692/75992/6359f92cEc87aee0c/cb14e8fdc54edeb8.jpg'
        //let msg = {type: 'zfetch', funcs:"JDbdIMG", config:{url:acmtUrl}}
        return new Promise( async(resolve, reject) => {
            fetch(url,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
            }).then(( response) => {
                return response.text();
            }).then((res) => {
                resolve(res)
            });
        })
    }

    async getTitlecheck(url){
        //let acmtUrl = "http://120.25.224.61:9001/word_02_info?user_id=1111&title="
        //let msg = {type: 'zfetch', funcs:"JDTitleck", config:{url:acmtUrl}}
        return new Promise( async(resolve, reject) => {
            fetch(url,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
            }).then(( response) => {
                return response.text();
            }).then((res) => {
                resolve(res)
            });
        })
    }

}

const zfetch = new zFetch()

export default {zfetch}


