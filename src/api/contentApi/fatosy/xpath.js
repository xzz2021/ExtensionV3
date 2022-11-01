/**
 * Fatosy 自定义xpath类（页面提取数据）
*/
class zXpath{
    constructor(){
        this.html = document
    }

    /**
     * 根据xpath 获取当前页面节点
     * @param1 string 参数一 字符串，xpath表达式
    */
    getElm(xp){
        let value = this.html.evaluate(xp, this.html).iterateNext();
        if(value == null){
            value = undefined
        }
        return value
    }

    /**
     * 根据xpath 获取当前页面节点的文本
     * @param1 string 参数一 字符串，xpath表达式
    */
    getElmText(xp){
        xp = xp + '/text()'
        let value = this.html.evaluate(xp, this.html, null, XPathResult.STRING_TYPE, null).stringValue;
        if(value == ''){
            value = undefined
        }else{
            if(value.indexOf(' ') > -1){
                value = value.trim()
            }
        }
        return value
    }

    /**
     * 根据xpath 获取当前页面节点的href连接
     * @param1 string 参数一 字符串，xpath表达式
    */
     getElmHref(xp, http){
        xp = xp + '/@href'
        let value = this.html.evaluate(xp, this.html, null, XPathResult.STRING_TYPE, null).stringValue;
        if(value == ''){
            value = undefined
        }else{
            value = http + value
        }
        return value
    }



}

/**
 * Fatosy 自定义xpath类（页面提取数据）
*/
const zxp = new zXpath()

export default {zxp}