const rest = (time) => {
    return new Promise((resolve, reject) => {
        //console.log(`start rest for ${time} seconds now: `, API.ztime.ymdhms())
        setTimeout(() => {
            resolve()
            //console.log(`end rest for ${time} seconds now: `, API.ztime.ymdhms())
        }, time * 1000);
    });
}

/**
     * 自定义chrome浏览器tab页操作类
*/
class zTab{

    constructor(){
        this.tabid = undefined
    }

    /**
     * 打开新的标签页（在最后）
     * @param1 String  参数1 要打开的URL
     * @param2 boolean  参数2 true/false
     * @return 返回对象
    */
    add(url, actives){
        //let msg = {type: 'ztab', funcs:"add", config:{url:'https://www.baidu.com', active:false}}
        return new Promise((resolve, reject) => {
            chrome.tabs.create({url,active:actives}, async(res) => {
                let flag = true;
                let fcount = 0;
                let tabstatus = await this.getById(res.id); 
                while(flag){
                    fcount += 1;
                    tabstatus = await this.getById(res.id); 
                    if(tabstatus != undefined){
                        if(tabstatus.status == 'complete'){
                            flag = false;
                        }
                    }else{
                        flag = false;
                    }
                    if(fcount >= 10){
                        flag = false;
                    }
                    await rest(1)
                }
                resolve(res)
            })
        })
    }

    /**
     * 根据tabid获取标签页信息
     * @param1 int  参数1 要获取的tab页ID
     * @return 返回对象或者null
    */
    getById(tabid){
        //let msg = {type: 'ztab', funcs:"getById", config:{id:2107012952}}
        return new Promise( (resolve, reject) => {
            chrome.tabs.get(tabid, (res) => {
                if(res != null){
                    resolve(res)
                }else{
                    resolve(undefined)
                }
            })
        })
    }

    /**
     * 获取当前标签页信息
     * @return 返回对象
    */
    getNow(){
        //let msg = {type: 'ztab', funcs:"getNow"}
        return new Promise( async (resolve, reject) => {
            let queryOptions = { active: true, lastFocusedWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);
            resolve(tab);
        })
    }

    /**
     * 根据ID复制标签页并打开active
     * @return 返回对象
    */
    copy(tabid){
        //let msg = {type: 'ztab', funcs:"copy", config:{id:2107012952}}
        return new Promise( async (resolve, reject) => {
            chrome.tabs.duplicate(tabid, (res) => {
                resolve(res)
            })
        })
    }

    /**
     * 查询符合条件的tab页
     * @param1 object 参数1 查询的条件
     * @return 返回数组
    */
    query(obj){
        //let msg = {type: 'ztab', funcs:"query", config:{active:true, status:"complete"}}
        let objt = {
            // 标签页在窗口中是否为活动标签页。
            "active": "true/false",
            // 标签页是否固定
            "pinned": "true/false",
            // 标签页是否高亮突出
            "highlighted": "true/false",
            // 标签页是否在当前窗口中
            "currentWindow": "true/false",
            // 标签页是否在前一个具有焦点的窗口中
            "lastFocusedWindow": "true/false",
            // 标签页是否已经加载完成
            "status": "loading/complete",
            // 匹配页面标题的表达式
            "title": "/d+/",
            // 匹配标签页的 URL 表达式。注意：片段标识符不会匹配
            "url": "URL表达式",
            // 父窗口标识符，或者为 windows.WINDOW_ID_CURRENT，表示当前窗口
            "windowId": "12123123(int)/windows.WINDOW_ID_CURRENT",
            // 标签页所在窗口的类型
            "windowType": "normal/popup/panel/app",
            // 标签页在窗口中的位置
            "index":"2"
        }

        return new Promise( async (resolve, reject) => {
            chrome.tabs.query(obj, (res) => {
                resolve(res)
            })
        })
    }

    /**
     * 更新指定标签页ID的标签
     * @param1 int 参数1 标签页ID
     * @param2 object 参数2 标签属性
     * @return 返回对象
    */
    update(tabid, obj){
        //let msg1 = {type: 'ztab', funcs:"update", config:{id:2107012952, config:{url:'https://www.taobao.com', active:false}}}
        let objt = {
            // 标签页打开的 URL
            "url": "url",
            // 标签页是否为活动标签页
            "active": "true/false",
            // 标签页是否固定
            "pinned": "true/false"
        }

        return new Promise( async (resolve, reject) => {
            chrome.tabs.update(tabid, obj, (res) => {
                resolve(res)
            })
        })
    }

    /**
     * 刷新指定标签页ID的标签
     * @param1 int 参数1 标签页ID
     * @return 返回对象
    */
    reload(tabid){
        //let msg = {type: 'ztab', funcs:"reload", config:{id:2107012952}}
        return new Promise( async (resolve, reject) => {
            chrome.tabs.reload(tabid, (res) => {
                resolve(res)
            })
        })
    }

    /**
     * 删除指定标签页ID的标签
     * @param1 int 参数1 标签页ID
     * @return 返回true
    */
    remove(tabid){
        //let msg = {type: 'ztab', funcs:"remove", config:{id:2107012952}}
        return new Promise( async (resolve, reject) => {
            chrome.tabs.remove(tabid, (res) => {
                resolve(true)
            })
        })
    }
}


const ztab = new zTab();

export default {ztab}
