/*
 * @Date: 2022-11-03 11:28:11
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-03 14:09:33
 */
//此次定义函数功能拦截检查,以及添加管道处理 函数



const checkAndNote = async (userid,obj) => {
    //检查登录
    if (userid == '') return ElMessage.error({ message: '请登录账号', duration: 1500 })
    //下载记录本地埋点
    // let downloadRecords = await API.Storage.get('downloadRecords') || []
    // downloadRecords.pop(obj)
    // await API.Storage.set({downloadRecords})
    // 后端埋点
    

}
