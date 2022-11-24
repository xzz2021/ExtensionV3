/*
 * @Date: 2022-11-23 17:42:52
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-24 10:58:56
 */



const getUserlist = async () => {
    //筛选获取有效期内的用户列表
    let VALIDITY_PERIOD = 15 * 24 * 60 * 60 * 1000
    let VALIDITY_TIMESTAMP = Date.now() - VALIDITY_PERIOD
    let list = await API.Storage.get('userList')
    // console.log('list: ', list);
    if(list == '') return []
    let validitylist = list.filter(item => item.timeStamp < VALIDITY_TIMESTAMP)
    // console.log('validitylist: ', validitylist);
    return validitylist

}
const storeUserlist = async () => {
    //当有账号登录或者切换账号时,更新存储列表
    let aa = await  API.Storage.get('userList')
    let obj = await API.Storage.get('userInfo')
    if(obj == '') {obj = {}}
    if(aa == '') {
        API.Storage.set({userList: [obj]})
    }else{
        let newinfo = aa.filter(item => item.userid != obj.userid)
        newinfo.push(obj)
        await  API.Storage.set({userList: newinfo})
    }
}

const updateUserlist = async (id) => {
    //删除和退出账号时更新账号列表
    let aa = await  API.Storage.get('userList')
    if(aa == '') return
    let newinfo = aa.filter(item => item.userid != id)
    await  API.Storage.set({userList: newinfo})
}


export default {getUserlist, storeUserlist, updateUserlist}