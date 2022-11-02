

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
                    this.set(keys, vals)
                    return true
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
                    this.set(keys, vals)
                    return true
                }
            }
        }
    }


    /**
     * 存储在chrome.storage
     * @param1 String && Array 参数1 key
     * @param2 ANY or Array 参数2 如果参数1为数组则两个参数都为数组且长度一致
     * @return 无返回
    */
    set(keys, vals){
        
        if(typeof keys == 'string'){
            // 单个key存储
            chrome.storage.local.set({[keys]: vals}, function() {});
        }else if(keys instanceof Array && vals instanceof Array && vals.length == keys.length){
            // 多个Key存储
            for(let i = 0; i < keys.length; i++){
                let k = keys[i];
                let v = vals[i];
                chrome.storage.local.set({[k]: v}, function() {});
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
}


let zsql = new zSQL()

export default {zsql}