

class zSQL{

    constructor(){
        this.str = ''
    }

    
    /**
     * 新增在chrome.storage不存在的值
     * @param1 String 参数1 key
     * @param2 ANY 参数2 value
     * @return 成功添加返回true,失败返回False
    */
    async add(keys, vals){
        if(typeof keys == 'string'){
            let temp = await this.get(keys)
            if(temp != undefined){
                if(temp[keys] != undefined){
                    return false
                }else{
                    let ar = await this.set(keys, vals)
                    return ar
                }
            }
        }
    }

    /**
     * 改变在chrome.storage存在的值
     * @param1 String 参数1 key
     * @param2 ANY 参数2 value
     * @return 成功改变返回true,失败返回False
    */
    async change(keys, vals){
        if(typeof keys == 'string'){
            let temp = await this.get(keys)
            if(temp != undefined){
                if(temp[keys] == undefined){
                    return false
                }else{
                    let cr = await this.set(keys, vals)
                    return cr
                }
            }
        }
    }

    /**
     * 存储在chrome.storage
     * @param1 String  参数1 key
     * @param2 ANY  参数2 值
     * @return 无返回
    */
    async set(keys, vals){
        
        if(typeof keys == 'string'){
            // 单个key存储
            chrome.storage.local.set({[keys]: vals}, function() {});
            let sr = await this.get(keys);
            if(sr != undefined && sr[keys] != undefined && sr[keys] == vals){
                return true
            }else{
                return false
            }
        }
    }

    /**
     * 获取在chrome.storage里的值
     * @param1 String && Array 参数1 key
     * @return 根据查询的key返回对应的json
    */
    get(keys){
        return new Promise( (resolve, reject) => {
    
            if(typeof keys == 'string'){
                let result = undefined
                chrome.storage.local.get([keys], function(res) {
                    result = res
                    if(!res.hasOwnProperty(keys)){
                        result[keys] = undefined
                    }
                    resolve(result)
                });
            }else if(keys instanceof Array){
                let result = {}
                chrome.storage.local.get(keys, function(res) {
                    result = res
                    for(let i = 0; i < keys.length; i++){
                        let k = keys[i]
                        if(!res.hasOwnProperty(k)){
                            result[k]= undefined
                        }
                    }
                    resolve(result)
                });
            }else{
                resolve(undefined)
            }
        })
        
    }

    /**
     * 监听某个在chrome.storage里的值的变化
     * @param1 String  参数1 key
     * @return 根据查询的key返回对应的json
    */
    watch(keys){
        return new Promise( (resolve, reject) => {
            let result = {}
            if(typeof keys == 'string'){
                chrome.storage.onChanged.addListener(function (changes, namespace) {
                    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                        if(keys == key){
                            result[keys] = {
                                "old":oldValue,
                                "new":newValue
                            }
                        }
                    }

                    if(!result.hasOwnProperty(keys)){
                        result[keys] = undefined
                    }
                    resolve(result)
                    
                });
            }else{
                result = undefined
                resolve(result)
            }
        })
    }

    /**
     * 删除在chrome.storage里的值
     * @param1 String   参数1 key
     * @return 删除成功返回true 失败返回false
    */
    remove(keys){
        return new Promise( (resolve, reject) => {
            if(typeof keys == 'string'){
                chrome.storage.local.remove(keys, function(res) {
                });
                let result = this.get(keys);
                if(result[keys] != undefined){
                    resolve(false)
                }else{
                    resolve(true)
                }
            }else{
                resolve(false)
            }
        })
    }

    clear(){
        return new Promise( (resolve, reject) => {
            let result = false
            chrome.storage.local.clear(function(res) {
                result = true
                resolve(result)
            });
            
        })
    }

}


let zsql = new zSQL()

export default {zsql}