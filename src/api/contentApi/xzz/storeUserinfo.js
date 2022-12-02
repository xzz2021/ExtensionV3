/*
 * @Date: 2022-11-23 17:56:17
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-24 09:14:33
 */



const getUserinfo = async () => {
    //设定账号登录有效期
    let VALIDITY_PERIOD = 15 * 24 * 60 * 60 * 1000
    let VALIDITY_TIMESTAMP = Date.now() - VALIDITY_PERIOD
    let info = await API.Storage.get('userInfo')
    if(info.timeStamp > VALIDITY_TIMESTAMP){
        return info
    }else{
        return {}
    }
}


const storeUserinfo = async (obj) => {
    //传入用户id,token,phone,添加时间戳进行存储
    obj.timeStamp = Date.now()
    await  API.Storage.set({userInfo: obj})
}


const updateUserinfo = async (obj) => {
    //用户切换账号时,添加时间戳进行存储
    obj.timeStamp = Date.now()
    await  API.Storage.set({userInfo: obj})
}


export default {getUserinfo, storeUserinfo, updateUserinfo }