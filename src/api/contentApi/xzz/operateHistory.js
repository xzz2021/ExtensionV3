/*
 * @Date: 2022-11-29 14:58:05
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-02 17:36:41
 */

//---操作历史记录相关方法------与后端交互,获取和删除数据

const operateHistory = {
    async add(obj){
        return new Promise( async (resolve, reject) => {
        if(Object.prototype.toString.call(obj) !== '[object Object]' && JSON.stringify(obj) === '{}'){
            resolve('设定失败:参数必须是object且不能为空')
        }else{

              let res =  await  API.sendMessage({type: 'myfetch', config:{url: '?s=Dpzd.User_OperatingLog.addactlog',body: obj }})  
        // console.log('res: ', res);
        if (res.ret == undefined) return ElMessage.error({ message: `添加数据失败,后端接口异常,原因:${res}`, duration: 3000, showClose: true })
        if (res.ret == 400) return ElMessage.error({ message: `添加失败,原因:${res.msg}`, duration: 3000, showClose: true })
              if (res.data.code == 0) {
                resolve('记录成功')
            }else{
                resolve('记录失败')
            }
        }
    })
    },
    async get(obj){
        return new Promise( async (resolve, reject) => {
        // data: {
        //   user_id: this.userid,
        //   token: this.userToken,
        //   page: e,
        //   limit: 10
        // }
        let res =  await  API.sendMessage({type: 'myfetch', config:{url: '?s=Dpzd.User_OperatingLog.actlogList',body: obj }})  
        // console.log('res:----operate--------- ', res);
        if (res.ret == undefined) return ElMessage.error({ message: `获取数据失败,后端接口异常,原因:${res}`, duration: 3000, showClose: true })
        if (res.ret == 400) return ElMessage.error({ message: `获取失败,原因:${res.msg}`, duration: 3000, showClose: true })
          
          resolve({list: res.data.list, count: res.data.count})
        })
    },
    async delete(obj){
        // data: {
        //   user_id: this.userid,
        //   token: this.userToken,
        //   act_id: id
        // }

          let res =  await  API.sendMessage({type: 'myfetch', config:{url: '?s=Dpzd.User_OperatingLog.dellog',body: obj }})  
          // console.log('res: ', res);
          if (res.ret == undefined) return ElMessage.error({ message: `获取数据失败,后端接口异常,原因:${res}`, duration: 3000, showClose: true })
          if (res.ret == 400) return ElMessage.error({ message: `获取失败,原因:${res.msg}`, duration: 3000, showClose: true })
          if(res.data.code == 0){console.log('数据删除成功!')}else{console.log('数据删除失败!')}
    }








}


export default {operateHistory}