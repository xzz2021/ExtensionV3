/*
 * @Date: 2022-11-26 14:39:58
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-26 15:18:10
 */
//获取京东诊断浏览记录



  const getScanrecord = async (obj) => {

    // {
    //     user_id: userId,
    //     token: userToken,
    //     page: 1,
    //     limit: 30
    //   }
    let config = {
        url: '/?s=Jd.StoreBrowse.recordList',
        body: obj
        }
    let res = await  API.sendMessage({type: 'myfetch', config})
    console.log('res: ==================', res);
    if (res.ret == undefined) return ElMessage.error({ message: `登陆失败,后端接口异常,原因:${res}`, duration: 3000, showClose: true })
    if (res.ret == 400) return ElMessage.error({ message: `登陆失败,原因:${res.msg}`, duration: 3000, showClose: true })
    return res.data.list
  }


  const getSingleData = async (obj) => {

    //  {
    //   user_id: userId,
    //   token: userToken,
    //   info_id: info_id
    // } 

      let config = {
        url: '/?s=Jd.StoreBrowse.recordInfo',
        body: obj
        }
    let res = await  API.sendMessage({type: 'myfetch', config})
    if (res.ret == undefined) return ElMessage.error({ message: `登陆失败,后端接口异常,原因:${res}`, duration: 3000, showClose: true })
    if (res.ret == 400) return ElMessage.error({ message: `登陆失败,原因:${res.msg}`, duration: 3000, showClose: true })
    return res.data.info.json_data
  }



  const deleteData = async (obj) => {

      let config = {
        url: '/?s=Jd.StoreBrowse.delRecord',
        body: obj
        }
    let res = await  API.sendMessage({type: 'myfetch', config})
    if (res.ret == undefined) return ElMessage.error({ message: `登陆失败,后端接口异常,原因:${res}`, duration: 3000, showClose: true })
    if (res.ret == 400) return ElMessage.error({ message: `登陆失败,原因:${res.msg}`, duration: 3000, showClose: true })
    ElMessage.success({ message: `成功:删除记录`, duration: 1000, showClose: true });
    return res
  }


//过滤数据形成嵌套数组
const filterDate = async (dataArr) => {
  // 提取所需基础数据     //解构新对象
      let newArr = [];
      //通过forEach循环数组
      dataArr.forEach((item, i) => {
        let index = -1;
        //然后在跑到这里筛选 根据不同的时间放置不同的数组    some（）用来查找数组中是否存在某个值  如果存在 就return true
        let isExists = newArr.some((newItem, j) => {
          if (item.date == newItem.date) {
            index = j;
            return true;
          }
        })
        if (!isExists) {
          newArr.push({
            date: item.date,
            scanInfo: [item],
          });
        } else {
          newArr[index].scanInfo.push(item);
        }
      })
      return newArr
}






  export default {getScanrecord, getSingleData, filterDate, deleteData}