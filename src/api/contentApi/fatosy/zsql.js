
class zSQL{

    constructor(){
        this.str = ''
    }

    set(types, keys, vals){
        
        if(types == 1 && typeof keys == 'string'){
            // 单个key存储
            chrome.storage.local.set({[keys]: vals}, function() {});
        }else if(types == 2 && keys instanceof Array && vals instanceof Array && vals.length == keys.length){
            // 多个Key存储
            for(let i = 0; i < keys.length; i++){
                let k = keys[i];
                let v = vals[i];
                chrome.storage.local.set({[k]: v}, function() {});
            }
        }
    }

    async get(keys){
        return new Promise( (resolve, reject) => {
    
            if(typeof keys == 'string'){
                let result = undefined
                chrome.storage.local.get([keys], function(res) {
                    result = res[keys]
                    resolve(result)
                });
            }else if(keys instanceof Array){
                let result = new Array()
                for(let i = 0; i < keys.length; i++){
                    let k = keys[i]
                    chrome.storage.local.get([k], function(res) {
                        result.push(res)
                    });
                }
                if(result.length == 0){
                    result = undefined
                }
                resolve(result)
            }
            //resolve(result)

        })
        
    }

    async watch(){

        return new Promise( (resolve, reject) => {
            let result = undefined
            chrome.storage.onChanged.addListener(function (changes, namespace) {

                for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
                    result = {
                        "old":oldValue,
                        "new":newValue
                    }
                    resolve(result)
                }
            });
        })
    }

}


let zsql = new zSQL()

export default {zsql}