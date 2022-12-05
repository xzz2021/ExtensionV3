/**
 * Fatosy 自定义正则类
*/
class zRegs{

    constructor(){
        this.str = ''
    }

    /**
     * 规范设置值，如果为undefind，返回暂无数据，否则返回本身
     * @param ANY 参数 数据
     * @return 返回暂无数据, 或者其本身
    */
    check(strs){
        let result = '暂无数据';
        if(strs != undefined){
            result = strs
        }
        return result
    }

    /**
     * 根据自定义的正则表达式正则
     * @param1 string 参数一 字符串，被正则的文本
     * @param2 string 参数二 字符串，正则表达式
     * @return 返回匹配到的所有数组或者undefined
    */
    mine(strs, regstr){
        let result = undefined
        if(typeof strs == 'string'){
            let regs = strs.match(regstr)
            if(regs != null){
                result = regs
            }
        }else{
            API.zcl.print('错误', '参数1不是String')
        }
        return result
    }

    /**
     * 根据自定义的正则表达式正则，取其中一个
     * @param1 string 参数一 字符串，被正则的文本
     * @param2 string 参数二 字符串，正则表达式
     * @param2 int    参数三 数字，  要取的下标
     * @return 返回匹配到的第i个值或者undefined
    */
    mineOne(strs, regstr, index){
        let result = undefined
        if(typeof strs == 'string'){
            let regs = strs.match(regstr)
            if(regs != null){
                if(index < regs.length){
                    result = regs[index]
                }
            }
        }else{
            API.zcl.print('错误', '参数1不是String')
        }
        return result
    }

    /**
     * 正则数字（小数和整数）
     * @param1 string 参数一 字符串，被正则的文本
     * @return 返回匹配到的所有数组或者undefined
    */
    number(strs){
        let result = undefined
        if(typeof strs == 'string'){
            let regs = strs.match(/\d+\.?\d+/g)
            if(regs != null){
                result = regs
            }
        }else{
            API.zcl.print('错误', '参数1不是String')
        }
        return result
    }

    /**
     * 正则数字（小数和整数） 取其中一个
     * @param1 string 参数一 字符串，被正则的文本
     * @param2 int    参数三 数字，  要取的下标
     * @return 返回匹配到的第i个值或者undefined
    */
    numberOne(strs, index){
        let result = undefined
        if(typeof strs == 'string'){
            let regs = strs.match(/\d+\.?\d+/g)
            if(regs != null){
                if(index < regs.length){
                    result = regs[index]
                }
            }
        }else{
            API.zcl.print('错误', '参数1不是String')
        }
        return result
    }

    /**
     * 正则所有汉字
     * @param1 string 参数一 字符串，被正则的文本
     * @return 返回匹配到的所有数组或者undefined
    */
    chinese(strs){
        let result = undefined
        if(typeof strs == 'string'){
            let regs = strs.match(/[\u4e00-\u9fa5]+/g)
            if(regs != null){
                result = regs
            }
        }else{
            API.zcl.print('错误', '参数1不是String')
        }
        return result
    }

    /**
     * 正则汉字，取其中一个
     * @param1 string 参数一 字符串，被正则的文本
     * @param2 int    参数三 数字，  要取的下标
     * @return 返回匹配到的第i个值或者undefined
    */
    chineseOne(strs, index){
        let result = undefined
        if(typeof strs == 'string'){
            let regs = strs.match(/[\u4e00-\u9fa5]+/g)
            if(regs != null){
                if(index < regs.length){
                    result = regs[index]
                }
            }
        }else{
            API.zcl.print('错误', '参数1不是String')
        }
        return result
    }
    
    checkTSchar(strs){
        let arr = [',', '(', ')', '*', '[', ']', '=', '-', '*', '（', '）','【', '】','，','/','<', '>', '?', '？', '《', '》', '|', '}', '{', '@', '!', '！', '#', '$', '￥', '%', '^', '.', '&','-', '—','"', "'",':', '：',';', '；']
        let count = 0
        let charList = ''
        for (let i = 0; i < arr.length; i++) {
            let ele = arr[i]
            if (strs.indexOf(ele) >= 0) {
                count += 1
                if(charList.indexOf(ele) == -1){
                    charList = ele + ' ' + charList
                }
            }

        }
        return {"char_count":count, "chars":charList}

    }
    

}

/**
 * Fatosy 自定义正则类
*/
const zrg = new zRegs()

export default {zrg}