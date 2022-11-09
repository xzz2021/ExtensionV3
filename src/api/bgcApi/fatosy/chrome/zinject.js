/** 
 * 动态JS注入
*/
class zInject{
    constructor(){
        this.code = 'console.log("Hello World!")'
    }
    /**
     * 无参数函数注入
     * @param1 int 要注入的tabid
     * @param2 function 要注入的函数(函数要写在background)
     * @returns 返回函数的返回值
     */
    async addfuncs(tabid, funcs){
        // let msg1 = {type: 'zinject', funcs:'addfuncs', config:{id:tid}}
        return new Promise( async(resolve, reject) => {
            chrome.scripting.executeScript(
                {
                target: {tabId: tabid},
                function: funcs,
                },
                (res) => {
                    let result = undefined;
                    if(res != undefined && res[0].result != undefined){
                        if(res[0].result == null){
                            result = undefined
                        }else{
                            result = res[0].result
                        }
                    }
                    resolve(result)
            });
        })
    }

    /**
     * 参数函数注入
     * @param1 int 要注入的tabid
     * @param2 function 要注入的函数(函数要写在background)
     * @param3 array 函数的参数(数组形式)
     * @returns 返回函数的返回值
     */
    addfuncargs(tabid, funcs, args){
        // let msg1 = {type: 'zinject', funcs:'addfuncs', config:{"id":tid, skuNum:[num]}}
        return new Promise( (resolve, reject) => {
            chrome.scripting.executeScript(
                {
                target: {tabId: tabid},
                function: funcs,
                args:args
                },
                (res) => {
                    let result = undefined;
                    if(res != undefined && res[0].result != undefined){
                        if(res[0].result == null){
                            result = undefined
                        }else{
                            result = res[0].result
                        }
                    }
                    resolve(result)
            });
        })
    }

}

const zinject = new zInject()
export default {zinject}