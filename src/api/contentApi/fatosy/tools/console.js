/**
 * Fatosy 自定义输出打印类
*/
class zPrint{

    constructor(){
        this.str = ''
    }

    /**
     * 类似 console.log( ----- param1 ----- : param2 )
     * @param1 string 参数一 字符串
     * @param2 string 参数二 字符串
    */
    print(tags, strs){
        console.log('-----', tags, '----- : ', strs)
    }

    /**
     * @param1 string 参数一 字符串或列表
     * @param2 string 参数二 字符串
     * @类似
     * @console.log( ----- param1[0] ----- : param2[0] )
     * @console.log( ----- param1[1] ----- : param2[1] )
     * @console.log( ----- param1[2] ----- : param2[2] )
     * @或
     * @console.log( ----- param1 ----- : param2[0] )
     * @console.log( ----- param1 ----- : param2[1] )
     * @console.log( ----- param1 ----- : param2[2] )
    */
    printList(tagList, strList){
        // 打印两个列表
        if(tagList instanceof Array && strList instanceof Array){
            if(strList.length == tagList.length){
                for(let i = 0; i< tagList.length; i++){
                    let tagstr = tagList[i]
                    let strs = strList[i]
                    this.print(tagstr, strs)

                }
            }else{
                this.print('错误', '提示参数长度和显示词组长度不一致！')
            }
        }
        // 打印一个参数和列表
        if(typeof tagList == 'string' && strList instanceof Array){
            for(let i = 0; i< strList.length; i++){
                let strs = strList[i]
                this.print(tagList, strs)
            }
        }
    }


}

/**
 * Fatosy 自定义输出打印类
*/
const zcl = new zPrint()


export default {zcl}