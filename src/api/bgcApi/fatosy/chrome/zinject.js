
function test2(){
    console.log('Hello World!');
    return "hello"
}


class zInject{
    constructor(){
        this.code = 'console.log("Hello World!")'
    }

    test(){
        document.body.style.backgroundColor="black"
        console.log('Hello World!');
        return "hello"
    }

    add(tabid){
        return new Promise( (resolve, reject) => {
            chrome.scripting.executeScript(
                {
                target: {tabId: tabid},
                func: function test(){
                        console.log('sadasjda')
                        return 'dadah'
                    },
                },
                (res) => {
                    console.log('result return: ' + res);
                    resolve(res)
            });
        })
    }

}

const zinject = new zInject()
export default {zinject}