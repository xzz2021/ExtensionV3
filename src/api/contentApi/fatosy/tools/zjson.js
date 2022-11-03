import { get } from 'jquery';

/**
    * Fatosy 自定义JSON操作类
*/
class zJson{

    constructor(){
        this.jsonobj = {}
    }

    /**
     * 设置json的值
     * @param1 object 参数1 要修改的JSON对象
     * @param2 String && Array 参数2 要修改的JSON键
     * @param3 ANY or Array 参数3 要修改的JSON值
     * @return 返回修改后的对象本身
    */
    set(obj, key, value){
        if(obj instanceof Object && typeof key == 'string' && value != null){
            obj[key] = API.zrg.check(value)
        }else if(obj instanceof Object && key instanceof Array && value instanceof Array){
            if(key.length == value.length){
                for(let i = 0; i < key.length; i++){
                    let k = key[i];
                    let v = value[i];
                    obj[k] = API.zrg.check(v);
                }
            }else{
                API.zcl.print('zJson.setOne(p1, p2, p3) 错误', '键值的长度不一致')
            }
        }
        return obj
    }

    /**
     * 获取json的值
     * @param1 object 参数1 要获取的JSON对象
     * @param2 String && Array 参数2 要获取的JSON键
     * @return 返回获取数据，如果没有，返回undefined
    */
    get(obj, key){
        let result = undefined;
        if(obj instanceof Object && typeof key == 'string'){
            if(obj[key] != undefined){
                result = obj[key]
            }
        }else if(obj instanceof Object && key instanceof Array){
            result = new Array()
            for(let i = 0; i < key.length; i++){
                let k = key[i]
                if(obj[k] != undefined){
                    result.push(obj[k])
                }
            }
            if(result.length == 0){
                result = undefined
            }
        }
        return result
    }

}

/**
    * Fatosy 自定义JSON操作类
*/
const zjn = new zJson()

export default {zjn}

