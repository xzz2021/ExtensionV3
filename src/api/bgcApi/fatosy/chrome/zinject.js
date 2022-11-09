
class zInject{
    constructor(){
        this.code = 'console.log("Hello World!")'
    }

    addfuncs(tabid, funcs){
        // let msg1 = {type: 'zinject', funcs:'addfuncs', config:{id:tid}}
        return new Promise( (resolve, reject) => {
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

}

const zinject = new zInject()
export default {zinject}