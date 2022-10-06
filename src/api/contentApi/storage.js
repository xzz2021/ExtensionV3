const Storage = {
    set(obj){
        return new Promise( (resolve, reject) => {

        if(Object.prototype.toString.call(obj) !== '[object Object]' && JSON.stringify(obj) === '{}'){
            resolve('设定失败:参数必须是object且不能为空')
        }else{
            let tip = '77'
            let l = 1
            for(const key in obj) {
                chrome.storage.local.set({[key]: obj[key]}, ()=> {
                    console.log(`${l}:${key}设定成功,值为${JSON.stringify(obj[key])}`)
                    tip += ` ${l}:${key}设定成功,值为${obj[key]} `
                    l++
                })
            }
            console.log('----l---------',l)
            resolve(tip)
        }
    })
    },

    get(strORarr){
        return new Promise((resolve, reject) => {
        if(strORarr.length < 1 || strORarr == '' || strORarr == ['']){
           resolve('获取失败:参数必须是字符串或者数组,且不能为空')
        }
            if(typeof strORarr == 'string'){
                chrome.storage.local.get([strORarr], (res)=> {
                    let r = res[strORarr] || '获取失败:数据不存在'
                        resolve(r)
                  })
            }else {
                let obj = {}
                for(const val of strORarr) {
                    chrome.storage.local.get([val], (res)=> {
                            obj[val] = res[val] || '数据不存在'
                      })
                }
                resolve(obj)
            }
        })
    },
    remove(strORarr){
        if(strORarr.length > 0){
            chrome.storage.local.remove(strORarr)
        }else{
            console.log('移除失败:参数必须是字符串或者数组,且不能为空')
        }
    },
    clear(){
        chrome.storage.local.clear()
    }



}

export default {Storage}